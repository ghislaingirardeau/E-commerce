<template>
  <v-row>

    <v-col cols="12">
      <h1>{{$t('cart.h1')}}</h1>
    </v-col>
    <v-container v-if="cartArticles">
      <v-row v-for="(item, index) in cartDatas" :key="item.product.id" style="border: 2px solid red">
        <v-col cols="4" style="border: 2px solid blue">
          {{item.product.name}}
        </v-col>
        <v-col cols="4" style="border: 2px solid blue">
          {{item.product.category}}
        </v-col>
        <v-col cols="4" class="text-center" style="border: 2px solid blue">
          <v-chip @click="updateQuantity(false, index)" elevation="2" small>-</v-chip>
          <span class="mx-2">{{item.quantity}}</span>
          <v-chip @click="updateQuantity(true, index)" elevation="2" small>+</v-chip>
          <v-btn @click="removeItem(index)" elevation="2" x-small>X</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <p v-else>Carts is empty</p>

    <v-col cols="12">
      <v-simple-table
        fixed-header
        height="300px"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                Name
              </th>
              <th class="text-center">
                Price
              </th>
              <th class="text-center">
                Quantity
              </th>
              <th class="text-center">
                Total Units
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in cartDatas"
              :key="item.product.id"
            >
              <td class="text-center">{{ item.product.name }}</td>
              <td class="text-center">{{ priceUnit(item.product.price) }}</td>
              <td class="text-center">
                <v-chip @click="updateQuantity(false, index)" elevation="2" small>-</v-chip>
                <span class="mx-2">{{item.quantity}}</span>
                <v-chip @click="updateQuantity(true, index)" elevation="2" small>+</v-chip>
                <v-chip @click="removeItem(index)" elevation="2" x-small>X</v-chip>
              </td>
              <td class="text-center">{{totalUnit(item.product.price, item.quantity)}} {{ $t("index.currency") }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
                <th></th>
                <th></th>
                <th class="text-center">Totals</th>
                <td class="text-center">21,000</td>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-col>

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
      },
      priceUnit(el) {
        let length = el.length - 2;
        let centimes = el.slice(length);
        let amount = el.slice(0, length);
        return amount.concat(",", centimes);
      },
      totalUnit(price, quantity) {
        let el = (price * quantity).toString()
        let length = el.length - 2;
        let centimes = el.slice(length);
        let amount = el.slice(0, length);
        return amount.concat(",", centimes);
      },
  },
  mounted() {
    console.log('cart loaded')
  },
};
</script>

<style lang="scss" scoped>
</style>