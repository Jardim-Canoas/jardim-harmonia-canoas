"use client";

import { useRef, type MouseEvent } from "react";
import { MessageCircle, Plus } from "lucide-react";
import { cadastro, faq } from "@/dados";
import { pad, reduzMovimento } from "./util";

const CURVA = "cubic-bezier(.2,.75,.15,1)";
type Aberto = HTMLDetailsElement & { _anim?: Animation | null };

// Anima a altura do <details>. Sem JS, abre e fecha normalmente.
function fechar(d: Aberto) {
  if (!d.open || d._anim) return;
  const s = d.querySelector("summary")!;
  d.style.overflow = "hidden";
  d._anim = d.animate({ height: [`${d.offsetHeight}px`, `${s.offsetHeight + 1}px`] }, { duration: reduzMovimento() ? 0 : 420, easing: CURVA });
  d._anim.onfinish = () => {
    d.open = false;
    d.style.overflow = "";
    d._anim = null;
  };
}

function abrir(d: Aberto) {
  if (d.open || d._anim) return;
  const h0 = d.offsetHeight;
  d.open = true;
  const h1 = d.offsetHeight;
  d.style.overflow = "hidden";
  d._anim = d.animate({ height: [`${h0}px`, `${h1}px`] }, { duration: reduzMovimento() ? 0 : 420, easing: CURVA });
  d._anim.onfinish = () => {
    d.style.overflow = "";
    d._anim = null;
  };
}

export function Faq() {
  const lista = useRef<HTMLDivElement>(null);

  const alternar = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const d = e.currentTarget.parentElement as Aberto;
    if (d.open) return fechar(d);
    lista.current?.querySelectorAll<Aberto>("details[open]").forEach(fechar);
    abrir(d);
  };

  return (
    <section id={faq.id} className="faq">
      <div className="wrap">
        <div className="faq-topo">
          <div>
            <p className="rot">{faq.rotulo}</p>
            <h2 className="titulo">{faq.titulo}</h2>
          </div>
          <div className="faq-cta">
            <p>{faq.ctaTexto}</p>
            <a className="bt bt-verde" href={`#${cadastro.id}`}>
              <MessageCircle aria-hidden="true" /> {faq.ctaBotao}
            </a>
          </div>
        </div>
        <div ref={lista} className="faq-lista">
          {faq.itens.map((item, i) => (
            <details key={item.pergunta}>
              <summary onClick={alternar}>
                <span className="n">{pad(i + 1)}</span>
                <span>{item.pergunta}</span>
                <span className="faq-ic" aria-hidden="true">
                  <Plus />
                </span>
              </summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
