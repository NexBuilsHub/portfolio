<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-transparent to-pink-900/50 z-10"></div>
      <div class="absolute inset-0 bg-black/60 z-10"></div>
      <!-- Placeholder for background image - you can replace with actual image -->
      <div class="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"></div>
    </div>

    <!-- Content -->
    <div class="relative z-20 container mx-auto px-6 py-20">
      <div class="max-w-4xl" data-aos="fade-up">
        <h1 class="text-7xl md:text-9xl font-bold text-white mb-6">
          <span>Full-Stack</span><span class="text-pink-500"> Developer</span>
        </h1>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl">
          Full-Stack Developer with over 2 years of professional experience, specialized in React, Next.js, Vue.js, Symfony, and mobile development with React Native and Expo.
        </p>
        <a href="#portfolio" class="inline-block px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/50">
          VIEW PORTFOLIO
        </a>
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
        v-for="(dot, index) in 3" 
        :key="index"
        @click="currentSlide = index"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="currentSlide === index ? 'bg-pink-500 w-8' : 'bg-white/30 hover:bg-white/50'"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % 3
}

const previousSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + 3) % 3
}
</script>
