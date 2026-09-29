// Source d'une demande de formulaire (lead_source envoyé par le client).
// Le préfixe "_" empêche Vercel d'en faire une fonction serverless.

export const LEAD_SOURCE_FIELDS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "referrer",
  "landing_page",
  "timestamp",
];

const MAX_LENGTH = 300;
const PAID_MEDIUMS = ["cpc", "ppc", "paid"];
// Testés avant les moteurs : gemini.google.com contient "google".
const AI_HOSTS = ["chatgpt.com", "openai.com", "perplexity.ai", "gemini.google.com", "copilot.microsoft.com", "claude.ai"];
const SEARCH_ENGINES = ["google", "bing", "yahoo", "duckduckgo", "ecosia"];

// Ne garde que les champs connus, en chaînes, tronqués. Ne lève jamais d'erreur.
export function sanitizeLeadSource(raw) {
  const clean = {};
  if (!raw || typeof raw !== "object") return clean;
  for (const key of LEAD_SOURCE_FIELDS) {
    const value = raw[key];
    if (typeof value === "string" && value.trim() !== "") {
      clean[key] = value.trim().slice(0, MAX_LENGTH);
    }
  }
  return clean;
}

function hostnameOf(url) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

const matchesHost = (host, domain) => host === domain || host.endsWith(`.${domain}`);

export function classifyLeadSource(source = {}) {
  if (source.gclid || source.gbraid || source.wbraid) return "Google Ads";

  const utmSource = source.utm_source || "non précisé";
  const medium = (source.utm_medium || "").toLowerCase();
  if (PAID_MEDIUMS.includes(medium)) return `Payant (${utmSource})`;
  if (source.utm_source || source.utm_medium || source.utm_campaign || source.utm_term) {
    return `Campagne (${utmSource} / ${source.utm_medium || "non précisé"})`;
  }

  if (source.referrer) {
    const host = hostnameOf(source.referrer);
    if (AI_HOSTS.some((domain) => matchesHost(host, domain))) return "Assistant IA";
    if (SEARCH_ENGINES.some((name) => host.split(".").includes(name))) {
      return "Référencement naturel";
    }
    return `Site référent (${host || "inconnu"})`;
  }

  return "Direct / inconnu";
}
