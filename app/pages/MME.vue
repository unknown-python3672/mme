 <template>
  <Navbar />
<PaymentModal v-model="isPaymentModalOpen" />
<div>
    <div class="parent">
      <h1 class="welcome">Welcome to MME</h1>
      <p>Purchase several textbooks easily, fast, and online from the comfort of your home.</p>
    </div>
    <div class="group-slide">
      <div class="row">
        <div class="book1">
          <p class="hidden">physics</p>
          <img src="/yyy.jpg" alt="physics" />
        </div>
          <div class="book1">
          <p class="hidden">GST11</p>
          <img src="/yyy.jpg" alt="GST11" />
        </div>        
        <div class="book1">
          <p class="hidden">chemistry</p>
          <img src="/yyy.jpg" alt="chemistry" />
        </div>
          <div class="book1">
          <p class="hidden">MATH103</p>
          <img src="/yyy.jpg" alt="MATH103" />
        </div>
      </div>
      
      <div class="row">
         <div class="book1">
          <p class="hidden">math</p>
          <img src="/yyy.jpg" alt="math" />
        </div>
          <div class="book1">
          <p class="hidden">physics</p>
          <img src="/yyy.jpg" alt="physics" />
        </div>
        <div class="book1">
          <p class="hidden">computer science</p>
          <img src="/yyy.jpg" alt="computer science" />
        </div>
        <div class="book1">
          <p class="hidden">english</p>
          <img src="/yyy.jpg" alt="english" />
        </div>
      </div>
    </div>
  </div>
  <button 
  class="but1"
  @click="openPaymentModal()"
  >Purchase Now! </button>
</template>

<script setup>
import '../assets/css/main.css';
import PaymentModal from '../components/PaymentModal.vue'
import { provide, ref } from 'vue'

const isPaymentModalOpen = ref(false)

const openPaymentModal = () => {
  console.log("Opening payment modal")
  isPaymentModalOpen.value = true
}

</script>

<style scoped>
</style>