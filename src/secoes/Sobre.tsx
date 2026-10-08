import { sobre } from "@/dados";

export function Sobre() {
  return (
    <section id={sobre.id} className="wrap cap">
      <p className="rot">{sobre.rotulo}</p>
      <div>
        <h2 className="grande">
          {sobre.destaque.map((parte, i) => (typeof parte === "string" ? parte : <strong key={i}>{parte.forte}</strong>))}
        </h2>
        <p className="apoio">{sobre.apoio}</p>
      </div>
    </section>
  );
}
