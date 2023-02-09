<script>
import MenuItem from '../components/MenuItem.vue';
import CalendarioItem from '../components/CalendarioItem.vue';
import { useDataStore } from '../stores/data'
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    MenuItem,
    CalendarioItem
  },
  computed: {
    ...mapState(useDataStore, {
      menus: 'menus'
    }),
    // ofertas() {
    //     return this.getOfertasByEmpresa(this.$route.params.id)
    // }
  },
  methods: {
    scroll(refName) {
      const element = document.getElementById(refName);
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}
</script>

<template>
  <section class="landing-section row">
    <h1 class="col-12 text-center">Bienvenidos a L'assaig</h1>
    <div class="buttons col-12">
      <v-btn class="enlace" text @click="scroll('menu')">Ver Menú</v-btn>
      <v-btn class="enlace" text @click="scroll('calendar')">Reservar</v-btn>
    </div>
  </section>

  <section class="menu-content" id="menu">
    <h1 class="col-12 text-center">Consulta los menús</h1>
    <div class="row menu-item" v-if="menus.length">
      <menu-item v-for="menu in menus" :key="menu.id" :menu="menu"></menu-item>
    </div>
    <p v-else class="w-75 m-auto">No hay menus disponibles</p>
  </section>

  <div class="calendar-section" id="calendar">
    <calendario-item />
  </div>
</template>