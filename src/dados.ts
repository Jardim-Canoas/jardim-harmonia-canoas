/**
 * TODO o conteúdo da LP mora aqui: texto, telefone, link, número e SEO.
 * Nenhuma string de conteúdo dentro de src/secoes/.
 *
 * Textos do cliente estão verbatim (única correção: "insfraestrutura" -> "infraestrutura").
 * Valor que o cliente ainda não mandou fica vazio e aparece como [PREENCHER] na tela.
 */

export const PREENCHER = "[PREENCHER]";

export const empreendimento = {
  nome: "Jardim Harmonia",
  cidade: "Canoas - RS",
};

export const seo = {
  titulo: "Jardim Harmonia | Bairro planejado em Canoas - RS",
  descricao:
    "Um bairro planejado com infraestrutura superior para Canoas. Cadastre-se e conheça as condições para garantir seu lote.",
};

export const contato = {
  // Só dígitos com DDI, ex.: 5551999999999
  whatsapp: "",
  mensagemWhatsapp: "Olá! Quero saber mais sobre o Jardim Harmonia em Canoas.",
};

/**
 * Caminho do lead: form -> /api/lead.php -> RD Station -> integração nativa -> CV CRM.
 * O idempreendimento e a API key ficam no config do servidor, fora do webroot.
 */
export const lead = {
  endpoint: "/api/lead.php",
};

export const hero = {
  titulo: "Um bairro planejado com infraestrutura superior para Canoas",
  subtitulo: "Garanta agora o melhor lar para sua família!",
};

export const sobre = {
  titulo: {
    antes: "Um ",
    destaque: "BAIRRO PLANEJADO",
    depois: " com inteligência construtiva!",
  },
  paragrafos: [
    "O Jardim Harmonia florescerá em Canoas como um bairro que se valorizará muito pelos seus diferenciais, do planejamento a infraestrutura entregue com drenagem pluvial.",
    "Construir sua casa em um local como este é oferecer mais qualidade de vida para sua família, um espaço com áreas verdes, áreas para comércio e áreas para lazer, tudo perto de você.",
  ],
  cta: "Clique e conheça o Jardim Harmonia",
  imagem: "Imagem #1 · perspectiva do bairro",
};

export const cadastro = {
  id: "cadastro",
  titulo: "Condições para garantir agora seu lote",
  botao: "Clique e aproveite essa oportunidade",
  botaoEnviando: "Enviando...",
  campos: {
    nome: "Nome completo",
    telefone: "WhatsApp",
    email: "E-mail",
  },
  consentimento:
    "Concordo com a Política de Privacidade Nova Harmonia Bairros Planejados e autorizo comunicações.",
  linkPolitica: "Ver política",
  politicaUrl: "https://novaharmonia.com.br/politica-de-privacidade/",
  sucesso: "Cadastro recebido! Em breve nossa equipe entra em contato.",
  falha: "Não conseguimos registrar seu cadastro agora. Fale direto com a gente pelo WhatsApp.",
  botaoWhatsapp: "Chamar no WhatsApp",
};

// Tirados do próprio texto do cliente. Lista oficial de diferenciais e lazer: pendente.
export const diferenciais = {
  titulo: "Diferenciais",
  itens: [
    { titulo: "Drenagem pluvial", texto: "Infraestrutura entregue com drenagem pluvial." },
    { titulo: "Áreas verdes", texto: "Espaços verdes para a família aproveitar." },
    { titulo: "Áreas para comércio", texto: "Comércio perto de você." },
    { titulo: "Áreas para lazer", texto: "Lazer dentro do bairro." },
  ],
};

export const galeria = {
  titulo: "Perspectivas",
  imagens: [
    "Imagem #2 · perspectiva",
    "Imagem #3 · perspectiva",
    "Imagem #4 · perspectiva",
    "Imagem #5 · perspectiva",
    "Imagem #6 · perspectiva",
    "Imagem #7 · perspectiva",
  ],
};

export const localizacao = {
  titulo: "Localização",
  endereco: "",
  imagem: "Imagem #8 · mapa de localização em Canoas - RS",
};

export const ctaFinal = {
  titulo: "Clique e faça a melhor escolha para sua família",
  texto: "Vantagens para quem garantir antes seu lote.",
  botao: "Cadastre-se",
};

export const header = {
  botao: "Cadastre-se",
  logoAlt: "Jardim Harmonia Canoas - RS",
};

export const rodape = {
  empresa: "Harmonia SFA Participações Societárias LTDA",
  cnpj: "",
  direitos: "Todos os direitos reservados.",
  linkPolitica: "Política de Privacidade",
};
