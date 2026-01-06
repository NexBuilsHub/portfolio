<template>
  <section id="about" class="py-20 bg-white text-gray-900">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-5xl font-bold mb-12 text-center" data-aos="fade-up">About Me</h2>
        
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <p class="text-lg text-gray-700 mb-6 leading-relaxed">
              I'm a passionate developer with expertise in modern web technologies. I love creating 
              beautiful and functional applications that solve real-world problems.
            </p>
            <p class="text-lg text-gray-700 mb-6 leading-relaxed">
              With years of experience in software development, I've worked on various projects ranging 
              from small startups to large enterprise applications.
            </p>
            <div class="flex space-x-4">
              <button class="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors duration-300">
                Download CV
              </button>
              <button class="px-6 py-3 border-2 border-gray-900 hover:bg-gray-900 hover:text-white rounded-lg transition-colors duration-300">
                View Portfolio
              </button>
            </div>
          </div>
          
          <div class="relative" data-aos="fade-left">
            <div class="aspect-square rounded-lg overflow-hidden shadow-2xl">
              <div class="w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center">
                <span class="text-white text-6xl font-bold">YB</span>
              </div>
            </div>
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500 rounded-lg opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

