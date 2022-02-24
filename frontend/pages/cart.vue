<template>
  <div>
    <h1>{{$t('cart.h1')}}</h1>
    <p>{{ cartDatas }}</p>
    
    <nuxt-link style="text-decoration: none" :to="localePath('/')">
      <v-btn @click="goBack"> back </v-btn>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    serverDatas: Array,
    cartArticles: Array
  },
  computed: {
    listProducts() { // update when i change the language
        return this.serverDatas;
    },
    cartDatas() { // update cart products when change langage
        this.cartArticles.map((el) => {
            let isInCart = (element) => element.id === el.product;
            let index = this.serverDatas.findIndex(isInCart);
            el.product = this.serverDatas[index];
        });
        return this.cartArticles;
    }
  },
  methods: {
      goBack() {
            let cartArticles = JSON.parse(localStorage.getItem('Ecommerce'))
            this.$nuxt.$emit("add-cart", {
                cartArticles: cartArticles,
            });
      }
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>