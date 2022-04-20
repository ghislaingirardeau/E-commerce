export default {
  layout: {
    webTitle: 'Mon site e-commerce'
  },
  navBar: [
    {
      icon: 'mdi-apps',
      title: 'Accueil',
      to: '/'
    },
    {
      icon: 'mdi-cart',
      title: 'Villages',
      to: '/villages'
    }
  ],
  index: {
    h1: 'Listes de tous les produits',
    search: 'Rechercher',
    category: 'Catégorie',
    currency: "€",
    currencyName: "eur",
    cardMore: "En savoir plus",
    cardCart: "Ajouter",
    cardTitle: "Origine",
    cardClose: "Fermer"
  },
  project: [
    {
      h2: "Vision du projet",
      description: "Description du projet"
    },
    {
      h2: "Allocation du budget",
      description: "Description du commerce équitable"
    },
    {
      h2: "Comment ca marche",
      description: "Description du comment ca marche"
    }
  ],
  village: {
    h1: 'Tous nos villages référencés',
  },
  cart: {
    h1: 'Mon Panier',
    table: {
      name: 'Article',
      price: 'Prix',
      quantity: 'Quantité',
      option: 'Supprimer',
      totalU: 'Total Unité',
      total: 'Total'
    }
  }
}
