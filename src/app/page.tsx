import { ctaFinal, cadastro, fotoBairro, imagens } from "@/dados";
import { Header } from "@/secoes/Header";
import { HeroMosaico } from "@/secoes/HeroMosaico";
import { Fitas } from "@/secoes/Fitas";
import { Sobre } from "@/secoes/Sobre";
import { FotoImersiva } from "@/secoes/FotoImersiva";
import { Infraestrutura } from "@/secoes/Infraestrutura";
import { InfraCompleta } from "@/secoes/InfraCompleta";
import { Cadastro } from "@/secoes/Cadastro";
import { LazerHistoria } from "@/secoes/LazerHistoria";
import { GaleriaLeque } from "@/secoes/GaleriaLeque";
import { MapaBairro } from "@/secoes/MapaBairro";
import { Grupo } from "@/secoes/Grupo";
import { Outros } from "@/secoes/Outros";
import { Faq } from "@/secoes/Faq";
import { Legal } from "@/secoes/Legal";
import { Rodape } from "@/secoes/Rodape";
import { BarraMovel } from "@/secoes/BarraMovel";

// Ordem aprovada no protótipo: o cadastro vem logo depois da infraestrutura,
// antes do lazer (que é longo), para o formulário não ficar no fim da página.
export default function Home() {
  return (
    <div className="lp">
      <Header />
      <main>
        <HeroMosaico />
        <Fitas />
        <Sobre />
        <FotoImersiva
          imagem={fotoBairro.imagem}
          href={`#${cadastro.id}`}
          legenda={imagens.referencia ? `${fotoBairro.legenda} · ${imagens.selo}` : fotoBairro.legenda}
          titulo={fotoBairro.titulo}
          botao={fotoBairro.botao}
          bolha={fotoBairro.bolha}
        />
        <Infraestrutura />
        <InfraCompleta />
        <Cadastro />
        <LazerHistoria />
        <GaleriaLeque />
        <MapaBairro />
        <Grupo />
        <Outros />
        <Faq />
        <FotoImersiva
          fim
          imagem={ctaFinal.imagem}
          href={`#${cadastro.id}`}
          titulo={
            <>
              {ctaFinal.titulo.antes}
              <em>{ctaFinal.titulo.destaque}</em>
            </>
          }
          texto={ctaFinal.texto}
          botao={ctaFinal.botao}
          bolha={ctaFinal.bolha}
        />
        <Legal />
      </main>
      <Rodape />
      <BarraMovel />
    </div>
  );
}
