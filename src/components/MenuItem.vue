<script>
import { useDataStore } from '../stores/data'
import { mapState, mapActions } from 'pinia';
export default {
    props: ['menu'],
    computed: {
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
    <div class="col-md-4 col-12 menu">
        <h3>Menú dia {{ fechaMenu }}</h3>
        <img src="../assets/img/menu1.png" alt="Menu 1">
    </div>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
</style>