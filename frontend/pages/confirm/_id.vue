<template>
    <div>
        <h1>Votre confirmation</h1>
        <p>{{messagePayment}}</p>
        {{this.$route.params.id}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            messagePayment: ''
        }
    },
    async mounted() {
        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        )
        if(clientSecret) {
            const stripeKey = await this.$axios.$get('http://localhost:8000/api/stripe/stripeKey')
            const stripe = Stripe(stripeKey.key)
            await stripe.retrievePaymentIntent(clientSecret)
            .then(async (result) => {
                console.log(result)
                switch (result.paymentIntent.status) {
                    case 'succeeded':
                    this.messagePayment = 'Success! Payment received.'
                    const paymentIntent = new URLSearchParams(window.location.search).get(
                        'payment_intent'
                    );
                    const getData = await this.$axios.$get(`http://localhost:8000/api/stripe/v1/payment_methods/${paymentIntent}`)
                    console.log(getData)
                    break;
                    case 'processing':
                    this.messagePayment = "Payment processing. We'll update you when payment is received.";
                    break;
                    case 'requires_payment_method':
                    this.messagePayment = 'Payment failed. Please try another payment method.';
                    // Redirect your user back to your payment page to attempt collecting
                    // payment again
                    break;
                    default:
                    this.messagePayment = 'Something went wrong.';
                    break;
                }
            });
        }
    }
}
</script>