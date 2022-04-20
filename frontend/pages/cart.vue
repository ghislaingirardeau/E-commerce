<template>
  <v-row>

    <v-col cols="12">
      <h1>{{$t('cart.h1')}}</h1>
    </v-col>

    <cartTable 
      v-if="cartDatas"
      :cartDatas="cartDatas" 
      :totalCart="totalCart" 
      :updateQuantity="updateQuantity" 
      :removeItem="removeItem" 
    />

    <v-col cols="12" v-else>
      <v-simple-table
        fixed-header
        :height="height"
      >
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center">
                        {{$t('cart.table.name')}}
                    </th>
                    <th class="text-center">
                        {{$t('cart.table.price')}}
                    </th>
                    <th class="text-center">
                        {{$t('cart.table.quantity')}}
                    </th>
                    <th class="text-center">
                        {{$t('cart.table.option')}}
                    </th>
                    <th class="text-center">
                        {{$t('cart.table.totalU')}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th class="text-center">
                        no datas
                    </th>
                </tr>
            </tbody>
        </template>
      </v-simple-table>
    </v-col>

    <onlinePayment :totalCart="totalCart" />

    <nuxt-link style="text-decoration: none" :to="localePath('/')">
      <v-btn @click="goBack"> back </v-btn>
    </nuxt-link>
  </v-row>
</template>

<script>
import cartTable from '@/components/cartTable.vue';
import onlinePayment from '@/components/onlinePayment.vue';

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
    onlinePayment
  },
  computed: {
    cartDatas() { // update cart products when change langage
      try {
          this.cartArticles.map((el) => {
              let isInCart = (element) => element.id === el.product;
              let index = this.serverDatas.findIndex(isInCart);
              el.product = this.serverDatas[index];
          });
          this.cartLocalStorage = JSON.parse(localStorage.getItem('Ecommerce'))
          return this.cartArticles;
      } catch (error) {
        console.log(error);
      }
    },
    totalCart() {
      try {
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
        return amount.concat(".", centimes);
      } catch (error) {
        console.log(error);
      }
    },
  },
  methods: {
    goBack() {
        if (this.cartArticles) {
          this.$nuxt.$emit("add-cart", {
              cartArticles: this.cartLocalStorage,
          });
        }
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
      if(this.cartLocalStorage.length > 0) {
        localStorage.setItem("Ecommerce", JSON.stringify(this.cartLocalStorage)); 
        this.$nuxt.$emit("add-cart", { 
            cartArticles: this.cartLocalStorage,
        });
      } else {
        localStorage.removeItem('Ecommerce')
        this.$nuxt.$emit("add-cart", { 
            cartArticles: undefined,
        });
      }
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>