<template>
  <div class="login-page">
    <h1>Welcome</h1>
    <p>Log in to purchase your own textbooks</p>
    <form class="login-form" @submit.prevent="handleLogin">
      <input type="text" placeholder="Username" v-model="username" required />
      <input type="email" placeholder="Email" v-model="email" required />
      <input type="password" placeholder="Password" v-model="password" />
      <button type="submit" @click="submit">Sign up</button> 
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('')
const password = ref('')

const submit = () => {
  if(username.value.trim() ===  "odinakasamson28" && password.value.trim() === "password123"){
    navigateTo('/MME')
  }
    else{
       alert("access denied")
    }
  }

const handleLogin = () => {
  console.log(username.value, password.value)
}
</script>

<style>
button{
  background-color: rgb(15, 77, 15);
  position: absolute;
  left: 50%;
  border-radius: 20px;
  border: 1px solid black;
  width: 100px;
  height: 40px;
}
</style>
