import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { siteConfig } from "../data/site";
import { usePrices } from "../context/PricesContext";
import { productMeta } from "../data/productMeta";

function ProductPage({ product }) {
  const prices = usePrices();
  const meta = productMeta[product.slug] ?? {};
  const livePrice = meta.priceKey ? prices[meta.priceKey] : null;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Rachat ${product.name}`,
      serviceType: `Rachat ${product.name}`,
      areaServed: `${siteConfig.city} et ${siteConfig.region}`,
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: product.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a
        }
      }))
    }
  ];

  return (
    <>
      <Seo
        title={product.seoTitle}
        description={product.seoDescription}
        path={`/${product.slug}`}
        schema={schema}
      />

      <section className="service-hero">
        <div className="hero-ambient" aria-hidden="true" />
        <div className="container service-hero-grid">
          <div>
            <p className="eyebrow">{product.eyebrow}</p>
            {livePrice && (
              <div className="live-price-badge">
                <span className="live-dot" aria-hidden="true">●</span>
                Cours actuel : <strong>{livePrice} €/g</strong>
              </div>
            )}
            <h1>{product.heading}</h1>
            <p className="lead-text">{product.intro}</p>
            <div className="hero-actions">
              <Link className="btn btn-gold" to="/contact">
                Demander une estimation
              </Link>
              <a className="btn btn-line" href={siteConfig.phoneHref}>
                Appeler {siteConfig.phone}
              </a>
            </div>
          </div>

          <aside className="quote-panel">
            <h2>Estimation sous 30 min</h2>
            <ul>
              {product.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Pourquoi nous choisir pour ce rachat</h2>
          <div className="grid-3">
            {product.whyItems.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-band">
        <div className="container">
          <h2>Processus en 3 etapes</h2>
          <ol className="steps-list">
            <li>
              <h3>1. Contact</h3>
              <p>Vous nous decrivez votre produit et son etat general.</p>
            </li>
            <li>
              <h3>2. Expertise</h3>
              <p>Nous procedons a l'analyse technique et marchande en boutique.</p>
            </li>
            <li>
              <h3>3. Offre</h3>
              <p>Vous recevez une proposition claire avec paiement rapide si accord.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Questions frequentes</h2>
          <div className="faq-grid">
            {product.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-strip">
        <div className="container cta-strip-inner">
          <div>
            <p className="eyebrow">Parcours premium</p>
            <h2>
              Estimation de {product.name.toLowerCase()} a {siteConfig.city} et en {siteConfig.region}
            </h2>
          </div>
          <Link className="btn btn-gold" to="/contact">
            Prendre rendez-vous
          </Link>
        </div>
      </section>
    </>
  );
}

export default ProductPage;
