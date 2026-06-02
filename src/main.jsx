import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PricesProvider } from "./context/PricesContext";
import "./styles.css";

const rootElement = document.getElementById("root");
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <PricesProvider>
        <App />
      </PricesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Si react-snap a pré-rendu du HTML, on hydrate (pas de flash).
// Sinon, rendu client normal.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
