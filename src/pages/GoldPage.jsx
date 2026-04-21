import ServicePage from "../components/ServicePage";

function GoldPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Rachat d'or",
      serviceType: "Rachat d'or pour particuliers",
      areaServed: "Paris et Ile-de-France"
    }
  ];

  return (
    <ServicePage
      seoTitle="Rachat d'or a Paris"
      seoDescription="Rachat d'or a Paris avec estimation transparente: bijoux or, lingotins, pieces et or casse."
      path="/rachat-or"
      eyebrow="Rachat d'or"
      heading="Vendre votre or avec une estimation claire et professionnelle"
      intro="Nous rachetons l'or sous toutes ses formes en expliquant chaque critere: titrage, poids, cours du jour et valeur finale proposee."
      highlights={[
        "Bijoux en or, pieces, lingotins, or casse",
        "Tarification basee sur les cours actuels",
        "Estimation sans engagement"
      ]}
      whyTitle="Pourquoi nous confier votre rachat d'or"
      whyItems={[
        {
          title: "Transparence",
          text: "Chaque proposition est detaillee pour que vous compreniez le prix annonce."
        },
        {
          title: "Securite",
          text: "Transactions encadrees et accueil discret pour proteger votre demarche."
        },
        {
          title: "Rapidite",
          text: "Dossier traite rapidement pour limiter les delais entre estimation et paiement."
        }
      ]}
      steps={[
        { title: "Prise de contact", text: "Par telephone ou formulaire selon votre preference." },
        { title: "Analyse de vos biens", text: "Controle du poids et du titrage avec materiel adapte." },
        { title: "Proposition", text: "Offre immediate basee sur le cours du jour." }
      ]}
      faq={[
        {
          q: "Rachetez-vous l'or casse ?",
          a: "Oui, l'or casse, incomplet ou ancien peut etre evalue et rachete."
        },
        {
          q: "Le prix change-t-il chaque jour ?",
          a: "Oui, la valeur suit le cours de l'or et peut varier quotidiennement."
        },
        {
          q: "Faut-il prendre rendez-vous ?",
          a: "Le rendez-vous est conseille pour un passage prioritaire, mais pas obligatoire."
        }
      ]}
      schema={schema}
    />
  );
}

export default GoldPage;
