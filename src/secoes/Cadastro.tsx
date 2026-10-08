import Image from "next/image";
import { cadastro } from "@/dados";
import { LeadForm } from "./LeadForm";
import { Conversar } from "./Conversar";
import { pad } from "./util";

export function Cadastro() {
  return (
    <section id={cadastro.id} className="cad">
      <div className="wrap cad-g">
        <div className="cad-txt">
          <p className="rot">{cadastro.rotulo}</p>
          <h2 className="titulo">
            {cadastro.titulo.antes}
            <strong>{cadastro.titulo.destaque}</strong>
          </h2>
          <ol className="cad-passos">
            {cadastro.passos.map((p, i) => (
              <li key={p.titulo}>
                <span>{pad(i + 1)}</span>
                <div>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="cad-card">
          <div className="cad-topo">
            <Image src="/img/logo/simbolo-verde.svg" alt="" width={1324} height={452} />
            <div>
              <strong>{cadastro.cartaoTitulo}</strong>
              <span>{cadastro.cartaoTexto}</span>
            </div>
          </div>
          <div className="cad-corpo">
            <LeadForm />
            <Conversar />
          </div>
        </div>
      </div>
    </section>
  );
}
