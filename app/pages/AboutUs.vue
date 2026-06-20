<template>
  <div class="about-page">
    <Navbar />
    <section class="about-section">
      <div class="about-content" data-aos="fade-right" style="--aos-delay: 0s">
        <div class="text-block">
          <h2 class="section-title">About the Department</h2>
          <p class="section-text">
            The Department of Materials and Metallurgical Engineering at MMU is dedicated to shaping innovators who understand the science of materials and the technology of metals.
          </p>
          <p class="section-text">
            Students here explore how materials are designed, processed, and applied to solve real-world challenges in industries such as manufacturing, energy, aerospace, and healthcare.
          </p>
        </div>

        <div class="text-block">
          <h2 class="section-title">About the Website</h2>
          <p class="section-text">
            This platform is designed to make student life easier by providing quick access to textbooks, study guides, and essential learning materials.
            Whether you're preparing for exams, working on projects, or deepening your knowledge, the website is your one-stop shop for academic resources tailored to MME students.
          </p>
        </div>
      </div>
        
      <div class="about-image" data-aos="fade-left" style="--aos-delay: 0.2s">
        <div class="image-container">
          <img src="/MME2.png" alt="MME Department" loading="lazy" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  background: linear-gradient(135deg, #007bff 0%, #0040a0 100%);
  min-height: 100vh;
  overflow: hidden;
}

.about-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  padding: 60px 40px;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
}

.about-content {
  flex: 1;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.text-block {
  animation-duration: 0.6s;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 8px;
  margin-bottom: 16px;
}

.section-text {
  font-size: 1rem;
  line-height: 1.8;
  font-family: 'Roboto', sans-serif;
  opacity: 0.95;
}

.about-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  width: 100%;
  max-width: 400px;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-section {
    flex-direction: column;
    gap: 40px;
    padding: 40px 20px;
  }

  .about-content,
  .about-image {
    flex: 1 1 100%;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-text {
    font-size: 0.95rem;
  }

  .image-container {
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 30px 16px;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .section-text {
    font-size: 0.9rem;
    line-height: 1.6;
  }
}
</style>

<script setup></script>