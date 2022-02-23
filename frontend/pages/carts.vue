<template>
    <div>
        <h1>page du panier</h1>
        <p>{{cartArticles}}</p>
        <p v-if="listProducts">{{listProducts}}</p>
        <v-btn color="primary" @click="backProducts">back</v-btn>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cartArticles: undefined,
                listProducts: undefined
            }
        },
        props: {
            serverDatas: {
                type: Array,
            },
        },
        watch: {
            serverDatas() {
                setTimeout(() => {
                    this.listProducts = this.serverDatas
                }, 1000);
            }
        },
        methods: {
            backProducts() {
                this.$router.push('/')
            }
        },
        mounted() {
            try{
                this.cartArticles = JSON.parse(localStorage.getItem('Ecommerce')).cart                
            } catch(e) {

            }
        },
        updated() {
            console.log(this.listProducts)
        },
    }
</script>

<style lang="scss" scoped>

</style>