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
        <p v-else-if="!useScrollLock" class="text-gray-500 text-xs mt-3">
          Tap a role to expand
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

        <div :class="useScrollLock ? 'space-y-3' : 'space-y-3 max-w-lg mx-auto'">
          <div
            v-for="(exp, index) in experiences"
            :key="index"
            class="relative transition-all duration-500 ease-out"
            :class="useScrollLock ? 'pl-10 md:pl-14' : ''"
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
              :hover="useScrollLock ? index <= activeIndex : mobileOpenIndex === index"
              class="overflow-hidden transition-all duration-500"
              :class="[
                useScrollLock && index > activeIndex ? 'opacity-40' : 'opacity-100',
                useScrollLock && index === activeIndex ? 'border-accent-violet/40 shadow-lg shadow-accent-violet/10' : '',
                !useScrollLock && mobileOpenIndex === index ? 'border-accent-violet/40' : '',
              ]"
            >
              <button
                type="button"
                class="interactive w-full p-5 md:p-6 flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-between gap-3 text-center md:text-left"
                @click="useScrollLock ? toggleCard(index) : toggleMobileExp(index)"
              >
                <div class="w-full md:w-auto">
                  <h3 class="text-lg md:text-xl font-bold text-white mb-1">{{ exp.title }}</h3>
                  <p class="text-accent-cyan text-sm font-semibold">{{ exp.role }}</p>
                </div>
                <span class="text-xs text-gray-500 glass-card px-3 py-1 shrink-0">{{ exp.period }}</span>
                <ChevronDownIcon
                  v-if="!useScrollLock"
                  class="w-5 h-5 text-gray-500 transition-transform duration-300 md:hidden"
                  :class="mobileOpenIndex === index ? 'rotate-180 text-accent-violet' : ''"
                />
              </button>

              <div
                class="grid transition-all duration-500 ease-out"
                :class="isExpanded(index) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
              >
                <div class="overflow-hidden">
                  <ul
                    class="space-y-2 px-5 md:px-6 pb-5 md:pb-6 border-t border-white/5 pt-4 text-center md:text-left"
                  >
                    <li
                      v-for="(highlight, hi) in exp.highlights"
                      :key="hi"
                      class="text-gray-400 text-sm flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-3"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-accent-violet shrink-0 md:mt-1.5" />
                      <span>{{ highlight }}</span>
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
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { experiences } from '../data/experience'
import { useReducedMotion } from '../composables/useReducedMotion'
import GlassCard from './ui/GlassCard.vue'

const sectionRef = ref(null)
const activeIndex = ref(0)
const mobileOpenIndex = ref(null)
const isMobile = useMediaQuery('(max-width: 768px)')
const { prefersReducedMotion } = useReducedMotion()

const useScrollLock = computed(() => !isMobile.value && !prefersReducedMotion.value)

const timelineProgress = computed(() => {
  if (experiences.length <= 1) return 100
  return ((activeIndex.value + 1) / experiences.length) * 100
})

const isExpanded = (index) => {
  if (useScrollLock.value) return index <= activeIndex.value
  return mobileOpenIndex.value === index
}

const toggleCard = (index) => {
  if (index <= activeIndex.value) return
  activeIndex.value = index
}

const toggleMobileExp = (index) => {
  mobileOpenIndex.value = mobileOpenIndex.value === index ? null : index
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
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveFromScroll)
})
</script>
