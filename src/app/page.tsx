import { Header } from "@/secoes/Header";
import { Hero } from "@/secoes/Hero";
import { Sobre } from "@/secoes/Sobre";
import { Cadastro } from "@/secoes/Cadastro";
import { Diferenciais } from "@/secoes/Diferenciais";
import { Galeria } from "@/secoes/Galeria";
import { Localizacao } from "@/secoes/Localizacao";
import { CtaFinal } from "@/secoes/CtaFinal";
import { Rodape } from "@/secoes/Rodape";

// Esqueleto estrutural: o visual final vem da direção escolhida nos protótipos.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Cadastro />
        <Diferenciais />
        <Galeria />
        <Localizacao />
        <CtaFinal />
      </main>
      <Rodape />
    </>
  );
}
