import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { cadastro, contato, grupo, imagens, legal, redes, rodape, PREENCHER } from "@/dados";
import { Facebook, Instagram, Youtube } from "./IconesMarca";
import { VoltarTopo } from "./VoltarTopo";
import { linkWhatsapp } from "./whatsapp";

const ICONES = { Instagram, Facebook, YouTube: Youtube };

const pendente = (v: string, rotulo: string) => v || <span className="pend">{`${PREENCHER} ${rotulo}`}</span>;

export function Rodape() {
  const whats = linkWhatsapp();

  return (
    <footer className="rod">
      <Image className="rod-bg" src="/img/nova-harmonia/tracado.svg" alt="" width={1350} height={783} aria-hidden="true" />
      <div className="wrap rod-g">
        <div className="rod-marca">
          <Image className="rod-logo" src="/img/logo/logo-verde.svg" alt={rodape.logoAlt} width={1652} height={1475} />
          <p>{rodape.texto}</p>
          <div className="redes">
            {redes
              .filter((r) => r.url)
              .map((r) => {
                const Icone = ICONES[r.nome];
                return (
                  <a key={r.nome} href={r.url} target="_blank" rel="noopener" aria-label={`${r.nome} da Nova Harmonia`}>
                    <Icone />
                  </a>
                );
              })}
            <a href={whats || `#${cadastro.id}`} aria-label={contato.rotuloWhatsapp} {...(whats && { target: "_blank", rel: "noopener" })}>
              <MessageCircle aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav className="rod-col" aria-label="Seções do site">
          <h3>{rodape.colunaBairro}</h3>
          <ul>
            {rodape.links.map((l) => (
              <li key={l.ancora}>
                <a href={`#${l.ancora}`}>{l.rotulo}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rod-col">
          <h3>{rodape.colunaAtendimento}</h3>
          <ul>
            <li>
              <small>{rodape.rotulos.whatsapp}</small>
              {pendente(contato.telefoneExibicao, "telefone")}
            </li>
            <li>
              <small>{rodape.rotulos.email}</small>
              {contato.email ? <a href={`mailto:${contato.email}`}>{contato.email}</a> : pendente("", "e-mail")}
            </li>
            <li>
              <small>{rodape.rotulos.stand}</small>
              {pendente(contato.stand, "endereço")}
            </li>
          </ul>
          <a className="bt bt-verde" href={`#${cadastro.id}`}>
            {rodape.botao}
          </a>
        </div>

        <div className="rod-col">
          <h3>{rodape.colunaRealizacao}</h3>
          <div className="rod-real">
            <Image src={grupo.logoNovaHarmonia.src} alt={grupo.logoNovaHarmonia.alt} width={grupo.logoNovaHarmonia.largura} height={grupo.logoNovaHarmonia.altura} />
            <Image src={grupo.logoGrupo.src} alt={grupo.logoGrupo.alt} width={grupo.logoGrupo.largura} height={grupo.logoGrupo.altura} />
            <a href={rodape.site.url} target="_blank" rel="noopener">
              {rodape.site.rotulo} ↗
            </a>
          </div>
        </div>
      </div>

      <div className="wrap rod-base">
        <p>
          © {rodape.empresa} · CNPJ {pendente(rodape.cnpj, "")} · {imagens.aviso}
        </p>
        <nav aria-label="Links legais">
          <a href={cadastro.politicaUrl} target="_blank" rel="noopener">
            {rodape.linkPolitica}
          </a>
          <a href={`#${legal.id}`}>{rodape.linkMemorial}</a>
          <VoltarTopo />
        </nav>
      </div>
    </footer>
  );
}
