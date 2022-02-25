<template>
  <v-row>

    <v-col cols="12">
      <h1>{{$t('cart.h1')}}</h1>
    </v-col>

    <cartTable 
      :cartDatas="cartDatas" 
      :totalCart="totalCart" 
      :updateQuantity="updateQuantity" 
      :removeItem="removeItem" 
    />

    <nuxt-link style="text-decoration: none" :to="localePath('/')">
      <v-btn @click="goBack"> back </v-btn>
    </nuxt-link>
  </v-row>
</template>

<script>
import cartTable from '@/components/cartTable.vue';

export default {
  data() {
    return {
      cartLocalStorage: undefined,
      height: undefined
    };
  },
  props: {
    serverDatas: Array,
    cartArticles: Array
  },
  components: {
    cartTable,
  },
  computed: {
    cartDatas() { // update cart products when change langage
        this.cartArticles.map((el) => {
            let isInCart = (element) => element.id === el.product;
            let index = this.serverDatas.findIndex(isInCart);
            el.product = this.serverDatas[index];
        });
        this.cartLocalStorage = JSON.parse(localStorage.getItem('Ecommerce'))
        return this.cartArticles;
    },
    totalCart() {
      let count = []
      this.cartArticles.forEach(element => {
        count.push(element.product.price * element.quantity)
      });
      let total = count.reduce(
        (a, b) => a + b,
      ).toString()
      let length = total.length - 2;
      let centimes = total.slice(length);
      let amount = total.slice(0, length);
      return amount.concat(",", centimes);
    },
  },
  methods: {
    goBack() {
        this.$nuxt.$emit("add-cart", {
            cartArticles: this.cartLocalStorage,
        });
    },
    updateQuantity(btn, index) {
      const newValue = (v) => {
        this.cartLocalStorage[index].quantity = this.cartLocalStorage[index].quantity + v // update base cart loaded
        this.cartArticles[index].quantity = this.cartArticles[index].quantity + v // update datas quantity
        localStorage.setItem("Ecommerce", JSON.stringify(this.cartLocalStorage)); // change the localstorage
        this.$nuxt.$emit("add-cart", { // change total cart
            cartArticles: this.cartLocalStorage,
        });
      }
      if (btn) {
        newValue(1)
      } else {
        if ((this.cartArticles[index].quantity > 0) && (this.cartLocalStorage[index].quantity > 0)) {
          newValue(-1)
        }
      }
    },
    removeItem(index){
      this.cartLocalStorage.splice(index, 1)
      this.cartArticles.splice(index, 1)
      localStorage.setItem("Ecommerce", JSON.stringify(this.cartLocalStorage)); 
      this.$nuxt.$emit("add-cart", { 
          cartArticles: this.cartLocalStorage,
      });
    },
  },
  mounted() {
    console.log('cart loaded')
  },
};
</script>

<style lang="scss" scoped>
</style>