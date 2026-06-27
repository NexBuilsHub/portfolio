<template>
  <div
    v-if="active"
    class="pointer-events-none fixed inset-0 z-[9999]"
    aria-hidden="true"
  >
    <div
      class="absolute w-2 h-2 rounded-full bg-accent-cyan -translate-x-1/2 -translate-y-1/2 transition-transform duration-150"
      :style="{ left: `${x}px`, top: `${y}px`, transform: `translate(-50%, -50%) scale(${hovering ? 0.5 : 1})` }"
    />
    <div
      class="absolute rounded-full border transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
      :class="hovering ? 'w-12 h-12 border-accent-violet bg-accent-violet/10' : 'w-8 h-8 border-white/30'"
      :style="{ left: `${x}px`, top: `${y}px` }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useReducedMotion } from '../../composables/useReducedMotion'

const x = ref(0)
const y = ref(0)
const hovering = ref(false)
const active = ref(false)

const isFinePointer = useMediaQuery('(pointer: fine)')
const { prefersReducedMotion } = useReducedMotion()

const onMove = (e) => {
  x.value = e.clientX
  y.value = e.clientY
}

const onOver = (e) => {
  const target = e.target.closest('a, button, .interactive, [data-cursor]')
  hovering.value = !!target
}

onMounted(() => {
  if (!isFinePointer.value || prefersReducedMotion.value) return
  active.value = true
  document.body.classList.add('custom-cursor-active')
  window.addEventListener('mousemove', onMove)
  document.addEventListener('mouseover', onOver)
})

onUnmounted(() => {
  document.body.classList.remove('custom-cursor-active')
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseover', onOver)
})
</script>
