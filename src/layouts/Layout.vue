<template>
  <main class="flex">
    <sidebar />
    <div class="container">
      <header class="header flex space-between align-center">
        <slot name="title"></slot>
        <slot name="controles"></slot>
      </header>

      <div>
        <slot name="content"></slot>
      </div>
    </div>
  </main>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<style lang="sass" scoped>
@import '@/assets/index.sass'

header
  margin-bottom: 20px
  border-bottom: 2px solid rgba($violet, 0.2)
</style>
