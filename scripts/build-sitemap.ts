import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { enumerateRoutes } from "../src/lib/routes";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = "https://hotkeylookup.com";

let lastmod;
try {
  lastmod = execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
} catch {
  lastmod = new Date().toISOString();
}

const routes = enumerateRoutes();

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map(
      (r) =>
        `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
        (r.changefreq ? `    <changefreq>${r.changefreq}</changefreq>\n` : "") +
        (r.priority != null ? `    <priority>${r.priority.toFixed(1)}</priority>\n` : "") +
        `  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

const out = resolve(__dirname, "../dist/sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log(`Wrote ${out} (${routes.length} URLs)`);
