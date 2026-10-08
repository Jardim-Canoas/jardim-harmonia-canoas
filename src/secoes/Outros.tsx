import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { outros } from "@/dados";

export function Outros() {
  return (
    <section className="outros">
      <div className="wrap">
        <div className="topo-sec">
          <div>
            <p className="rot">{outros.rotulo}</p>
            <h2 className="titulo">
              {outros.titulo.antes}
              <strong>{outros.titulo.destaque}</strong>
            </h2>
          </div>
          <p>{outros.texto}</p>
        </div>
        <div className="outros-grade">
          {outros.itens.map((o) => (
            <a key={o.nome} className="oug" href={o.url} target="_blank" rel="noopener">
              <span className="im">
                <Image src={o.imagem} alt="" width={800} height={500} sizes="(min-width: 960px) 30vw, (min-width: 600px) 45vw, 100vw" />
                {o.provisoria && <em>{outros.provisoria}</em>}
              </span>
              <span className="info">
                <small>Harmoni · {o.cidade}</small>
                <strong>{o.nome}</strong>
                <p>{o.frase}</p>
                <span className="ir" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
