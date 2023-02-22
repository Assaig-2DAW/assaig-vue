import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const SERVER = 'http://api.saar.alcoitec.es/api'

export const useDataStore = defineStore('data', {
  state() {
    return {
      fechas: [],
      reservas: [],
      alergenos: [],
    }
  },
  getters: {
    getMenuById: (state) => (id) => state.fechas
      .find((menu) => menu.id == id) || {},
  },
  actions: {
    async loadData() {

      try {
        const [fechasData, reservasData, alergenosData] = await Promise.all([
          axios.get(`${SERVER}/fechas/`),
          axios.get(`${SERVER}/reservas/`),
          axios.get(`${SERVER}/alergenos/`)])

        this.fechas = fechasData.data.data
        this.reservas = reservasData.data.data
        this.alergenos = alergenosData.data.data

        this.loadCalendar()

      } catch (err) {
        alert('Error al cargar el json: ' + err)
      }
    },

    loadCalendar() {

      const hourDiv = document.querySelector(`[data-test="open-time-picker-btn"]`);
      const selectDiv = document.querySelector(`[class="dp__action_row"]`);
      const classActive = document.querySelector(".dp__active_date");

      if (hourDiv && selectDiv && classActive) {
        hourDiv.remove();
        selectDiv.remove();
        classActive.classList.remove("dp__active_date");
      }
      this.loadDays()

      const navNextMonth = document.querySelector(`[aria-label="Next month"]`)
      if (navNextMonth) {
        navNextMonth.addEventListener("click", function () {
          this.loadDays()
        }.bind(this))
      }
      const navPreventMonth = document.querySelector(`[aria-label="Previous month"]`)
      if (navPreventMonth) {
        navPreventMonth.addEventListener("click", function () {
          this.loadDays()
        }.bind(this))
      }
    },

    loadDays() {
      this.fechas.forEach(menu => {
        let fechaMenu = String(new Date(menu.fecha))
        const parts = fechaMenu.split(' ');
        parts[4] = "00:00:00"
        const date = parts.join(' ');
        const searched = document.querySelector(`[data-test="` + date + `"]`);

        if (searched) {
          this.addToolTip(searched, menu)
          this.addPropertyToDay(searched, menu)

          if (!searched.classList.contains('rojo')) {
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
        }
      });
    },

    addToolTip(searched, menu) {
      let plazas = menu.pax + menu.overbooking
      function showTooltip() {
        var tooltip = document.createElement("span");
        tooltip.id = 'tooltip';
        tooltip.textContent = "Quedan " + plazas + " plazas";
        searched.appendChild(tooltip);
      }
      searched.addEventListener("mouseover", function () {
        setTimeout(showTooltip, 10);
      });
      searched.addEventListener("mouseout", function () {
        var tooltip = document.getElementById('tooltip')
        searched.removeChild(tooltip);
      });
    },

    addPropertyToDay(searched, menu) {
      
      if ((menu.pax + menu.overbooking) > 0) {
        searched.classList.add('verde')
      } else if (menu.pax_espera > 0) {
        searched.classList.add('amarillo')
      } else {
        searched.classList.add('rojo')
      }
    },

    getReserva(idReserva) {
      return this.reservas.find((reserva) => reserva.id == idReserva)
    },

    async saveReserva(values) {
      try {
        if (values.idReserva) {
          await axios.put(SERVER + '/reservas/' + values.idReserva, values)
        } else {
          await axios.post(SERVER + '/reservas', {
            'nombre': values.nombre,
            'email': values.email,
            'telefono': values.telefono,
            'comensales': values.comensales,
            'observaciones': values.observaciones,
            'fecha_id': values.fecha_id,
            'alergenos': values.alergenos
          })
        }
        return true
      } catch (error) {
        alert(error)
        return false
      }
    },
  },
})