<template>
  <v-row justify="center" align="center">

    <projectDescription />

    <v-col cols="12" md="6" class="text-center">
      <h1>
          {{$t('index.h1')}}
      </h1>
    </v-col>

    <v-col cols="6" md="3">
      <v-text-field
        :name="$t('index.search')"
        :label="$t('index.search')"
        append-icon="mdi-map-marker"
      ></v-text-field>
    </v-col>
    <v-col cols="6" md="3">
      <v-select
        v-model="category"
        :items="categoryItems"
        append-icon="mdi-map"
        menu-props="auto"
        :label="$t('index.category')"
        single-line
        @change="selectionByCategory"
      ></v-select>
    </v-col>  

    <cardsProducts v-if="listProducts" :listProducts="listProducts"/>

    <skeletonCardsProducts v-else />

  </v-row>
</template>

<script>
import skeletonCardsProducts from '@/components/skeletonCardsProducts.vue';
import cardsProducts from '@/components/cardsProducts.vue';
import projectDescription from '@/components/projectDescription.vue';

export default {
  data() {
    return {
      category: undefined,
      categoryItems: [
        "accessory",
        "encense"
      ],
    }
  },
  components: {
    skeletonCardsProducts,
    cardsProducts,
    projectDescription
  },
  props: {
    serverDatas: {
      type: Array,
    },
  },
  computed: {
    listProducts() {
      return this.serverDatas
    }
  },
  methods: {
    showOrigin(id) {
      this.revealCard = 'origin' + id
    },
    selectionByCategory() {
      console.log(this.category)
    },
  },
  mounted() {
  },
}
</script>

<style lang="scss">
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>