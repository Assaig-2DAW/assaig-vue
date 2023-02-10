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
    methods: {
        ...mapActions(useDataStore, ['getMenuIdByDate']),
        goToForm(date) {
            const menu = this.getMenuIdByDate(date);
            this.$router.push('/reserva/' + menu.id);
        },
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
        :day-names="['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']"
        :month-change-on-scroll="false" :preview-format="format">
        <template #action-select>
            <p class="custom-select" @click="goToForm(date)">Seleccionar</p>
        </template>
    </Datepicker>
</template>

<style>
.dp__menu {
    position: relative;
    /* display: flex; */
    width: 70%;
}

.dp__calendar_wrap {
    display: block;
    padding-left: 3%;
    padding-right: 3%;
}

.dp__action_row {
    padding: 10px 90px;
}

.dp__calendar_header_item {
    font-size: 0.85em;
}

.custom-select {
    padding: 5px;
    cursor: pointer;
    color: black;
    margin: 0;
    display: inline-block;
}

.custom-select:hover {
    background-color: rgba(105, 136, 97, 0.493);
}
</style>