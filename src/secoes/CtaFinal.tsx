import { ctaFinal, cadastro } from "@/dados";

export function CtaFinal() {
  return (
    <section className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-4xl rounded-3xl bg-verde px-6 py-14 text-center text-white sm:px-12">
        <h2 className="text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] leading-tight font-semibold">
          {ctaFinal.titulo}
        </h2>
        <p className="mt-4 text-lg text-areia">{ctaFinal.texto}</p>
        <a
          href={`#${cadastro.id}`}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-areia px-7 font-semibold text-verde-escuro transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {ctaFinal.botao}
        </a>
      </div>
    </section>
  );
}
