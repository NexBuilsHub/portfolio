<template>
  <section
    id="skills"
    ref="sectionRef"
    class="relative bg-obsidian"
    :class="useScrollDrive ? '' : 'py-24'"
    :style="useScrollDrive ? { height: `${skillCategories.length * 100}vh` } : undefined"
  >
    <div
      class="container mx-auto px-4 md:px-6"
      :class="useScrollDrive ? 'sticky top-0 h-screen flex flex-col' : ''"
    >
      <!-- Header -->
      <div class="text-center pt-10 pb-0 shrink-0">
        <h2 class="font-display text-3xl md:text-4xl text-white">Skills</h2>
        <p class="text-gray-500 text-xs mt-1">
          <span v-if="useScrollDrive">Scroll to explore · {{ activeIndex + 1 }} / {{ skillCategories.length }}</span>
          <span v-else>Tap a category to expand</span>
        </p>
      </div>

      <!-- Stage: flex-1 gives real height -->
      <div v-if="useScrollDrive" class="flex-1 relative w-full min-h-0" style="perspective: 1400px;">
        <!-- 3D ring — visible cards rotating behind & beside main card -->
        <div
          class="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          style="perspective: 1200px;"
        >
          <div
            class="ring-3d transition-transform duration-700 ease-out"
            :style="{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${ringRotation}deg)`,
            }"
          >
            <div
              v-for="(category, index) in skillCategories"
              :key="`ring-${category.id}`"
              class="ring-card absolute"
              :style="getRingCardStyle(index)"
            >
              <div
                class="w-32 h-40 md:w-36 md:h-44 rounded-xl glass-card flex flex-col items-center justify-center gap-2 border transition-all duration-500"
                :class="index === activeIndex
                  ? 'border-accent-violet/70 opacity-90 scale-110 shadow-lg shadow-accent-violet/30'
                  : 'border-white/15 opacity-45 scale-95'"
              >
                <component :is="categoryIcons[category.id]" class="w-7 h-7 text-accent-violet" />
                <span class="text-[11px] md:text-xs text-gray-300 text-center px-2 leading-tight font-medium">
                  {{ category.title }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured card — large display only; ring cards unchanged -->
        <div class="absolute inset-0 z-10 flex items-center justify-center px-1 md:px-2 py-0">
          <div class="relative w-full max-w-7xl h-full">
            <Transition :name="slideDirection" mode="out-in">
              <div
                :key="activeIndex"
                class="featured-card w-full h-full rounded-2xl glass-card border border-white/20 shadow-2xl shadow-accent-violet/15 p-7 sm:p-9 md:p-11 lg:p-12 overflow-y-auto"
              >
                <SkillCardContent
                  :category="skillCategories[activeIndex]"
                  :icon="categoryIcons[skillCategories[activeIndex].id]"
                  :index="activeIndex"
                />
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Mobile: collapsed accordion, one open at a time -->
      <div v-else class="py-8 space-y-3 max-w-lg mx-auto w-full">
        <div
          v-for="(category, index) in skillCategories"
          :key="category.id"
          class="glass-card rounded-2xl border overflow-hidden transition-all duration-300"
          :class="mobileOpenIndex === index ? 'border-accent-violet/40' : 'border-white/10'"
        >
          <button
            type="button"
            class="interactive w-full p-5 text-center"
            @click="toggleMobileSkill(index)"
          >
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center mx-auto mb-3">
              <component :is="categoryIcons[category.id]" class="w-6 h-6 text-white" />
            </div>
            <span class="text-xs font-mono text-accent-cyan">0{{ index + 1 }}</span>
            <h3 class="text-lg font-bold text-white font-display mt-1">{{ category.title }}</h3>
            <ChevronDownIcon
              class="w-5 h-5 text-gray-500 mx-auto mt-2 transition-transform duration-300"
              :class="mobileOpenIndex === index ? 'rotate-180 text-accent-violet' : ''"
            />
          </button>

          <div
            class="grid transition-all duration-300 ease-out"
            :class="mobileOpenIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
          >
            <div class="overflow-hidden">
              <div class="px-5 pb-5 pt-0 border-t border-white/5">
                <SkillCardContent
                  :category="category"
                  :icon="categoryIcons[category.id]"
                  :index="index"
                  centered
                  hide-header
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nav -->
      <div v-if="useScrollDrive" class="shrink-0 flex justify-center items-center gap-4 py-2">
        <button
          type="button"
          class="interactive w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-accent-violet/50 transition-colors disabled:opacity-30"
          :disabled="activeIndex === 0"
          @click="goTo(activeIndex - 1)"
        >
          <ChevronLeftIcon class="w-5 h-5 text-gray-300" />
        </button>
        <div class="flex items-center gap-2">
          <button
            v-for="(cat, i) in skillCategories"
            :key="cat.id"
            type="button"
            class="interactive rounded-full transition-all duration-300"
            :class="i === activeIndex ? 'w-8 h-2 bg-accent-violet' : 'w-2 h-2 bg-white/20 hover:bg-white/40'"
            @click="goTo(i)"
          />
        </div>
        <button
          type="button"
          class="interactive w-10 h-10 rounded-full glass-card flex items-center justify-center hover:border-accent-violet/50 transition-colors disabled:opacity-30"
          :disabled="activeIndex === skillCategories.length - 1"
          @click="goTo(activeIndex + 1)"
        >
          <ChevronRightIcon class="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import {
  CpuChipIcon,
  CodeBracketIcon,
  CloudIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'
import { skillCategories } from '../data/skills'
import { useReducedMotion } from '../composables/useReducedMotion'
import SkillCardContent from './SkillCardContent.vue'

const sectionRef = ref(null)
const activeIndex = ref(0)
const mobileOpenIndex = ref(null)
const slideDirection = ref('slide-next')
const isMobile = useMediaQuery('(max-width: 768px)')
const { prefersReducedMotion } = useReducedMotion()

const useScrollDrive = computed(() => !isMobile.value && !prefersReducedMotion.value)

const categoryIcons = {
  ai: CpuChipIcon,
  dev: CodeBracketIcon,
  cloud: CloudIcon,
  seo: ChartBarIcon,
  leadership: UserGroupIcon,
}

const count = skillCategories.length
const angleStep = 360 / count

const ringRotation = computed(() => -activeIndex.value * angleStep)

const getRingCardStyle = (index) => ({
  left: '50%',
  top: '50%',
  marginLeft: '-72px',
  marginTop: '-88px',
  transform: `rotateY(${index * angleStep}deg) translateZ(360px)`,
  transformStyle: 'preserve-3d',
})

const goTo = (index) => {
  if (index < 0 || index >= count) return
  slideDirection.value = index > activeIndex.value ? 'slide-next' : 'slide-prev'
  activeIndex.value = index
  scrollToStep(index)
}

const toggleMobileSkill = (index) => {
  mobileOpenIndex.value = mobileOpenIndex.value === index ? null : index
}

const scrollToStep = (index) => {
  if (!sectionRef.value || !useScrollDrive.value) return
  const el = sectionRef.value
  const scrollable = el.offsetHeight - window.innerHeight
  const target = (index / (count - 1 || 1)) * scrollable
  window.scrollTo({ top: el.offsetTop + target, behavior: 'smooth' })
}

const updateFromScroll = () => {
  if (!useScrollDrive.value || !sectionRef.value) return

  const el = sectionRef.value
  const scrollable = el.offsetHeight - window.innerHeight
  if (scrollable <= 0) return

  const scrolled = -el.getBoundingClientRect().top
  if (scrolled <= 0) {
    if (activeIndex.value !== 0) slideDirection.value = 'slide-prev'
    activeIndex.value = 0
    return
  }
  if (scrolled >= scrollable) {
    if (activeIndex.value !== count - 1) slideDirection.value = 'slide-next'
    activeIndex.value = count - 1
    return
  }

  const progress = scrolled / scrollable
  const next = Math.min(Math.floor(progress * count), count - 1)
  if (next !== activeIndex.value) {
    slideDirection.value = next > activeIndex.value ? 'slide-next' : 'slide-prev'
    activeIndex.value = next
  }
}

watch(activeIndex, (val, old) => {
  if (val > old) slideDirection.value = 'slide-next'
  else if (val < old) slideDirection.value = 'slide-prev'
})

onMounted(() => {
  if (useScrollDrive.value) {
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    updateFromScroll()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateFromScroll)
})
</script>

<style scoped>
.ring-3d {
  position: relative;
  width: 1px;
  height: 1px;
  transform-style: preserve-3d;
}

.ring-card {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

/* Transition must fill parent */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(120px) rotateY(-10deg);
}
.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-120px) rotateY(10deg);
}

.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-120px) rotateY(10deg);
}
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(120px) rotateY(-10deg);
}

.slide-next-enter-to,
.slide-next-leave-from,
.slide-prev-enter-to,
.slide-prev-leave-from {
  opacity: 1;
  transform: translateX(0) rotateY(0deg);
}
</style>
