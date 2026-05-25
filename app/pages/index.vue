<template>
  <div class="login-page">
    <h1>Welcome</h1>
    <p>Log in to purchase your own textbooks</p>
    <form class="login-form" @submit.prevent="handleLogin">
      <input type="email" placeholder="Your email" v-model="email" required />
      <input type="password" placeholder="Password" v-model="password" />
      
      <p v-if="errorMessage" style="color: red; font-size: 14px;">{{ errorMessage }}</p>

      <button class="but2" type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Log In' }}
      </button>
    </form>
    <NuxtLink to="/create-account" class="acc">Create account</NuxtLink>  
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { loginUser } from '~/services/authService.js'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const data = await loginUser({
      email: email.value,
      password: password.value
    })

    const token =useCookie('token')
    const user =useCookie('user')

    token.value = data.accessToken
    user.value = data.user

    await nextTick()
    navigateTo('/MME')

  } catch (error) {
    // ✅ Uses the clean message from interceptor
    errorMessage.value = error.userMessage || 'Login failed'
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