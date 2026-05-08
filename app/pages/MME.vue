 <template>
  <Navbar />
<PaymentModal v-model="isPaymentModalOpen" />
<div>
  <div data-aos="fade-down">
      <div class="note" data-aos="fade-down">
          <h2>MME Textbook Store</h2>
        <p>MME is an online textbook store that offers a wide range of textbooks for students of all levels. We provide a convenient and efficient way for students to purchase their textbooks online, saving them time and effort. With our user-friendly website and secure payment options, students can easily browse through our extensive collection of textbooks, select the ones they need, and have them delivered right to their doorstep. At MME, we are committed to providing high-quality textbooks at competitive prices, ensuring that students have access to the resources they need for their academic success.</p>
        <spam>100+ level courses</spam>
        </div>
    <div class="parent" data-aos="fade-down">
      <h1 class="welcome">Welcome to MME</h1>
      <p>Purchase several textbooks easily, fast, and online from the comfort of your home.</p>
    </div>
    </div>
    <div class="group-slide">
     <div class="slider" data-aos="fade-left">
      <div class="row">
        <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">physics104</p>
          <img src="/physics.jpg" alt="physics" />
        </div>
          <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">GST112</p>
          <img src="/get112.png" alt="GST112" />
        </div>        
        <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">CHEMISTRY102/108</p>
          <img src="/chemistry.jpg" alt="chemistry" />
        </div>
          <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">MATH102</p>
          <img src="/math.jpg" alt="MATH102" />
        </div>
      </div>
      </div>


      <div class="slider" data-aos="fade-right">
      <div class="row">
         <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">IGBO102</p>
          <img src="/igbo.png" alt="IGBO" />
        </div>
          <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">FRENCH102</p>
          <img src="/french.png" alt="FRENCH" />
        </div>
        <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">ENGLISH 102</p>
          <img src="/english 102.png" alt="ENGLISH" />
        </div>
        <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">STATISCS 112</p>
          <img src="/statistics.png" alt="STATISTICS" />
        </div>
        </div>
    </div>

      <div class="slider" data-aos="fade-up">
      <div class="row">
         <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">GET 102</p>
          <img src="/GET 102.png" alt="math" />
        </div>
          <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">MME 102</p>
          <img src="/MME.png" alt="MME" />
        </div>
        <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">PHYSICS 102</p>
          <img src="/102.png" alt="PHYSICS" />
        </div>
        <div class="book1" @dblclick="openPaymentModal">
          <p class="hidden">GET 108</p>
          <img src="/get.png" alt="GET" />
        </div>
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
img{
  width: 250 px;
  height: 250px;
}
</style>