import { useState, useEffect } from "react";

function Stars({ rating }) {
  return (
    <span className="gr-stars" aria-label={`${rating} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "gr-star gr-star--on" : "gr-star"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function GoogleReviews() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setData(d);
      })
      .catch(() => setError(true));
  }, []);

  if (error || (data && data.reviews?.length === 0)) return null;
  if (!data) return null;

  return (
    <section className="section gr-section">
      <div className="container">
        <div className="hp-section-head">
          <div>
            <p className="eyebrow">Avis clients</p>
            <h2>
              Ce que disent nos clients{" "}
              <span className="gr-overall">
                <span className="gr-overall-score">{data.rating?.toFixed(1)}</span>
                <Stars rating={Math.round(data.rating)} />
                <span className="gr-overall-total">({data.total} avis Google)</span>
              </span>
            </h2>
          </div>
          <a
            className="btn btn-line"
            href="https://g.page/r/review"
            target="_blank"
            rel="noopener noreferrer"
          >
            Laisser un avis →
          </a>
        </div>

        <div className="gr-grid">
          {data.reviews.map((r, i) => (
            <article key={i} className="gr-card">
              <div className="gr-card-head">
                {r.avatar ? (
                  <img src={r.avatar} alt={r.author} className="gr-avatar" loading="lazy" />
                ) : (
                  <div className="gr-avatar gr-avatar--fallback">
                    {r.author?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
                <div>
                  <p className="gr-author">{r.author}</p>
                  <p className="gr-time">{r.time}</p>
                </div>
              </div>
              <Stars rating={r.rating} />
              {r.text && <p className="gr-text">{r.text}</p>}
              <img
                src="https://www.google.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
                alt="Google"
                className="gr-google-logo"
                loading="lazy"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
