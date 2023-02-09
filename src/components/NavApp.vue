<script>
import { ref } from 'vue';

export default {
    methods: {
        scroll(refName) {
            const element = document.getElementById(refName);
            element.scrollIntoView({behavior: "smooth"});
        }
    }
}
</script>

<template>
    <header class="header">
        <div id="logo">
            <a href="/"><img src="../assets/img/logo.png" width="150"/></a>
        </div>
        <nav class="header-right">
            <v-btn class="enlace" text @click="scroll('menu')">Ver Menú</v-btn>
            <v-btn class="enlace" text @click="scroll('calendar')">Reservar</v-btn>
        </nav>
    </header>
</template>