import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Categories from '../views/Categories.vue'
import Recipe from '../views/Recipe.vue'
import { ROUTES_PATH } from '../constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATH.HOME,
      name: 'home',
      component: Home,
    },
    {
      path: ROUTES_PATH.CATEGORIES,
      name: 'categories',
      component: Categories,
    },
    {
      path: ROUTES_PATH.RECIPE,
      name: 'recipe',
      component: Recipe,
    },
  ],
})

export default router
