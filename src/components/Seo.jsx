import { createContext, useContext, useEffect } from "react";
import { siteConfig } from "../data/site";

// Rempli pendant le prerender (src/entry-server.jsx) pour écrire le <head> statique.
export const HeadContext = createContext(null);

function ensureMeta(selector, attrs) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function Seo({ title, description, path = "/", schema = [], noindex = false }) {
  const head = useContext(HeadContext);
  const fullTitle = `${title} | ${siteConfig.name}`;
  const canonicalUrl = `${siteConfig.domain}${path}`;

  if (head) {
    Object.assign(head, { title: fullTitle, description, canonicalUrl, schema, noindex });
  }

  useEffect(() => {
    document.title = fullTitle;

    ensureMeta('meta[name="description"]', {
      name: "description",
      content: description
    });

    ensureMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex, follow" : "index, follow"
    });

    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle
    });

    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description
    });

    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website"
    });

    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl
    });

    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image"
    });

    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle
    });

    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Le JSON-LD pré-rendu est remplacé par celui de la page courante.
    document.head
      .querySelectorAll("script[data-seo-ssr]")
      .forEach((script) => script.remove());

    const injectedScripts = schema.map((item) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      injectedScripts.forEach((script) => script.remove());
    };
  }, [fullTitle, description, canonicalUrl, schema, noindex]);

  return null;
}

export default Seo;
