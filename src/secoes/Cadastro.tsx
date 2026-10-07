import { cadastro } from "@/dados";
import { LeadForm } from "./LeadForm";

export function Cadastro() {
  return (
    <section id={cadastro.id} className="scroll-mt-4 bg-verde-escuro px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-xl rounded-3xl bg-areia-clara p-6 shadow-xl sm:p-10">
        <h2 className="text-[clamp(1.5rem,2vw+1rem,2.25rem)] leading-tight font-semibold text-verde-escuro">
          {cadastro.titulo}
        </h2>
        <div className="mt-6">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
