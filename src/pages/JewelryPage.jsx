import ServicePage from "../components/ServicePage";

function JewelryPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Rachat de bijoux",
      serviceType: "Rachat de bijoux anciens et modernes",
      areaServed: "Paris et Ile-de-France"
    }
  ];

  return (
    <ServicePage
      seoTitle="Rachat de bijoux a Paris"
      seoDescription="Rachat de bijoux en or et argent, anciens ou modernes, avec estimation gratuite a Paris."
      path="/rachat-bijoux"
      eyebrow="Rachat de bijoux"
      heading="Donnez une seconde vie a vos bijoux"
      intro="Nous rachetons bagues, bracelets, colliers, boucles d'oreilles et bijoux de famille avec une estimation fondee sur la matiere et la desirabilite de la piece."
      highlights={[
        "Bijoux anciens, modernes ou casses",
        "Evaluation metal et valeur de piece",
        "Conseil personnalise"
      ]}
      whyTitle="Notre engagement pour vos bijoux"
      whyItems={[
        {
          title: "Ecoute",
          text: "Chaque objet a une histoire, nous adaptons notre evaluation a son profil."
        },
        {
          title: "Precision",
          text: "Controle du metal, du poids et des particularites de fabrication."
        },
        {
          title: "Confort",
          text: "Un cadre discret pour vendre en toute confiance."
        }
      ]}
      steps={[
        { title: "Inventaire", text: "Nous trions les bijoux selon metal et categorie." },
        { title: "Estimation", text: "Nous verifions titrage, poids et potentiel commercial." },
        { title: "Validation", text: "Offre detaillee puis paiement rapide si accord." }
      ]}
      faq={[
        {
          q: "Acceptez-vous les bijoux casses ?",
          a: "Oui, ils peuvent etre valorises en fonction du metal precieux contenu."
        },
        {
          q: "Rachetez-vous les bijoux en argent ?",
          a: "Oui, nous rachetons egalement l'argent selon les cours et le poids."
        },
        {
          q: "Puis-je venir avec un lot de bijoux ?",
          a: "Oui, nous traitons les lots et proposons une estimation globale claire."
        }
      ]}
      schema={schema}
    />
  );
}

export default JewelryPage;
