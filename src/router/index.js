import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/bar',
    name: 'bar',
    component: () => import(/* webpackChunkName: "bar" */ '../views/AboutView.vue')
  },
  {
    path: '/pie',
    name: 'pie',
    component: () => import(/* webpackChunkName: "pie" */ '../views/PieView.vue')
  },
  {
    path: '/line',
    name: 'line',
    component: () => import(/* webpackChunkName: "line" */ '../views/LineView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
