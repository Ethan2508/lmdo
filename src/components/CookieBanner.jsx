import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OPEN_SETTINGS_EVENT, readConsent, saveConsent } from "../lib/consent";

function CookieBanner() {
  // Ouvert après le montage seulement : le bandeau n'est pas dans le HTML pré-rendu.
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);

    // Lien « Gestion des cookies » du pied de page.
    function openSettings() {
      const current = readConsent();
      setAnalytics(Boolean(current?.analytics));
      setAds(Boolean(current?.ads));
      setDetails(true);
      setOpen(true);
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  if (!open) return null;

  function choose(choice) {
    saveConsent(choice);
    setOpen(false);
    setDetails(false);
  }

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title">
      <p id="cookie-banner-title" className="cookie-banner-title">Vos choix en matière de cookies</p>
      <p className="cookie-banner-text">
        Avec votre accord, nous utilisons des cookies pour mesurer l'audience du site (Google Analytics)
        et savoir quelles annonces vous ont amené jusqu'à nous (Google Ads). Votre choix est conservé
        6 mois et modifiable à tout moment via « Gestion des cookies » en bas de page.{" "}
        <Link to="/mentions-legales#cookies">En savoir plus</Link>
      </p>

      {details && (
        <div className="cookie-banner-options">
          <label>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <span>
              <strong>Mesure d'audience</strong>
              Google Analytics : pages consultées et demandes envoyées.
            </span>
          </label>
          <label>
            <input type="checkbox" checked={ads} onChange={(e) => setAds(e.target.checked)} />
            <span>
              <strong>Publicité</strong>
              Google Ads : mesurer quelles annonces amènent des demandes.
            </span>
          </label>
        </div>
      )}

      {/* Refuser doit être aussi simple et visible qu'accepter (CNIL) : même style. */}
      <div className="cookie-banner-actions">
        <button type="button" className="btn btn-gold" onClick={() => choose({ analytics: false, ads: false })}>
          Tout refuser
        </button>
        <button type="button" className="btn btn-gold" onClick={() => choose({ analytics: true, ads: true })}>
          Tout accepter
        </button>
        {details ? (
          <button type="button" className="btn btn-line" onClick={() => choose({ analytics, ads })}>
            Enregistrer mes choix
          </button>
        ) : (
          <button type="button" className="btn btn-line" onClick={() => setDetails(true)}>
            Personnaliser
          </button>
        )}
      </div>
    </div>
  );
}

export default CookieBanner;
