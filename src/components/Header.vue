<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
    <nav class="container mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-yellow-400 flex items-center justify-center">
          <div class="flex space-x-1">
            <div class="w-1 h-4 bg-white rounded"></div>
            <div class="w-1 h-6 bg-white rounded"></div>
            <div class="w-1 h-5 bg-white rounded"></div>
          </div>
        </div>
        <span class="text-white font-bold text-xl">Youssef Bouayez</span>
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center space-x-8">
        <a 
          v-for="link in navLinks" 
          :key="link.name"
          :href="link.href"
          class="text-white hover:text-pink-500 transition-colors duration-300 uppercase text-sm font-medium"
          :class="{ 'border-b-2 border-pink-500': activeSection === link.name.toLowerCase() }"
        >
          {{ link.name }}
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden text-white"
      >
        <Bars3Icon class="w-6 h-6" />
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-black/95 border-t border-gray-800">
      <div class="container mx-auto px-6 py-4 space-y-4">
        <a 
          v-for="link in navLinks" 
          :key="link.name"
          :href="link.href"
          class="block text-white hover:text-pink-500 transition-colors duration-300 uppercase text-sm font-medium py-2"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Awards', href: '#awards' },
  { name: 'News', href: '#news' },
]

const mobileMenuOpen = ref(false)
const activeSection = ref('home')

const handleScroll = () => {
  const sections = ['home', 'portfolio', 'awards', 'news']
  const scrollPosition = window.scrollY + 100

  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const offsetTop = element.offsetTop
      const offsetHeight = element.offsetHeight
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
