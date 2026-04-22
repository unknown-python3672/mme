<template>
  <div class="login-page">
    <h1>Welcome</h1>
    <p>Log in to purchase your own textbooks</p>
    <form class="login-form" @submit.prevent="handleLogin">
      <input type="email" placeholder="Your email" v-model="email" required />
      <input type="password" placeholder="Password" v-model="password" />
      <button class="but2" type="submit">{{ loading ? 'Logging in...' : 'Log In' }}</button>
      </form>
     <NuxtLink to="/create-account" class="acc">Create account</NuxtLink>  
     
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import{ loginUser } from '~/services/authService.js'

const email = ref('')
const password = ref('')
const loading  = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {

  console.log('Sending:', {
  email: email.value,
  password: password.value
})

  loading.value = true
  errorMessage.value = ''

  try {
     const { token } = await loginUser({
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', token)

    navigateTo('/MME')

  } catch (error) {
    errorMessage.value = error.response?.data || error.message || 'Invalid email or password'
  } finally {
    loading.value = false
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