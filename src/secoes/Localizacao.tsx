import { localizacao, PREENCHER } from "@/dados";
import { Placeholder } from "./Placeholder";

export function Localizacao() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] font-semibold text-verde-escuro">
          {localizacao.titulo}
        </h2>
        <p className="mt-4 text-lg text-tinta-suave">{localizacao.endereco || `${PREENCHER} endereço`}</p>
        <Placeholder rotulo={localizacao.imagem} className="mt-10 aspect-video" />
      </div>
    </section>
  );
}
