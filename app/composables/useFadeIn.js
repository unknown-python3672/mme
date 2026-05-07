
/*import { onMounted } from 'vue'

export function useFadeIn(refs) {
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    refs.forEach(r => {
      if (r.value) observer.observe(r.value)
    })
  })
}*/