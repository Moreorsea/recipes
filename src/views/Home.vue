<script setup>
import { onMounted, ref } from 'vue'
import Layout from '@/layouts/Layout.vue'
import { RecipeProviders } from '@/services'
import { ROUTES_PATH } from '@/constants'

const recipes = ref()

const fetchRecipes = async () => {
  try {
    recipes.value = await RecipeProviders.getRecipesByLetter()
  } catch (err) {}
}

const getPath = (id = 'new') => {
  return `${ROUTES_PATH.RECIPE.split(':')[0]}${id}`
}

onMounted(fetchRecipes)
</script>

<template>
  <Layout>
    <template #title><h1>Рецепты</h1></template>
    <template #controles
      ><el-button type="primary">
        <router-link :to="getPath()">Добавить рецепт</router-link></el-button
      ></template
    >
    <template #content>
      <el-table :data="recipes" style="width: 100%">
        <el-table-column prop="idMeal" label="Id"> </el-table-column>
        <el-table-column label="Image">
          <template #default="scope">
            <router-link :to="getPath(scope.row.idMeal)">
              <el-image :src="scope.row.strMealThumb" class="image" lazy />
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="strMeal" label="Name"> </el-table-column>
        <el-table-column prop="strArea" label="Area"> </el-table-column>
        <el-table-column prop="strCategory" label="Category"> </el-table-column>
        <el-table-column prop="strTags" label="Tags">
          <template #default="scope">
            <template v-if="scope?.row?.strTags">
              <el-tag class="tag" v-for="(tag, key) in scope.row.strTags.split(',')" :key="key">{{
                tag
              }}</el-tag>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Layout>
</template>

<style lang="sass" scoped>
.tag
  margin: 2px 3px

.image
  width: 70px
  height: 70px
</style>
