type Props = {
  rotulo: string;
  className?: string;
};

// Bloco provisório no lugar de imagem que o cliente ainda não mandou.
export function Placeholder({ rotulo, className = "" }: Props) {
  return (
    <div
      role="img"
      aria-label={`Espaço reservado: ${rotulo}`}
      className={`grid place-items-center rounded-2xl border-2 border-dashed border-verde/30 bg-areia/40 text-sm font-medium uppercase tracking-widest text-verde/70 ${className}`}
    >
      {rotulo}
    </div>
  );
}
