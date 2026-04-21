<template>
  <div class="login-page">
    <h1>Welcome</h1>
    <p>Log in to purchase your own textbooks</p>
    <form class="login-form" @submit.prevent="submit">
      <input type="text" placeholder="REG no: 202515341552" v-model="username" required />
      <input type="password" placeholder="Password" v-model="password" />
      <button class="but2" type="submit">Log In</button>
      </form>
     <NuxtLink to="/create-account" class="acc">Create account</NuxtLink>  
     
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

<style scoped>
.acc {
    color: rgba(0, 0, 0, 0.954);
    position: absolute;
    left: 70%;
    top: 80%;
    display: block;
    text-decoration: underline;
}
</style>