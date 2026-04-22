<template>
  <div class="login-page">
    <h1>Welcome</h1>
    <p>Create your account to purchase your own textbooks</p>
    <form class="login-form" @submit.prevent="handleRegister">
      <input type="text" placeholder="Full name" v-model="name" required />
      <input type="email" placeholder="Email" v-model="email" required />
      <input type="text" placeholder="Matric number" v-model="matricNumber" required />
      <input type="password" placeholder="Password" v-model="password" required />

      <p v-if="errorMessage" style="color: red; font-size: 14px;">{{ errorMessage }}</p>
      <p v-if="successMessage" style="color: green; font-size: 14px;">{{ successMessage }}</p>

      <button class="but2" type="submit" :disabled="loading">
        {{ loading ? 'Creating account...' : 'Sign up' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '~/services/authService.js'

const router = useRouter()

const name = ref('')
const email = ref('')
const matricNumber = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await registerUser({
      name: name.value,
      email: email.value,
      matricNumber: matricNumber.value,
      password: password.value
    })

    successMessage.value = 'Account created successfully! Redirecting to login...'
    setTimeout(() => router.push('/'), 2000)

  } catch (error) {
    errorMessage.value = error.response?.data || error.message|| 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>

<style>
.sign-up {
  background-color: rgb(15, 77, 15);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  border: 1px solid black;
  width: 100px;
  height: 40px;
}
</style>