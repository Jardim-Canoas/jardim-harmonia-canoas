"use client";

import Image from "next/image";
import { useState } from "react";
import { mapa } from "@/dados";
import { pad } from "./util";

/** Vista aérea com pontos numerados e legenda que abre o ponto ativo. */
export function MapaBairro() {
  const [ativo, setAtivo] = useState(0);
  const eventos = (i: number) => ({ onMouseEnter: () => setAtivo(i), onFocus: () => setAtivo(i), onClick: () => setAtivo(i) });

  return (
    <section id={mapa.id} className="wrap mapa-sec">
      <div className="cab-sec">
        <p className="rot">{mapa.rotulo}</p>
        <p className="dica">{mapa.dica}</p>
      </div>
      <div className="mapa-g">
        <div className="mapa">
          <Image src={mapa.imagem.src} alt={mapa.imagem.alt} width={mapa.imagem.largura} height={mapa.imagem.altura} sizes="(min-width: 900px) 70vw, 100vw" />
          {mapa.pontos.map((p, i) => (
            <button
              key={p.titulo}
              type="button"
              className="pino"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-label={p.titulo}
              aria-pressed={i === ativo}
              {...eventos(i)}
            >
              <i>{i + 1}</i>
            </button>
          ))}
        </div>
        <ol className="legenda">
          {mapa.pontos.map((p, i) => (
            <li key={p.titulo}>
              <button type="button" aria-pressed={i === ativo} {...eventos(i)}>
                <span>{pad(i + 1)}</span>
                <span>
                  <strong>{p.titulo}</strong>
                  <small>{p.texto}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
