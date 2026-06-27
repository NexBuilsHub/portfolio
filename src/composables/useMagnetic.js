import { ref, onMounted, onUnmounted } from 'vue'

export function useMagnetic(elRef, strength = 0.35) {
  const x = ref(0)
  const y = ref(0)

  const onMove = (e) => {
    const el = elRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.value = (e.clientX - centerX) * strength
    y.value = (e.clientY - centerY) * strength
  }

  const onLeave = () => {
    x.value = 0
    y.value = 0
  }

  onMounted(() => {
    const el = elRef.value
    if (!el) return
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
  })

  onUnmounted(() => {
    const el = elRef.value
    if (!el) return
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  })

  return { x, y }
}
