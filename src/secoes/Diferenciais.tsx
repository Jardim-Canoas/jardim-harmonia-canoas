import { diferenciais } from "@/dados";

export function Diferenciais() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <h2 className="text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] font-semibold text-verde-escuro">
        {diferenciais.titulo}
      </h2>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {diferenciais.itens.map((d) => (
          <li key={d.titulo} className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-verde">{d.titulo}</h3>
            <p className="mt-2 text-tinta-suave">{d.texto}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
