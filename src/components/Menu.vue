<template>
  <el-menu default-active="2" :router="true" class="sidebar" :collapse="true">
    <el-menu-item :index="ROUTES_PATH.HOME">
      <el-icon><collection class="logo" /></el-icon>
    </el-menu-item>
    <el-menu-item
      :index="ROUTES_PATH.HOME"
      :class="['item', isPathActive(ROUTES_PATH.HOME) && 'active']"
    >
      <el-icon><food class="icon" /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item
      :index="ROUTES_PATH.CATEGORIES"
      :class="['item', isPathActive(ROUTES_PATH.CATEGORIES) && 'active']"
    >
      <el-icon><dish class="icon" /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import { Dish, Food } from '@element-plus/icons-vue'
import { Collection } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { ROUTES_PATH } from '@/constants'
const route = useRoute()

const isPathActive = (path) => {
  return route.fullPath === path
}
</script>

<style lang="sass">
@import '@/assets/index.sass'

.sidebar
  height: 100vh

.icon
  width: 30px

.item
  color: $violet

  &.active
    color: $pink

.logo
  width: 30px
</style>
