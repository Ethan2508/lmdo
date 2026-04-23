import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { siteConfig } from "../data/site";
import { productRoutes } from "../data/products";
import { productMeta } from "../data/productMeta";
import { news } from "../data/news";
import { usePrices } from "../context/PricesContext";

const STATS = [
  { value: "2021", label: "Année de création" },
  { value: "100%", label: "Estimation gratuite" },
  { value: "4", label: "Expertises reconnues" },
  { value: "Lyon", label: "Au cœur du Rhône" },
];

const TRUSTS = [
  {
    icon: "⚖️",
    title: "Cours du jour garanti",
    text: "Chaque estimation est indexée sur le cours officiel du métal au moment de l'expertise, sans commission cachée.",
  },
  {
    icon: "🔒",
    title: "Discrétion absolue",
    text: "Vos transactions restent strictement confidentielles. Nous recevons sur rendez-vous dans un cadre professionnel.",
  },
  {
    icon: "⚡",
    title: "Paiement immédiat",
    text: "Une fois l'offre acceptée, le règlement intervient sur le champ, en espèces ou par virement sécurisé.",
  },
  {
    icon: "📋",
    title: "Conformité réglementaire",
    text: "Société immatriculée au RCS de Lyon. Chaque transaction respecte les obligations légales en vigueur.",
  },
];

function HomePage() {
  const prices = usePrices();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.domain,
      telephone: "+33618753552",
      priceRange: "EUR",
      address: {
        "@type": "PostalAddress",
        streetAddress: "57 Rue Président Edouard Herriot",
        addressLocality: "Lyon",
        postalCode: "69002",
        addressCountry: "FR",
      },
      areaServed: "France",
      description: "Rachat d'or, montres de luxe, bijoux, pièces et argenterie à Lyon.",
    },
  ];

  return (
    <>
      <Seo
        title="Rachat or, pièces, montres et luxe — Lyon"
        description="La Maison de l'Or : estimation gratuite pour pièce or, pièce argent, or, montre, ménagère, sacs et foulards de luxe à Lyon."
        path="/"
        schema={schema}
      />

      {/* ── HERO ── */}
      <section className="hp-hero">
        <div className="hp-hero-bg" aria-hidden="true">
          {/* Remplacer par une vraie image : <img src="/hero.jpg" alt="" /> */}
        </div>
        <div className="hp-hero-overlay" aria-hidden="true" />
        <div className="container hp-hero-content">
          <p className="hp-eyebrow">Maison de rachat d'or &amp; de luxe — Lyon</p>
          <h1 className="hp-h1">
            Vendez vos biens précieux<br />au <em>juste prix</em>.
          </h1>
          <p className="hp-lead">
            Estimation gratuite, sans engagement, basée sur le cours du jour.
            Or, montres, pièces, argenterie et accessoires de luxe.
          </p>
          <div className="hp-hero-actions">
            <Link className="btn btn-gold btn-lg" to="/contact">
              Demander une estimation gratuite
            </Link>
            <a className="btn btn-ghost btn-lg" href={siteConfig.phoneHref}>
              {siteConfig.phone}
            </a>
          </div>

          {/* Cours en direct intégré au hero */}
          <div className="hp-hero-prices">
            <div className="hp-hero-price-item">
              <span className="hp-price-label">Or</span>
              <span className="hp-price-val">{prices.or} <small>€/g</small></span>
            </div>
            <div className="hp-price-sep" aria-hidden="true" />
            <div className="hp-hero-price-item">
              <span className="hp-price-label">Argent</span>
              <span className="hp-price-val">{prices.argent} <small>€/g</small></span>
            </div>
            <div className="hp-price-sep" aria-hidden="true" />
            <div className="hp-hero-price-item">
              <span className="hp-price-label">Platine</span>
              <span className="hp-price-val">{prices.platine} <small>€/g</small></span>
            </div>
            {prices.live && (
              <span className="hp-live-badge">
                <span className="hp-live-dot" aria-hidden="true">●</span> En direct
              </span>
            )}
          </div>
        </div>
        <div className="hp-scroll-hint" aria-hidden="true">↓</div>
      </section>

      {/* ── STATS ── */}
      <section className="hp-stats-band">
        <div className="container hp-stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="hp-stat">
              <span className="hp-stat-value">{s.value}</span>
              <span className="hp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUITS ── */}
      <section className="section hp-products-section">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <p className="eyebrow">Ce que nous rachetons</p>
              <h2>Tous vos biens de valeur expertisés</h2>
            </div>
            <Link to="/contact" className="btn btn-line">
              Prendre rendez-vous →
            </Link>
          </div>

          <div className="hp-product-grid">
            {productRoutes.map((p, i) => {
              const meta = productMeta[p.slug] ?? {};
              const price = meta.priceKey ? prices[meta.priceKey] : null;
              return (
                <Link key={p.slug} to={`/${p.slug}`} className={`hp-product-card hp-product-card--${i % 3}`}>
                  <div className="hp-product-img">
                    {meta.image
                      ? <img src={meta.image} alt={p.name} loading="lazy" />
                      : <span className="hp-product-icon" aria-hidden="true">{meta.icon ?? "✦"}</span>
                    }
                  </div>
                  <div className="hp-product-body">
                    <h3>{p.name}</h3>
                    <p>{meta.shortText}</p>
                    {price ? (
                      <div className="hp-product-price">
                        <span className="hp-price-live-dot" aria-hidden="true">●</span>
                        {price} €/g
                      </div>
                    ) : (
                      <div className="hp-product-price hp-product-price--free">Sur estimation</div>
                    )}
                    <span className="hp-product-cta">Découvrir →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONFIANCE ── */}
      <section className="hp-trust-section">
        <div className="container">
          <div className="hp-section-head hp-section-head--light">
            <div>
              <p className="eyebrow eyebrow--light">Pourquoi nous choisir</p>
              <h2 className="hp-trust-title">Une maison fondée sur la confiance</h2>
            </div>
          </div>
          <div className="hp-trust-grid">
            {TRUSTS.map((t) => (
              <div key={t.title} className="hp-trust-card">
                <div className="hp-trust-icon" aria-hidden="true">{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className="section hp-process-section">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <p className="eyebrow">Comment ça marche</p>
              <h2>3 étapes pour vendre sereinement</h2>
            </div>
          </div>
          <ol className="hp-steps">
            <li className="hp-step">
              <div className="hp-step-num">01</div>
              <div className="hp-step-body">
                <h3>Contactez-nous</h3>
                <p>Par téléphone, e-mail ou via notre formulaire. Décrivez votre bien en quelques mots — nous vous répondons rapidement.</p>
              </div>
            </li>
            <li className="hp-step">
              <div className="hp-step-num">02</div>
              <div className="hp-step-body">
                <h3>Expertise sur place</h3>
                <p>Nos experts analysent matière, état, marque et demande du marché pour établir une offre précise et argumentée.</p>
              </div>
            </li>
            <li className="hp-step">
              <div className="hp-step-num">03</div>
              <div className="hp-step-body">
                <h3>Offre &amp; paiement</h3>
                <p>Vous recevez une proposition claire, sans pression. Si vous acceptez, le règlement intervient immédiatement.</p>
              </div>
            </li>
          </ol>
          <div className="hp-process-cta">
            <Link className="btn btn-gold" to="/contact">
              Démarrer mon estimation
            </Link>
          </div>
        </div>
      </section>

      {/* ── ACTUALITÉS ── */}
      <section className="section hp-news-section">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <p className="eyebrow">Actualités</p>
              <h2>Le marché des métaux &amp; du luxe</h2>
            </div>
            <Link to="/actualites" className="btn btn-line">
              Toutes les actualités →
            </Link>
          </div>
          <div className="news-grid">
            {news.slice(0, 3).map((item) => (
              <article key={item.slug} className="news-card">
                <div className="news-card-top">
                  <span className="news-tag">{item.category}</span>
                  <span className="news-date">{item.date}</span>
                </div>
                <h3 className="news-title">{item.title}</h3>
                <p>{item.excerpt}</p>
                <Link to="/actualites" className="news-link">
                  Lire la suite →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="hp-final-cta">
        <div className="hp-final-cta-bg" aria-hidden="true" />
        <div className="container hp-final-cta-inner">
          <p className="eyebrow eyebrow--light">Prêt à vendre ?</p>
          <h2 className="hp-final-cta-title">Votre bien mérite une estimation sérieuse.</h2>
          <p className="hp-final-cta-sub">
            Contactez-nous dès aujourd'hui pour un rendez-vous à {siteConfig.city}.
            Estimation gratuite, sans engagement.
          </p>
          <div className="hp-hero-actions">
            <Link className="btn btn-gold btn-lg" to="/contact">
              Demander une estimation
            </Link>
            <a className="btn btn-ghost btn-lg" href={siteConfig.phoneHref}>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
