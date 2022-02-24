<template>
  <div>
    <h1>page du panier</h1>
    <p>{{ cartArticles }}</p>
    <p>{{ table }}</p>
    <v-btn @click="test">test</v-btn>
    <nuxt-link style="text-decoration: none" :to="localePath('/')">
      <v-btn> back </v-btn>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartArticles: undefined,
    };
  },
  props: {
    serverDatas: {
      type: Array,
    },
  },
  computed: {
    listProducts() {
      return this.serverDatas;
    },
    table() {
        this.cartArticles = JSON.parse(localStorage.getItem("Ecommerce"));
        return this.cartArticles
    }
  },
  methods: {
    test() {
      const map1 = this.cartArticles.map((el) => {
        let isInCart = (element) => element.id === el.product;
        let index = this.listProducts.findIndex(isInCart);
        console.log(index);
        el.product = this.listProducts[index];
      });
    },
  },
  mounted() {
    try {
      this.cartArticles = JSON.parse(localStorage.getItem("Ecommerce"));
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>