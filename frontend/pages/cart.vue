<template>
    <div>
        <h1>page du panier</h1>
        <p>{{cartArticles}}</p>
        <p>{{listProducts}}</p>
        <nuxt-link 
            style="text-decoration: none;" 
            :to="localePath('/')"
          >
            <v-btn>
                back
            </v-btn>
          </nuxt-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cartArticles: undefined,
            }
        },
        props: {
            serverDatas: {
                type: Array,
            },
        },
        computed: {
            listProducts() {
                return this.serverDatas
            }
        },
        mounted() {
            try{
                this.cartArticles = JSON.parse(localStorage.getItem('Ecommerce')).cart   
            } catch(e) {
                console.log(e);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>