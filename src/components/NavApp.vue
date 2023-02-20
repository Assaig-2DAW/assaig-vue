<script>
export default {
    computed: {
        isHomePage() {
            return this.$route.path === '/'
        }
    }
}
</script>

<template>
    <header class="header">
        <div id="logo">
            <a href="/"><img src="../assets/img/logo2.png" width="180" /></a>
        </div>
        <nav class="header-right" v-if="isHomePage">
            <router-link class="enlace" to="/" v-scroll-to="'#calendar'">
                Reservar
            </router-link>
            <router-link class="enlace" to="/" v-scroll-to="'#about'">
                Sobre nosotros
            </router-link>
        </nav>
        <nav class="header-right" v-else>
            <a class="enlace" href="/#calendar">
                Reservar
            </a>
            <a class="enlace" href="/#about">
                Sobre nosotros
            </a>
        </nav>
    </header>
</template>