<script setup>
import { onMounted, ref } from 'vue'
import Layout from '@/layouts/Layout.vue'
import { getRecipesByLetter } from '@/services/RecipeServices'
</script>

<template>
  <Layout>
    <template #title><h1>Категории</h1></template>
    <template #controles><el-button type="primary">Добавить категорию</el-button></template>
    <template #content></template>
  </Layout>
</template>
