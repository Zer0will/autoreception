import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function Sitemap(): MetadataRoute.Sitemap {
  return ["/", "/demo", "/privacy", "/terms"].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
