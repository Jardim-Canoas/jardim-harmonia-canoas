import { sobre, cadastro } from "@/dados";
import { Placeholder } from "./Placeholder";

export function Sobre() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
      <div>
        <h2 className="text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] leading-tight font-semibold text-verde-escuro">
          {sobre.titulo.antes}
          <strong className="text-verde">{sobre.titulo.destaque}</strong>
          {sobre.titulo.depois}
        </h2>
        <div className="mt-6 max-w-[62ch] space-y-4 text-lg leading-relaxed text-tinta-suave">
          {sobre.paragrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <a
          href={`#${cadastro.id}`}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-verde px-7 font-semibold text-white transition-colors duration-200 hover:bg-verde-escuro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde"
        >
          {sobre.cta}
        </a>
      </div>
      <Placeholder rotulo={sobre.imagem} className="aspect-4/5" />
    </section>
  );
}
