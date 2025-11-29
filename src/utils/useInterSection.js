
import { ref, onMounted, onBeforeUnmount } from 'vue'

export const useIntersection = (targetRef, options = {}) => {
  const isVisible = ref(false)

  let observer

  const callback = (entries) => {
    if (!entries[0]) return
    if (entries[0].isIntersecting) {
      isVisible.value = true
      // Kalau hanya ingin animasi sekali, bisa unobserve
      observer.unobserve(entries[0].target)
    }
  }

  onMounted(() => {
    observer = new IntersectionObserver(callback, {
      threshold: 0.2,
      ...options
    })
    if (targetRef.value) {
      observer.observe(targetRef.value)
    }
  })

  onBeforeUnmount(() => {
    if (observer && targetRef.value) {
      observer.unobserve(targetRef.value)
    }
  })

  return { isVisible }
}
