/**
 * Recebimento de lead (substitui o antigo public/api/lead.php).
 *
 * Caminho do lead: form -> esta rota -> RD Station -> integração nativa -> CV CRM.
 * Não postar direto no CV enquanto o RD estiver no caminho: duplica o lead.
 *
 * Variáveis de ambiente (painel da Hostinger):
 *   RD_API_KEY                obrigatória
 *   RD_CONVERSION_IDENTIFIER  opcional, padrão abaixo
 *   CV_IDEMPREENDIMENTO       opcional: sem ele o lead cai no CV sem empreendimento
 */

const IDENTIFICADOR_PADRAO = "lp-jardim-harmonia-canoas-formulario-principal";

type Entrada = Record<string, unknown>;

function responder(status: number, ok: boolean, erro?: string) {
  return Response.json(erro ? { ok, erro } : { ok }, { status });
}

function limpar(valor: unknown, max: number) {
  if (typeof valor !== "string" && typeof valor !== "number") return "";
  return String(valor).replace(/[\r\n\t]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

// DDD + 8 ou 9 dígitos, devolvido como +55...
function telefoneE164(valor: unknown) {
  let d = limpar(valor, 40).replace(/\D+/g, "").replace(/^0+/, "");
  if (d.startsWith("55") && d.length >= 12) d = d.slice(2);
  if (d.length < 10 || d.length > 11) return null;
  return `+55${d}`;
}

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  const chave = process.env.RD_API_KEY;
  if (!chave) {
    console.error("[lead] RD_API_KEY ausente");
    return responder(500, false, "indisponivel");
  }

  const bruto = await req.text();
  if (bruto.length > 20000) return responder(400, false, "requisicao invalida");

  let dados: Entrada;
  try {
    dados = JSON.parse(bruto);
    if (!dados || typeof dados !== "object") throw new Error();
  } catch {
    return responder(400, false, "json invalido");
  }

  // Campo isca. Humano nunca preenche; bot preenche. Responde ok e descarta.
  if (limpar(dados.website, 200)) return responder(200, true);

  const nome = limpar(dados.nome, 120);
  const email = limpar(dados.email, 160).toLowerCase();
  const telefone = telefoneE164(dados.telefone);

  if (nome.length < 2) return responder(422, false, "nome invalido");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return responder(422, false, "email invalido");
  if (!telefone) return responder(422, false, "telefone invalido");

  const payload: Record<string, unknown> = {
    conversion_identifier: process.env.RD_CONVERSION_IDENTIFIER || IDENTIFICADOR_PADRAO,
    name: nome,
    email,
    mobile_phone: telefone,
    cf_empreendimento: "Jardim Harmonia Canoas",
    cf_utm_source: limpar(dados.utm_source, 100),
    cf_utm_medium: limpar(dados.utm_medium, 100),
    cf_utm_campaign: limpar(dados.utm_campaign, 150),
    cf_utm_content: limpar(dados.utm_content, 150),
    cf_utm_term: limpar(dados.utm_term, 150),
  };

  if (process.env.CV_IDEMPREENDIMENTO) payload.idempreendimento = process.env.CV_IDEMPREENDIMENTO;

  // Origem. O cookie __trf.src preenche a origem sozinho no RD.
  const trf = limpar(dados.trf_src, 600);
  if (trf) payload.traffic_source = `encoded_${trf}`;
  const rdtrk = limpar(dados.rdtrk, 600);
  if (rdtrk) payload.cf_rdtrk = rdtrk;
  const gclid = limpar(dados.gclid, 200);
  if (gclid) payload.cf_gclid = gclid;
  const fbclid = limpar(dados.fbclid, 200);
  if (fbclid) payload.cf_fbclid = fbclid;

  // LGPD: só manda base legal se a pessoa marcou o aceite na tela.
  if (dados.consentimento === true) {
    payload.legal_bases = [{ category: "communications", type: "consent", status: "granted" }];
  }

  for (const k of Object.keys(payload)) if (payload[k] === "") delete payload[k];

  const corpo = JSON.stringify({ event_type: "CONVERSION", event_family: "CDP", payload });
  const url = `https://api.rd.services/platform/conversions?api_key=${encodeURIComponent(chave)}`;

  let status = 0;
  let resposta = "";
  let erroRede = "";

  // 429: o RD devolve remaining_time em ms. Espera e tenta de novo, no máximo duas vezes.
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    try {
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: corpo,
        signal: AbortSignal.timeout(12000),
      });
      status = r.status;
      resposta = await r.text();
    } catch (e) {
      erroRede = e instanceof Error ? e.message : String(e);
      break;
    }

    if (status >= 200 && status < 300) return responder(200, true);
    if (status !== 429 || tentativa === 3) break;

    let espera = 1500;
    try {
      espera = Number(JSON.parse(resposta).remaining_time) || 1500;
    } catch {}
    await esperar(Math.min(Math.max(espera, 500), 4000));
  }

  // Falhou. O lead não pode sumir: vai inteiro para o log do servidor e o front oferece o WhatsApp.
  console.error("[lead] falha no envio ao RD", JSON.stringify({ quando: new Date().toISOString(), status, erroRede, resposta: resposta.slice(0, 500), payload }));
  return responder(502, false, "nao entregue");
}
