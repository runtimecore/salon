import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/special-offers",
    "/services",
    "/membership",
    "/gift-cards",
    "/about",
    "/contact",
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    // Offers turn over far faster than the rest of the site, and rank above
    // everything but the homepage.
    changeFrequency: path === "/special-offers" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/special-offers" ? 0.9 : 0.8,
  }));
}
