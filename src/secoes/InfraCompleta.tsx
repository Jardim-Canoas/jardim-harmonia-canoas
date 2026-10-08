import {
  ArrowRight,
  Bike,
  Blocks,
  Cctv,
  CloudRain,
  Droplet,
  Footprints,
  Goal,
  Lightbulb,
  PawPrint,
  Route,
  Ruler,
  TrafficCone,
  Volleyball,
  Waves,
  Zap,
} from "lucide-react";
import { cadastro, infraCompleta } from "@/dados";

const icones = {
  pavimentacao: Route,
  meiofio: Ruler,
  agua: Droplet,
  esgoto: Waves,
  sinalizacao: TrafficCone,
  drenagem: CloudRain,
  eletrica: Zap,
  iluminacao: Lightbulb,
  cameras: Cctv,
  pet: PawPrint,
  ciclofaixa: Bike,
  playground: Blocks,
  cooper: Footprints,
  areia: Volleyball,
  poliesportiva: Goal,
};

/** Morada dos Pássaros: "Infraestrutura completa", só ícone e nome de cada item. */
export function InfraCompleta() {
  return (
    <section id={infraCompleta.id} className="infra">
      <div className="wrap">
        <p className="rot">{infraCompleta.rotulo}</p>
        <h2 className="titulo">
          {infraCompleta.titulo.antes}
          <strong>{infraCompleta.titulo.destaque}</strong>
        </h2>
        <ul>
          {infraCompleta.itens.map((item) => {
            const Icone = icones[item.icone];
            return (
              <li key={item.titulo}>
                <Icone aria-hidden="true" strokeWidth={1.6} />
                <span>{item.titulo}</span>
              </li>
            );
          })}
        </ul>
        <a className="bt bt-verde" href={`#${cadastro.id}`}>
          {infraCompleta.botao} <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
