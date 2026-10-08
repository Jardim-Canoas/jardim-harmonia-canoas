import type { NextConfig } from "next";

/**
 * App Node na Hostinger (next build + next start). Não é mais export estático:
 * o envio do lead roda na rota src/app/api/lead/route.ts.
 */
const nextConfig: NextConfig = {
  // Imagens já vão otimizadas (webp no tamanho de exibição): não precisa do otimizador.
  images: { unoptimized: true },
  trailingSlash: true,
  // Desliga a geração automática do AGENTS.md pelo `next dev`
  agentRules: false,
};

export default nextConfig;
