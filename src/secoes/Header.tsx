import Image from "next/image";
import { cadastro, header } from "@/dados";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Image
          src="/img/logo/logo-areia.svg"
          alt={header.logoAlt}
          width={1652}
          height={1475}
          priority
          className="h-14 w-auto sm:h-16"
        />
        <a
          href={`#${cadastro.id}`}
          className="inline-flex min-h-11 items-center rounded-full bg-areia px-5 text-sm font-semibold text-verde-escuro transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-areia"
        >
          {header.botao}
        </a>
      </div>
    </header>
  );
}
