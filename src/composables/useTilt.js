import { ref, onMounted, onUnmounted } from 'vue'

export function useTilt(elRef, maxTilt = 12) {
  const rotateX = ref(0)
  const rotateY = ref(0)

  const onMove = (e) => {
    const el = elRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.value = px * maxTilt
    rotateX.value = -py * maxTilt
  }

  const onLeave = () => {
    rotateX.value = 0
    rotateY.value = 0
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

  return { rotateX, rotateY }
}
