import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { productRoutes } from "./data/products";

// Code-splitting : les pages secondaires sont chargées à la demande.
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ActualitesPage = lazy(() => import("./pages/ActualitesPage"));
const MentionsLegalesPage = lazy(() => import("./pages/MentionsLegalesPage"));
const KitEnvoiPage = lazy(() => import("./pages/KitEnvoiPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
              <Routes>
                <Route path="/produits" element={<ProductsPage />} />
                <Route path="/actualites" element={<ActualitesPage />} />
                {productRoutes.map((product) => (
                  <Route
                    key={product.slug}
                    path={`/${product.slug}`}
                    element={<ProductPage product={product} />}
                  />
                ))}
                <Route path="/rachat-bijoux" element={<Navigate to="/rachat-bijoux-or" replace />} />
                <Route path="/rachat-or" element={<Navigate to="/rachat-lingot-or" replace />} />
                <Route path="/rachat-menagere" element={<Navigate to="/rachat-argenterie" replace />} />
                <Route path="/rachat-sacs-luxe" element={<Navigate to="/rachat-maroquinerie-luxe" replace />} />
                <Route path="/rachat-monnaie" element={<Navigate to="/rachat-piece-argent" replace />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/kit-envoi" element={<KitEnvoiPage />} />
                <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
