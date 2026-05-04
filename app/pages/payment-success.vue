<template>
  <div class="success-page">
    <div class="success-card">
      <div class="icon">✅</div>
      <h1>Payment Successful!</h1>
      <p>Thank you {{ studentName }} for your purchase.</p>
      <p class="ref">Reference: {{ reference }}</p>

      <button 
        class="download-btn" 
        @click="downloadReceipt" 
        :disabled="downloading">
        {{ downloading ? 'Generating PDF...' : '⬇ Download Receipt' }}
      </button>

      <NuxtLink to="/MME" class="back-link">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const downloading = ref(false)

// Get data from localStorage that was saved before payment
const studentName = ref(localStorage.getItem('studentName') || '')
const reference = ref(route.query.reference || localStorage.getItem('paymentReference') || '')

const downloadReceipt = async () => {
  downloading.value = true
  try {
    const token = localStorage.getItem('token')
    
    // Get saved payment data
    const paymentData = JSON.parse(localStorage.getItem('pendingPayment') || '{}')

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

    // Download the PDF
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `receipt_${reference.value}.pdf`
    link.click()
    window.URL.revokeObjectURL(url)

  } catch (err) {
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
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  max-width: 500px;
  width: 90%;
}

.icon {
  font-size: 60px;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #333;
}

p {
  color: #666;
  margin-bottom: 8px;
}

.ref {
  font-size: 13px;
  color: #999;
  margin-bottom: 24px;
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
  margin-bottom: 16px;
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
}
</style>