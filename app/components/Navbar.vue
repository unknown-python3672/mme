<template>
  <PaymentModal v-model="isPaymentModalOpen" />
  <nav>
    <div class="nav-inner">
      <!-- Title -->
      <div class="title">METAL AND METALLURGICAL ENGINEERING</div>

      <div class="center-links">
        <nuxt-link to="/MME">Home</nuxt-link>
        <nuxt-link to="/MME">MME</nuxt-link>
      </div>

      <div class="nav-right">
        <button class="purchase-btn" @click="openPaymentModal()">Purchase</button>
        <div class="hamburger" @click="toggleMenu" :class="{ active: isOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <div class="mobile-menu" :class="{ open: isOpen }">
      <nuxt-link to="/MME" @click="isOpen = false">Home</nuxt-link>
      <nuxt-link to="/MME" @click="isOpen = false">MME</nuxt-link>
      <button @click="openPaymentModal(); isOpen = false">Purchase</button>
    </div>
  </nav>
</template>

<style lang="css" scoped>
nav {
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
}


.title {
  color: black;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  max-width: 200px;
}

.center-links {
  display: flex;
  gap: 35px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.center-links a,
a {
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.purchase-btn {
  background: linear-gradient(to right, rgba(255,255,255,0.9) 50%, #007BFF 50%);
  background-size: 200% 100%;
  background-position: right;
  border: 1px solid #007BFF;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  padding: 6px 14px;
  font-size: 14px;
  transition: background-position 0.4s ease, color 0.4s ease;
}

.purchase-btn:hover {
  background-position: left;
  border: 1px solid black;
  color: black;
}

.hamburger {
  display: none;         
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: black;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Animate hamburger → X when active */
.hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Mobile menu: hidden by default ── */
.mobile-menu {
  display: none;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  background: white;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s ease, padding 0.35s ease;
}

.mobile-menu.open {
  max-height: 300px;
  padding: 10px 20px 16px;
}

.mobile-menu a {
  padding: 10px 0;
  font-size: 16px;
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  color: black;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
}

.mobile-menu button {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
}

@media (max-width: 600px) {
  .center-links {
    display: none;       
  }

  .purchase-btn {
    display: none;       
  }

  .hamburger {
    display: flex;      
  }

  .mobile-menu {
    display: flex;      
  }
}
</style>

<script setup>
import PaymentModal from '../components/PaymentModal.vue'
import { ref } from 'vue'

const isPaymentModalOpen = ref(false)
const isOpen = ref(false)        // ← renamed from isopen for clarity

const openPaymentModal = () => {
  console.log("Opened payment modal from navbar")
  isPaymentModalOpen.value = true
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>