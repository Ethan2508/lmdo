import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { siteConfig } from "../data/site";
import { productRoutes } from "../data/products";
import PriceTicker from "./PriceTicker";

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  const closeAll = () => {
    setMobileOpen(false);
    setProductsOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>

      <header className="site-header">
        {/* Niveau 1 : bande de cours en direct */}
        <PriceTicker />

        {/* Niveau 2 : navigation principale */}
        <div className="nav-bar">
          <div className="container nav-shell">
            <NavLink className="brand-logo" to="/" aria-label="Accueil La Maison de l'Or" onClick={closeAll}>
              <img src="/logo-lmdo-noir.png" alt="Logo La Maison de l'Or" />
            </NavLink>

            <nav
              className={`main-nav${mobileOpen ? " nav-open" : ""}`}
              aria-label="Navigation principale"
            >
              {/* Dropdown produits */}
              <div
                className="nav-dropdown-wrap"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button
                  className="nav-link dropdown-btn"
                  onClick={() => setProductsOpen((o) => !o)}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                >
                  Nos produits{" "}
                  <span className={`chevron${productsOpen ? " chevron-open" : ""}`} aria-hidden="true">
                    ▾
                  </span>
                </button>

                <div
                  className={`dropdown-panel${productsOpen ? " dropdown-open" : ""}`}
                  role="menu"
                >
                  {productRoutes.map((p) => (
                    <NavLink
                      key={p.slug}
                      to={`/${p.slug}`}
                      className="dropdown-item"
                      role="menuitem"
                      onClick={closeAll}
                    >
                      {p.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              <NavLink className={linkClass} to="/actualites" onClick={closeAll}>
                Actualites
              </NavLink>
              <NavLink className={linkClass} to="/contact" onClick={closeAll}>
                Contact
              </NavLink>
            </nav>

            <div className="nav-right">
              <a className="btn btn-gold nav-phone" href={siteConfig.phoneHref}>
                {siteConfig.phone}
              </a>
              <button
                className={`burger${mobileOpen ? " burger-open" : ""}`}
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setMobileOpen((o) => !o)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <NavLink to="/" aria-label="Accueil" onClick={closeAll}>
              <img className="footer-logo" src="/logo-lmdo-noir.png" alt="Logo La Maison de l'Or" />
            </NavLink>

            <div className="footer-cols">
              <div>
                <h4>Nos produits</h4>
                <ul>
                  {productRoutes.map((p) => (
                    <li key={p.slug}>
                      <NavLink to={`/${p.slug}`} onClick={closeAll}>
                        {p.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Navigation</h4>
                <ul>
                  <li><NavLink to="/actualites" onClick={closeAll}>Actualites</NavLink></li>
                  <li><NavLink to="/contact" onClick={closeAll}>Contact</NavLink></li>
                </ul>
              </div>
              <div>
                <h4>Coordonnees</h4>
                <p><strong>{siteConfig.address}</strong></p>
                <p><a href={siteConfig.phoneHref}>{siteConfig.phone}</a></p>
                <p><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} {siteConfig.name} — SAS au capital de 5 000 € — SIREN 908 128 721 — {siteConfig.address}</p>
            <p><NavLink to="/mentions-legales" onClick={closeAll}>Mentions légales</NavLink></p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
