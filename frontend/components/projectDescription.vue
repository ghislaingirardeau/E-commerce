<template>
    <v-carousel
    class="mt-3"
    height="200"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in $t('project')"
      :key="i"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
        elevation="4"
        class="ma-2"
        shaped
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col cols="8">
            <h2>
              {{ slide.h2 }}
            </h2>
          </v-col>
          <v-col cols="8">
            <p>
              {{ slide.description }}
            </p>
          </v-col>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
    export default {
        data() {
            return {
                colors: [
                    'indigo',
                    'warning',
                    'pink darken-2',
                    'red lighten-1',
                    'deep-purple accent-4',
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>