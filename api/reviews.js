// Vercel Serverless Function — Google Places Reviews proxy
// Variables d'environnement requises sur Vercel :
//   GOOGLE_PLACES_API_KEY  — clé Google Cloud avec "Places API" activée
//   GOOGLE_PLACE_ID        — identifiant ChIJ... de la fiche Google My Business

const CACHE_TTL = 60 * 60 * 1000; // 1 heure en ms

let cache = { data: null, ts: 0 };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(500).json({ error: "Missing env vars" });
  }

  // Retourner le cache si encore valide
  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return res.status(200).json(cache.data);
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=fr&key=${apiKey}`;
    const response = await fetch(url);
    const json = await response.json();

    if (json.status !== "OK") {
      return res.status(502).json({ error: json.status, message: json.error_message });
    }

    const result = {
      name: json.result.name,
      rating: json.result.rating,
      total: json.result.user_ratings_total,
      reviews: (json.result.reviews || [])
        .filter((r) => r.rating >= 4)
        .sort((a, b) => b.time - a.time)
        .slice(0, 5)
        .map((r) => ({
          author: r.author_name,
          avatar: r.profile_photo_url,
          rating: r.rating,
          text: r.text,
          time: r.relative_time_description,
        })),
    };

    cache = { data: result, ts: Date.now() };
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Fetch failed", message: err.message });
  }
}
