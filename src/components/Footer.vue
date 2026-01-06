<template>
  <footer class="bg-black text-white py-12">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-gray-400">©2026 Youssef Bouayez. All Rights Reserved.</p>
        </div>
        
        <div class="flex items-center space-x-6">
          <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors duration-300">FB</a>
          <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors duration-300">DB</a>
          <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors duration-300">Be</a>
          <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors duration-300">Tw</a>
          <a href="#" class="text-gray-400 hover:text-pink-500 transition-colors duration-300">Co</a>
          
          <button 
            @click="scrollToTop"
            class="ml-4 w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

