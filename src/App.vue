<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRootStore } from './stores/root'

const rootStore = useRootStore()

onMounted(() => {
  rootStore.getAreas()
  rootStore.getCategories()
  rootStore.getIngredients()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
