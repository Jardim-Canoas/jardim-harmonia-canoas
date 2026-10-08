"use client";

import Image from "next/image";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  imagem: { src: string; alt: string };
  href: string;
  titulo: ReactNode;
  botao: string;
  bolha: string;
  legenda?: string;
  texto?: string;
  // Fim da página: foto mais escura e painel sempre visível
  fim?: boolean;
};

/** Foto grande. No hover escurece, sobe o painel com CTA e uma bolha segue o cursor. */
export function FotoImersiva({ imagem, href, titulo, botao, bolha, legenda, texto, fim = false }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const mover = (e: PointerEvent<HTMLAnchorElement>) => {
    const a = ref.current;
    const b = a?.querySelector<HTMLElement>(".bolha");
    if (!a || !b) return;
    const r = a.getBoundingClientRect();
    b.style.left = `${e.clientX - r.left}px`;
    b.style.top = `${e.clientY - r.top}px`;
  };

  return (
    <a ref={ref} className={`imersivo${fim ? " fim" : ""}`} href={href} onPointerMove={mover}>
      <Image src={imagem.src} alt={imagem.alt} width={1600} height={900} sizes="100vw" />
      <span className="bolha" aria-hidden="true">
        {bolha}
      </span>
      <span className={`painel${fim ? " sempre" : ""}`}>
        {legenda && <span className="ref">{legenda}</span>}
        <span className="h">{titulo}</span>
        {texto && <span className="sub">{texto}</span>}
        <span className="bt bt-areia">
          {botao} <ArrowRight aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}
