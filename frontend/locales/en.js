export default {
  layout: {
    webTitle: 'My e-commerce webite'
  },
  navBar: [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/'
    },
    {
      icon: 'mdi-cart',
      title: 'Villages',
      to: '/villages'
    }
  ],
  index: {
    h1: 'All products list',
    search: 'Search',
    category: 'Category',
    currency: "$",
    currencyName: "usd",
    cardMore: "Learn more",
    cardCart: "Add cart",
    cardTitle: "Origin",
    cardClose: "Close"
  },
  project: [
    {
      h2: "Project vision",
      description: "Description of the e-commerce website"
    },
    {
      h2: "Budget allocation",
      description: "Description of the budget shared, equal benefits"
    },
    {
      h2: "How it work",
      description: "Description here"
    }
  ],
  village: {
    h1: 'All villages registered',
  },
  cart: {
    h1: 'My cart',
    table: {
      name: 'Name',
      price: 'Price',
      quantity: 'Quantity',
      option: 'Remove',
      totalU: 'Total Unit',
      total: 'Total'
    }
  }
}