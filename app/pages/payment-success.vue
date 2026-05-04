<template>
  <div class="success-page">
    <div class="success-card">
      <div class="anim-box">
        <div ref="animRef" class="anim"></div>
      </div>
      <h1 class="payment-h1">Payment Successful!</h1>
      <p id="pay-p">Thank you <strong>{{ studentName }}</strong> for your purchase.</p>
      <p id="pay-p" class="ref">Reference: {{ reference }}</p>

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

const animRef =ref(null);

onMounted(async () => {
  const lottie =(await import("lottie-web")).default;

  lottie.loadAnimation({
    container: animRef.value,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "https://lottie.host/a9b3a051-bcea-4e07-ad6a-c635799607c1/fpp4kLmDMO.json"
  });
});
</script>

<style scoped>
.anim-box {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.anim{
  width: 100%;
  height: 100%;
}
</style>