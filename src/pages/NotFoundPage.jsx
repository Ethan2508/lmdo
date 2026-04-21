import { Link } from "react-router-dom";
import Seo from "../components/Seo";

function NotFoundPage() {
  return (
    <section className="section">
      <Seo
        title="Page introuvable"
        description="La page que vous recherchez n'existe pas ou a ete deplacee."
        path="/404"
      />
      <div className="container simple-center">
        <h1>Page introuvable</h1>
        <p>La page demandee n'est pas disponible.</p>
        <Link className="btn btn-gold" to="/">
          Retour a l'accueil
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
