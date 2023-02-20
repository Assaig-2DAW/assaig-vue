import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const SERVER = 'http://assaig.api/api'

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
        console.log('hola')
        hourDiv.remove();
        selectDiv.remove();
        classActive.classList.remove("dp__active_date");

        this.fechas.forEach(menu => {
          let fechaMenu = String(new Date(menu.fecha))
          const parts = fechaMenu.split(' ');
          parts[4] = "00:00:00"
          const date = parts.join(' ');
          const searched = document.querySelector(`[data-test="` + date + `"]`);

          if (searched) {
            this.addToolTip(searched, menu)
            this.addPropertyToDay(searched, menu)
            if(!searched.classList.contains('rojo')) {
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
      }
    },

    addToolTip(searched, menu) {
      let plazas = this.getPlazasDisponibles(menu)
      function showTooltip() {
        var tooltip = document.createElement("span");
        tooltip.id = 'tooltip';
        tooltip.textContent = "Quedan " + plazas + " plazas";

        searched.appendChild(tooltip);
      }

      searched.addEventListener("mouseover", function () {
        setTimeout(showTooltip, 50);
      });
      searched.addEventListener("mouseout", function () {
        var tooltip = document.getElementById('tooltip')
        searched.removeChild(tooltip);
      });
    },

    addPropertyToDay(searched, menu) {
      let plazasToTales = menu.pax + menu.overbooking
      let reservasRealizadas = this.getReservasHechas(menu)

      if (reservasRealizadas == plazasToTales) {
        searched.classList.add('rojo')
      } else if (reservasRealizadas > menu.plazas) {
        searched.classList.add('amarillo')
      } else {
        searched.classList.add('verde')
      }
    },

    getPlazasDisponibles(menu) {
      let plazasToTales = menu.pax + menu.overbooking
      let reservasRealizadas = this.getReservasHechas(menu)
      return plazasToTales - reservasRealizadas
    },

    getReservasHechas(menu) {
      let reservasOfMenu = this.reservas.filter((reserva) => reserva.fecha['id'] == menu.id)
      let reservasHechas = 0
      reservasOfMenu.forEach(reserva => {
        reservasHechas += Number(reserva.comensales)
      });
      return reservasHechas
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
            'email': values.email ,
            'telefono':values.telefono ,
            'comensales': values.comensales ,
            'observaciones': values.observaciones ?? 'ninguna',
            'fecha_id': 1,
            'alergenos':values.alergenos ?? []
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