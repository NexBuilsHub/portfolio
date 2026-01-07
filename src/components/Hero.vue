<template>
  <section 
    id="home" 
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
    @mousemove="handleMouseMove"
  >
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <div 
        class="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-transparent to-pink-900/50 z-10 transition-opacity duration-300"
        :style="{ opacity: gradientOpacity }"
      ></div>
      <div class="absolute inset-0 bg-black/60 z-10"></div>
      <!-- Animated Gradient Background -->
      <div 
        class="w-full h-full transition-all duration-500 ease-out"
        :style="{
          background: `radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.6) 30%, rgba(236, 72, 153, 0.8) 60%, rgba(17, 24, 39, 0.9) 100%)`
        }"
      ></div>
    </div>

    <!-- Content Container with Slide Animation -->
    <div class="relative z-20 container mx-auto px-6 py-20 w-full">
      <div class="max-w-4xl relative overflow-hidden text-left">
        <Transition name="slide" mode="out-in">
          <div :key="currentSlide" class="slide-content">
            <h1 class="text-7xl md:text-9xl font-bold text-white mb-6">
              <span>{{ slides[currentSlide].title }}</span><span class="text-pink-500">{{ slides[currentSlide].titleHighlight }}</span>
            </h1>
            <p class="text-xl text-gray-300 mb-8 max-w-2xl">
              {{ slides[currentSlide].description }}
            </p>
            <a href="#portfolio" class="inline-block px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/50 w-[250px] text-center">
              VIEW PORTFOLIO
            </a>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Slider Navigation -->
    <button 
      @click="previousSlide"
      class="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300"
    >
      <ChevronLeftIcon class="w-6 h-6" />
    </button>
    <button 
      @click="nextSlide"
      class="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300"
    >
      <ChevronRightIcon class="w-6 h-6" />
    </button>

    <!-- Pagination Dots -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
      <button 
        v-for="(slide, index) in slides" 
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="currentSlide === index ? 'bg-pink-500 w-8' : 'bg-white/30 hover:bg-white/50'"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const currentSlide = ref(0)
const slideDirection = ref('next')
const mouseX = ref(50)
const mouseY = ref(50)
const gradientOpacity = ref(1)
let autoSlideInterval = null

const slides = [
  {
    title: 'Full-Stack',
    titleHighlight: ' Developer',
    description: 'Full-Stack Developer with over 2 years of professional experience, specialized in React, Next.js, Vue.js, Symfony, and mobile development with React Native and Expo.'
  },
  {
    title: 'Cloud',
    titleHighlight: ' Developer',
    description: 'Experienced in cloud development using AWS services for application hosting, domain management, security configuration, and performance optimization.'
  },
  {
    title: 'Freelance',
    titleHighlight: ' Developer',
    description: 'Freelance Full-Stack Developer working with international clients to transform ideas into scalable, high-performance applications, including multi-tenant platforms.'
  }
]

const handleMouseMove = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  mouseX.value = ((event.clientX - rect.left) / rect.width) * 100
  mouseY.value = ((event.clientY - rect.top) / rect.height) * 100
  
  // Add subtle opacity change based on mouse position
  const distanceFromCenter = Math.sqrt(
    Math.pow(mouseX.value - 50, 2) + Math.pow(mouseY.value - 50, 2)
  )
  gradientOpacity.value = 0.7 + (distanceFromCenter / 100) * 0.3
}

const nextSlide = () => {
  slideDirection.value = 'next'
  currentSlide.value = (currentSlide.value + 1) % slides.length
  resetAutoSlide()
}

const previousSlide = () => {
  slideDirection.value = 'prev'
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
  resetAutoSlide()
}

const goToSlide = (index) => {
  slideDirection.value = index > currentSlide.value ? 'next' : 'prev'
  currentSlide.value = index
  resetAutoSlide()
}

const resetAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
  startAutoSlide()
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    slideDirection.value = 'next'
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000) // 5 seconds
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
})
</script>

<style scoped>
/* Slide animation for the entire content container */
.slide-content {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.slide-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-leave-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(150px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-150px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Ensure title is not cut off */
h1 {
  line-height: 1.1;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .slide-content {
    min-height: 350px;
  }
  
  .slide-enter-from {
    transform: translateX(80px);
  }
  
  .slide-leave-to {
    transform: translateX(-80px);
  }
}
</style>
