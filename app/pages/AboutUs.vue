<template>
  <div class="body">
    <Navbar />
    <div class="wrapper">
        <div class="left fade-element" style="transition-delay: 0s">
            <h3 class="left-head">About the Department</h3>
            <p>
                The Department of Materials and Metallurgical Engineering at MMU is dedicated to shaping innovators who understand the science of materials and the technology of metals.
            </p>
            <p>
                Students here explore how materials are designed, processed, and applied to solve real-world challenges in industries such as manufacturing, energy, aerospace, and healthcare.
            </p>

            <h3 class="left-head">About the Website</h3>
            <p>
                This platform is designed to make student life easier by providing quick access to textbooks, study guides, and essential learning materials.
                Whether you’re preparing for exams, working on projects, or deepening your knowledge, the website is your one-stop shop for academic resources tailored to MME students.
            </p>
        </div>
        
        <div class="right fade-element" style="transition-delay: 0.2s">
          <div class="img-cover">
            <img src="/MME2.png" />
          </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
.body{
    background: linear-gradient(to bottom,  #007BFF, #0040a0);
    padding-top:  5px;
    overflow: hidden;
}
.wrapper{
    overflow: hidden;
    padding: 40px;
    display: flex;
    gap: 40px;
    min-height: 100vh;
    justify-content: space-between;
}

.left{
    width: 50%;
    color: white;
}

.left-head{
    text-decoration: underline;
    font-family: 'roboto', sans-serif;
    font-size: 19px;

}

.right{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
img{
    padding-left: 80px;
    width: 50%;
    /* max-width: 480px; */

}
.left-head{
    margin-top: 20px;
}
</style>

<script>

import { ref, onMounted } from 'vue'

const leftSection = ref(null)
const rightSection = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 }) // triggers when 10% of element is visible

  // Observe each element
  observer.observe(leftSection.value)
  observer.observe(rightSection.value)
})
</script>