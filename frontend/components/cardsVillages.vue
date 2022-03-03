<template>
    <v-row class="pa-3">
        <v-col cols="12" sm="4" v-for="item in villagesData" :key="item.id_community">
            <v-card
                class="mx-auto"
                max-width="300"
            >
                <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                <v-card-title>{{item.name}}</v-card-title>
                </v-img>
                <v-card-subtitle class="pb-0">
                Location
                </v-card-subtitle>
                <v-card-text class="text--primary">
                <div>{{item.description}}</div>
                specialities, producer...
                </v-card-text>
                <v-card-actions>
                <v-btn
                    color="orange"
                    text
                >
                    Explore
                </v-btn>
                </v-card-actions>
            </v-card>       
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props: {
            villagesData: Array
        },
    }
</script>

<style lang="sass" scoped>

</style>