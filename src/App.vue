<script>
import { RouterLink, RouterView } from 'vue-router'
import { useDataStore } from './stores/data'
import { mapState, mapActions } from 'pinia';

import NavApp from './components/NavApp.vue'
import FooterApp from './components/FooterApp.vue'

export default {
  components: {
    NavApp,
    FooterApp
  },
  methods: {
    ...mapActions(useDataStore, ['loadData'])
  },
  mounted() {
    this.loadData()
  },
}
</script>

<template>
  <nav-app></nav-app>
  <router-view :key="$route.fullPath"></router-view>
  <footer-app></footer-app>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
</style>

