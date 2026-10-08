/**
 * TODO o conteúdo da LP mora aqui: texto, telefone, link, número e SEO.
 * Nenhuma string de conteúdo dentro de src/secoes/.
 *
 * Textos do cliente estão verbatim (única correção: "insfraestrutura" -> "infraestrutura").
 * "copy nova" = escrito para a LP, precisa do ok do cliente.
 * "Essenza" = copiado da LP do Harmoni Essenza (condominioharmoni.grifo.agency/essenza/).
 * Valor que o cliente ainda não mandou fica vazio e aparece como pendente na tela.
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
  // Domínio definitivo ainda não definido. Sem ele, não sai canonical nem sitemap.
  url: "",
  ogImagem: "/img/og/og-jardim-harmonia.jpg",
  ogAlt: "Portal de entrada do Jardim Harmonia",
  palavrasChave: [
    "bairro planejado Canoas",
    "lotes em Canoas",
    "terreno em Canoas RS",
    "loteamento Canoas",
    "Jardim Harmonia",
    "Nova Harmonia",
  ],
};

/**
 * Renders de OUTRO empreendimento da Nova Harmonia, usados só para marcar
 * posição enquanto as perspectivas do Jardim Harmonia não chegam.
 * Com `referencia: true` as fotos principais levam a legenda abaixo.
 */
export const imagens = {
  referencia: true,
  selo: "Imagem de referência",
  aviso: "Imagens meramente ilustrativas.",
};

export const contato = {
  // Só dígitos com DDI, ex.: 5551999999999. Vazio: botões de WhatsApp levam ao cadastro.
  whatsapp: "",
  // Como aparece na tela, ex.: (51) 99999-9999
  telefoneExibicao: "",
  email: "",
  stand: "",
  mensagemWhatsapp: "Olá! Quero saber mais sobre o Jardim Harmonia em Canoas.",
  rotuloWhatsapp: "Chamar no WhatsApp",
};

// Só o Facebook foi confirmado. Link vazio não aparece.
export const redes = [
  { nome: "Instagram", url: "" },
  { nome: "Facebook", url: "https://www.facebook.com/NovaHarmoniaBairrosPlanejados/" },
  { nome: "YouTube", url: "" },
] as const;

/**
 * Caminho do lead: form -> /api/lead/ (src/app/api/lead/route.ts) -> RD Station -> integração nativa -> CV CRM.
 * A API key e o idempreendimento ficam nas variáveis de ambiente da Hostinger, nunca aqui.
 */
export const lead = {
  endpoint: "/api/lead/",
};

export const header = {
  logoAlt: "Jardim Harmonia Canoas - RS, voltar ao início",
  botao: "Receber a tabela", // copy nova
  botaoWhatsapp: "WhatsApp",
  menu: [
    { rotulo: "O bairro", ancora: "bairro" },
    { rotulo: "Infraestrutura", ancora: "infraestrutura" },
    { rotulo: "Lazer", ancora: "lazer" },
    { rotulo: "Galeria", ancora: "galeria" },
    { rotulo: "Mapa", ancora: "mapa" },
    { rotulo: "Dúvidas", ancora: "duvidas" },
  ],
};

/** Hero "Mosaico": fotos soltas em volta do título; ao rolar, a do centro abre na tela toda. */
export const hero = {
  selo: "Lançamento · Canoas - RS", // copy nova
  titulo: { antes: "Um bairro planejado com infraestrutura superior ", destaque: "para Canoas." },
  subtitulo: { antes: "Garanta agora o melhor lar ", destaque: "para sua família!" },
  botao: "Ver condições de lançamento", // copy nova
  botaoSecundario: "Conhecer o bairro", // copy nova
  dicaRolagem: "Role para abrir", // copy nova
  imagem: { src: "/img/carrosseis/portal.webp", alt: "Portal de entrada com cobertura curva de madeira" },
  // l/t/w: posição e largura no desktop. lm/tm/wm: no celular (sem lm, some no celular). d: profundidade.
  soltas: [
    { src: "/img/carrosseis/praca-lago-800.webp", l: 4, t: 30, w: 15, lm: 3, tm: 47, wm: 28, d: 0.7 },
    { src: "/img/carrosseis/quadra-areia-800.webp", l: 80, t: 24, w: 16, lm: 69, tm: 45, wm: 28, d: 1 },
    { src: "/img/carrosseis/playground-800.webp", l: 9, t: 64, w: 13, lm: 2, tm: 88, wm: 24, d: 1.3 },
    { src: "/img/carrosseis/tenis-800.webp", l: 84, t: 62, w: 12, lm: 74, tm: 88, wm: 24, d: 0.5 },
    { src: "/img/carrosseis/rua-arborizada-800.webp", l: 71, t: 84, w: 9, d: 1.5 },
    { src: "/img/carrosseis/espaco-gourmet-800.webp", l: 20, t: 85, w: 9, d: 0.9 },
  ],
};

export const fitas = {
  // copy nova, tirada dos fatos do texto do cliente
  amarela: ["Áreas verdes", "Comércio no bairro", "Lazer na rua de casa", "Drenagem pluvial"],
  verde: ["Bairro planejado em Canoas", "Tudo perto de você", "Lançamento Nova Harmonia"],
};

export const sobre = {
  id: "bairro",
  rotulo: "O bairro",
  // Texto do cliente, com destaque em duas expressões
  destaque: [
    "O Jardim Harmonia florescerá em Canoas como um bairro que se valorizará muito pelos seus diferenciais, do ",
    { forte: "planejamento" },
    " a infraestrutura entregue com ",
    { forte: "drenagem pluvial" },
    ".",
  ] as const,
  apoio:
    "Construir sua casa em um local como este é oferecer mais qualidade de vida para sua família, um espaço com áreas verdes, áreas para comércio e áreas para lazer, tudo perto de você.",
};

/** Foto grande com CTA que aparece no hover. No celular o CTA fica sempre visível. */
export const fotoBairro = {
  imagem: { src: "/img/carrosseis/alameda.webp", alt: "Alameda arborizada com bancos de madeira" },
  legenda: "Alameda verde",
  titulo: "Sombra, banco e caminho a pé até a praça.", // copy nova
  botao: "Receber a tabela de lançamento", // copy nova
  bolha: "Quero conhecer", // copy nova
};

/** Essenza: "Como construímos". x e y em % da imagem do corte da rua. */
export const infraestrutura = {
  id: "infraestrutura",
  rotulo: "Como construímos",
  titulo: { antes: "Infraestrutura a altura do padrão ", destaque: "Nova Harmonia", depois: " de qualidade" },
  dica: "Toque nos números da imagem ou na lista.",
  imagem: {
    src: "/img/nova-harmonia/corte-infraestrutura.webp",
    alt: "Corte da rua mostrando pavimentação, meio-fio, drenagem e redes de água e esgoto",
    largura: 1400,
    altura: 933,
  },
  itens: [
    { titulo: "Pavimentação", icone: "pavimentacao", x: 49.4, y: 58 },
    { titulo: "Meio-fio com sarjeta", icone: "meiofio", x: 23.2, y: 66.4 },
    { titulo: "Rede de água", icone: "agua", x: 5.8, y: 71 },
    { titulo: "Rede de esgoto", icone: "esgoto", x: 14.2, y: 73.8 },
    { titulo: "Rede de drenagem", icone: "drenagem", x: 50.3, y: 87.5 },
    { titulo: "Rede elétrica", icone: "eletrica", x: 36.6, y: 7.2 },
    { titulo: "Iluminação pública em LED", icone: "iluminacao", x: 41.6, y: 13.4 },
  ],
} as const;

export const cadastro = {
  id: "cadastro",
  rotulo: "Condições de lançamento", // copy nova
  titulo: { antes: "Seja um dos primeiros compradores e tenha ", destaque: "condições exclusivas!" }, // Essenza
  // copy nova
  passos: [
    { titulo: "Cadastre-se", texto: "Nome e WhatsApp. Leva menos de um minuto." },
    { titulo: "Receba a tabela e a planta", texto: "Um consultor manda as condições de lançamento e os lotes disponíveis." },
    { titulo: "Escolha seu lote", texto: "Quem se cadastra antes escolhe com mais opções." },
  ],
  cartaoTitulo: "Cadastro de lançamento", // copy nova
  cartaoTexto: "Leva menos de um minuto", // copy nova
  etapa: "Etapa {n} de 2",
  pronto: "Pronto",
  campos: {
    nome: "Nome completo",
    nomePlaceholder: "Seu nome completo",
    telefone: "Telefone / WhatsApp",
    telefonePlaceholder: "(00) 00000-0000",
    email: "Email",
    emailPlaceholder: "voce@email.com",
  },
  continuar: "Continuar",
  voltar: "Voltar",
  botao: "Quero condição de lançamento", // Essenza
  botaoEnviando: "Enviando...",
  // Essenza
  consentimento:
    "Aceito receber via Whatsapp, ligação, email e outras formas de contato da NOVA HARMONIA, com ações de marketing, ofertas de produto e serviços. Estou de acordo com as formas de tratamento de dados realizados pela NOVA HARMONIA, conforme sua Politica de Privacidade.",
  politicaUrl: "https://novaharmonia.com.br/politica-de-privacidade/",
  sucesso: "Cadastro recebido! Em breve nossa equipe entra em contato pelo WhatsApp.",
  falha: "Não conseguimos registrar seu cadastro agora. Fale direto com a gente pelo WhatsApp.",
  conversar: "Prefere conversar agora?",
  copiar: "Copiar",
  copiado: "Copiado",
};

// Lista provisória, tirada dos renders de referência. Trocar pela lista oficial de lazer.
export const lazer = {
  id: "lazer",
  rotulo: "Lazer",
  // copy nova
  abertura: {
    titulo: "O fim de semana começa na rua de casa.",
    texto: "Role a página: cada espaço entra por cima do anterior.",
    imagem: { src: "/img/carrosseis/portaria-aerea.webp", alt: "Praça da entrada vista do alto" },
  },
  fechamento: {
    rotulo: "Condições de lançamento",
    titulo: "Quer ver tudo isso de perto?",
    texto: "Cadastre-se e receba a tabela, a planta com os lotes e o contato de um consultor.",
    botao: "Receber a tabela e a planta",
  },
  itens: [
    { titulo: "Praça com espelho d'água", texto: "Deck de madeira, palmeiras e caminhos de pedra logo na entrada.", imagem: "/img/carrosseis/praca-lago.webp" },
    { titulo: "Quadras de areia", texto: "Beach tennis e vôlei, com refletores para jogar à noite.", imagem: "/img/carrosseis/quadra-areia-800.webp" },
    { titulo: "Campo de futebol", texto: "Gramado cercado, com um espaço coberto ao lado para quem assiste.", imagem: "/img/carrosseis/campo-futebol-800.webp" },
    { titulo: "Quadra poliesportiva", texto: "Futsal e basquete no mesmo piso.", imagem: "/img/carrosseis/poliesportiva-800.webp" },
    { titulo: "Quadra de tênis", texto: "Saibro, refletores e palmeiras em volta.", imagem: "/img/carrosseis/tenis-800.webp" },
    { titulo: "Playground", texto: "Brinquedos sobre piso emborrachado, à vista de quem está nas quadras.", imagem: "/img/carrosseis/playground-800.webp" },
    { titulo: "Espaço gourmet", texto: "Churrasqueira, mesas e cobertura para o encontro de domingo.", imagem: "/img/carrosseis/espaco-gourmet-800.webp" },
  ],
};

export const galeria = {
  id: "galeria",
  titulo: { antes: "Uma volta ", destaque: "pelo bairro" }, // copy nova
  cta: "Quero conhecer de perto", // copy nova
  anterior: "Imagem anterior",
  proxima: "Próxima imagem",
  rotuloLeque: "Perspectivas do bairro. Use as setas do teclado.",
  // copy nova nas descrições
  imagens: [
    { src: "/img/carrosseis/vista-aerea-2-800.webp", titulo: "O bairro visto do alto", texto: "Ruas, quadras e áreas verdes desenhadas antes da primeira casa.", capitulo: "Chegada" },
    { src: "/img/carrosseis/portal-lateral-800.webp", titulo: "Portal de entrada", texto: "Cobertura curva em concreto e madeira, com paisagismo dos dois lados.", capitulo: "Chegada" },
    { src: "/img/carrosseis/acesso-800.webp", titulo: "Acesso", texto: "Rotatória com canteiros e palmeiras na chegada ao bairro.", capitulo: "Chegada" },
    { src: "/img/carrosseis/portaria-aerea.webp", titulo: "Praça da entrada", texto: "Espelho d'água e caminhos de pedra logo depois do portal.", capitulo: "Chegada" },
    { src: "/img/carrosseis/parque-esportivo-800.webp", titulo: "Parque esportivo", texto: "Quadras de areia, playground e áreas de estar à sombra.", capitulo: "Lazer" },
    { src: "/img/carrosseis/tenis-aerea-800.webp", titulo: "Quadra de tênis", texto: "Saibro com iluminação e um espaço de convivência ao lado.", capitulo: "Lazer" },
    { src: "/img/carrosseis/campo-futebol-800.webp", titulo: "Campo de futebol", texto: "Gramado cercado, perto das quadras e do espaço coberto.", capitulo: "Lazer" },
    { src: "/img/carrosseis/mercado-800.webp", titulo: "Comércio do dia a dia", texto: "Áreas para comércio dentro do bairro, perto de casa.", capitulo: "Ruas e comércio" },
    { src: "/img/carrosseis/rua-arborizada-800.webp", titulo: "Ruas arborizadas", texto: "Canteiro central com palmeiras e calçadas largas.", capitulo: "Ruas e comércio" },
    { src: "/img/carrosseis/alameda.webp", titulo: "Alameda verde", texto: "Um caminho com bancos à sombra das árvores.", capitulo: "Ruas e comércio" },
  ],
};

/** Pontos sobre a vista aérea. x e y em % da imagem. Refazer com a implantação oficial. */
export const mapa = {
  id: "mapa",
  rotulo: "Mapa do bairro",
  dica: "Passe o mouse ou toque nos pontos. Cada um abre uma parte do bairro.", // copy nova
  imagem: { src: "/img/carrosseis/vista-aerea-mapa.webp", alt: "Vista aérea do bairro com ruas, quadras e lotes", largura: 1600, altura: 727 },
  pontos: [
    { titulo: "Portal de entrada", texto: "Paisagismo e uma praça com espelho d'água logo na chegada.", x: 8, y: 28 },
    { titulo: "Parque esportivo", texto: "Quadras de areia, playground e áreas de estar.", x: 55, y: 22 },
    { titulo: "Campo e poliesportiva", texto: "Futebol, basquete e futsal sem sair do bairro.", x: 66, y: 19 },
    { titulo: "Alameda verde", texto: "Caminho arborizado com bancos, de ponta a ponta.", x: 47, y: 43 },
    { titulo: "Área comercial", texto: "Espaço reservado para o comércio do dia a dia.", x: 78, y: 8 },
    { titulo: "Quadra de tênis", texto: "Saibro com iluminação e convivência ao lado.", x: 79, y: 65 },
  ],
};

/** Essenza: grupo, números e setores. */
export const grupo = {
  rotulo: "Uma grande história não se escreve da noite para o dia",
  titulo: { antes: "Confie em quem é referência nacional em ", destaque: "empreendimentos de qualidade." },
  paragrafos: [
    "No DNA da Nova Harmonia, estão a solidez e os valores do Grupo São Francisco de Assis, um gigante com atuação nacional em diversos setores: Dentro da solidez do grupo, a Nova Harmonia Bairros Planejados, uma empresa com história para contar e um Brasil a desenvolver. Entendemos de Brasil, estamos de Norte a Sul e compreendemos cada país que existe dentro do Brasil. Entendemos de gente e do negócio. Um modelo de desenvolvimento urbano sustentável, eficiente e replicável às diferentes características, regiões e cidades do Brasil.",
    "Levamos a oportunidade de um brasileiro poder conquistar seu lugar no mundo, ter um imóvel para poder chamar de seu, seja para investir ou construir para morar.",
  ],
  numeros: [
    { valor: 1369, nome: "Parque Harmonia", cidade: "Viamão/RS" },
    { valor: 1895, nome: "Villa Imperial", cidade: "Teresina/PI" },
    { valor: 1181, nome: "Reserva Harmonia Caruaru", cidade: "Caruaru/PE" },
    { valor: 341, nome: "The One – Edição Maranhão", cidade: "Raposa/MA" },
  ],
  unidade: "lotes",
  fonte: "Números publicados em novaharmonia.com.br.",
  setores: [
    { nome: "Bairros planejados", imagem: "/img/nova-harmonia/grupo/paisagem.webp", alt: "Paisagismo em empreendimento da Nova Harmonia" },
    { nome: "Construção civil" },
    { nome: "Shopping centers", imagem: "/img/nova-harmonia/grupo/entrada.webp", alt: "Entrada de empreendimento do grupo" },
    { nome: "Agronegócio" },
    { nome: "Rede Novo Atacarejo", imagem: "/img/nova-harmonia/grupo/atacarejo.webp", alt: "Loja da Rede Novo Atacarejo" },
    { nome: "Faculdades" },
    { nome: "Hotéis", imagem: "/img/nova-harmonia/grupo/hotel.webp", alt: "Hotel do grupo" },
  ],
  logoNovaHarmonia: { src: "/img/nova-harmonia/logo-nova-harmonia.svg", alt: "Nova Harmonia Bairros Planejados", largura: 266, altura: 157 },
  logoGrupo: { src: "/img/nova-harmonia/logo-grupo-sfa.webp", alt: "Grupo SFA", largura: 400, altura: 186 },
};

/** Essenza: "Conheça os outros Harmonis". A frase do Essenza é a mesma do Jardins: pedir a própria. */
export const outros = {
  rotulo: "Nova Harmonia no Rio Grande do Sul",
  titulo: { antes: "Conheça outros ", destaque: "empreendimentos" },
  texto: "Viamão, Cachoeirinha e Gravataí: a mesma Nova Harmonia em outros endereços da Região Metropolitana.", // copy nova
  provisoria: "Imagem provisória",
  itens: [
    { nome: "Vinhedos", cidade: "Viamão · RS", frase: "Condomínio horizontal com lotes a partir de 160m².", imagem: "/img/nova-harmonia/outros/portico-original.webp", url: "https://condominioharmoni.grifo.agency/vinhedos/", provisoria: false },
    { nome: "Jardins", cidade: "Cachoeirinha · RS", frase: "Um novo patamar de viver bem em Cachoeirinha.", imagem: "/img/nova-harmonia/outros/menina-e-cachorro.webp", url: "https://condominioharmoni.grifo.agency/jardins/", provisoria: false },
    { nome: "Essenza", cidade: "Cachoeirinha · RS", frase: "Um novo patamar de viver bem em Cachoeirinha.", imagem: "/img/nova-harmonia/outros/familia-ao-ar-livre.webp", url: "https://condominioharmoni.grifo.agency/essenza/", provisoria: false },
    { nome: "Arbore", cidade: "Cachoeirinha · RS", frase: "Viva com grande estilo em Cachoeirinha.", imagem: "/img/nova-harmonia/outros/portico-original.webp", url: "https://condominioharmoni.grifo.agency/arbore/", provisoria: true },
    { nome: "Vale", cidade: "Gravataí · RS", frase: "Viver em Gravataí acaba de ficar muito melhor.", imagem: "/img/nova-harmonia/outros/salao-de-festas-externo.webp", url: "https://condominioharmoni.grifo.agency/vale/", provisoria: true },
    { nome: "Hortênsias", cidade: "Gravataí · RS", frase: "Gravataí, em sua mais bela forma.", imagem: "/img/nova-harmonia/outros/familia-jardim.webp", url: "https://condominioharmoni.grifo.agency/hortensias/", provisoria: false },
  ],
};

export const faq = {
  id: "duvidas",
  rotulo: "Dúvidas",
  titulo: "Perguntas frequentes", // copy nova
  ctaTexto: "Não achou sua pergunta?", // copy nova
  ctaBotao: "Falar com um consultor", // copy nova
  // copy nova: respostas sem prometer o que ainda não foi confirmado
  itens: [
    {
      pergunta: "O que é um bairro planejado?",
      resposta:
        "É um bairro que nasce com projeto completo antes da primeira casa: ruas, drenagem, áreas verdes, lazer e espaço para comércio já previstos no desenho.",
    },
    {
      pergunta: "A infraestrutura é entregue pronta?",
      resposta: "Sim. O Jardim Harmonia tem a infraestrutura entregue com drenagem pluvial.",
    },
    {
      pergunta: "Como funcionam o preço e o pagamento?",
      resposta:
        "As condições de lançamento vão primeiro para quem se cadastra. Preencha o formulário e um consultor manda a tabela e as formas de pagamento.",
    },
    {
      pergunta: "Onde fica o Jardim Harmonia?",
      resposta: "Em Canoas, no Rio Grande do Sul. O endereço completo entra aqui assim que for confirmado.",
    },
    {
      pergunta: "Quem está por trás do empreendimento?",
      resposta:
        "A Nova Harmonia Bairros Planejados, empresa do Grupo São Francisco de Assis, especializada em bairros planejados em vários estados do Brasil.",
    },
  ],
};

export const ctaFinal = {
  titulo: { antes: "Clique e faça a melhor escolha ", destaque: "para sua família" },
  texto: "Vantagens para quem garantir antes seu lote.",
  botao: "Cadastre-se",
  bolha: "Garantir meu lote", // copy nova
  imagem: { src: "/img/carrosseis/praca-lago.webp", alt: "" },
};

/** Essenza: trechos do memorial que valem para loteamento aberto. */
export const legal = {
  id: "legal",
  titulo: "Memorial e informações legais",
  registro: "", // matrícula, cartório e aprovação da prefeitura de Canoas/RS
  registroPendente: "[PREENCHER: registro do Jardim Harmonia, com matrícula, cartório de registro de imóveis e aprovação da prefeitura de Canoas/RS.]",
  paragrafos: [
    "As imagens, ilustrações, artes, perspectivas, plantas humanizadas, maquete apresentada no stand de vendas, folders, material publicitário, outdoors, anúncios ou qualquer outra forma são ilustrativas e artísticas, podendo apresentar variações em relação à obra final em função do desenvolvimento dos projetos executivos, da necessidade de adequabilidades técnicas ou do atendimento a postulados legais.",
    "As vegetações, paisagismo, mobiliário, itens de decoração, itens não relacionados neste memorial retratados nas imagens, ilustrações, artes, perspectivas, plantas humanizadas, maquete apresentada no stand de vendas, folders, material publicitário, outdoors, anúncios ou qualquer outra forma de veiculação, são meramente ilustrativas e artísticas.",
    "Conforme legislação, as dimensões aqui constantes poderão sofrer uma variação, tanto para mais quanto para menos, de até 5% (cinco por cento).",
  ],
};

export const barraMovel = {
  texto: "Condições de lançamento", // copy nova
  botao: "Receber a tabela",
};

export const rodape = {
  logoAlt: "Jardim Harmonia Canoas - RS",
  // copy nova, montada com o texto do cliente
  texto: "Bairro planejado em Canoas - RS, com infraestrutura entregue com drenagem pluvial, áreas verdes, áreas para comércio e áreas para lazer.",
  colunaBairro: "O bairro",
  links: [
    { rotulo: "Conheça o bairro", ancora: "bairro" },
    { rotulo: "Infraestrutura", ancora: "infraestrutura" },
    { rotulo: "Lazer", ancora: "lazer" },
    { rotulo: "Galeria", ancora: "galeria" },
    { rotulo: "Mapa do bairro", ancora: "mapa" },
    { rotulo: "Perguntas frequentes", ancora: "duvidas" },
  ],
  colunaAtendimento: "Atendimento",
  rotulos: { whatsapp: "WhatsApp", email: "E-mail", stand: "Stand de vendas" },
  botao: "Receber a tabela",
  colunaRealizacao: "Realização",
  site: { rotulo: "novaharmonia.com.br", url: "https://novaharmonia.com.br/" },
  empresa: "Harmonia SFA Participações Societárias LTDA",
  cnpj: "",
  linkPolitica: "Política de Privacidade",
  linkMemorial: "Memorial e informações legais",
  voltarTopo: "Voltar ao topo",
};
