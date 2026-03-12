<template>
  <nav class="navbar">
    <div class="logo">
      <NuxtLink to="/">CompanyName</NuxtLink>
    </div>

    <ul :class="['nav-links', { active: isMenuOpen }]">
      <li>
        <NuxtLink to="/" @click="closeMenu">Home</NuxtLink>
      </li>

      <li>
        <NuxtLink to="/projects" @click="closeMenu">Projects</NuxtLink>
      </li>

      <li>
        <NuxtLink to="/team" @click="closeMenu">Team</NuxtLink>
      </li>

    <li>
    <button class="menu-btn" @click="toggleMenu">
      ☰
    </button>
    </li>
      <li>
        <button class="contact-btn" @click="contactClick">
          Contact
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function contactClick() {
  alert("Contact button clicked")
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: space-between;  
  padding: 0 25px;
  z-index: 1000;
}

.logo a {
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 30px;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 15px;
}

.nav-links a:hover {
  color: #00ff99;
}

.contact-btn {
  background: #00ff99;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer; 
  width: 100px;
  position: absolute;
  left:  90%;
}

.menu-btn {
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* Mobile */

@media (max-width: 768px) {

  .menu-btn {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 60px;
    right: -100%;
    width: 220px;
    height: 100vh;
    background: #111;
    flex-direction: column;
    padding-top: 30px;
    transition: right 0.3s ease;
  }

  .nav-links.active {
    right: 0;
  }

}
</style>