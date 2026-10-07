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
