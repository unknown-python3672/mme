<template>
  <div class="login-page">
    <h1>Welcome</h1>
    <p>Log in to purchase your own textbooks</p>
    <form class="login-form" @submit.prevent="submit">
      <input type="text" placeholder="Username" v-model="username" required />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit">Log In</button>
      <NuxtLink to="/create-account" class="acc">Create account</NuxtLink>     
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const submit = () => {
  console.log(username.value, password.value)

if(username.value.trim() ===  "odinakasamson28" && password.value.trim() === "password123"){
    navigateTo("/MME")
  }
    else{
       alert("access denied")
    }
  }
  
</script>

<style>

</style>