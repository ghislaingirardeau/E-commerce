<template>
    <v-row justify="center" align="center">
        <v-col cols="12" md="6" class="text-center">
            <h1>
                $t('village.h1')
            </h1>
        </v-col>

        <cardsVillages v-if="villagesData" :villagesData="villagesData" />

        <v-col cols="12" v-else >
            <skeletonCardsProducts />
        </v-col>

        
    </v-row>
</template>

<script>
import cardsVillages from '@/components/cardsVillages.vue';
import skeletonCardsProducts from '@/components/skeletonCardsProducts.vue';
    export default {
        data() {
            return {
                villagesData: undefined
            }
        },
        computed: {
            lang() {
                return this.$i18n.locale
            }
        },
        watch: {
            async lang(newLanguage) {
                this.villagesData = undefined
                const body = {
                    lang: newLanguage
                }
                await this.$axios.$post('http://localhost:8000/api/villages', JSON.stringify(body), {
                    headers: {
                    "content-type": "application/json",
                    },
                })
                .then(response => {
                    this.villagesData = response
                })  
            }
        },
        components: {
            cardsVillages,
            skeletonCardsProducts
        },
        methods: {
        },
        async mounted() {
            const body = {
                lang: this.lang
            }
            await this.$axios.$post('http://localhost:8000/api/villages', JSON.stringify(body), {
                headers: {
                "content-type": "application/json",
                },
            })
            .then(response => {
                this.villagesData = response
            })  
        },
    }
</script>

<style lang="scss" scoped>

</style>