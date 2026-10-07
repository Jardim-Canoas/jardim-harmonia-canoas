# Jardim Harmonia

Landing page de lançamento do **Jardim Harmonia**, bairro planejado da
Nova Harmonia em Canoas/RS.

- Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4
- Build: export estático (`output: 'export'`)

## Estrutura

```
jardim-harmonia-canoas/
├── docs/
│   ├── CHANGELOG.md       histórico de entregas e verificações
│   ├── IMAGENS.md         inventário das imagens e o que ainda falta
│   └── MARCA.md           cores, logo e tipografia
├── public/                estáticos — vira a raiz do site no servidor
│   ├── api/lead.php       recebimento do formulário
│   └── img/
│       ├── logo/          4 versões do logo
│       ├── banners/       hero e faixas de largura total
│       ├── carrosseis/    perspectivas e galeria
│       ├── implantacao/   masterplan
│       ├── infraestrutura/ ícones
│       ├── institucional/ fotos institucionais
│       ├── fotos/         fotos soltas de apoio
│       └── og/            imagem de compartilhamento (1200x630)
└── src/
    ├── app/               layout, página e ícone
    ├── dados.ts           TODO texto, telefone, link e SEO
    └── secoes/            um componente por bloco da página
```

## Sobre `public/` e `public_html`

`npm run build` gera a pasta `out/` com tudo dentro. É o **conteúdo de
`out/` que sobe para o `public_html`** do servidor.

## Regra de ouro

Nenhuma string de conteúdo dentro de `src/secoes/`. Todo texto, telefone,
link, número e meta tag mora em `src/dados.ts`.

## Comandos

```bash
npm install       # uma vez
npm run dev       # desenvolvimento em localhost:3000
npm run lint
npm run build     # gera out/ para subir no servidor
```
