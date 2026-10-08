"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { hero, cadastro, sobre } from "@/dados";
import { clamp, suave } from "./util";

/**
 * Fotos soltas em volta do título seguem o mouse. Ao rolar, a foto do centro
 * abre até ocupar a tela e o subtítulo com os botões aparece por cima.
 */
export function HeroMosaico() {
  const secao = useRef<HTMLElement>(null);

  useEffect(() => {
    const s = secao.current;
    if (!s) return;
    const centro = s.querySelector<HTMLElement>(".mo-centro")!;
    const soltas = [...s.querySelectorAll<HTMLElement>(".mo-f")];
    const titulo = s.querySelector<HTMLElement>(".mo-titulo")!;
    const final = s.querySelector<HTMLElement>(".mo-final")!;
    const dica = s.querySelector<HTMLElement>(".mo-rola")!;
    const raiz = document.documentElement;
    let mx = 0;
    let my = 0;
    let pedido = false;

    const quadro = () => {
      pedido = false;
      const r = s.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - innerHeight));
      const q = suave(clamp(p / 0.7));
      const inicio = innerWidth < 760 ? [56, 6, 14, 6, 12] : [46, 32, 8, 32, 14];
      const [it, ir, ib, il, rr] = inicio.map((v) => v * (1 - q));
      centro.style.setProperty("--it", `${it}%`);
      centro.style.setProperty("--ir", `${ir}%`);
      centro.style.setProperty("--ib", `${ib}%`);
      centro.style.setProperty("--il", `${il}%`);
      centro.style.setProperty("--rr", `${rr}px`);
      centro.style.setProperty("--ms", String(1.15 - 0.15 * q));
      centro.style.setProperty("--ov", String(clamp((p - 0.35) / 0.35)));
      soltas.forEach((f) => {
        const d = Number(f.dataset.d);
        const lado = Number(f.dataset.lado);
        f.style.transform = `translate3d(${mx * d * 40 + lado * q * 420 * d}px, ${my * d * 30 - q * 120 * d}px, 0) rotate(${lado * (2 + q * 10) * d}deg)`;
        f.style.opacity = String(1 - clamp(p * 2));
      });
      titulo.style.opacity = String(1 - clamp(p * 2.6));
      titulo.style.transform = `translateY(${-p * 80}px)`;
      dica.style.opacity = String(1 - clamp(p * 5));
      const fim = clamp((p - 0.62) / 0.22);
      final.style.opacity = String(fim);
      final.style.transform = `translateY(${(1 - fim) * 30}px)`;
      final.classList.toggle("on", fim > 0.5);
      if (p > 0.45) raiz.dataset.heroEscuro = "";
      else delete raiz.dataset.heroEscuro;
    };
    const pedir = () => {
      if (!pedido) {
        pedido = true;
        requestAnimationFrame(quadro);
      }
    };
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
      pedir();
    };

    quadro();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    s.addEventListener("pointermove", mover);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      s.removeEventListener("pointermove", mover);
      delete raiz.dataset.heroEscuro;
    };
  }, []);

  return (
    <section ref={secao} className="hx-mosaico">
      <div className="mo-pin">
        <div className="mo-centro">
          <Image src={hero.imagem.src} alt={hero.imagem.alt} width={1600} height={900} priority sizes="100vw" />
        </div>
        {hero.soltas.map((f) => (
          <Image
            key={f.src}
            className={`mo-f${"lm" in f ? "" : " so-desk"}`}
            src={f.src}
            alt=""
            width={800}
            height={450}
            data-d={f.d}
            data-lado={f.l < 50 ? -1 : 1}
            style={
              {
                "--l": `${f.l}%`,
                "--t": `${f.t}%`,
                "--w": `${f.w}vw`,
                ...("lm" in f && { "--lm": `${f.lm}%`, "--tm": `${f.tm}%`, "--wm": `${f.wm}vw` }),
              } as CSSProperties
            }
          />
        ))}
        <div className="mo-titulo wrap">
          <p className="rot">{hero.selo}</p>
          <h1>
            {hero.titulo.antes}
            <em>{hero.titulo.destaque}</em>
          </h1>
        </div>
        <p className="mo-rola" aria-hidden="true">
          {hero.dicaRolagem} ↓
        </p>
        <div className="mo-final wrap">
          <p>
            {hero.subtitulo.antes}
            <em>{hero.subtitulo.destaque}</em>
          </p>
          <div className="botoes">
            <a className="bt bt-areia" href={`#${cadastro.id}`}>
              {hero.botao} <ArrowRight aria-hidden="true" />
            </a>
            <a className="bt bt-claro" href={`#${sobre.id}`}>
              {hero.botaoSecundario}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
