import ServicePage from "../components/ServicePage";

function WatchesPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Rachat de montres",
      serviceType: "Rachat de montres de luxe",
      areaServed: "Paris et Ile-de-France"
    }
  ];

  return (
    <ServicePage
      seoTitle="Rachat de montres de luxe"
      seoDescription="Rachat de montres a Paris: Rolex, Omega, Cartier et autres marques avec expertise precise."
      path="/rachat-montres"
      eyebrow="Rachat de montres"
      heading="Valorisez votre montre de luxe avec une offre serieuse"
      intro="Nos experts estiment les montres selon la marque, la reference, l'etat, l'historique d'entretien et la demande actuelle du marche."
      highlights={[
        "Montres de luxe et vintage",
        "Evaluation de la reference et de l'etat",
        "Etude avec ou sans boite et papiers"
      ]}
      whyTitle="Un rachat adapte au marche horloger"
      whyItems={[
        {
          title: "Expertise dediee",
          text: "Notre methode tient compte des references les plus recherchees."
        },
        {
          title: "Analyse de valeur",
          text: "Nous integrons l'etat mecanique et esthetique dans notre proposition."
        },
        {
          title: "Approche claire",
          text: "Vous recevez une explication simple de chaque element de prix."
        }
      ]}
      steps={[
        { title: "Presentation de la montre", text: "Avec ses accessoires si vous les avez." },
        { title: "Controle technique", text: "Inspection complete de l'exterieur et du mouvement." },
        { title: "Offre de rachat", text: "Proposition immediate selon cote et liquidite du modele." }
      ]}
      faq={[
        {
          q: "Rachetez-vous sans boite ni papiers ?",
          a: "Oui, la montre peut etre rachetee meme sans set complet, selon expertise."
        },
        {
          q: "Rachetez-vous les montres a reparer ?",
          a: "Oui, selon l'etat et la faisabilite de remise en etat du modele."
        },
        {
          q: "Combien de temps dure l'evaluation ?",
          a: "En general entre 30 et 60 minutes selon la complexite de la piece."
        }
      ]}
      schema={schema}
    />
  );
}

export default WatchesPage;
