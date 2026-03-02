<template>
  <div class="login-page">
    <h1>Welcome</h1>
    <p>Log in to purchase your own textbooks</p>
    <form class="login-form" @submit.prevent="handleLogin">
      <input type="text" placeholder="Username" v-model="username" required />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit">Log In</button>
      <NuxtLink to="/create-account" class="acc">Create account</NuxtLink>     
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import './assets/logincss.css'

const username = ref('')
const password = ref('')

const handleLogin = () => {
  console.log(username.value, password.value)
}
</script>
