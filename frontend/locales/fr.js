export default {
  layout: {
    webTitle: 'Mon site e-commerce'
  },
  index: {
    h1: 'Listes de tous les produits',
    search: 'Rechercher',
    category: 'Catégorie',
    currency: "€",
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
