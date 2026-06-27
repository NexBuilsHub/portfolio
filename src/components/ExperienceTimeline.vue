<template>
  <section
    id="experience"
    ref="sectionRef"
    class="relative bg-obsidian"
    :class="useScrollLock ? '' : 'py-24'"
    :style="useScrollLock ? { height: `${experiences.length * 100}vh` } : undefined"
  >
    <div
      class="container mx-auto px-6"
      :class="useScrollLock ? 'sticky top-0 h-screen flex flex-col justify-center py-20' : ''"
    >
      <div class="text-center mb-8 md:mb-12">
        <h2 class="section-heading">Experience</h2>
        <p class="section-subheading mb-0">
          Founder-led engineering across AI, SaaS, and automation
        </p>
        <p
          v-if="useScrollLock && activeIndex < experiences.length - 1"
          class="text-gray-600 text-xs uppercase tracking-widest mt-4 animate-pulse"
        >
          Scroll to reveal each role
        </p>
      </div>

      <div class="max-w-4xl mx-auto relative w-full">
        <div
          v-if="useScrollLock"
          class="absolute left-3 md:left-4 top-4 bottom-4 w-px bg-white/10"
        >
          <div
            class="w-full bg-gradient-to-b from-accent-violet to-accent-cyan transition-all duration-500 ease-out"
            :style="{ height: `${timelineProgress}%` }"
          />
        </div>

        <div :class="useScrollLock ? 'space-y-3' : 'space-y-8'">
          <div
            v-for="(exp, index) in experiences"
            :key="index"
            class="relative transition-all duration-500 ease-out"
            :class="useScrollLock ? 'pl-10 md:pl-14' : 'pl-16 md:pl-20'"
          >
            <div
              v-if="useScrollLock"
              class="absolute left-0 md:left-1 top-5 w-3 h-3 rounded-full border-2 border-obsidian transition-all duration-500"
              :class="index <= activeIndex
                ? 'bg-accent-violet shadow-lg shadow-accent-violet/50 scale-110'
                : 'bg-charcoal border-white/20 scale-100'"
            />

            <GlassCard
              padding="p-0"
              :hover="index <= activeIndex"
              class="overflow-hidden transition-all duration-500"
              :class="[
                useScrollLock && index > activeIndex ? 'opacity-40' : 'opacity-100',
                useScrollLock && index === activeIndex ? 'border-accent-violet/40 shadow-lg shadow-accent-violet/10' : '',
              ]"
            >
              <button
                type="button"
                class="w-full text-left p-5 md:p-6 flex flex-wrap items-start justify-between gap-3 interactive"
                :class="!useScrollLock ? 'cursor-default' : ''"
                @click="useScrollLock && toggleCard(index)"
              >
                <div>
                  <h3 class="text-lg md:text-xl font-bold text-white mb-1">{{ exp.title }}</h3>
                  <p class="text-accent-cyan text-sm font-semibold">{{ exp.role }}</p>
                </div>
                <span class="text-xs text-gray-500 glass-card px-3 py-1 shrink-0">{{ exp.period }}</span>
              </button>

              <div
                class="grid transition-all duration-500 ease-out"
                :class="isExpanded(index) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
              >
                <div class="overflow-hidden">
                  <ul class="space-y-2 px-5 md:px-6 pb-5 md:pb-6 border-t border-white/5 pt-4">
                    <li
                      v-for="(highlight, hi) in exp.highlights"
                      :key="hi"
                      class="text-gray-400 text-sm flex items-start gap-3"
                    >
                      <span class="text-accent-violet mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-violet flex-shrink-0" />
                      {{ highlight }}
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        <div
          v-if="useScrollLock"
          class="flex justify-center gap-2 mt-8"
        >
          <span
            v-for="(_, index) in experiences"
            :key="index"
            class="h-1.5 rounded-full transition-all duration-500"
            :class="index <= activeIndex ? 'w-8 bg-accent-violet' : 'w-1.5 bg-white/20'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { experiences } from '../data/experience'
import { useReducedMotion } from '../composables/useReducedMotion'
import GlassCard from './ui/GlassCard.vue'

const sectionRef = ref(null)
const activeIndex = ref(0)
const isMobile = useMediaQuery('(max-width: 768px)')
const { prefersReducedMotion } = useReducedMotion()

const useScrollLock = computed(() => !isMobile.value && !prefersReducedMotion.value)

const timelineProgress = computed(() => {
  if (experiences.length <= 1) return 100
  return ((activeIndex.value + 1) / experiences.length) * 100
})

const isExpanded = (index) => {
  if (!useScrollLock.value) return true
  return index <= activeIndex.value
}

const toggleCard = (index) => {
  if (index <= activeIndex.value) return
  activeIndex.value = index
}

const updateActiveFromScroll = () => {
  if (!useScrollLock.value || !sectionRef.value) return

  const el = sectionRef.value
  const rect = el.getBoundingClientRect()
  const scrollable = el.offsetHeight - window.innerHeight

  if (scrollable <= 0) return

  const scrolled = -rect.top

  if (scrolled <= 0) {
    activeIndex.value = 0
    return
  }

  if (scrolled >= scrollable) {
    activeIndex.value = experiences.length - 1
    return
  }

  const progress = scrolled / scrollable
  const nextIndex = Math.min(
    Math.floor(progress * experiences.length),
    experiences.length - 1
  )
  activeIndex.value = Math.max(0, nextIndex)
}

onMounted(() => {
  if (useScrollLock.value) {
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true })
    updateActiveFromScroll()
  } else {
    activeIndex.value = experiences.length - 1
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveFromScroll)
})
</script>
