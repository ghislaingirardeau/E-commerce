<template>
    <div>
        <h1>page du panier</h1>
        <p>{{cartArticles}}</p>
        <p v-if="listProducts">{{listProducts}}</p>
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
                listProducts: undefined,
            }
        },
        props: {
            serverDatas: {
                type: Array,
            },
        },
        watch: {
            serverDatas() {
                this.listProducts = this.serverDatas
            }
        },
        methods: {
        },
        mounted() {
            try{
                this.cartArticles = JSON.parse(localStorage.getItem('Ecommerce')).cart   
                setTimeout(() => {
                    this.listProducts = this.serverDatas
                }, 1000);             
            } catch(e) {
                console.log(e);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>