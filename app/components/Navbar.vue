<template>
  <PaymentModal v-model="isPaymentModalOpen" />
  <nav ref="nav">
    <div class="nav-inner">
      <!-- Title -->
      <div class="title">MATERIAL AND METALLURGICAL ENGINEERING</div>

      <div class="center-links">
        <nuxt-link to="/MME">Home</nuxt-link>
        <nuxt-link to="/AboutUs">MME</nuxt-link>
        <div v-if="user?.role === 'Admin'"
         class="dropdown" 
         @mouseenter="open = true"
          @mouseleave="open = false">
          <button class="dropdown-toggle"> Admin ▼ </button>
          <Transition name="dropdown">
        <ul v-if="open" class="dropdown-menu">
          <li><nuxt-link to="/admin/get-users">Get Users</nuxt-link></li>
          <li><nuxt-link to="/admin/payment-history">Payment History</nuxt-link></li>
        </ul>
          </Transition>
      </div>
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
      <nuxt-link to="/AboutUs" @click="isOpen = false">About Us</nuxt-link>
      <nuxt-link v-if="user?.role === 'Admin'" to="/admin/get-users" @click="isOpen = false">Admin</nuxt-link>
      <button @click="openPaymentModal(); isOpen = false">Purchase</button>
    </div>
  </nav>
</template>

<style lang="css" scoped>
nav {
  margin: 20px;
  width: calc(100% - 40px);
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.525);
  position: relative;
  z-index: 1;
  border-radius: 10px;
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  transform: translateY(0);
  transition: 0.1 ease;
}

.dropdown{
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  border-radius: 4px;
  overflow: hidden;
  list-style: none;
  padding: 0; 
  margin: 0;    
  list-style: none;
}

.dropdown-toggle{
  cursor: pointer;
  background: none;
  border: none;
}
.dropdown-toggle:hover {
  color: #007BFF;
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;;

}

.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background: #f0f0f0;
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PaymentModal from '../components/PaymentModal.vue'

const open = ref(false)
const handleDropdown = () => {
  open.value = !open.value
}
const toggleDropdown = () => {
  open.value = !open.value
}

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 600
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  window.addEventListener('scroll', handleScroll)

})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('scroll', handleScroll)
})

const user = useCookie('user')

const handleLogout = () =>{
  user.value = null
  const token =useCookie('token')
  token.value = null
}

const isPaymentModalOpen = ref(false)
const isOpen = ref(false)
const nav = ref(null)

const openPaymentModal = () => {
  isPaymentModalOpen.value = true
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleScroll = () => {
  if (!nav.value) return

  const scrollY = window.scrollY
  const threshold = 40 // The scroll point where it should become "fixed"

  if (scrollY < threshold) {
    // Phase 1: Parallax (0.5x speed)
    const translateY = scrollY * 0.5
    nav.value.style.transform = `translateY(${translateY}px)`
    nav.value.style.position = 'relative'
    nav.value.style.top = '0'
  } else {
    // Phase 2: "Fixed" (1.0x speed)
    // We calculate the position it was at the threshold (40 * 0.5 = 20)
    // Then add the difference in scroll to stay "pinned" at the top
    const basePos = threshold * 0.5
    const extra = (scrollY - threshold)
    nav.value.style.transform = `translateY(${basePos + extra}px)`
    
    // Optional: add a class for styling when "fixed" (e.g., removing border-radius)
  }
}

#
</script>