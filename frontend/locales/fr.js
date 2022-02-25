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
  navBar: [
      {
        icon: 'mdi-apps',
        title: 'Accueil',
        to: '/'
      },
      {
        icon: 'mdi-format-list-checkbox',
        title: 'Produits',
        to: '/stripeAPI'
      },
      {
        icon: 'mdi-cart',
        title: 'Village',
        to: '/stripeJS'
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
