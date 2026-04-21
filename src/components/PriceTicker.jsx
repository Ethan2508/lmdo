import { useEffect, useRef } from "react";

const SYMBOLS = [
  { proName: "OANDA:XAUEUR", title: "Or (€/oz)" },
  { proName: "OANDA:XAGEUR", title: "Argent (€/oz)" },
  { proName: "OANDA:XPTUSD", title: "Platine ($/oz)" },
  { proName: "OANDA:XPDUSD", title: "Palladium ($/oz)" }
];

function PriceTicker() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Nettoyage avant (re)montage
    container.innerHTML = "";

    const inner = document.createElement("div");
    inner.className = "tradingview-widget-container__widget";
    container.appendChild(inner);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: SYMBOLS,
      showSymbolLogo: false,
      colorTheme: "light",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "fr"
    });
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container ticker-tv"
      ref={containerRef}
      aria-label="Cours des metaux precieux en direct — TradingView"
    />
  );
}

export default PriceTicker;
