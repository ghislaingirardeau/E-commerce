<template>
    <div>
        <h1>
            page en {{this.$route.params.id}}
        </h1>
    </div>
</template>

<script>
export default {
    data () {
        return {
            localBackend: '',
            lang: 'fr',
            value: '',
            items: [
                'fr',
                'en'
            ]
        }
    },
    mounted () {
        
    },
}
</script>

<style lang="scss" scoped>

</style>