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

.dp__theme_light {
    --dp-hover-color: #f3f3f300;
}

.dp__active_date {
    background-color: rgba(240, 248, 255, 0);
    color: rgb(42, 63, 37);
}

.dp__calendar_header_item {
    font-size: 0.85em;
}

.dp__month_year_row {
    width: 100%;
}

.dp__instance_calendar {
    background-color: white;
    z-index: 4;
    width: 150%;
    height: auto;
    box-shadow:
       inset 0 -3em 3em rgba(0, 0, 0, 0.068),
             0 0  0 2px rgb(255, 255, 255),
             0.3em 0.3em 1em rgba(0, 0, 0, 0.281);
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