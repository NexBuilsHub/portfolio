<template>
  <section id="skills" class="py-20 bg-white text-gray-900">
    <div class="container mx-auto px-6">
      <h2 class="text-5xl font-bold mb-4 text-center" data-aos="fade-up">Skills</h2>
      <p class="text-gray-600 text-center mb-12" data-aos="fade-up" data-aos-delay="100">
        Technologies and tools I work with
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(skill, index) in skills" 
          :key="index"
          class="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
          data-aos="zoom-in"
          :data-aos-delay="index * 100"
        >
          <div class="text-5xl mb-4">{{ skill.icon }}</div>
          <h3 class="text-xl font-bold mb-2">{{ skill.name }}</h3>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-pink-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
              :style="{ width: skill.level + '%' }"
            ></div>
          </div>
          <p class="text-sm text-gray-600 mt-2">{{ skill.level }}%</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  { name: 'Vue.js', icon: '⚡', level: 90 },
  { name: 'JavaScript', icon: '📜', level: 95 },
  { name: 'Node.js', icon: '🟢', level: 85 },
  { name: 'React', icon: '⚛️', level: 80 },
  { name: 'TypeScript', icon: '📘', level: 85 },
  { name: 'Python', icon: '🐍', level: 75 },
  { name: 'CSS/Tailwind', icon: '🎨', level: 90 },
  { name: 'Git', icon: '🔀', level: 88 }
]
</script>

