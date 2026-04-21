import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import ActualitesPage from "./pages/ActualitesPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import NotFoundPage from "./pages/NotFoundPage";
import { productRoutes } from "./data/products";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/produits" element={<ProductsPage />} />
        <Route path="/actualites" element={<ActualitesPage />} />
        {productRoutes.map((product) => (
          <Route
            key={product.slug}
            path={`/${product.slug}`}
            element={<ProductPage product={product} />}
          />
        ))}
        <Route path="/rachat-bijoux" element={<Navigate to="/rachat-or" replace />} />
        <Route path="/rachat-monnaie" element={<Navigate to="/rachat-piece-argent" replace />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
