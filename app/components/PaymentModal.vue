<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="backdrop" @click.self="close">
        <div ref="modalRef" class="modal">
          <header class="modal-header">
            <h3>Select textbooks to be purchased</h3>
          </header>

          <form class="form" @submit.prevent="handleSubmit">
            <div class="contact_input_area">
              <div class="form-grid">
                <div class="form-group">
                  <input v-model="form.fullName" type="text" class="form-control" placeholder="Your Name" required />

                  <div class="field-half">
                    <input v-model="form.matricNo" type="text" class="form-control" placeholder="Matric Number" required />
                  </div>

                  <div class="field-half">
                    <input v-model="form.email" type="email" class="form-control" placeholder="E-mail" required />
                  </div>

                  <div class="field-half">
                    <input v-model="form.phone" type="text" class="form-control" placeholder="Your Number" required />
                  </div>
                </div>

                <div class="field-half multiselect-wrapper">
                  <div class="multiselect-box" @click="toggleDropdown">
                    <span v-if="form.selectedBooks.length === 0" class="multiselect-placeholder">Choose books</span>
                    <span v-for="book in form.selectedBooks" :key="book.id" class="multiselect-tag">
                      {{ book.title }}
                      <button type="button" @click.stop="removeBook(book)">✕</button>
                    </span>
                    <span class="multiselect-chevron">{{ dropdownOpen ? '▲' : '▼' }}</span>
                  </div>

                  <div v-if="dropdownOpen" class="multiselect-dropdown">
                    <div
                      v-for="book in bookOptions"
                      :key="book.id"
                      class="multiselect-option"
                      :class="{ selected: isSelected(book) }"
                      @click.stop="toggleBook(book)"
                    >
                      <span class="multiselect-check">{{ isSelected(book) ? '✓' : '' }}</span>
                      <span>{{ book.title }}</span>
                      <span class="book-price-tag">₦{{ book.price.toLocaleString() }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="form.selectedBooks.length > 0" class="total-display">
                <span>Total:</span>
                <strong>₦{{ totalAmount.toLocaleString() }}</strong>
              </div>

              <div class="text-center mt-3">
                <button type="submit" class="classic-btn" :disabled="isLoading || form.selectedBooks.length === 0" id="slide-text">
                  {{ isLoading ? 'Processing...' : 'Purchase Textbooks' }}
                  <i class="zmdi zmdi-long-arrow-right"></i>
                </button>
              </div>  
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const config = useRuntimeConfig() // ✅ capital C fixed

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const modalRef = ref(null)
const dropdownOpen = ref(false)
const isLoading = ref(false)
const bookOptions = ref([])

const form = ref({
  fullName: '',
  matricNo: '',
  email: '',
  phone: '',
  selectedBooks: []
})

const totalAmount = computed(() =>
  form.value.selectedBooks.reduce((sum, book) => sum + book.price, 0)
)

const isSelected = (book) =>
  form.value.selectedBooks.some(b => b.id === book.id)

const close = () => emit('update:modelValue', false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const toggleBook = (book) => {
  const idx = form.value.selectedBooks.findIndex(b => b.id === book.id)
  idx === -1
    ? form.value.selectedBooks.push(book)
    : form.value.selectedBooks.splice(idx, 1)
}

const removeBook = (book) => {
  form.value.selectedBooks = form.value.selectedBooks.filter(b => b.id !== book.id)
}

const handleOutsideClick = (e) => {
  if (!e.target.closest('.multiselect-wrapper')) dropdownOpen.value = false
}

onMounted(async () => {
  document.addEventListener('click', handleOutsideClick)
  try {
    // ✅ Uses NUXT_PUBLIC_API_URL from .env automatically
    const data = await $fetch(`${config.public.apiUrl}/api/v1/users/textbooks`)
    bookOptions.value = data
  } catch (err) {
    console.error('Could not load books:', err)
  }
})

onUnmounted(() => document.removeEventListener('click', handleOutsideClick))

const handleSubmit = async () => {
  if (form.value.selectedBooks.length === 0) return
  isLoading.value = true

  try {
    const token = localStorage.getItem('token')
    console.log('Token:', token) // ← check this in console

    if (!token) {
      alert('Please log in first before purchasing.')
      navigateTo('/')
      return
    }

    const response = await $fetch(`${config.public.apiUrl}/api/v1/users/payment/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: {
        fullName: form.value.fullName,
        matricNo: form.value.matricNo,
        email: form.value.email,
        phone: form.value.phone,
        books: form.value.selectedBooks.map(b => ({
          id: b.id,
          title: b.title,
          price: b.price
        })),
        totalAmount: totalAmount.value
      }
    })

    console.log('Payment response:', response) // ← check this too
    // Before redirecting to Paystack save the payment data
    localStorage.setItem('studentName', form.value.fullName)
    localStorage.setItem('pendingPayment', JSON.stringify({
      fullName: form.value.fullName,
      matricNo: form.value.matricNo,
      email: form.value.email,
      phone: form.value.phone,
      books: form.value.selectedBooks.map(b => ({
        id: b.id,
        title: b.title,
        price: b.price
      })),
      totalAmount: totalAmount.value
    }))

    window.location.href = response.url

  } catch (err) {
    console.error('Full error:', err) // ← see full error
    alert('Payment could not be started. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.backdrop {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  width: auto;
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  color: black;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: bold;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  color: #666;
}

.close-btn:hover {
  color: #000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-active .modal,
.fade-leave-active .modal {
  transition: transform 200ms ease, opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from .modal {
  transform: scale(0.95);
  opacity: 0;
}

.fade-leave-to .modal {
  transform: scale(0.95);
  opacity: 0;
}

form {
  display: flex;
  flex-direction: column;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
}

input {
  width: 70%;
  color: #333;
  background: #ffffff;
  border-bottom: 1px solid #ccc;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0px;
  outline: none;
}

.contact_input_area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input::placeholder {
  margin-bottom: 15px;
  color: rgb(87, 87, 87);
  outline: none;
}

.form-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  justify-content: center;
}

.classic-btn {
  color: white;
  border-radius: 2px;
  width: auto;
  left: 50% !important;
  transform: translateX(-50%) !important;
  position: relative;
  margin: 10px;
  padding: 10px 20px;
  background: linear-gradient(to right, white 50%, black 50%);
  background-size: 200%;
  background-position: right;
  border: 2px solid black;
  transition: background-position 0.4s ease, color 0.4s ease;
}

.classic-btn:hover {
  background-position: left;
  color: black;
}

.multiselect-wrapper {
  position: relative;
  width: 80%;
}

.multiselect-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  min-height: 42px;
  background: white;
}

.multiselect-placeholder {
  color: rgb(87, 87, 87);
  font-size: 14px;
}

.multiselect-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  padding: 2px 8px;
}

.multiselect-tag button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 11px;
  color: #666;
  padding: 0;
}

.multiselect-chevron {
  margin-left: auto;
  font-size: 11px;
  color: #666;
}

.multiselect-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 9999;
  overflow: hidden;
}

.multiselect-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  font-size: 14px;
  cursor: pointer;
}

.multiselect-option:hover {
  background: #f5f5f5;
}

.multiselect-option.selected {
  background: #f0f0f0;
}

.multiselect-check {
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  flex-shrink: 0;
}

.multiselect-option.selected .multiselect-check {
  background: black;
  border-color: black;
  color: white;
}

.book-price-tag {
  margin-left: auto;
  font-size: 12px;
  color: #666;
}

.total-display {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 12px;
  padding: 10px 14px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
}

@media (max-width: 600px) {
  .modal {
    width: 80%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid: none;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }

  input {
    width: 80%;
  }
}

@media (max-width: 400px) {
  .modal-header h3 {
    font-size: 1.2rem;
    width: 80%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }
}
</style>