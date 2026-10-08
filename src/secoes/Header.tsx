"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cadastro, header } from "@/dados";
import { linkWhatsapp } from "./whatsapp";

// Só o símbolo do logo. Fica sólido ao rolar e claro sobre o hero escuro (data-hero-escuro).
export function Header() {
  const [solido, setSolido] = useState(false);
  const whats = linkWhatsapp();

  useEffect(() => {
    const aoRolar = () => setSolido(window.scrollY > 60);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header className={`cab${solido ? " solido" : ""}`}>
      <div className="wrap">
        <a className="marca" href="#" aria-label={header.logoAlt}>
          <Image className="escuro" src="/img/logo/simbolo-verde.svg" alt="" width={1324} height={452} priority />
          <Image className="claro" src="/img/logo/simbolo-areia.svg" alt="" width={1324} height={452} priority />
        </a>
        <nav aria-label="Seções">
          <ul>
            {header.menu.map((m) => (
              <li key={m.ancora}>
                <a href={`#${m.ancora}`}>{m.rotulo}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="acoes">
          <a
            className="bt bt-linha so-desk"
            href={whats || `#${cadastro.id}`}
            {...(whats && { target: "_blank", rel: "noopener" })}
          >
            {header.botaoWhatsapp}
          </a>
          <a className="bt bt-verde" href={`#${cadastro.id}`}>
            {header.botao}
          </a>
        </div>
      </div>
    </header>
  );
}
