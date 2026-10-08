# Jardim Harmonia

Landing page de lançamento do **Jardim Harmonia**, bairro planejado da
Nova Harmonia em Canoas/RS.

- Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4
- Build: app Node (`next build` + `next start`), hospedado na Hostinger

## Estrutura

```
jardim-harmonia-canoas/
├── docs/
│   ├── CHANGELOG.md       histórico de entregas e verificações
│   ├── IMAGENS.md         inventário das imagens e o que ainda falta
│   └── MARCA.md           cores, logo e tipografia
├── public/                estáticos — vira a raiz do site no servidor
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

## Deploy (Hostinger, app Node.js via GitHub)

- Configuração predefinida: Next.js · Node 22.x
- Comando de construção: `npm run build` · Diretório de saída: `.next`
- Variáveis de ambiente: ver `.env.example` (`RD_API_KEY` é obrigatória).
- O formulário posta em `/api/lead/` (`src/app/api/lead/route.ts`), que
  envia ao RD Station. Falhas vão para o log do app com o lead inteiro.

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
