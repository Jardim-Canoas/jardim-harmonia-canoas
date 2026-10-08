import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { seo, empreendimento, faq, grupo, rodape, redes } from "@/dados";
import "./globals.css";
import "./lp.css";

// Escolhida no protótipo: geométrica, estreita para títulos grandes e com bons acentos.
const fonte = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...(seo.url && { metadataBase: new URL(seo.url), alternates: { canonical: "/" } }),
  title: seo.titulo,
  description: seo.descricao,
  keywords: seo.palavrasChave,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: empreendimento.nome,
    title: seo.titulo,
    description: seo.descricao,
    images: [{ url: seo.ogImagem, width: 1200, height: 630, alt: seo.ogAlt }],
  },
  twitter: { card: "summary_large_image", title: seo.titulo, description: seo.descricao, images: [seo.ogImagem] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Dados estruturados: FAQ pode virar resultado expandido no Google.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: grupo.logoNovaHarmonia.alt,
      legalName: rodape.empresa,
      url: rodape.site.url,
      sameAs: redes.map((r) => r.url).filter(Boolean),
    },
    {
      "@type": "Place",
      name: empreendimento.nome,
      description: seo.descricao,
      address: { "@type": "PostalAddress", addressLocality: "Canoas", addressRegion: "RS", addressCountry: "BR" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.itens.map((i) => ({
        "@type": "Question",
        name: i.pergunta,
        acceptedAnswer: { "@type": "Answer", text: i.resposta },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fonte.variable} h-full`}>
      <body className="min-h-full font-sans">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
