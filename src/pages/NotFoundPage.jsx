import { Link } from "react-router-dom";
import Seo from "../components/Seo";

function NotFoundPage() {
  return (
    <section className="section">
      <Seo
        title="Page introuvable"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        path="/404"
        noindex
      />
      <div className="container simple-center">
        <h1>Page introuvable</h1>
        <p>La page demandée n'est pas disponible.</p>
        <Link className="btn btn-gold" to="/">
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
