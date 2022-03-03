<template>
    <div>
        <h1>
            page de la communauté {{this.$route.params.id}}
        </h1>
        {{villageData}}
        <nuxt-link style="text-decoration: none" :to="localePath('/villages')">
        <v-btn> back </v-btn>
        </nuxt-link>

    </div>
</template>

<script>
export default {
    data () {
        return {
            villageData: undefined
        }
    },
    computed: {
        villageId() {
            return this.$route.params.id
        },
        lang() {
            return this.$i18n.locale
        }
    },
    methods: {
        async getData(id, lang) {
            const body = {
                lang: lang
            }

            await this.$axios.$post(`http://localhost:8000/api/villages/${id}`, JSON.stringify(body), {
            headers: {
            "content-type": "application/json",
            },
            })
            .then(response => {
                this.villageData = response
            })
        }
    },
    watch: {
        async villageId(newValue) {
            if(newValue) {
                this.getData(newValue, this.$i18n.locale)
            }
        },
        async lang(newLanguage) {
            this.getData(this.$route.params.id, newLanguage)
        }
    },
    async mounted () {
        this.getData(this.$route.params.id, this.$i18n.locale)
    },
}
</script>

<style lang="scss" scoped>

</style>