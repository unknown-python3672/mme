<template>
  <div class="magic-container">
    <div v-if="loading" class="loader-box">
      <div class="spinner"></div>
      <p>Verifying your secure access link...</p>
    </div>

    <div v-if="error" class="error-box">
      <h2>Access Denied</h2>
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const route = useRoute();
const config = useRuntimeConfig();
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');

onMounted(async () => {
  // 1. Grab the token from URL query params (?token=XYZ)
  const magicToken = route.query.token;

  if (!magicToken) {
    loading.value = false;
    error.value = true;
    errorMessage.value = 'Security token is missing from this link.';
    return;
  }

  try {
    const data = await $fetch(`${config.public.apiUrl}/auth/auto-login`, {
      method: 'GET',
      params: { token: magicToken }
    });

    // 3. Save session info to localStorage (Safe inside onMounted because it's browser-only)
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', typeof data.user === 'string' ? data.user : JSON.stringify(data.user));

    // 4. Redirect smoothly to your dashboard page using Nuxt's navigateTo
    await navigateTo('/MME');

  } catch (err) {
    loading.value = false;
    error.value = true;
    
    // Catching error messages cleanly from your Spring Boot Backend
    if (err.data && err.data.error) {
      errorMessage.value = err.data.error;
    } else {
      errorMessage.value = 'Authentication failed. Please request a new link.';
    }
  }
});
</script>

<style scoped>
.magic-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: system-ui, sans-serif;
}
.loader-box, .error-box {
  text-align: center;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 0.8s infinite linear;
  margin: 0 auto 15px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.error-box { color: #ff7675; }
</style>