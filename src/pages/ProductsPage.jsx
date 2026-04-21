import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { productRoutes } from "../data/products";

function ProductsPage() {
  return (
    <>
      <Seo
        title="Nos produits de rachat"
        description="Decouvrez tous nos produits de rachat: piece or, piece argent, or, montre, menagere, sacs de luxe et foulards de luxe."
        path="/produits"
      />

      <section className="section products-hero">
        <div className="hero-ambient" aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">Catalogue</p>
          <h1>Chaque produit a sa page d'expertise</h1>
          <p className="lead-text">
            Choisissez la categorie qui correspond a votre besoin pour acceder a une page detaillee,
            optimisee pour la conversion et le referencement local.
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
