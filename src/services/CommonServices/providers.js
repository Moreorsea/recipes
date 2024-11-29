import axios from 'axios'
import { GET_AREAS, GET_CATEGORIES, GET_INGREDIENTS } from '@/constants'

export const getAreas = async () => {
  const data = await axios.get(GET_AREAS)

  return data?.data?.meals
}

export const getCategories = async () => {
  const data = await axios.get(GET_CATEGORIES)

  return data?.data?.meals
}

export const getIngredients = async () => {
  const data = await axios.get(GET_INGREDIENTS)

  return data?.data?.meals
}
