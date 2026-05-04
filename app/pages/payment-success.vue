<template>
  <div class="success-page">
    <div class="success-card">
      <div class="icon">✅</div>
      <h1>Payment Successful!</h1>
      <p>Thank you <strong>{{ studentName }}</strong> for your purchase.</p>
      <p class="ref">Reference: {{ reference }}</p>

      <button
        class="download-btn"
        @click="downloadReceipt"
        :disabled="downloading"
      >
        {{ downloading ? 'Generating PDF...' : '⬇ Download Receipt' }}
      </button>

      <NuxtLink to="/MME" class="back-link">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const route = useRoute()
const downloading = ref(false)
const studentName = ref('')
const reference = ref('')

// ✅ Only access localStorage inside onMounted
// This prevents the 500 error because localStorage
// only exists in the browser not on the server
onMounted(() => {
  studentName.value = localStorage.getItem('studentName') || 'Student'
  reference.value = route.query.reference || route.query.trxref || ''
})

const downloadReceipt = async () => {
  downloading.value = true
  try {
    const token = localStorage.getItem('token')
    const paymentData = JSON.parse(localStorage.getItem('pendingPayment') || '{}')

    if (!paymentData.fullName) {
      alert('Payment data not found. Please contact support.')
      return
    }

    const response = await fetch(
      `${config.public.apiUrl}/api/v1/users/receipt/download`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...paymentData,
          reference: reference.value
        })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to generate receipt')
    }

    // ✅ Download PDF automatically
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `receipt_${reference.value}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    // ✅ Clean up localStorage after download
    localStorage.removeItem('pendingPayment')
    localStorage.removeItem('studentName')

  } catch (err) {
    console.error('Receipt error:', err)
    alert('Could not generate receipt. Please try again.')
  } finally {
    downloading.value = false
  }
}
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.success-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.icon {
  font-size: 60px;
}

h1 {
  font-size: 28px;
  color: #333;
  margin: 0;
}

p {
  color: #666;
  margin: 0;
  font-size: 15px;
}

.ref {
  font-size: 12px;
  color: #999;
  background: #f5f5f5;
  padding: 6px 12px;
  border-radius: 4px;
}

.download-btn {
  width: 100%;
  padding: 14px;
  background: black;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.3s ease;
}

.download-btn:hover {
  background: #333;
}

.download-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-link {
  display: block;
  color: #666;
  text-decoration: underline;
  font-size: 14px;
  margin-top: 4px;
}

@media (max-width: 600px) {
  .success-card {
    padding: 24px 16px;
  }

  h1 {
    font-size: 22px;
  }
}
</style>