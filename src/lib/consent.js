// Consentement cookies (mode Consentement Google v2).
// Tout est refusé par défaut dans index.html, qui réapplique aussi le choix
// enregistré avant le chargement de GTM et GA4 : garder les deux synchronisés.

const STORAGE_KEY = "cookie_consent";
const MAX_AGE_MS = 182 * 24 * 60 * 60 * 1000; // ~6 mois, durée recommandée par la CNIL
export const OPEN_SETTINGS_EVENT = "open-cookie-settings";

// Même fonction que le snippet gtag : les commandes doivent être des objets arguments.
function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

const toGoogleConsent = ({ analytics, ads }) => ({
  analytics_storage: analytics ? "granted" : "denied",
  ad_storage: ads ? "granted" : "denied",
  ad_user_data: ads ? "granted" : "denied",
  ad_personalization: ads ? "granted" : "denied",
});

// Retrait du consentement : supprime les cookies Google déjà déposés.
function removeCookies(prefixes) {
  const domains = ["", window.location.hostname, `.${window.location.hostname.replace(/^www\./, "")}`];
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!prefixes.some((prefix) => name.startsWith(prefix))) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
    });
  });
}

export function readConsent() {
  try {
    const choice = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return choice && Date.now() - choice.date < MAX_AGE_MS ? choice : null;
  } catch {
    return null;
  }
}

export function saveConsent({ analytics, ads }) {
  const choice = { analytics, ads, date: Date.now() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // Stockage bloqué : le choix s'applique à la visite en cours seulement.
  }
  gtag("consent", "update", toGoogleConsent(choice));
  if (!analytics) removeCookies(["_ga"]);
  if (!ads) removeCookies(["_gcl"]);
  return choice;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
