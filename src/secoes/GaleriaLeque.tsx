"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cadastro, galeria } from "@/dados";
import { pad, reduzMovimento } from "./util";

const N = galeria.imagens.length;
const CAPITULOS = [...new Set(galeria.imagens.map((g) => g.capitulo))];
const INTERVALO = 4500;

/** Cartas em leque com profundidade. Arrasta a da frente, clica numa de trás, troca sozinho. */
export function GaleriaLeque() {
  const [ativo, setAtivo] = useState(0);
  const leque = useRef<HTMLDivElement>(null);
  const arrasto = useRef<{ x0: number; dx: number; vx: number; lx: number; lt: number } | null>(null);
  const pausa = useRef(false);
  const naTela = useRef(false);

  // Posição de cada carta. Mexe direto no estilo para o arrasto não re-renderizar.
  const desenhar = useCallback((atual: number, dx = 0) => {
    const cartas = [...(leque.current?.querySelectorAll<HTMLElement>(".carta-l") ?? [])];
    if (!cartas.length) return;
    const cw = cartas[0].offsetWidth;
    const estreito = innerWidth < 700;
    const passo = cw * (estreito ? 0.34 : 0.5);
    const giro = estreito ? 6 : 9;
    const max = estreito ? 2 : 3;
    cartas.forEach((c, i) => {
      let o = i - atual;
      const alt = o > 0 ? o - N : o + N;
      if (Math.abs(alt) < Math.abs(o)) o = alt;
      const a = Math.abs(o);
      const frente = o === 0;
      const x = o * passo + (frente ? dx : 0);
      c.style.transform = `translateX(${x}px) translateY(${a * 14 - (frente ? 20 : 0)}px) translateZ(${-a * 130}px) rotateZ(${o * giro + (frente ? dx * 0.02 : 0)}deg) rotateX(${frente ? 0 : 10}deg) scale(${frente ? 1.03 : 0.93})`;
      c.style.zIndex = String(100 - a);
      c.style.opacity = a > max ? "0" : "1";
      c.style.pointerEvents = a > max ? "none" : "";
    });
  }, []);

  const ir = useCallback((i: number) => setAtivo(((i % N) + N) % N), []);

  useEffect(() => desenhar(ativo), [ativo, desenhar]);

  useEffect(() => {
    const el = leque.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (naTela.current = e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    const redesenhar = () => desenhar(ativo);
    window.addEventListener("resize", redesenhar);
    const tempo = reduzMovimento()
      ? 0
      : window.setInterval(() => {
          if (!pausa.current && naTela.current && !arrasto.current) setAtivo((a) => (a + 1) % N);
        }, INTERVALO);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", redesenhar);
      window.clearInterval(tempo);
    };
  }, [ativo, desenhar]);

  const baixar = (e: PointerEvent<HTMLDivElement>) => {
    const carta = (e.target as HTMLElement).closest<HTMLElement>(".carta-l");
    if (!carta || (e.target as HTMLElement).closest(".mini-cta")) return;
    const i = Number(carta.dataset.i);
    if (i !== ativo) return ir(i);
    arrasto.current = { x0: e.clientX, dx: 0, vx: 0, lx: e.clientX, lt: performance.now() };
    leque.current?.classList.add("arrastando");
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const a = arrasto.current;
    if (!a) return;
    const t = performance.now();
    a.dx = e.clientX - a.x0;
    a.vx = ((e.clientX - a.lx) / Math.max(1, t - a.lt)) * 1000;
    a.lx = e.clientX;
    a.lt = t;
    desenhar(ativo, a.dx);
  };
  const soltar = () => {
    const a = arrasto.current;
    if (!a) return;
    arrasto.current = null;
    leque.current?.classList.remove("arrastando");
    const cartas = leque.current?.querySelectorAll<HTMLElement>(".carta-l");
    const limite = Math.min(160, (cartas?.[0].offsetWidth ?? 500) * 0.22);
    if (a.dx > limite || a.vx > 650) ir(ativo - 1);
    else if (a.dx < -limite || a.vx < -650) ir(ativo + 1);
    else desenhar(ativo);
  };
  const teclado = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") ir(ativo + 1);
    if (e.key === "ArrowLeft") ir(ativo - 1);
  };

  const atual = galeria.imagens[ativo];

  return (
    <section id={galeria.id} className="galeria">
      <div className="wrap topo-sec">
        <h2 className="titulo">
          {galeria.titulo.antes}
          <em>{galeria.titulo.destaque}</em>
        </h2>
        <div className="abas">
          {CAPITULOS.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={atual.capitulo === c}
              onClick={() => ir(galeria.imagens.findIndex((g) => g.capitulo === c))}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={leque}
        className="leque"
        tabIndex={0}
        role="region"
        aria-roledescription="carrossel"
        aria-label={galeria.rotuloLeque}
        onPointerDown={baixar}
        onPointerMove={mover}
        onPointerUp={soltar}
        onPointerCancel={soltar}
        onKeyDown={teclado}
        onMouseEnter={() => (pausa.current = true)}
        onMouseLeave={() => (pausa.current = false)}
      >
        {galeria.imagens.map((img, i) => (
          <article key={img.src + i} className={`carta-l${i === ativo ? " on" : ""}`} data-i={i} aria-hidden={i !== ativo}>
            <Image src={img.src} alt={img.titulo} width={800} height={500} draggable={false} sizes="(min-width: 760px) 580px, 76vw" />
            <span className="sombra" />
            <div className="txt">
              <span className="cap">{img.capitulo}</span>
              <h3>{img.titulo}</h3>
              <a className="mini-cta" href={`#${cadastro.id}`} tabIndex={i === ativo ? 0 : -1}>
                {galeria.cta} <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="wrap">
        <div className="leque-leg">
          <p aria-live="polite">{atual.texto}</p>
          <div className="ctrl">
            <span className="cont">
              {pad(ativo + 1)} / {pad(N)}
            </span>
            <button className="seta" type="button" aria-label={galeria.anterior} onClick={() => ir(ativo - 1)}>
              <ArrowLeft aria-hidden="true" />
            </button>
            <button className="seta" type="button" aria-label={galeria.proxima} onClick={() => ir(ativo + 1)}>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="progresso">
          <span style={{ width: `${((ativo + 1) / N) * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
