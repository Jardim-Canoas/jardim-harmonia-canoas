import Image from "next/image";
import { rodape, header, cadastro, PREENCHER } from "@/dados";

export function Rodape() {
  return (
    <footer className="bg-verde-escuro text-areia">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Image
          src="/img/logo/logo-areia.svg"
          alt={header.logoAlt}
          width={1652}
          height={1475}
          className="h-16 w-auto"
        />
        <div className="text-sm text-areia/80 md:text-right">
          <p>
            © {rodape.empresa} · CNPJ {rodape.cnpj || PREENCHER}. {rodape.direitos}
          </p>
          <a href={cadastro.politicaUrl} target="_blank" rel="noopener" className="underline">
            {rodape.linkPolitica}
          </a>
        </div>
      </div>
    </footer>
  );
}
