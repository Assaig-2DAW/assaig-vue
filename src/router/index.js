import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReservaForm from '../views/ReservaForm.vue'
import AnulacionView from '../views/AnulacionView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reserva/:id',
      name: 'reserva',
      component: ReservaForm,
      props: true
    },
    {
      path: '/anular-reserva/:id',
      name: 'anular-reserva',
      component: AnulacionView,
      props: true
    },
    {
      path: '/anular-subscripcion/:id',
      name: 'anular-subscripcion',
      component: AnulacionView,
      props: true
    },
  ]
})

export default router
