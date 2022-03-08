const stripe = require('stripe')(process.env.STRIPE_KEY, {maxNetworkRetries: 2})
/* const uuid = require('uuid') */

// information sur le store (ex si site e-commerce), info qui peuvent venir de la base de donnée par exemple
// Important: le prix vient de la base de donnée ou coté serveur et non coté client
// pour eviter qu'un hacker achete le produit id 1 pour 0 euro

exports.keyPublic = async (req, res, next) => {
  res.status(200).json({key: process.env.STRIPE_PUBLICKEY})
}

exports.retrievePayment = async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    req.params.id
  )
  res.status(200).json(paymentIntent)
}

exports.paymentIntent = async (req, res, next) => {
  const {amount, currency, methods} = req.body
  
    try {
      // req.boy get ID of product and quanitity
      // calculate the amount from id product and quanitity
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
          currency: currency,
          automatic_payment_methods: [methods],
          });
      res.status(200).json({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id})
    } catch(e) {
      res.status(400).json({error: {
          message: e.message
        }})
      console.log(e.message)
    }
}

exports.cancelIntent = async (req, res, next) => {
    try {
      if(req.body.id === req.params.id) {
        const paymentIntent = await stripe.paymentIntents.cancel(
          req.params.id
        )
        res.status(200).json(paymentIntent.status)
      }
    } catch(e) {
        res.status(500).json(e)
        console.log(e)
    }
}