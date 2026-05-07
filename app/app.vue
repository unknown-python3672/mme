<template>      
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
<style>
</style>
<script setup>
import { provide, ref } from 'vue'
import '../assets/css/main.css';

import AOS from 'aos'

const router = useRouter()
router.afterEach(() => {
  setTimeout(() => AOS.refresh(), 100)
})
</script>