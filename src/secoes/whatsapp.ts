import { contato } from "@/dados";

// Vazio enquanto o número do comercial não for preenchido em dados.ts.
export function linkWhatsapp() {
  if (!contato.whatsapp) return "";
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(contato.mensagemWhatsapp)}`;
}
