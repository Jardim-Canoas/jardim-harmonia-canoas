import type { MetadataRoute } from "next";
import { seo } from "@/dados";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(seo.url && { sitemap: `${seo.url}/sitemap.xml` }),
  };
}
