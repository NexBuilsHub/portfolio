<template>
  <div
    ref="stackRef"
    class="certificate-stack relative w-full mx-auto pb-10 cursor-grab active:cursor-grabbing"
    :class="{ 'cursor-grabbing': isDragging }"
    :style="{ height: `${containerHeight}px` }"
    @mouseenter="pause"
    @mouseleave="onMouseLeave"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <div
      v-for="(cert, index) in certificates"
      :key="cert.id"
      class="certificate-card absolute inset-x-0 mx-auto w-[92%] rounded-xl overflow-visible transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-transparent border-0 flex items-center justify-center p-2 md:p-3"
      :class="[
        stackPosition(index) === 0 ? 'interactive z-30' : stackPosition(index) === 1 ? 'interactive z-20' : 'pointer-events-none',
      ]"
      :style="cardStyle(index)"
      @click.stop="onCardClick(index)"
    >
      <img
        :src="getAssetPath(cert.src)"
        :alt="cert.alt"
        class="max-w-full max-h-full w-auto h-auto object-contain object-center rounded-lg shadow-xl shadow-black/40 pointer-events-none"
        draggable="false"
      />
    </div>

    <!-- Gallery arrows -->
    <button
      type="button"
      class="interactive absolute left-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-accent-violet/50 transition-colors"
      aria-label="Previous certificate"
      @pointerdown.stop
      @click.stop="retreat"
    >
      <ChevronLeftIcon class="w-5 h-5 text-gray-300" />
    </button>
    <button
      type="button"
      class="interactive absolute right-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-accent-violet/50 transition-colors"
      aria-label="Next certificate"
      @pointerdown.stop
      @click.stop="advance"
    >
      <ChevronRightIcon class="w-5 h-5 text-gray-300" />
    </button>

    <div class="absolute -bottom-2 left-0 right-0 flex justify-center gap-2 z-50">
      <button
        v-for="(cert, index) in certificates"
        :key="`dot-${cert.id}`"
        type="button"
        class="interactive rounded-full transition-all duration-300"
        :class="frontIndex === index ? 'w-6 h-2 bg-accent-violet' : 'w-2 h-2 bg-white/25 hover:bg-white/40'"
        :aria-label="`Show certificate ${index + 1}`"
        @pointerdown.stop
        @click.stop="goTo(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { certificates } from '../data/certificates'
import { useAssetPath } from '../composables/useAssetPath'
import { useReducedMotion } from '../composables/useReducedMotion'

const { getAssetPath } = useAssetPath()
const { prefersReducedMotion } = useReducedMotion()

const stackRef = ref(null)
const frontIndex = ref(0)
const isAnimating = ref(false)
const exitingIndex = ref(null)
const enteringIndex = ref(null)
const enteringFromRight = ref(false)
const enteringFromLeft = ref(false)
const slideDirection = ref('next')
const dragX = ref(0)
const isDragging = ref(false)

const containerHeight = 480
let timer = null
let startX = 0
let didDrag = false

const stackPosition = (index) => {
  const len = certificates.length
  return (index - frontIndex.value + len) % len
}

const cardStyle = (index) => {
  const pos = stackPosition(index)
  const dragOffset = pos === 0 && isDragging.value ? dragX.value : 0

  if (exitingIndex.value === index) {
    if (slideDirection.value === 'next') {
      return {
        zIndex: 8,
        transform: 'translateX(-58%) translateY(32px) scale(0.86) rotate(-8deg)',
        opacity: 0.35,
        top: '28px',
        height: 'calc(100% - 28px)',
      }
    }
    return {
      zIndex: 8,
      transform: 'translateX(58%) translateY(32px) scale(0.86) rotate(8deg)',
      opacity: 0.35,
      top: '28px',
      height: 'calc(100% - 28px)',
    }
  }

  if (enteringIndex.value === index) {
    if (enteringFromRight.value) {
      return {
        zIndex: 25,
        transform: 'translateX(52%) translateY(10px) scale(0.95) rotate(5deg)',
        opacity: 0.9,
        top: '8px',
        height: 'calc(100% - 8px)',
      }
    }
    if (enteringFromLeft.value) {
      return {
        zIndex: 25,
        transform: 'translateX(-52%) translateY(10px) scale(0.95) rotate(-5deg)',
        opacity: 0.9,
        top: '8px',
        height: 'calc(100% - 8px)',
      }
    }
    return {
      zIndex: 30,
      transform: 'translateX(0) translateY(0) scale(1) rotate(0deg)',
      opacity: 1,
      top: '0px',
      height: '100%',
    }
  }

  if (pos === 0) {
    return {
      zIndex: 30,
      transform: `translateX(${dragOffset}px) translateY(0) scale(1) rotate(0deg)`,
      opacity: 1,
      top: '0px',
      height: '100%',
      transition: isDragging.value ? 'none' : undefined,
    }
  }

  if (pos === 1) {
    return {
      zIndex: 18,
      transform: 'translateX(10%) translateY(20px) scale(0.93) rotate(4deg)',
      opacity: 0.72,
      top: '14px',
      height: 'calc(100% - 14px)',
    }
  }

  return {
    zIndex: 12 - pos,
    transform: `translateX(${8 + pos * 5}%) translateY(${24 + pos * 10}px) scale(${0.88 - pos * 0.02}) rotate(${3 + pos}deg)`,
    opacity: 0.45,
    top: `${20 + pos * 8}px`,
    height: `calc(100% - ${20 + pos * 8}px)`,
  }
}

const runTransition = async (direction, nextIndex) => {
  if (isAnimating.value || certificates.length < 2) return

  const current = frontIndex.value
  if (nextIndex === current) return

  if (prefersReducedMotion.value) {
    frontIndex.value = nextIndex
    return
  }

  slideDirection.value = direction
  isAnimating.value = true
  exitingIndex.value = current
  enteringIndex.value = nextIndex
  enteringFromRight.value = direction === 'next'
  enteringFromLeft.value = direction === 'prev'

  await nextTick()
  requestAnimationFrame(() => {
    enteringFromRight.value = false
    enteringFromLeft.value = false
  })

  setTimeout(() => {
    frontIndex.value = nextIndex
    exitingIndex.value = null
    enteringIndex.value = null
    isAnimating.value = false
  }, 720)
}

const advance = () => {
  const next = (frontIndex.value + 1) % certificates.length
  runTransition('next', next)
  resetAutoPlay()
}

const retreat = () => {
  const prev = (frontIndex.value - 1 + certificates.length) % certificates.length
  runTransition('prev', prev)
  resetAutoPlay()
}

const goTo = (index) => {
  if (index === frontIndex.value || isAnimating.value) return
  const len = certificates.length
  const diff = (index - frontIndex.value + len) % len
  const direction = diff <= len / 2 ? 'next' : 'prev'
  runTransition(direction, index)
  resetAutoPlay()
}

const onCardClick = (index) => {
  if (didDrag) return
  const pos = stackPosition(index)
  if (pos === 0) advance()
  else if (pos === 1) goTo(index)
}

const onPointerDown = (e) => {
  if (e.button !== 0) return
  if (e.target.closest('button')) return
  isDragging.value = true
  didDrag = false
  startX = e.clientX
  stackRef.value?.setPointerCapture(e.pointerId)
  pause()
}

const onPointerMove = (e) => {
  if (!isDragging.value) return
  dragX.value = e.clientX - startX
  if (Math.abs(dragX.value) > 8) didDrag = true
}

const onPointerUp = (e) => {
  if (!isDragging.value) return
  if (stackRef.value && e?.pointerId != null) {
    try {
      stackRef.value.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
  }
  if (dragX.value < -70) advance()
  else if (dragX.value > 70) retreat()
  dragX.value = 0
  isDragging.value = false
  setTimeout(() => { didDrag = false }, 0)
  resume()
}

const onMouseLeave = () => {
  if (isDragging.value) {
    dragX.value = 0
    isDragging.value = false
  }
  resume()
}

const startTimer = () => {
  stopTimer()
  if (certificates.length < 2) return
  timer = setInterval(advance, 3000)
}

const stopTimer = () => {
  if (timer) clearInterval(timer)
}

const pause = () => stopTimer()
const resume = () => startTimer()
const resetAutoPlay = () => {
  pause()
  resume()
}

onMounted(() => startTimer())
onUnmounted(() => stopTimer())
</script>

<style scoped>
.certificate-card {
  transform-origin: center center;
  will-change: transform, opacity;
}
</style>
