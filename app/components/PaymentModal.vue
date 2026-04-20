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
    <input v-model="form.matricNo" type="number" class="form-control" placeholder="Matric Number" required />
  </div>

  <div class="field-half">
    <input v-model="form.email" type="email" class="form-control" placeholder="E-mail" required />
  </div>

  <div class="field-half">
    <input v-model="form.phone" type="text" class="form-control" placeholder="Your Number" required />
  </div>
</div>
  <div class="field-half">
    <select v-model="form.booktype" class="form-control" required>
      <option disabled value="">Choose a book</option>
      <option value="Math101">Math101</option>
      <option value="Physics">Physics</option>
      <option value="Chemistry">Chemistry</option>
      <option value="Biology">Biology</option>
    </select>
  </div>
</div>                                                        

              <div class="text-center mt-3">
                <button type="submit" class="classic-btn" :disabled="isLoading" id="slide-text">
                  {{ isLoading ? 'Processing...' : 'Purchase Tickets' }}
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
import { ref } from 'vue'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const modalRef = ref(null)

const form = ref({
  fullName: '',
  matricNo: '',
  email: '',
  phone: '',
  booktype: ''
})

const isLoading = ref(false)

const close = () => {
  emit('update:modelValue', false)
}

const handleSubmit = () => {
  isLoading.value = true
  setTimeout(() => {
    alert(`Thank you, ${form.value.fullName}! Your book purchase of "${form.value.booktype}" has been processed.`)
    isLoading.value = false
    // Reset form
    form.value = { fullName: '', matricNo: '', email: '', phone: '', booktype: '' }
    close()
  }, 2000)
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
  color: red;
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

/* Fade transition */
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
select {
    width: 80%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    right: 50%;
    left: 50%;
    position:relative;
    transform: translate(-50%);

}

input{
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

input::placeholder{
  margin-bottom: 15px;
  color: rgb(87, 87, 87);outline: none;
}

.form-group{
display: grid;
grid-template-columns: 1fr 1fr;
gap: 5px;
justify-content: center;
}
.classic-btn {
  color: white;
  border-radius: 2px;
  width: auto;
  left: 50%;
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
  color: black; /* text flips to black when white bg slides in */
}

</style>


the left is significantly higher than the right