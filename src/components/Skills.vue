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
          <div class="flex justify-center mb-4">
            <component :is="skill.icon" class="w-12 h-12 text-pink-500" />
          </div>
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
import { 
  CodeBracketIcon, 
  ServerIcon, 
  CloudIcon, 
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  CubeIcon
} from '@heroicons/vue/24/outline'

const skills = [
  { name: 'React.js / Next.js', icon: CodeBracketIcon, level: 90 },
  { name: 'Vue.js', icon: CodeBracketIcon, level: 85 },
  { name: 'Symfony / PHP', icon: ServerIcon, level: 88 },
  { name: 'AWS Cloud Services', icon: CloudIcon, level: 85 },
  { name: 'React Native / Expo', icon: DevicePhoneMobileIcon, level: 80 },
  { name: 'WordPress', icon: CubeIcon, level: 75 },
  { name: 'Docker', icon: CubeIcon, level: 82 },
  { name: 'Web Development', icon: PaintBrushIcon, level: 90 }
]
</script>
