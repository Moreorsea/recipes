import axios from 'axios'
import { GET_MEALS_BY_LETTERS, GET_MEAL_BY_ID } from '@/constants'

export const getRecipesByLetter = async () => {
  const data = await axios.get(GET_MEALS_BY_LETTERS)

  return data?.data?.meals
}

export const getRecipeById = async (id) => {
  const data = await axios.get(`${GET_MEAL_BY_ID}${id}`)

  return data?.data?.meals[0]
}
