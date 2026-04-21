import Seo from "../components/Seo";
import { siteConfig, legalConfig } from "../data/site";

function MentionsLegalesPage() {
  return (
    <>
      <Seo
        title="Mentions légales"
        description="Mentions légales de La Maison de l'Or — éditeur, hébergeur et informations juridiques."
        path="/mentions-legales"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "780px" }}>
          <p className="eyebrow">Informations juridiques</p>
          <h1>Mentions légales</h1>

          <h2>Éditeur du site</h2>
          <table className="legal-table">
            <tbody>
              <tr><th>Dénomination</th><td>{legalConfig.company}</td></tr>
              <tr><th>Forme juridique</th><td>{legalConfig.legalForm}</td></tr>
              <tr><th>Capital social</th><td>{legalConfig.capital}</td></tr>
              <tr><th>Dirigeant</th><td>{legalConfig.director}</td></tr>
              <tr><th>Siège social</th><td>{legalConfig.address}</td></tr>
              <tr><th>Date de création</th><td>{legalConfig.created}</td></tr>
            </tbody>
          </table>

          <h2>Immatriculation</h2>
          <table className="legal-table">
            <tbody>
              <tr><th>SIREN</th><td>{legalConfig.siren}</td></tr>
              <tr><th>SIRET (siège)</th><td>{legalConfig.siret}</td></tr>
              <tr><th>Numéro RCS</th><td>{legalConfig.rcs}</td></tr>
              <tr><th>Inscription au RCS</th><td>Inscrit au {legalConfig.registeredAt}</td></tr>
              <tr><th>Numéro de TVA intracommunautaire</th><td>{legalConfig.tva}</td></tr>
            </tbody>
          </table>

          <h2>Contact</h2>
          <table className="legal-table">
            <tbody>
              <tr><th>Téléphone</th><td><a href={siteConfig.phoneHref}>{siteConfig.phone}</a></td></tr>
              <tr><th>Email</th><td><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></td></tr>
              <tr><th>Adresse</th><td>{siteConfig.address}</td></tr>
            </tbody>
          </table>

          <h2>Hébergement</h2>
          <p>Ce site est hébergé par un prestataire tiers. Les coordonnées de l'hébergeur sont disponibles sur demande à l'adresse e-mail ci-dessus.</p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, logos) est la propriété exclusive de{" "}
            {legalConfig.company} ou de ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les informations collectées via le formulaire de contact sont utilisées uniquement pour répondre à vos demandes et ne sont pas transmises à des tiers.
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}

export default MentionsLegalesPage;
