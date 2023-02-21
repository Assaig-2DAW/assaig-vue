<script>
import { mapState, mapActions } from "pinia";
import { useDataStore } from "../stores/data";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    computed: {
        ...mapState(useDataStore, {
            menus: 'menus',
        })
    },
    components: {
        Datepicker
    },
    setup() {
        const date = new Date();
        const format = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return {
            date,
            format
        }
    }
};
</script>

<template>
    <Datepicker v-model="date" inline :min-date="new Date()" 
        :day-names="['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']"
        :month-change-on-scroll="false" :preview-format="format">
</Datepicker>
</template>

<style>

</style>