import { Link } from "react-router-dom";
import Seo from "./Seo";
import { siteConfig } from "../data/site";

function ServicePage({
  seoTitle,
  seoDescription,
  path,
  eyebrow,
  heading,
  intro,
  highlights,
  whyTitle,
  whyItems,
  steps,
  faq,
  schema
}) {
  return (
    <>
      <Seo title={seoTitle} description={seoDescription} path={path} schema={schema} />

      <section className="service-hero">
        <div className="hero-ambient" aria-hidden="true" />
        <div className="container service-hero-grid">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{heading}</h1>
            <p className="lead-text">{intro}</p>
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
              {highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{whyTitle}</h2>
          <div className="grid-3">
            {whyItems.map((item) => (
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
          <h2>Comment se passe le rachat</h2>
          <ol className="steps-list">
            {steps.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Questions frequentes</h2>
          <div className="faq-grid">
            {faq.map((item) => (
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
            <p className="eyebrow">Rachat local</p>
            <h2>
              {siteConfig.name} accompagne les particuliers a {siteConfig.city} et en {siteConfig.region}
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

export default ServicePage;
