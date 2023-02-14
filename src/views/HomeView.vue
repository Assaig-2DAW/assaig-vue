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
    <div class="line">
      <img src="../assets/img/line.png">
    </div>
    <h1 class="col-12">Bienvenidos a L'assaig</h1>
    <p class="introduce text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer turpis nibh, accumsan elementum faucibus in, pulvinar nec ex. Phasellus bibendum eleifend ipsum et aliquet.</p>
    <div class="buttons col-12">
      <v-btn class="enlace" text @click="scroll('calendar')">Reservar</v-btn>
      <v-btn class="enlace" text @click="scroll('menu')">Sobre nosotros</v-btn>
    </div>
    <div class="example">
      <img class="tape-up" src="../assets/img/tape.png">
      <img src="../assets/img/imagen.png">
      <img class="tape-down" src="../assets/img/tape.png">
    </div>
  </section>

  <!-- <section class="menu-content" id="menu">
    <h1 class="col-12 text-center">Consulta los menús</h1>
    <div class="row menu-item" v-if="menus.length">
      <menu-item v-for="menu in menus" :key="menu.id" :menu="menu"></menu-item>
    </div>
    <p v-else class="w-75 m-auto">No hay menus disponibles</p>
  </section> -->

  <div class="calendar-section row" id="calendar">
    <h1 class="col-12">Reserva ahora tu mesa</h1><br>
    <div class="item-verde"></div>
    <calendario-item class="calendar-item"/>
    <div class="image-content">
      <img class="food1" src="../assets/img/comida1.png">
      <img class="food2" src="../assets/img/comida6.png">
      <img class="food3" src="../assets/img/comida3.png">
    </div>
  </div>
</template>