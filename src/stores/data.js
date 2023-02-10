import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const SERVER = 'http://localhost:3000'

export const useDataStore = defineStore('data', {
  state() {
    return {
      menus: [],
      reservas: [],
      alergenos: [],
    }
  },

  actions: {
    async loadData() {
      try {
        const [menusData, reservasData, alergenosData] = await Promise.all([
          axios.get(`${SERVER}/menus`),
          axios.get(`${SERVER}/reservas`),
          axios.get(`${SERVER}/alergenos`)])


        this.menus = menusData.data
        this.reservas = reservasData.data
        this.alergenos = alergenosData.data

        this.loadDays()

      } catch (err) {
        alert('Error al cargar el json: ' + err)
      }

    },

    loadDays() {
      this.menus.forEach(menu => {
        let fechaMenu = String(new Date(menu.fecha))
        const parts = fechaMenu.split(' ');
        parts[4] = "00:00:00"
        const date = parts.join(' ');
        const searched = document.querySelector(`[data-test="`+date+`"]`);
        searched.classList.add('verde')
      });
    },

    getMenuIdByDate(date) {
      console.log(date)
      return this.reservas.filter((reserva) => Date(reserva.fecha) == Date(date))
    }

  },


})
