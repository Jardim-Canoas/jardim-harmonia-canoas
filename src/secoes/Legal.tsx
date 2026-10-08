import { legal } from "@/dados";

export function Legal() {
  return (
    <section id={legal.id} className="wrap legal">
      <details>
        <summary>{legal.titulo}</summary>
        <div>
          <p>{legal.registro || <span className="pend">{legal.registroPendente}</span>}</p>
          {legal.paragrafos.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </details>
    </section>
  );
}
