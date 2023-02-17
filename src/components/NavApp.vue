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
            <a href="/"><img src="../assets/img/logo2.png" width="150" /></a>
        </div>
        <nav class="header-right">
            
            <router-link v-if="isHomePage" class="enlace" to="/" v-scroll-to="'#calendar'">
                Reservar            
            </router-link>
            <a v-else class="enlace" href="/#calendar">
                Reservar
            </a>
        </nav>
</header>
</template>