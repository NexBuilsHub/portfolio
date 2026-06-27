<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-white/10">
    <nav class="container mx-auto px-6 py-4 flex items-center justify-between">
      <a href="#home" class="interactive flex items-center space-x-2">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center">
          <span class="text-white font-bold text-sm">YB</span>
        </div>
        <span class="text-white font-bold text-lg hidden sm:block">Youssef Bouayez</span>
      </a>

      <div class="hidden md:flex items-center space-x-6">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          class="interactive text-sm uppercase tracking-wider font-medium transition-colors duration-300"
          :class="activeSection === link.id ? 'text-accent-cyan' : 'text-gray-400 hover:text-white'"
        >
          {{ link.name }}
        </a>
      </div>

      <button
        class="md:hidden text-white interactive"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <Bars3Icon class="w-6 h-6" />
      </button>
    </nav>

    <div v-if="mobileMenuOpen" class="md:hidden bg-obsidian/95 border-t border-white/10">
      <div class="container mx-auto px-6 py-4 space-y-3">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          class="interactive block text-gray-300 hover:text-accent-cyan uppercase text-sm font-medium py-2"
          @click="mobileMenuOpen = false"
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
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Product', href: '#product', id: 'product' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

const mobileMenuOpen = ref(false)
const activeSection = ref('home')

const handleScroll = () => {
  const scrollPosition = window.scrollY + 120
  for (const link of navLinks) {
    const element = document.getElementById(link.id)
    if (element) {
      const { offsetTop, offsetHeight } = element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = link.id
        return
      }
    }
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
