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
  getters: {
    getMenuById: (state) => (id) => state.menus
      .find((menu) => menu.id == id) || {},
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
        this.loadCalendar()
    },

    loadCalendar() {
      const hourDiv = document.querySelector(`[data-test="open-time-picker-btn"]`);
      if (hourDiv) {
        hourDiv.remove();
      }

      const selectDiv = document.querySelector(`[class="dp__action_row"]`);
      if (selectDiv) {
        selectDiv.remove();
      }

      const classActive = document.querySelector(".dp__active_date");
      if (classActive) {
        classActive.classList.remove("dp__active_date");
      }

      this.menus.forEach(menu => {
        let fechaMenu = String(new Date(menu.fecha))
        const parts = fechaMenu.split(' ');
        parts[4] = "00:00:00"
        const date = parts.join(' ');
        const searched = document.querySelector(`[data-test="` + date + `"]`);
        if(searched) {
          searched.classList.add('verde')
          var contenido = searched.innerHTML;
          var enlace = document.createElement("a");
          enlace.href = '/reserva/' + menu.id;
          enlace.innerHTML = contenido;
          searched.innerHTML = "";
          searched.appendChild(enlace);
  
          searched.addEventListener("click", function () {
            window.location = this.querySelector("a").href;
          });
        }
      });
    },

    getReserva(idReserva) {
      return this.reservas.find((reserva) => reserva.id == idReserva)
    },

    async saveReserva(values) {
      try {
        if (values.idReserva) {
          await axios.put(SERVER + '/reservas/' + values.idReserva, values)
        } else {
          await axios.post(SERVER + '/reservas/', values)
        }
        return true
      } catch (error) {
        alert(error)
        return false
      }
    },
  },
})
