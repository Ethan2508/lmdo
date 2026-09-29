// Source de la visite (Google Ads, utm, référent), jointe aux formulaires.
// La classification est faite côté serveur (api/_leadSource.js).

const STORAGE_KEY = "lead_source";
const CLICK_IDS = ["gclid", "gbraid", "wbraid"];
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term"];

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function externalReferrer() {
  try {
    const ref = document.referrer;
    return ref && new URL(ref).host !== window.location.host ? ref : "";
  } catch {
    return "";
  }
}

// Appelé à chaque chargement de page. Une visite taguée (gclid/gbraid/wbraid
// ou utm) écrase la source stockée ; sinon on garde la première visite.
export function captureLeadSource() {
  const params = new URLSearchParams(window.location.search);
  const tagged = [...CLICK_IDS, ...UTM_PARAMS].some((key) => params.get(key));
  if (!tagged && readStored()) return;

  const source = {};
  [...CLICK_IDS, ...UTM_PARAMS].forEach((key) => {
    const value = params.get(key);
    if (value) source[key] = value;
  });
  const referrer = externalReferrer();
  if (referrer) source.referrer = referrer;
  source.landing_page = window.location.pathname;
  source.timestamp = new Date().toISOString();

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(source));
  } catch {
    // Stockage bloqué : le formulaire fonctionne sans source.
  }
}

export function getLeadSource() {
  return readStored() || undefined;
}

// Conversion GTM : uniquement après un envoi réussi, sans donnée personnelle.
export function trackFormSuccess(sourceLabel) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "form_submit_success", lead_source: sourceLabel });
}
