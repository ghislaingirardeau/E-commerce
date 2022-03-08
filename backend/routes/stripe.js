const express = require('express')
const stripe = require('../controllers/stripe')

const router = express.Router()

router.get('/stripeKey', stripe.keyPublic)

/* PAYMENT INTENT VALIDATION  */

router.post('/create-payment-intent', stripe.paymentIntent) // CREATE THE PAYMENT ELEMENT FRONTEND WITH PAYMENT INTENT ID
router.post('/v1/payment_intents/:id/cancel', stripe.cancelIntent) // IF CANCEL PAYMENT FRONT = ANNULE PAYMENT INTENT STRIPE
router.get('/v1/payment_methods/:id', stripe.retrievePayment) // RETRIEVE PAYMENT AFTER VALIDATION ON MY SUCCESS PAGE

/* ------------- */


module.exports = router