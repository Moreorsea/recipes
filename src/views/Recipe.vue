<script setup>
import { onMounted, ref, computed } from 'vue'
import Layout from '@/layouts/Layout.vue'
import { CommonServices, RecipeProviders } from '@/services'
import { useRoute } from 'vue-router'
import { useRootStore } from '@/stores/root'
import { Delete } from '@element-plus/icons-vue'

const route = useRoute()
const rootStore = useRootStore()
const recipe = ref(RecipeProviders.getEmptyRecipe())
const recipeUpdated = ref(RecipeProviders.getEmptyRecipe())
const isCreatingMode = ref(true)
const areas = computed(() => rootStore.areas)
const categories = computed(() => rootStore.categories)
const recipeIngredients = ref([CommonServices.getEmptyIngredients()])

const getMeal = async () => {
  try {
    const data = await RecipeProviders.getRecipeById(route?.params?.id)

    recipe.value = { ...data }
    recipeUpdated.value = { ...data }
    isCreatingMode.value = false
  } catch (err) {}
}

const normalizeRecipeIngredients = () => {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    if (recipe.value[`strIngredient${i}`]) {
      const el = {
        title: recipe.value[`strIngredient${i}`],
        measure: recipe.value[`strMeasure${i}`],
      }

      ingredients.push(el)
    }
  }

  recipeIngredients.value = ingredients
  console.log('RECIPE', recipeIngredients.value)
}

const denormalizeRecipeIngredients = (recipe) => {
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeIngredients.value[i - 1]

    if (ingredient?.title && ingredient?.measure) {
      recipe[`strIngredient${i}`] = ingredient.title
      recipe[`strMeasure${i}`] = ingredient.measure
    } else {
      recipe[`strIngredient${i}`] = ''
      recipe[`strMeasure${i}`] = ''
    }
  }
}

const addIngredient = () => {
  recipeIngredients.value.push(CommonServices.getEmptyIngredients())
}

const deleteIngredient = (index) => {
  recipeIngredients.value.splice(index, 1)
}

const createRecipe = async () => {
  try {
    const params = { ...recipeUpdated.value }

    denormalizeRecipeIngredients(params)

    await RecipeProviders.createRecipe()
  } catch (err) {
    console.error('Error: ', err)
  }
}

const updateRecipe = async () => {
  try {
    const params = { ...recipeUpdated.value }

    denormalizeRecipeIngredients(params)

    await RecipeProviders.updateRecipe()
  } catch (err) {
    console.error('Error: ', err)
  }
}

const createOrUpdateRecipe = () => {
  console.log('CREATE OR UPDATE')
  isCreatingMode.value ? createRecipe() : updateRecipe()
}

onMounted(async () => {
  if (parseInt(route?.params.id)) {
    await getMeal()
    normalizeRecipeIngredients()
  }
})
</script>

<template>
  <Layout>
    <template #title
      ><h1>{{ isCreatingMode ? 'Новый рецепт' : recipeUpdated.strMeal }}</h1></template
    >
    <template #controles
      ><el-button type="primary" @click="createOrUpdateRecipe">Обновить рецепт</el-button></template
    >
    <template #content>
      <div class="wrapper">
        <div class="row">
          <div class="col">
            <label>Title</label>
            <el-input placeholder="Title" v-model="recipeUpdated.strMeal"></el-input>
          </div>
          <div class="col">
            <label>Area</label>
            <el-select v-model="recipeUpdated.strArea" placeholder="Select">
              <el-option
                v-for="item in areas"
                :key="item.strArea"
                :label="item.strArea"
                :value="item.strArea"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Category</label>
            <el-select v-model="recipeUpdated.strCategory" placeholder="Select">
              <el-option
                v-for="item in categories"
                :key="item.strCategory"
                :label="item.strCategory"
                :value="item.strCategory"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Instructions</label>
            <el-input
              type="textarea"
              autosize
              placeholder="Instructions"
              v-model="recipeUpdated.strInstructions"
            >
            </el-input>
          </div>
        </div>
        <p>Ingredients</p>
        <div class="row" v-for="(ingredient, index) in recipeIngredients" :key="index">
          <div class="col">
            <label>Measure</label>
            <el-input placeholder="Measure" v-model="ingredient.measure"></el-input>
          </div>
          <div class="col">
            <label>Ingredient</label>
            <el-input placeholder="Ingredient" v-model="ingredient.title"></el-input>
          </div>
          <div class="col">
            <el-button type="danger" :icon="Delete" circle @click="deleteIngredient(index)" />
          </div>
        </div>
        <el-button type="primary" @click="addIngredient">Add ingredient</el-button>
      </div>
    </template>
  </Layout>
</template>
