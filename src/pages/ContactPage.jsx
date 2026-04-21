import { useState } from "react";
import Seo from "../components/Seo";
import { siteConfig } from "../data/site";

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Seo
        title="Contact et estimation gratuite"
        description="Contactez La Maison de l'Or pour une estimation gratuite de votre or, montre, bijoux ou monnaie."
        path="/contact"
      />

      <section className="section contact-section">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Demandez une estimation gratuite</h1>
            <p className="lead-text">
              Decrivez vos objets et notre equipe vous recontacte rapidement pour fixer une
              estimation en boutique.
            </p>

            <ul className="contact-list">
              <li>
                Telephone: <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </li>
              <li>
                Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>Adresse: {siteConfig.address}</li>
              <li>Zone: Paris et Ile-de-France</li>
            </ul>
          </div>

          <form
            className="contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label htmlFor="fullname">Nom complet</label>
            <input id="fullname" name="fullname" required placeholder="Votre nom" />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="Votre email" />

            <label htmlFor="assetType">Type de bien</label>
            <select id="assetType" name="assetType" required defaultValue="">
              <option value="" disabled>
                Selectionnez une categorie
              </option>
              <option value="or">Or</option>
              <option value="piece-or">Piece or</option>
              <option value="piece-argent">Piece argent</option>
              <option value="montres">Montres</option>
              <option value="menagere">Menagere</option>
              <option value="sacs-luxe">Sacs de luxe</option>
              <option value="foulards-luxe">Foulards de luxe</option>
              <option value="autre">Autre</option>
            </select>

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              placeholder="Exemple: 2 bagues or 18k, 1 montre Rolex, 5 pieces Napoleon"
            />

            <button className="btn btn-gold" type="submit">
              Envoyer ma demande
            </button>

            {sent && (
              <p className="success-message">
                Merci. Votre demande est bien enregistree, nous revenons vers vous rapidement.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
