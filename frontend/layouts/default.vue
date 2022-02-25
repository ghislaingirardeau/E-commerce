<template>
  <v-app >
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      temporary
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in $t('navBar')"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
          
        <v-btn @click="switchLanguage('fr')">fr</v-btn>
        <v-btn @click="switchLanguage('en')">en</v-btn>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-row align="center" justify="space-between">
        <v-col cols="2">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        </v-col>
        <v-col cols="5">
          <v-toolbar-title>{{$t('layout.webTitle')}}</v-toolbar-title>
        </v-col>
        <v-col cols="5" class="text-sm-center">
          <v-btn 
            color="red lighten-2" 
            outlined
            @click="emptyCart" 
            v-show="totalArticles > 0"
          >
            <v-icon>mdi-cart-remove</v-icon>
          </v-btn>
          <nuxt-link 
            style="text-decoration: none;" 
            :to="localePath('cart')"
          >
            <v-badge
              color="blue"
              :content="totalArticles"
              :value="totalArticles"
            >
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </nuxt-link>
        </v-col>
      </v-row>

    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt-child 
        :serverDatas="serverDatas" 
        :cartArticles="cartArticles"
        keep-alive 
      />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      langs: [
          "fr",
          "en",
          "kh",
          "thai",
          "indo"
      ],
      clipped: false,
      drawer: false,
      fixed: false,
      browserLanguage: 'en',
      serverDatas: undefined,
      cartArticles: undefined,
      totalArticles: 0
    }
  },
  methods: {
    emptyCart() {
      localStorage.removeItem('Ecommerce')
      this.totalArticles = 0 // cart quantity to 0
      this.cartArticles = undefined // reinitialize cart
    },
    async switchLanguage(lang) {
      this.browserLanguage = lang
      this.$i18n.locale = lang

      const body = {
        lang: lang
      }
      await this.$axios.$post('http://localhost:8000/api/i18n', JSON.stringify(body), {
          headers: {
          "content-type": "application/json",
          },
      })
      .then(response => {
          this.serverDatas = response
          this.cartArticles = JSON.parse(localStorage.getItem('Ecommerce')) //restore basic cart for option translate product in cart 
      })  
    }
  },
  created () {
    this.browserLanguage = navigator.language.slice(0, 2)
    this.$i18n.locale = this.browserLanguage

    try {
      this.cartArticles = JSON.parse(localStorage.getItem('Ecommerce'))
      if (this.cartArticles) { // count the total quantity
        let getQuantity = []
        this.cartArticles.forEach(element => {
          getQuantity.push(element.quantity)
        });
        this.totalArticles = getQuantity.reduce((a, b) => a + b)
      }
    } catch (error) {
      console.log(error)
    }

    this.$nuxt.$on('add-cart', (playload) => { // playload from the cardsProducts "add"
      let getQuantity = [];
      this.cartArticles = playload.cartArticles      
      this.cartArticles.forEach((element) => {
        getQuantity.push(element.quantity);
      });
      this.totalArticles = getQuantity.reduce((a, b) => a + b);
    })
  },
  async mounted() {
    const body = {
      lang: this.browserLanguage
    }
    await this.$axios.$post('http://localhost:8000/api/i18n', JSON.stringify(body), {
        headers: {
        "content-type": "application/json",
        },
    })
    .then(response => {
        this.serverDatas = response
    })  
  },
}
</script>
