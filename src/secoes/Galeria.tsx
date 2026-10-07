import { galeria } from "@/dados";
import { Placeholder } from "./Placeholder";

export function Galeria() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-28">
      <h2 className="text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] font-semibold text-verde-escuro">
        {galeria.titulo}
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {galeria.imagens.map((rotulo) => (
          <Placeholder key={rotulo} rotulo={rotulo} className="aspect-4/3" />
        ))}
      </div>
    </section>
  );
}
