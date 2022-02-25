<template>
  <v-row>
    <v-col cols="12">
      <h1>{{$t('cart.h1')}}</h1>
    </v-col>
    <v-container>
    <v-row v-for="(item, index) in cartDatas" :key="item.product.id" style="border: 2px solid red">
      <v-col cols="4" style="border: 2px solid blue">
        {{item.product.name}}
      </v-col>
      <v-col cols="4" style="border: 2px solid blue">
        {{item.product.category}}
      </v-col>
      <v-col cols="4" class="text-center" style="border: 2px solid blue">
        <v-btn @click="updateQuantity(false, index)" elevation="2" x-small>-</v-btn>
        <span class="mx-2">{{item.quantity}}</span>
        <v-btn @click="updateQuantity(true, index)" elevation="2" x-small>+</v-btn>
        <v-btn @click="removeItem(index)" elevation="2" x-small>X</v-btn>
      </v-col>
    </v-row>
    </v-container>
    <p>{{ cartDatas }}</p>
    <p>{{cartLocalStorage}}</p>
    
    <nuxt-link style="text-decoration: none" :to="localePath('/')">
      <v-btn @click="goBack"> back </v-btn>
    </nuxt-link>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      cartLocalStorage: undefined,
    };
  },
  props: {
    serverDatas: Array,
    cartArticles: Array
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
    }
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
      }
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>