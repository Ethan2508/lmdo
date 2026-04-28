import { useState, useEffect, useRef, useCallback } from "react";
import { staticReviews } from "../data/staticReviews";

function Stars({ rating }) {
  return (
    <span className="gr-stars" aria-label={`${rating} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "gr-star gr-star--on" : "gr-star"}>★</span>
      ))}
    </span>
  );
}

function ReviewCard({ r }) {
  return (
    <article className="gr-card">
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
  );
}

const VISIBLE = 3; // cartes visibles à la fois
const AUTO_MS = 4000;

export default function GoogleReviews() {
  const [apiData, setApiData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => { if (!d.error) setApiData(d); })
      .catch(() => {});
  }, []);

  // Fusion avis API + avis statiques (dédupliqués par auteur)
  const allReviews = (() => {
    const live = apiData?.reviews ?? [];
    const liveAuthors = new Set(live.map((r) => r.author));
    const extra = staticReviews.filter((r) => !liveAuthors.has(r.author));
    return [...live, ...extra];
  })();

  const total = allReviews.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % Math.max(1, total - VISIBLE + 1));
  }, [total]);

  const prev = () => {
    setCurrent((c) => (c - 1 + Math.max(1, total - VISIBLE + 1)) % Math.max(1, total - VISIBLE + 1));
  };

  // Auto-play
  useEffect(() => {
    if (paused || total <= VISIBLE) return;
    timerRef.current = setInterval(next, AUTO_MS);
    return () => clearInterval(timerRef.current);
  }, [next, paused, total]);

  if (total === 0) return null;

  const maxIndex = Math.max(0, total - VISIBLE);
  const visible = allReviews.slice(current, current + VISIBLE);

  return (
    <section className="section gr-section">
      <div className="container">
        <div className="hp-section-head">
          <div>
            <p className="eyebrow">Avis clients</p>
            <h2>
              Ce que disent nos clients{apiData?.rating && (
                <span className="gr-overall">
                  <span className="gr-overall-score">{apiData.rating.toFixed(1)}</span>
                  <Stars rating={Math.round(apiData.rating)} />
                  <span className="gr-overall-total">({apiData.total} avis Google)</span>
                </span>
              )}
            </h2>
          </div>
          <a
            className="btn btn-line"
            href="https://search.google.com/local/writereview?placeid=ChIJix3zjBTr9EcRhJZyrOHFpCU"
            target="_blank"
            rel="noopener noreferrer"
          >
            Laisser un avis →
          </a>
        </div>

        {/* Carrousel */}
        <div
          className="gr-carousel-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="gr-carousel-track">
            {visible.map((r, i) => <ReviewCard key={`${current}-${i}`} r={r} />)}
          </div>

          {total > VISIBLE && (
            <div className="gr-carousel-controls">
              <button className="gr-btn-prev" onClick={prev} aria-label="Précédent">‹</button>
              <div className="gr-dots">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    className={`gr-dot${i === current ? " gr-dot--on" : ""}`}
                    onClick={() => setCurrent(i)}
                    aria-label={`Aller au groupe ${i + 1}`}
                  />
                ))}
              </div>
              <button className="gr-btn-next" onClick={next} aria-label="Suivant">›</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

