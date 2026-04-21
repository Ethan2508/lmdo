import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext(null);

// Valeurs de repli basees sur le cours du 20 Avril 2026 (EUR/g)
const FALLBACK = {
  or: "154.78",
  argent: "2.19",
  platine: "57.60",
  palladium: "43.32",
  updatedAt: null,
  live: false
};

const TROY_OZ_G = 31.1035;

// API gold-api.com : CORS ouvert, sans cle, prix en USD/once
const BASE = "https://api.gold-api.com/price";

export function PricesProvider({ children }) {
  const [prices, setPrices] = useState(FALLBACK);

  useEffect(() => {
    async function load() {
      try {
        const [fxRes, auRes, agRes, ptRes, pdRes] = await Promise.all([
          fetch("https://open.er-api.com/v6/latest/USD"),
          fetch(`${BASE}/XAU`),
          fetch(`${BASE}/XAG`),
          fetch(`${BASE}/XPT`),
          fetch(`${BASE}/XPD`)
        ]);

        if (!fxRes.ok || !auRes.ok || !agRes.ok) throw new Error("api");

        const fx = await fxRes.json();
        const [au, ag, pt, pd] = await Promise.all([
          auRes.json(),
          agRes.json(),
          ptRes.json(),
          pdRes.json()
        ]);

        // Taux EUR pour 1 USD
        const eur = fx.rates?.EUR ?? 0.851;

        const toEurG = (usdOz) => ((usdOz * eur) / TROY_OZ_G).toFixed(2);

        const time = new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit"
        });

        setPrices({
          or: toEurG(au.price),
          argent: toEurG(ag.price),
          platine: toEurG(pt.price ?? 0) || FALLBACK.platine,
          palladium: toEurG(pd.price ?? 0) || FALLBACK.palladium,
          updatedAt: time,
          live: true
        });
      } catch {
        // Garde les valeurs de repli ou les dernieres valeurs connues
        setPrices((p) => ({
          ...p,
          updatedAt: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
          })
        }));
      }
    }

    load();
    const id = setInterval(load, 120_000);
    return () => clearInterval(id);
  }, []);

  return <Context.Provider value={prices}>{children}</Context.Provider>;
}

export const usePrices = () => useContext(Context);
