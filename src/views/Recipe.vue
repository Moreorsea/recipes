<script setup>
import { onMounted, ref } from 'vue'
import Layout from '@/layouts/Layout.vue'
import { RecipeProviders } from '@/services'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipe = ref(RecipeProviders.getEmptyRecipe())
const recipeUpdated = ref(RecipeProviders.getEmptyRecipe())
const isCreatingMode = ref(true)

const getMeal = async () => {
  try {
    const data = await RecipeProviders.getRecipeById(route?.params?.id)

    recipe.value = data
    recipeUpdated.value = data
    isCreatingMode.value = false
  } catch (err) {}
}

onMounted(() => {
  if (parseInt(route?.params.id)) {
    getMeal()
  }
})
</script>

<template>
  <Layout>
    <template #title
      ><h1>{{ isCreatingMode ? 'Новый рецепт' : recipeUpdated.strMeal }}</h1></template
    >
    <template #controles><el-button type="primary">Добавить категорию</el-button></template>
    <template #content>{{ recipe }}</template>
  </Layout>
</template>
