<script>
import { RouterLink, RouterView } from 'vue-router'
import { useDataStore } from './stores/data'
import { mapState, mapActions } from 'pinia';

import NavApp from './components/NavApp.vue'
// import Pie from './components/Pie.vue'

export default {
  components: {
    NavApp,
    // Pie
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
  <!-- <pie></pie> -->
</template>

