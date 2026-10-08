import type { MetadataRoute } from "next";
import { seo } from "@/dados";

export const dynamic = "force-static";

// Sem domínio definido em dados.ts o sitemap sai vazio.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!seo.url) return [];
  return [{ url: `${seo.url}/`, changeFrequency: "weekly", priority: 1 }];
}
