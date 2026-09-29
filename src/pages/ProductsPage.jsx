import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { productRoutes } from "../data/products";

function ProductsPage() {
  return (
    <>
      <Seo
        title="Nos produits de rachat"
        description="Découvrez tous nos produits de rachat: pièce or, pièce argent, or, montre, ménagère, sacs de luxe et foulards de luxe."
        path="/produits"
      />

      <section className="section products-hero">
        <div className="hero-ambient" aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">Catalogue</p>
          <h1>Chaque produit a sa page d'expertise</h1>
          <p className="lead-text">
            Choisissez la catégorie qui correspond à votre besoin pour accéder à une page détaillée,
            optimisée pour la conversion et le référencement local.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {productRoutes.map((product) => (
              <article className="card product-card" key={product.slug}>
                <p className="product-tag">Rachat</p>
                <h2>{product.name}</h2>
                <p>{product.seoDescription}</p>
                <Link to={`/${product.slug}`}>Voir la page</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductsPage;
