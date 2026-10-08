// Pequenas funções usadas por várias seções.

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export const suave = (p: number) => 1 - Math.pow(1 - p, 3);

export const pad = (n: number) => String(n).padStart(2, "0");

export const reduzMovimento = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
