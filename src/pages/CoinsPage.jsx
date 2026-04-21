import ServicePage from "../components/ServicePage";

function CoinsPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Rachat de monnaie",
      serviceType: "Rachat de pieces et monnaies de collection",
      areaServed: "Paris et Ile-de-France"
    }
  ];

  return (
    <ServicePage
      seoTitle="Rachat de monnaie et pieces"
      seoDescription="Rachat de monnaies anciennes, pieces d'or et d'argent, et objets numismatiques avec expertise detaillee."
      path="/rachat-monnaie"
      eyebrow="Rachat de monnaie"
      heading="Faites expertiser vos pieces et monnaies anciennes"
      intro="Nous evaluons monnaies de collection, pieces de bourse et monnaies en metaux precieux selon leur rarete, etat de conservation et demande du marche."
      highlights={[
        "Pieces d'or et d'argent",
        "Monnaies anciennes et collection",
        "Estimation argumentee"
      ]}
      whyTitle="Une estimation numismatique serieuse"
      whyItems={[
        {
          title: "Connaissance du marche",
          text: "Nous suivons les tendances de prix des monnaies les plus recherchees."
        },
        {
          title: "Lecture de l'etat",
          text: "L'etat de conservation est integre dans la proposition finale."
        },
        {
          title: "Approche pedagogique",
          text: "Nous expliquons les facteurs qui influencent la valeur de vos pieces."
        }
      ]}
      steps={[
        { title: "Presentation", text: "Apportez vos pieces ou votre collection complete." },
        { title: "Expertise", text: "Controle de l'authenticite, de l'etat et de la categorie." },
        { title: "Offre", text: "Proposition de rachat immediate et transparente." }
      ]}
      faq={[
        {
          q: "Rachetez-vous les collections completes ?",
          a: "Oui, nous pouvons estimer et racheter une collection entiere."
        },
        {
          q: "Les pieces usees ont-elles encore de la valeur ?",
          a: "Oui, selon le metal, la rarete et l'interet numismatique."
        },
        {
          q: "Dois-je nettoyer mes monnaies avant ?",
          a: "Non, il vaut mieux eviter pour ne pas alterer la valeur potentielle."
        }
      ]}
      schema={schema}
    />
  );
}

export default CoinsPage;
