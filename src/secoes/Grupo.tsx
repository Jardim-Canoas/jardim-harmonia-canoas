import Image from "next/image";
import { grupo } from "@/dados";
import { Contador } from "./Contador";

export function Grupo() {
  const setores = grupo.setores.map((s, k) => (
    <div key={k} className={`setor${s.imagem ? " foto" : ""}`}>
      {s.imagem ? (
        <>
          <Image src={s.imagem} alt={s.alt ?? ""} width={600} height={440} sizes="300px" />
          <em>{s.nome}</em>
        </>
      ) : (
        <strong>{s.nome}</strong>
      )}
    </div>
  ));

  return (
    <section className="grupo">
      <Image className="tracado" src="/img/nova-harmonia/tracado.svg" alt="" width={1350} height={783} aria-hidden="true" />
      <div className="wrap grupo-g">
        <div>
          <div className="logos">
            <Image src={grupo.logoNovaHarmonia.src} alt={grupo.logoNovaHarmonia.alt} width={grupo.logoNovaHarmonia.largura} height={grupo.logoNovaHarmonia.altura} />
            <span aria-hidden="true" />
            <Image src={grupo.logoGrupo.src} alt={grupo.logoGrupo.alt} width={grupo.logoGrupo.largura} height={grupo.logoGrupo.altura} />
          </div>
          <p className="rot">{grupo.rotulo}</p>
          <h2 className="titulo">
            {grupo.titulo.antes}
            <strong>{grupo.titulo.destaque}</strong>
          </h2>
        </div>
        <div className="grupo-txt">
          {grupo.paragrafos.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <dl className="numeros">
            {grupo.numeros.map((n) => (
              <div key={n.nome}>
                <dd>
                  <Contador valor={n.valor} />
                  <small>{grupo.unidade}</small>
                </dd>
                <dt>
                  {n.nome}
                  <span>{n.cidade}</span>
                </dt>
              </div>
            ))}
          </dl>
          <p className="fonte">{grupo.fonte}</p>
        </div>
      </div>
      {/* Faixa duplicada para correr sem emenda. A cópia fica escondida do leitor de tela. */}
      <div className="setores" aria-label="Setores do Grupo SFA">
        <div>
          {setores}
          <div style={{ display: "contents" }} aria-hidden="true">
            {setores}
          </div>
        </div>
      </div>
    </section>
  );
}
