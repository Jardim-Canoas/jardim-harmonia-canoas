"use client";

import { useEffect, useState } from "react";
import { barraMovel, cadastro } from "@/dados";

/** Celular: barra fixa com o CTA. Aparece depois do hero e some quando o formulário está na tela. */
export function BarraMovel() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const form = document.getElementById(cadastro.id);
    let formNaTela = false;
    const atualizar = () => setVisivel(window.scrollY > window.innerHeight * 0.8 && !formNaTela);
    const obs = new IntersectionObserver(([e]) => {
      formNaTela = e.isIntersecting;
      atualizar();
    });
    if (form) obs.observe(form);
    window.addEventListener("scroll", atualizar, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", atualizar);
    };
  }, []);

  return (
    <div className={`barra-movel${visivel ? " on" : ""}`} aria-hidden={!visivel}>
      <span>{barraMovel.texto}</span>
      <a className="bt bt-areia" href={`#${cadastro.id}`} tabIndex={visivel ? 0 : -1}>
        {barraMovel.botao}
      </a>
    </div>
  );
}
