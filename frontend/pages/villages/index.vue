<template>
    <div>
        <h1>villages page</h1>
        <p>show all the village registered in the database</p>
        <p>category by location ou specialities</p>
        <v-btn @click="sendEmail">test email</v-btn>
    </div>
</template>

<script>
    export default {
        methods: {
            async sendEmail() {
                const body = {
                    message: 'Hello SMTP Email'
                }
                await this.$axios.$post('http://localhost:8000/api/email', JSON.stringify(body), {
                    headers: {
                    "content-type": "application/json",
                    },
                })
                .then(response => {
                    console.log(response);
                })  
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>