"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { cadastro, lazer } from "@/dados";
import { clamp, pad, reduzMovimento } from "./util";

// Fundo e texto de cada tela, na ordem: abertura, 7 espaços, fechamento.
const CORES = [
  ["#172f1b", "#d7cbae"],
  ["#e2b53e", "#172f1b"],
  ["#f7f6f1", "#172f1b"],
  ["#026938", "#ffffff"],
  ["#0f1f12", "#d7cbae"],
  ["#d7cbae", "#172f1b"],
  ["#ffffff", "#172f1b"],
  ["#172f1b", "#d7cbae"],
  ["#e2b53e", "#172f1b"],
];

const cor = (k: number) => ({ "--bg": CORES[k][0], "--fg": CORES[k][1] }) as CSSProperties;

/** Cada espaço ocupa a tela e entra girando por cima do anterior (story scroll, só com CSS sticky). */
export function LazerHistoria() {
  const secao = useRef<HTMLElement>(null);
  const total = lazer.itens.length;

  useEffect(() => {
    const telas = [...(secao.current?.querySelectorAll<HTMLElement>(".hist-in") ?? [])];
    if (reduzMovimento()) return;
    let pedido = false;
    const quadro = () => {
      pedido = false;
      telas.forEach((el, i) => {
        if (!i) return;
        const topo = el.parentElement!.getBoundingClientRect().top;
        const p = clamp((innerHeight - topo) / (innerHeight * 0.75));
        el.style.transform = p >= 1 ? "" : `rotate(${(1 - p) * 30}deg)`;
      });
    };
    const pedir = () => {
      if (!pedido) {
        pedido = true;
        requestAnimationFrame(quadro);
      }
    };
    quadro();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, []);

  return (
    <section ref={secao} id={lazer.id} aria-label={lazer.rotulo}>
      <article className="hist">
        <div className="hist-in" style={cor(0)}>
          <p className="hist-rot">
            <span>{lazer.rotulo}</span>
            <span>{pad(total)} espaços</span>
          </p>
          <hr />
          <h2>{lazer.abertura.titulo}</h2>
          <hr />
          <div className="hist-pe">
            <p>{lazer.abertura.texto}</p>
            <figure>
              <Image src={lazer.abertura.imagem.src} alt={lazer.abertura.imagem.alt} width={1600} height={900} sizes="(min-width: 760px) 55vw, 100vw" />
            </figure>
          </div>
        </div>
      </article>

      {lazer.itens.map((item, i) => (
        <article key={item.titulo} className="hist">
          <div className="hist-in" style={cor(i + 1)}>
            <p className="hist-rot">
              <span>{lazer.rotulo}</span>
              <span>
                {pad(i + 1)} / {pad(total)}
              </span>
            </p>
            <hr />
            <h3>{item.titulo}</h3>
            <hr />
            <div className="hist-pe">
              <p>{item.texto}</p>
              <figure>
                <Image src={item.imagem} alt={item.titulo} width={1600} height={900} sizes="(min-width: 760px) 55vw, 100vw" />
              </figure>
            </div>
          </div>
        </article>
      ))}

      <article className="hist">
        <div className="hist-in" style={cor(8)}>
          <p className="hist-rot">
            <span>{lazer.rotulo}</span>
            <span>{lazer.fechamento.rotulo}</span>
          </p>
          <hr />
          <h2>{lazer.fechamento.titulo}</h2>
          <hr />
          <div className="hist-pe">
            <p>{lazer.fechamento.texto}</p>
            <a className="bt bt-verde" href={`#${cadastro.id}`}>
              {lazer.fechamento.botao} <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
