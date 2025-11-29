<template>
  <!-- Layout global -->
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<script setup>
// Membungkus semua halaman dengan MainLayout
import { RouterView } from 'vue-router'
import MainLayout from '@/components/layout/MainLayout.vue'
</script>
