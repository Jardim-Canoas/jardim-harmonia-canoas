# CHANGELOG

Cada entrega: o que mudou, por quê, como foi verificado, o que ficou pendente.

## 2026-10-07 — Estrutura inicial

**O que:** projeto Next 16 + Tailwind v4 com export estático, uma seção por
componente em `src/secoes/`, conteúdo em `src/dados.ts`, endpoint de lead em
`public/api/lead.php`, tokens de cor tirados do logo.

**Verificado:** `tsc`, `eslint` e `next build` sem erro (export gerado em
`out/` com `index.html`, `img/` e `api/lead.php`). Página ainda não aberta
no navegador.

**Pendente:** direção visual (protótipos), imagens e dados do lançamento.

## 2026-10-08 — LP interativa com imagens de referência

**O que:**
- Novas seções: Explore (vista aérea com pontos clicáveis), Lazer (lista que
  troca a foto no hover; cards com rolagem lateral no celular), Institucional,
  FAQ (`<details>` nativo) e barra fixa de CTA no celular + botão de WhatsApp.
- Galeria virou carrossel (embla-carousel-react 8.6.0) com lightbox e zoom
  (yet-another-react-lightbox 3.32.2, carregado só no primeiro clique).
- Header fixo que fica sólido ao rolar, com menu de âncoras no desktop.
- Formulário: máscara de telefone, evento `lead_enviado` no `dataLayer` para
  GTM/GA4, cadastro em duas colunas com o que a pessoa recebe.
- Tipografia: Instrument Serif nos títulos + Geist no texto.
- Animação de entrada só com CSS (`animation-timeline: view()`); navegador sem
  suporte mostra tudo parado. Respeita `prefers-reduced-motion`.
- SEO: Open Graph/Twitter, `og:image` 1200x630, JSON-LD (Organization, Place,
  FAQPage), `robots.txt` e `sitemap.xml`.
- Copies novas marcadas com `// copy nova` em `dados.ts`. Textos do cliente
  mantidos literais (o CTA do hero ganhou versão curta para caber no celular).

**Verificado:** `tsc`, `eslint` e `next build` sem erro. Página aberta em
Chromium headless a 1440px e 390px: sem erro no console, sem rolagem
horizontal. Testados hover no mapa, abertura do lightbox, máscara do
telefone e FAQ.

**Pendente:**
- Trocar as imagens de referência (são de outro empreendimento da Nova
  Harmonia, com mar ao fundo) e desligar `imagens.referencia`.
- Reposicionar os pontos do Explore sobre a implantação oficial.
- Lista oficial de lazer (a atual saiu dos renders).
- Domínio em `seo.url`: sem ele não sai canonical, sitemap nem URL absoluta
  da `og:image`.
- Confirmar números institucionais (vêm de reportagem de 2021).
- Endereço, distâncias, link do mapa, WhatsApp e CNPJ.

## 2026-10-08 — Versão aprovada no protótipo (direção C)

**O que:** a LP foi refeita a partir do protótipo aprovado (artifact
"Jardim Harmonia Protótipos", direção C com as versões escolhidas):
hero Mosaico, fitas cruzadas, o bairro, foto com hover e CTA, Como
construímos (Essenza), cadastro em duas etapas logo depois da
infraestrutura, lazer em story scroll (História), galeria em leque, mapa
com pontos, Grupo SFA com números (Essenza), outros empreendimentos em
grade, FAQ com accordion animado, CTA final, memorial e rodapé branco.

- Fonte: Plus Jakarta Sans (títulos e texto).
- Header só com o símbolo do logo (`img/logo/simbolo-*.svg`, recorte do SVG oficial).
- Ícones: `lucide-react` 1.47.0. Marcas (Instagram, Facebook, YouTube,
  WhatsApp) em `src/secoes/IconesMarca.tsx`, porque o Lucide não tem marcas.
- Saíram `embla-carousel-react` e `yet-another-react-lightbox`.
- Efeitos de rolagem e transição em `src/app/lp.css`; conteúdo todo em `dados.ts`.
- Formulário mantém UTM, cookies do RD, campo isca, máscara e `lead_enviado` no dataLayer.

**Verificado:** `tsc`, `eslint` e `next build` sem erro. Export servido
localmente e testado em Chromium 1440px e 390px: sem erro de console, sem
recurso 404, sem rolagem lateral. Testados hero abrindo, hover da foto,
pontos da obra, as duas etapas do formulário (envio cai na mensagem de
falha, esperado sem PHP local), story scroll, arrasto da galeria, contador,
accordion do FAQ e voltar ao topo.

**Pendente:** telefone/WhatsApp, e-mail, stand, CNPJ, Instagram, YouTube,
registro do memorial, domínio em `seo.url`, frase própria do Harmoni
Essenza, imagens oficiais e lista oficial de lazer.

## 2026-10-08 — Deploy como app Node na Hostinger

**O que:** o build falhou na Hostinger por causa do loader
`@tailwindcss/turbopack` (gerava `globals.css.css`). Troquei pelo setup
oficial `@tailwindcss/postcss` com `postcss.config.mjs`. O projeto deixou
de ser export estático: o `lead.php` virou a rota `src/app/api/lead/route.ts`,
com a mesma lógica (isca, validação, E.164, LGPD, origem, retry no 429).
Chave do RD e idempreendimento passam a ser variáveis de ambiente.

**Verificado:** `tsc`, `eslint`, `next build` e `next start` locais. Página
com CSS ok; API respondeu certo sem chave, com isca, com telefone inválido
e com chave inválida (502, lead no log). Envio real ao RD não testado.
