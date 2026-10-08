# Inventário de imagens

## Imagens de referência (provisórias)

Os renders em `img/carrosseis/` são de **outro empreendimento da Nova
Harmonia** (aparece mar, que não existe em Canoas). Estão na página só para
marcar posição. Enquanto `imagens.referencia` estiver `true` em `dados.ts`,
cada uma leva o selo "Imagem de referência".

| Arquivo | Onde aparece | Trocar por |
|---|---|---|
| `portal.webp` | Hero | perspectiva do portal / entrada |
| `alameda.webp`, `rua-arborizada.webp` | O bairro | perspectivas de rua e área verde |
| `vista-aerea-mapa.webp` | Explore (mapa com pontos) | implantação oficial; ajustar `largura`/`altura` e os pontos |
| `praca-lago`, `quadra-areia`, `campo-futebol`, `poliesportiva`, `tenis`, `playground`, `espaco-gourmet` | Lazer | perspectivas de cada item da lista oficial |
| `vista-aerea-2`, `portal-lateral`, `acesso`, `portaria-aerea`, `parque-esportivo`, `tenis-aerea`, `mercado` | Galeria | perspectivas |
| `acesso-800.webp` | Fundo do cadastro | qualquer perspectiva aérea |
| `og/og-jardim-harmonia.jpg` | Compartilhamento | recorte 1200x630 de uma perspectiva oficial |

Cada imagem tem versão `-800.webp` para celular e miniaturas.
O render do lobby com o logo "THE ONE" ficou de fora de propósito.

## Nova Harmonia (do Harmoni Essenza)

`img/nova-harmonia/`: corte da infraestrutura, logos Nova Harmonia e Grupo
SFA, traçado de fundo, fotos dos setores (`grupo/`) e dos outros
empreendimentos (`outros/`). Baixadas de condominioharmoni.grifo.agency.

## Ainda falta

- Mapa de localização (hoje é um bloco tracejado)
- `img/banners/hero-arvores.webp` e `img/fotos/floresta.webp` não aparecem mais na página

## Regras

- webp ou avif, já no tamanho de exibição (sem otimizador do Next).
- 1600px de largura + versão `-800`.
- Nome minúsculo, sem espaço e sem acento.
- Toda imagem com `width`, `height` e `alt`.
