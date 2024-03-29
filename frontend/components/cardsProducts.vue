<template>
  <v-row class="pa-3">
    <v-col cols="12" sm="4" v-for="item in listProducts" :key="item.id">
      <v-card class="mx-auto" max-width="344" elevation="4">
        <v-img
          height="200"
          :src="item.image_url"
        ></v-img>
        <v-card-title primary-title>
          {{ item.name }}
        </v-card-title>
        <v-card-subtitle>
          {{ item.category }}
          <span class="price">
            {{ price(item.price) }} {{ $t("index.currency") }}
          </span>
        </v-card-subtitle>
        <v-card-text class="description--height">
          <p class="text--primary">
            {{ item.description }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="teal accent-4" @click="showOrigin(item.id)">
            {{ $t("index.cardMore") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="teal accent-4" @click="addToCart(item.id)">
            {{ $t("index.cardCart") }}
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <v-card
            v-if="revealCard === 'origin' + item.id"
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%"
          >
            <v-card-title>
              {{ $t("index.cardTitle") }}
            </v-card-title>
            <v-card-subtitle>
              {{ item.communityName }}
            </v-card-subtitle>
            <v-card-text class="pb-0">
              <p>
                {{ item.communityDescription}}
              </p>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-btn text color="teal accent-4" @click="revealCard = false">
                {{ $t("index.cardClose") }}
              </v-btn>
              <v-spacer></v-spacer>
              <nuxt-link style="text-decoration: none" :to="localePath(`/villages/${item.id_community}`)">
                <v-btn text color="teal accent-4">
                  village link {{ item.id_community }}
                </v-btn>
              </nuxt-link>
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      revealCard: false,
    };
  },
  props: {
    listProducts: Array,
  },
  computed: {},
  methods: {
    showOrigin(id) {
      this.revealCard = "origin" + id;
    },
    price(el) {
      let unit = el.toString()
      let length = unit.length - 2;
      let centimes = unit.slice(length);
      let amount = unit.slice(0, length);
      return amount.concat(",", centimes);
    },
    addToCart(id) {
      let cartArticles = JSON.parse(localStorage.getItem("Ecommerce"));
      if (cartArticles) {
        const isInCart = (element) => element.product === id;
        const getIndex = cartArticles.findIndex(isInCart);
        if (getIndex === -1) {
          // the article is yet not in the cart
          const addInCart = {
            product: id,
            quantity: 1,
          };
          cartArticles.push(addInCart);
        } else {
          // article already in the cart
          cartArticles[getIndex].quantity++;
        }
      } else {
        // add first article
        cartArticles = [
          {
            product: id,
            quantity: 1,
          },
        ];
      }
      // save locally the basic card
      localStorage.setItem("Ecommerce", JSON.stringify(cartArticles));
      // send the cart to the layout default for props to cart page
      this.$nuxt.$emit("add-cart", {
        cartArticles: cartArticles,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.price {
  float: right;
}
.description--height{
  height: 100px;
}
</style>