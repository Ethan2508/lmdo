import Seo from "../components/Seo";
import { news } from "../data/news";

function ActualitesPage() {
  return (
    <>
      <Seo
        title="Actualites marche or et luxe"
        description="Suivez l'actualite du marche de l'or, des montres et des metaux precieux avec La Maison de l'Or."
        path="/actualites"
      />

      <section className="section actualites-hero">
        <div className="hero-ambient" aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">Actualites</p>
          <h1>Le marche des metaux precieux et du luxe</h1>
          <p className="lead-text">
            Analyse, tendances et conseils pour mieux comprendre la valeur de vos biens avant de
            vendre.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="news-grid news-grid-full">
            {news.map((item) => (
              <article key={item.slug} className="news-card">
                <div className="news-card-top">
                  <span className="news-tag">{item.category}</span>
                  <span className="news-date">{item.date}</span>
                </div>
                <h2 className="news-title">{item.title}</h2>
                <p>{item.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ActualitesPage;
