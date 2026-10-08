"use client";

import { useEffect, useRef, useState } from "react";
import { reduzMovimento } from "./util";

/** Número que conta de 0 até o valor quando entra na tela. Sem JS, mostra o valor final. */
export function Contador({ valor }: { valor: number }) {
  const [atual, setAtual] = useState(valor);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduzMovimento()) return;
    let quadro = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const passo = (t: number) => {
          const p = Math.min(1, (t - t0) / 1600);
          setAtual(Math.round(valor * (1 - Math.pow(1 - p, 3))));
          if (p < 1) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor]);

  return <span ref={ref}>{atual.toLocaleString("pt-BR")}</span>;
}
