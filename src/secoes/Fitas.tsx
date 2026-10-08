import { fitas } from "@/dados";

// Repetido 4x para a faixa nunca acabar enquanto corre metade da largura.
const repetir = (lista: readonly string[]) => [...lista, ...lista, ...lista, ...lista];

export function Fitas() {
  return (
    <div className="fitas" aria-hidden="true">
      <div className="fita fita-amarela">
        <div>
          {repetir(fitas.amarela).map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
      <div className="fita fita-verde">
        <div>
          {repetir(fitas.verde).map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
