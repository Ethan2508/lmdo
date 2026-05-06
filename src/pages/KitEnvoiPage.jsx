import { useState } from "react";
import Seo from "../components/Seo";
import { siteConfig } from "../data/site";

const STEPS = [
  {
    num: "1",
    title: "Remplissez le formulaire",
    text: "Effectuez votre demande en ligne en remplissant le formulaire ci-dessous. Le kit vous sera envoyé par La Poste dans les 48h.",
  },
  {
    num: "2",
    title: "Préparation du kit",
    text: "Une fois bien réceptionné, déposez vos objets en or et en argent dans l'enveloppe dédiée en suivant les instructions. N'oubliez pas d'envoyer également une photocopie de pièce d'identité et un justificatif de domicile.",
  },
  {
    num: "3",
    title: "L'envoi",
    text: "Il vous faut vous rendre dans un bureau de poste. Vos objets seront assurés à hauteur de 5 000 € et l'acheminement est sécurisé. Les coûts d'envois vous seront remboursés.",
  },
  {
    num: "4",
    title: "Nous expertisons",
    text: "À réception de vos biens, un spécialiste se chargera de l'expertise et de l'estimation de vos bijoux.",
  },
  {
    num: "5",
    title: "Règlement",
    text: "Une fois l'évaluation faite de vos biens, notre équipe vous recontacte et vous propose un prix de rachat. Enfin, si acceptation nous procédons au paiement sous 24h. En cas de refus, vos objets vous seront renvoyés (à vos frais).",
  },
];

export default function KitEnvoiPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Seo
        title="Kit d'envoi sécurisé — Vendez vos bijoux par correspondance"
        description="Vous ne pouvez pas vous déplacer ? Recevez notre kit d'envoi sécurisé La Poste et vendez vos bijoux en or par correspondance, assuré jusqu'à 5 000 €."
        path="/kit-envoi"
      />

      {/* Hero */}
      <section className="section kit-hero">
        <div className="container kit-hero-inner">
          <p className="eyebrow">Vous ne pouvez pas vous déplacer&nbsp;?</p>
          <h1>Votre kit d'envoi sécurisé</h1>
          <p className="lead-text">
            L'envoi en Valeur Déclarée est un envoi sécurisé assuré à hauteur de&nbsp;5&nbsp;000&nbsp;€
            avec suivi de parcours, transporté en coffres jusqu'au destinataire.
          </p>
          <div className="kit-laposte">
            <img
              src="https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/La_Poste_logo_2022.svg/640px-La_Poste_logo_2022.svg.png"
              alt="La Poste"
              className="kit-laposte-logo"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="section kit-benefits">
        <div className="container kit-benefits-grid">
          <div className="kit-benefit-card">
            <div className="kit-benefit-icon">💸</div>
            <h3>Paiement sous 24h</h3>
            <p>Une fois l'offre validée nous vous envoyons le paiement sous 24h maximum (hors week-end et jour férié).</p>
          </div>
          <div className="kit-benefit-card">
            <div className="kit-benefit-icon">🔒</div>
            <h3>Envoi assuré</h3>
            <p>Vos objets sont assurés jusqu'à 5&nbsp;000&nbsp;€ pendant tout le transport, avec suivi de parcours.</p>
          </div>
          <div className="kit-benefit-card">
            <div className="kit-benefit-icon">🏅</div>
            <h3>Prix de l'envoi</h3>
            <p>L'envoi est pris en charge si l'achat est validé par notre équipe. Dans le cas contraire, les frais sont à la charge du client.</p>
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section className="section kit-steps-section">
        <div className="container">
          <div className="kit-section-head">
            <p className="eyebrow">Comment ça marche</p>
            <h2>5 étapes simples</h2>
          </div>
          <ol className="kit-steps">
            {STEPS.map((step) => (
              <li key={step.num} className="kit-step">
                <div className="kit-step-num">{step.num}.</div>
                <div className="kit-step-body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Formulaire */}
      <section className="section kit-form-section" id="formulaire">
        <div className="container kit-form-wrap">
          <div className="kit-form-intro">
            <p className="eyebrow">Demande de kit</p>
            <h2>Recevez votre kit gratuitement</h2>
            <p>
              Remplissez ce formulaire et nous vous envoyons le kit d'envoi sécurisé à votre adresse
              dans les 48h ouvrées.
            </p>
            <ul className="kit-form-reassurance">
              <li>✔ Gratuit et sans engagement</li>
              <li>✔ Envoi assuré jusqu'à 5&nbsp;000&nbsp;€</li>
              <li>✔ Paiement sous 24h si offre acceptée</li>
            </ul>
          </div>

          {sent ? (
            <div className="kit-form-success">
              <span className="kit-success-icon">✓</span>
              <h3>Demande envoyée&nbsp;!</h3>
              <p>Nous avons bien reçu votre demande. Votre kit sera expédié dans les 48h ouvrées.</p>
            </div>
          ) : (
            <form className="kit-form contact-form" onSubmit={handleSubmit}>
              <label htmlFor="k-nom">Nom complet *</label>
              <input id="k-nom" name="nom" required placeholder="Votre nom et prénom" />

              <label htmlFor="k-email">Email *</label>
              <input id="k-email" name="email" type="email" required placeholder="votre@email.fr" />

              <label htmlFor="k-tel">Téléphone</label>
              <input id="k-tel" name="telephone" type="tel" placeholder="06 00 00 00 00" />

              <label htmlFor="k-adresse">Adresse de livraison *</label>
              <input id="k-adresse" name="adresse" required placeholder="Numéro et nom de rue" />

              <div className="kit-form-row">
                <div>
                  <label htmlFor="k-cp">Code postal *</label>
                  <input id="k-cp" name="codePostal" required placeholder="69000" />
                </div>
                <div>
                  <label htmlFor="k-ville">Ville *</label>
                  <input id="k-ville" name="ville" required placeholder="Lyon" />
                </div>
              </div>

              <label htmlFor="k-objet">Type de bijoux / objets à envoyer</label>
              <select id="k-objet" name="objetType" defaultValue="">
                <option value="" disabled>Sélectionnez une catégorie</option>
                <option value="bijoux-or">Bijoux en or</option>
                <option value="piece-or">Pièces en or</option>
                <option value="lingots">Lingots / lingotins</option>
                <option value="or-dentaire">Or dentaire</option>
                <option value="argenterie">Argenterie</option>
                <option value="montres">Montres</option>
                <option value="autre">Autre</option>
              </select>

              <label htmlFor="k-poids">Poids estimé (facultatif)</label>
              <input id="k-poids" name="poids" placeholder="Ex. : environ 30g" />

              <label htmlFor="k-message">Informations complémentaires</label>
              <textarea
                id="k-message"
                name="message"
                rows={4}
                placeholder="Décrivez brièvement vos objets…"
              />

              <button className="btn btn-gold" type="submit">
                Recevoir mon kit gratuitement →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA bas de page */}
      <section className="section kit-contact-band">
        <div className="container kit-contact-inner">
          <p>Vous préférez vous déplacer en boutique&nbsp;?</p>
          <div className="kit-contact-actions">
            <a href={siteConfig.phoneHref} className="btn btn-gold">{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`} className="btn btn-line">{siteConfig.email}</a>
          </div>
        </div>
      </section>
    </>
  );
}
