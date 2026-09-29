// Prerender : génère un HTML statique par route à partir du build SSR,
// puis le sitemap. Remplace react-snap (Chrome indisponible sur Vercel).
// Toute erreur fait échouer le build : on ne déploie jamais sans HTML pré-rendu.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const DOMAIN = "https://www.lamaisondelor.shop";

const { render, productRoutes } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const routes = [
  "/",
  "/produits",
  "/actualites",
  "/contact",
  "/kit-envoi",
  "/mentions-legales",
  ...productRoutes.map((p) => `/${p.slug}`)
];

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

const escAttr = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escJson = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

// Balises SEO de l'index.html remplacées par celles de chaque page.
const SEO_TAG =
  /\s*<(title>[^<]*<\/title|meta name="(description|robots)"[^>]*|link rel="canonical"[^>]*|meta property="og:[^"]*"[^>]*|meta name="twitter:[^"]*"[^>]*)>/g;

function buildHead(head) {
  if (!head.title) throw new Error("Aucune balise <Seo> rendue");
  const tags = [
    `<title>${escAttr(head.title)}</title>`,
    `<meta name="description" content="${escAttr(head.description)}" />`,
    `<meta name="robots" content="${head.noindex ? "noindex, follow" : "index, follow"}" />`,
    ...(head.noindex ? [] : [`<link rel="canonical" href="${head.canonicalUrl}" />`]),
    `<meta property="og:title" content="${escAttr(head.title)}" />`,
    `<meta property="og:description" content="${escAttr(head.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${head.canonicalUrl}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escAttr(head.title)}" />`,
    `<meta name="twitter:description" content="${escAttr(head.description)}" />`,
    ...(head.schema || []).map(
      (item) => `<script type="application/ld+json" data-seo-ssr>${escJson(item)}</script>`
    )
  ];
  return tags.map((t) => `    ${t}`).join("\n");
}

async function renderPage(url, outFile) {
  const { html, head } = await render(url);
  const page = template
    .replace(SEO_TAG, "")
    .replace("</head>", `${buildHead(head)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, page);
}

for (const url of routes) {
  const outFile =
    url === "/" ? path.join(distDir, "index.html") : path.join(distDir, url.slice(1), "index.html");
  await renderPage(url, outFile);
  console.log(`prerender ${url}`);
}

// Page 404 servie par Vercel (statut 404) pour toute URL inconnue.
await renderPage("/404", path.join(distDir, "404.html"));
console.log("prerender /404");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((url) => `  <url><loc>${DOMAIN}${url === "/" ? "/" : url}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
console.log(`sitemap.xml (${routes.length} URL)`);

fs.rmSync(ssrDir, { recursive: true, force: true });
