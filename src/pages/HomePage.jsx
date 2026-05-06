import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { siteConfig } from "../data/site";
import { productRoutes } from "../data/products";
import { productMeta } from "../data/productMeta";
import { news } from "../data/news";
import { usePrices } from "../context/PricesContext";
import GoogleReviews from "../components/GoogleReviews";

const STATS = [
  { value: "2021", label: "Année de création" },
  { value: "100%", label: "Estimation gratuite" },
  { value: "5", label: "Expertises reconnues" },
  { value: "Lyon", label: "Au cœur du Rhône" },
];

const VENTE_ITEMS = [
  {
    title: "Lingot d'or",
    text: "Lingots d'or fin certifiés LBMA, du 100 g au kilo.",
    image: "/lingot-or.png",
    metal: "or",
  },
  {
    title: "Lingotin d'or",
    text: "Petits formats accessibles — 1 g, 5 g, 10 g, 20 g, 50 g.",
    image: "/lingotin-or.png",
    metal: "or",
  },
  {
    title: "Pièce d'or",
    text: "Napoléon, Krugerrand, Maple Leaf, Souverain, 50 Pesos…",
    image: "/piece-or.png",
    metal: "or",
  },
  {
    title: "Lingot d'argent",
    text: "Lingots d'argent .999 certifiés, plusieurs grammages.",
    image: "/lingot-argent.png",
    metal: "argent",
  },
  {
    title: "Lingotin d'argent",
    text: "Petits lingotins d'argent pour démarrer une collection.",
    image: "/lingotin-argent.webp",
    metal: "argent",
  },
  {
    title: "Pièce d'argent",
    text: "Pièces d'argent boursables et de collection.",
    image: "/piece-argent.png",
    metal: "argent",
  },
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
          <p className="hp-hero-address">
            <span className="hp-hero-address-pin" aria-hidden="true">▸</span>
            {siteConfig.address}
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

      {/* ── PROMO ── */}
      <section className="hp-promo-section">
        <div className="container">
          <div className="hp-promo-header">
            <span className="hp-promo-tag">Offre exclusive</span>
            <h2 className="hp-promo-heading">
              Jusqu'à <strong>300&nbsp;€ offerts</strong> sur votre rachat d'or
            </h2>
            <p className="hp-promo-subheading">
              Plus vous apportez d'or 18 carats, plus votre bonus est important.
              Offre cumulable avec le cours du jour, valable en boutique.
            </p>
          </div>

          <div className="hp-promo-tiers">
            <div className="hp-promo-tier">
              <div className="hp-promo-tier-medal" aria-hidden="true">
                <span className="hp-promo-tier-amount">100€</span>
                <span className="hp-promo-tier-label">offerts</span>
              </div>
              <p className="hp-promo-tier-cond">
                pour une transaction d'<strong>au moins 50&nbsp;g</strong> d'or 18&nbsp;carats
              </p>
            </div>

            <div className="hp-promo-tier hp-promo-tier--featured">
              <span className="hp-promo-tier-badge">Le plus choisi</span>
              <div className="hp-promo-tier-medal" aria-hidden="true">
                <span className="hp-promo-tier-amount">200€</span>
                <span className="hp-promo-tier-label">offerts</span>
              </div>
              <p className="hp-promo-tier-cond">
                pour une transaction d'<strong>au moins 80&nbsp;g</strong> d'or 18&nbsp;carats
              </p>
            </div>

            <div className="hp-promo-tier">
              <div className="hp-promo-tier-medal" aria-hidden="true">
                <span className="hp-promo-tier-amount">300€</span>
                <span className="hp-promo-tier-label">offerts</span>
              </div>
              <p className="hp-promo-tier-cond">
                pour une transaction d'<strong>au moins 100&nbsp;g</strong> d'or 18&nbsp;carats
              </p>
            </div>
          </div>

          <div className="hp-promo-footer">
            <Link to="/contact" className="btn btn-gold">
              Prendre rendez-vous →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUITS RACHAT ── */}
      <section className="section hp-products-section">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <p className="eyebrow">Service de rachat — Nous achetons</p>
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
                    <Link
                      to="/contact"
                      className="hp-product-estimate-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Demander une estimation
                    </Link>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VENTE BOUTIQUE ── */}
      <section className="section hp-vente-section">
        <div className="container">
          <div className="hp-vente-headline">
            <span className="hp-vente-eyebrow-badge">Notre boutique</span>
            <h2 className="hp-vente-title">
              <span className="hp-vente-title-accent">Nous vendons</span><br />
              de l'or &amp; de l'argent d'investissement
            </h2>
            <p className="hp-vente-lead">
              Au-delà du rachat, La Maison de l'Or vous propose une gamme complète de produits
              d'investissement&nbsp;: <strong>lingots, lingotins et pièces certifiés</strong> en or
              et en argent, au cours officiel du marché et en toute sécurité.
            </p>
          </div>

          <div className="hp-vente-grid">
            {VENTE_ITEMS.map((v) => (
              <div key={v.title} className={`hp-vente-card hp-vente-card--${v.metal}`}>
                <div className="hp-vente-img">
                  <img src={v.image} alt={v.title} loading="lazy" />
                </div>
                <div className="hp-vente-body">
                  <span className={`hp-vente-tag hp-vente-tag--${v.metal}`}>
                    {v.metal === "or" ? "Or fin" : "Argent .999"}
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hp-vente-pillars">
            <article className="hp-vente-pillar">
              <span className="hp-vente-pillar-icon" aria-hidden="true">🛡️</span>
              <h3>L'or, valeur refuge par excellence</h3>
              <p>
                Rare, résistant à l'inflation et indépendant des marchés financiers, l'or physique
                protège votre patrimoine en période d'incertitude. Hautement liquide, il se revend
                partout dans le monde et reste un investissement stable sur le long terme.
              </p>
            </article>
            <article className="hp-vente-pillar">
              <span className="hp-vente-pillar-icon" aria-hidden="true">📈</span>
              <h3>L'argent, un placement attractif</h3>
              <p>
                Plus accessible que l'or, l'argent physique offre les mêmes avantages de
                protection du patrimoine. Tangible, liquide et fiscalement avantageux, il constitue
                la solution idéale pour diversifier son épargne et démarrer un investissement
                concret.
              </p>
            </article>
            <article className="hp-vente-pillar">
              <span className="hp-vente-pillar-icon" aria-hidden="true">💼</span>
              <h3>Diversifier &amp; transmettre</h3>
              <p>
                Pièces de prestige (Napoléon, Krugerrand, 50 Pesos, 20 Dollars US…), lingots et
                lingotins constituent un patrimoine tangible, transmissible et déconnecté du
                système bancaire. Un actif pour préparer l'avenir.
              </p>
            </article>
            <article className="hp-vente-pillar">
              <span className="hp-vente-pillar-icon" aria-hidden="true">🔐</span>
              <h3>Sécurité &amp; sérénité</h3>
              <p>
                Vos achats sont conditionnés sous sachets scellés et numérotés pour préserver leur
                qualité et faciliter une revente future. Retrait en boutique ou livraison
                sécurisée&nbsp;: vous gardez la main sur chaque étape.
              </p>
            </article>
          </div>

          <div className="hp-vente-cta">
            <p>Intéressé par l'achat de métaux précieux&nbsp;?</p>
            <Link to="/contact" className="btn btn-gold">
              Nous contacter pour acheter →
            </Link>
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
      {/* ── NOTRE HISTOIRE ── */}
      <section className="section hp-histoire-section">
        <div className="container hp-histoire-inner">
          <div className="hp-histoire-text">
            <p className="eyebrow">Notre histoire</p>
            <h2>Présents à Lyon depuis 2021</h2>
            <p className="hp-histoire-lead">
              La Maison de l'Or a été fondée avec une conviction simple :
              chaque client mérite une estimation honnête, expliquée, basée sur les vrais cours du marché
              — sans pression, sans commission cachée.
            </p>
            <p>
              Depuis notre ouverture au <strong>57 Rue Président Herriot, Lyon 2e</strong>, nous accompagnons
              des particuliers dans la valorisation de leurs biens : or, montres, argenterie,
              maroquinerie de luxe et pierres précieuses.
            </p>
            <p>
              Notre approche n'a pas changé en cinq ans : transparence totale, respect du client,
              expertise sérieuse. Juste une offre claire, au juste prix.
            </p>
            <Link className="btn btn-gold" to="/contact" style={{marginTop: "1.2rem", display: "inline-block"}}>
              Prendre rendez-vous
            </Link>
          </div>
          <div className="hp-histoire-timeline">
            <div className="hp-histoire-milestone">
              <span className="hp-histoire-year">2021</span>
              <p>Ouverture de La Maison de l'Or au cœur de Lyon, avec une expertise dédiée aux métaux précieux.</p>
            </div>
            <div className="hp-histoire-milestone">
              <span className="hp-histoire-year">2022</span>
              <p>Élargissement au rachat de montres de luxe et de maroquinerie de grandes maisons.</p>
            </div>
            <div className="hp-histoire-milestone">
              <span className="hp-histoire-year">2024</span>
              <p>Expertise étendue aux pierres précieuses, billets de collection et objets plaqués or.</p>
            </div>
            <div className="hp-histoire-milestone hp-histoire-milestone--now">
              <span className="hp-histoire-year">Aujourd'hui</span>
              <p>13 catégories de rachat, toujours au cœur de Lyon, toujours au juste prix.</p>
            </div>
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

      {/* ── BANNIÈRE RDV ── */}
      <section className="hp-rdv-banner">
        <div className="container hp-rdv-inner">
          <div className="hp-rdv-text">
            <p className="hp-rdv-label">Vous ne pouvez pas vous déplacer&nbsp;?</p>
            <p className="hp-rdv-sub">Prenez rendez-vous — nous nous adaptons à votre emploi du temps.</p>
          </div>
          <a className="btn btn-gold btn-lg" href={siteConfig.phoneHref}>
            Prendre rendez-vous
          </a>
        </div>
      </section>

      {/* ── KIT D'ENVOI ── */}
      <section className="section hp-kit-section">
        <div className="container hp-kit-card">
          <div className="hp-kit-visual" aria-hidden="true">
            <div className="hp-kit-envelope">
              <span className="hp-kit-stamp">✉</span>
            </div>
          </div>
          <div className="hp-kit-content">
            <p className="eyebrow">Service à distance</p>
            <h2>Vendez vos bijoux par correspondance</h2>
            <p className="hp-kit-desc">
              Trop loin pour passer en boutique&nbsp;? Recevez gratuitement notre <strong>kit
              d'envoi sécurisé La Poste</strong>, assuré jusqu'à 5&nbsp;000&nbsp;€ avec suivi de
              parcours. Expertise, offre et paiement sous 24h.
            </p>
            <ul className="hp-kit-points">
              <li>📦 Kit envoyé sous 48h ouvrées</li>
              <li>🔒 Envoi assuré 5&nbsp;000&nbsp;€</li>
              <li>💸 Paiement sous 24h</li>
            </ul>
            <div className="hp-kit-actions">
              <Link to="/kit-envoi" className="btn btn-gold">
                Demander mon kit gratuit →
              </Link>
              <Link to="/kit-envoi" className="hp-kit-link">
                Comment ça marche
              </Link>
            </div>
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

      {/* ── AVIS GOOGLE ── */}
      <GoogleReviews />

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
