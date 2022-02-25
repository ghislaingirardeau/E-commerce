<template>
  <v-row>

    <v-col cols="12">
      <h1>{{$t('cart.h1')}}</h1>
    </v-col>

    <v-col cols="12" >
      <v-simple-table
        fixed-header
        :height="height"
      >
        <template v-slot:default>
          <thead v-if="screenBreakpoint">
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
          <tbody v-if="screenBreakpoint">
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
          <tbody v-for="(item, index) in cartDatas" v-else
              :key="item.product.id">
            <tr>
              <td>name</td>
              <td class="text-center">{{ item.product.name }}</td>
            </tr>
            <tr>
              <td>prix</td>
              <td class="text-center">{{ item.product.price }}</td>
            </tr>
            <tr>
              <td>Quantity</td>
              <td class="text-center">
                <v-chip @click="updateQuantity(false, index)" elevation="2" small>-</v-chip>
                <span class="mx-2">{{item.quantity}}</span>
                <v-chip @click="updateQuantity(true, index)" elevation="2" small>+</v-chip>
                <v-chip @click="removeItem(index)" elevation="2" x-small>X</v-chip>
              </td>
            </tr>
            <tr>
              <td>total Units</td>
              <td class="text-center">
                {{totalUnit(item.product.price, item.quantity)}} {{ $t("index.currency") }}
              </td>
            </tr>
          </tbody>
          <tfoot v-if="screenBreakpoint">
            <tr>
                <th></th>
                <th></th>
                <th class="text-center">Totals</th>
                <td class="text-center">21,000</td>
            </tr>
          </tfoot>
          <tfoot v-else>
            <tr>
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
      height: undefined
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
    },
    screenBreakpoint() {
      if (this.$vuetify.breakpoint.width > 600) {
        this.height = '300px'
        return true
      } else {
        this.height = '600px'
        return false
        
      }
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