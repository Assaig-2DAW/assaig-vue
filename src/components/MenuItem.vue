<script>
import { useDataStore } from '../stores/data'
import { mapState, mapActions } from 'pinia';
import axios from 'axios';
const SERVER = 'http://api.saar.alcoitec.es/api'

export default {
    props: ['menu'],
    data() {
        return {
            image: ""
        };
    },
    mounted() {
        this.fetchImage()
    },
    methods: {
        fetchImage() {
            if(this.menu.menu) {
                axios.get(SERVER + '/images/' + this.menu.menu, {
                    responseType: 'arraybuffer'
                })
                    .then(response => {
                        const blob = new Blob([response.data], { type: response.headers['content-type'] });
                        const imgUrl = URL.createObjectURL(blob);
                        this.image = imgUrl;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    },
    computed: {
        ...mapState(useDataStore, {
            getMenuById: "getMenuById",
        }),

        fechaMenu() {
            const date = new Date(this.menu.fecha)
            const months = [
                "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
                "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ]
            const month = months[date.getMonth()]
            return `${date.getDate()} de ${month} de ${date.getFullYear()}`
        }
    }
}
</script>

<template>
    <h4 v-if="image !== ''">Menú dia {{ fechaMenu }}</h4>
    <h4 v-else>El menu del dia todavía no ha sido definido</h4>
    <img v-if="image !== ''" :src="image" alt="Menu 1">
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
</style>