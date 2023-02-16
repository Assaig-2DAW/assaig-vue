<script>
import MenuItem from '../components/MenuItem.vue';
import CalendarioItem from '../components/CalendarioItem.vue';
import { useDataStore } from '../stores/data'
import { mapState, mapActions } from 'pinia';


export default {
  name: 'HomePage',
  mounted() {
    const store = useDataStore()
    store.loadCalendar()
  },
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
    },
  }
}
</script>

<template>
  <v-content>
    <section class="landing-section row">
      <div class="line">
        <img src="../assets/img/line.png">
      </div>
      <h1 class="col-12">Bienvenidos a L'assaig</h1>
      <p class="introduce text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer turpis nibh,
        accumsan elementum faucibus in, pulvinar nec ex. Phasellus bibendum eleifend ipsum et aliquet.</p>
      <div class="buttons col-12">
        <v-btn class="enlace" text @click="scroll('calendar')">Reservar</v-btn>
        <v-btn class="enlace" text @click="scroll('menu')">Sobre nosotros</v-btn>
      </div>
      <div class="example">
        <img src="../assets/img/imagen1.png">
      </div>
    </section>

    <SectionOne class="calendar-section row" id="calendar">
      <h1 class="col-12">Reserva ahora tu mesa</h1><br>
      <div class="item-verde"></div>
      <calendario-item class="calendar-item" />
      <div class="image-content">
        <img class="food1" src="../assets/img/comida1.png">
        <img class="food2" src="../assets/img/comida6.png">
        <img class="food3" src="../assets/img/comida3.png">
      </div>
    </SectionOne>
    <SectionTwo class="about-section row" id="about">
      <img class="banner" src="../assets/img/assaig.png">
      <h1 class="col-12 text-center">QUIÉNES SOMOS</h1><br>
      <div class="row">
        <div class="row col-6 about">
          <div class="col-12">
            <img src="../assets/img/comida2.png">
          </div>
          <div class="col-12">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer turpis nibh,
        accumsan elementum faucibus in, pulvinar nec ex. Phasellus bibendum eleifend ipsum et aliquet.</p>
          </div>
        </div>

        <div></div>
      </div>
      <!-- <div class="item-verde"></div> -->
    </SectionTwo>
  </v-content>
</template>