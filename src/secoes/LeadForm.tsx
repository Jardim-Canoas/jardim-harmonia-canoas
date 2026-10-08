"use client";

import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cadastro, lead } from "@/dados";
import { linkWhatsapp } from "./whatsapp";

type Passo = 1 | 2 | 3;

const CHAVES = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
const ARMAZEM = "jh_origem";

// First touch vence: só grava se ainda não houver origem na sessão.
function capturarOrigem() {
  try {
    if (sessionStorage.getItem(ARMAZEM)) return;
    const qs = new URLSearchParams(window.location.search);
    const origem: Record<string, string> = {};
    for (const k of CHAVES) {
      const v = qs.get(k);
      if (v) origem[k] = v;
    }
    sessionStorage.setItem(ARMAZEM, JSON.stringify(origem));
  } catch {
    // storage bloqueado: segue sem UTM, o lead não pode travar por isso
  }
}

function lerOrigem(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(ARMAZEM) ?? "{}");
  } catch {
    return {};
  }
}

function lerCookie(nome: string) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${nome.replace(".", "\\.")}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : "";
}

// (51) 99999-9999 enquanto digita. O PHP normaliza de novo no servidor.
function mascararTelefone(e: ChangeEvent<HTMLInputElement>) {
  const d = e.currentTarget.value.replace(/\D/g, "").slice(0, 11);
  e.currentTarget.value =
    d.length <= 2
      ? d && `(${d}`
      : d.length <= 6
        ? `(${d.slice(0, 2)}) ${d.slice(2)}`
        : d.length <= 10
          ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
          : `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// Evento para o GTM/GA4 marcar conversão. Sem GTM na página, não faz nada.
function avisarConversao() {
  const w = window as unknown as { dataLayer?: object[] };
  w.dataLayer?.push({ event: "lead_enviado", empreendimento: "Jardim Harmonia Canoas" });
}

/** Cadastro em duas etapas (modelo do Harmoni Essenza): nome e WhatsApp, depois e-mail e aceite. */
export function LeadForm() {
  const [passo, setPasso] = useState<Passo>(1);
  const [enviando, setEnviando] = useState(false);
  const [falhou, setFalhou] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const travado = useRef(false);
  const whats = linkWhatsapp();

  useEffect(capturarOrigem, []);

  useEffect(() => {
    if (passo === 2) form.current?.querySelector<HTMLInputElement>("#cad-email")?.focus({ preventScroll: true });
  }, [passo]);

  // Valida só os campos da etapa visível.
  const etapaValida = (n: 1 | 2) => {
    const invalido = form.current?.querySelector<HTMLInputElement>(`[data-passo="${n}"] :invalid`);
    invalido?.reportValidity();
    return !invalido;
  };

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (passo === 1) {
      if (etapaValida(1)) setPasso(2);
      return;
    }
    if (travado.current || !etapaValida(2)) return;
    travado.current = true;
    setEnviando(true);
    setFalhou(false);
    const f = new FormData(e.currentTarget);

    try {
      const resposta = await fetch(lead.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: f.get("nome"),
          telefone: f.get("telefone"),
          email: f.get("email"),
          consentimento: f.get("consentimento") === "on",
          website: f.get("website"),
          ...lerOrigem(),
          trf_src: lerCookie("__trf.src"),
          rdtrk: lerCookie("rdtrk"),
        }),
      });
      const json = await resposta.json().catch(() => null);
      // Só mostra sucesso se o lead realmente chegou.
      if (resposta.ok && json?.ok) {
        setPasso(3);
        avisarConversao();
      } else setFalhou(true);
    } catch {
      setFalhou(true);
    } finally {
      travado.current = false;
      setEnviando(false);
    }
  }

  const progresso = passo === 1 ? "50%" : "100%";

  return (
    <form ref={form} className="etapas" onSubmit={enviar} noValidate>
      <p className="passo-txt" aria-live="polite">
        <span>{passo < 3 ? cadastro.etapa.replace("{n}", String(passo)) : cadastro.pronto}</span>
        <i style={{ "--p": progresso } as CSSProperties} />
      </p>

      <div className="passo" data-passo="1" hidden={passo !== 1}>
        <label htmlFor="cad-nome">
          {cadastro.campos.nome}
          <input id="cad-nome" name="nome" type="text" autoComplete="name" placeholder={cadastro.campos.nomePlaceholder} required minLength={2} />
        </label>
        <label htmlFor="cad-tel">
          {cadastro.campos.telefone}
          <input
            id="cad-tel"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={cadastro.campos.telefonePlaceholder}
            required
            minLength={14}
            onChange={mascararTelefone}
          />
        </label>
        <button className="bt bt-verde" type="submit">
          {cadastro.continuar} <ArrowRight aria-hidden="true" />
        </button>
      </div>

      <div className="passo" data-passo="2" hidden={passo !== 2}>
        <label htmlFor="cad-email">
          {cadastro.campos.email}
          <input id="cad-email" name="email" type="email" autoComplete="email" placeholder={cadastro.campos.emailPlaceholder} required />
        </label>
        <label className="aceite" htmlFor="cad-aceite">
          <input id="cad-aceite" name="consentimento" type="checkbox" required />
          <span>
            {cadastro.consentimento.replace("Politica de Privacidade.", "")}
            <a href={cadastro.politicaUrl} target="_blank" rel="noopener">
              Politica de Privacidade
            </a>
            .
          </span>
        </label>
        <div className="linha-bt">
          <button className="bt bt-linha" type="button" onClick={() => setPasso(1)}>
            {cadastro.voltar}
          </button>
          <button className="bt bt-verde" type="submit" disabled={enviando}>
            {enviando ? cadastro.botaoEnviando : cadastro.botao}
          </button>
        </div>
        {falhou && (
          <div role="alert" className="erro">
            <p>{cadastro.falha}</p>
            {whats && (
              <a href={whats} target="_blank" rel="noopener" className="bt-whats" style={{ marginTop: 10 }}>
                {cadastro.conversar}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Campo isca: humano não vê, bot preenche. */}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {passo === 3 && (
        <p className="ok" role="status">
          {cadastro.sucesso}
        </p>
      )}
    </form>
  );
}
