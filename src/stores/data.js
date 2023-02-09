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

      } catch (err) {
        alert('Error al cargar el json: ' + err)
      }

    },

  },
})
