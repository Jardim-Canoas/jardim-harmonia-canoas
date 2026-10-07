import Image from "next/image";
import { hero, cadastro } from "@/dados";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92dvh] items-end overflow-hidden bg-verde-escuro text-white">
      {/* Foto de banco provisória: ambiente, não representa o empreendimento */}
      <Image
        src="/img/banners/hero-arvores.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-60"
      />
      <div className="mx-auto w-full max-w-6xl px-4 pt-32 pb-16 sm:px-6 sm:pb-24">
        <h1 className="max-w-3xl text-[clamp(2.25rem,5vw+1rem,4rem)] leading-[1.05] font-semibold">
          {hero.titulo}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-areia sm:text-xl">{hero.subtitulo}</p>
        <a
          href={`#${cadastro.id}`}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-areia px-7 font-semibold text-verde-escuro transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-areia"
        >
          {cadastro.botao}
        </a>
      </div>
    </section>
  );
}
