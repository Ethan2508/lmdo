// Entrée SSR utilisée uniquement au build par scripts/prerender.js.
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Writable } from "node:stream";
import App from "./App";
import { PricesProvider } from "./context/PricesContext";
import { HeadContext } from "./components/Seo";

export { productRoutes } from "./data/products";

export function render(url) {
  const head = {};

  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk;
        callback();
      },
      final(callback) {
        resolve({ html, head });
        callback();
      }
    });

    // onAllReady : attend le chargement des pages lazy pour un HTML complet.
    const stream = renderToPipeableStream(
      <StrictMode>
        <HeadContext.Provider value={head}>
          <StaticRouter location={url}>
            <PricesProvider>
              <App />
            </PricesProvider>
          </StaticRouter>
        </HeadContext.Provider>
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(sink);
        },
        onShellError: reject,
        onError: reject
      }
    );
  });
}
