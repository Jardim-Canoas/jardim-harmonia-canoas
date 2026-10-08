"use client";

import Image from "next/image";
import { useState } from "react";
import { CloudRain, Droplet, Lightbulb, Route, Ruler, Waves, Zap } from "lucide-react";
import { infraestrutura } from "@/dados";

const icones = {
  pavimentacao: Route,
  meiofio: Ruler,
  agua: Droplet,
  esgoto: Waves,
  drenagem: CloudRain,
  eletrica: Zap,
  iluminacao: Lightbulb,
};

/** "Como construímos": corte da rua com pontos numerados ligados à lista. */
export function Infraestrutura() {
  const [ativo, setAtivo] = useState(0);
  const atual = infraestrutura.itens[ativo];
  const eventos = (i: number) => ({ onMouseEnter: () => setAtivo(i), onFocus: () => setAtivo(i), onClick: () => setAtivo(i) });

  return (
    <section id={infraestrutura.id} className="obra">
      <div className="wrap">
        <div className="cab-sec">
          <div>
            <p className="rot">{infraestrutura.rotulo}</p>
            <h2 className="titulo">
              {infraestrutura.titulo.antes}
              <strong>{infraestrutura.titulo.destaque}</strong>
              {infraestrutura.titulo.depois}
            </h2>
          </div>
          <p className="dica">{infraestrutura.dica}</p>
        </div>
        <div className="obra-g">
          <div className="corte">
            <Image
              src={infraestrutura.imagem.src}
              alt={infraestrutura.imagem.alt}
              width={infraestrutura.imagem.largura}
              height={infraestrutura.imagem.altura}
              sizes="(min-width: 900px) 60vw, 100vw"
            />
            {infraestrutura.itens.map((item, i) => (
              <button
                key={item.titulo}
                type="button"
                className="pino"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                aria-label={item.titulo}
                aria-pressed={i === ativo}
                {...eventos(i)}
              >
                <i>{i + 1}</i>
              </button>
            ))}
            <span className="balao" aria-hidden="true" style={{ left: `${atual.x}%`, top: `${atual.y}%` }}>
              {atual.titulo}
            </span>
          </div>
          <ol>
            {infraestrutura.itens.map((item, i) => {
              const Icone = icones[item.icone];
              return (
                <li key={item.titulo}>
                  <button type="button" aria-pressed={i === ativo} {...eventos(i)}>
                    <b>{i + 1}</b>
                    <Icone aria-hidden="true" strokeWidth={1.6} />
                    <span>{item.titulo}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
