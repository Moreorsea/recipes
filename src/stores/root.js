import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CommonServices } from '@/services'

export const useRootStore = defineStore('root', () => {
  const areas = ref(null)
  const categories = ref(null)
  const ingredients = ref(null)

  async function getAreas() {
    const data = await CommonServices.getAreas()

    areas.value = data
  }

  async function getCategories() {
    const data = await CommonServices.getCategories()

    categories.value = data
  }

  async function getIngredients() {
    const data = await CommonServices.getIngredients()

    ingredients.value = data
  }

  return { areas, categories, ingredients, getAreas, getCategories, getIngredients }
})
