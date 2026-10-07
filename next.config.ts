import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build estático: gera out/ para subir no public_html (mesmo padrão do Harmoni Jardins).
  output: "export",
  // Sem servidor Node, o otimizador de imagem do Next não roda.
  images: { unoptimized: true },
  // Nginx serve /pagina/ melhor do que /pagina.html
  trailingSlash: true,
  // Desliga a geração automática do AGENTS.md pelo `next dev`
  agentRules: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
