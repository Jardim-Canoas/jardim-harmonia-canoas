"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cadastro, contato, PREENCHER } from "@/dados";
import { linkWhatsapp } from "./whatsapp";
import { Whatsapp } from "./IconesMarca";

export function Conversar() {
  const [copiado, setCopiado] = useState(false);
  const whats = linkWhatsapp();

  const copiar = () => {
    navigator.clipboard
      ?.writeText(contato.telefoneExibicao)
      .then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 1600);
      })
      .catch(() => {});
  };

  return (
    <div className="conversar">
      <p>{cadastro.conversar}</p>
      <div className="fone">
        {contato.telefoneExibicao ? (
          <>
            <span>{contato.telefoneExibicao}</span>
            <button type="button" onClick={copiar}>
              {copiado ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {copiado ? cadastro.copiado : cadastro.copiar}
            </button>
          </>
        ) : (
          <span className="pend">{PREENCHER} telefone</span>
        )}
      </div>
      <a className="bt-whats" href={whats || `#${cadastro.id}`} {...(whats && { target: "_blank", rel: "noopener" })}>
        <Whatsapp />
        {contato.rotuloWhatsapp}
      </a>
    </div>
  );
}
