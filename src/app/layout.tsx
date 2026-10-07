import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { seo } from "@/dados";
import "./globals.css";

// Fonte provisória: a definitiva sai da direção visual escolhida nos protótipos.
const fonteBase = Geist({
  variable: "--font-sans-base",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: seo.titulo,
  description: seo.descricao,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fonteBase.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
