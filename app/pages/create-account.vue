<template>
  <div class="login-page">
    <h1>Welcome</h1>
    <p>Create your account to purchase your own textbooks</p>
    <form class="login-form" @submit.prevent="handleRegister">
      <input type="text" placeholder="Full name" v-model="name" required />
      <input type="email" placeholder="Email" v-model="email" required />
      <input type="text" placeholder="phone number" v-model="phone" required />
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
const phone = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const validateForm = () => {
    // matric number regex
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!name.value || name.value.trim().length < 2) {
        errorMessage.value = 'Name must be at least 2 characters'
        return false
    }
    if (!emailRegex.test(email.value)) {
        errorMessage.value = 'Invalid email format'
        return false
    }

    if (!password.value || password.value.length < 8) {
        errorMessage.value = 'Password must be at least 8 characters'
        return false
    }
    return true
}

const handleRegister = async () => {
  errorMessage.value = ''
  if (!validateForm()) {
    return
  } 
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await registerUser({
      name: name.value,
      email: email.value,
      matricNumber: matricNumber.value,
      phone: phone.value,
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

<style scoped>
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

.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  background-color: #eae9e9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.404);
  justify-content:space-around;
  padding:15px;
  border-radius: 8px;
}
</style>