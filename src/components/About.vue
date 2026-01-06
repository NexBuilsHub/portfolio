<template>
  <section id="about" class="py-20 bg-white text-gray-900">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-5xl font-bold mb-12 text-center" data-aos="fade-up">About Me</h2>
        
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <p class="text-lg text-gray-700 mb-6 leading-relaxed">
              Full-Stack Developer with over 2 years of professional experience, including more than 1 year as a freelance developer working on web and mobile applications for international clients.
            </p>
            <p class="text-lg text-gray-700 mb-6 leading-relaxed">
              Specialized in React, Next.js, Vue.js, Symfony, and mobile development with React Native and Expo. Experienced in building scalable, production-ready solutions and deploying applications using AWS cloud services.
            </p>
            <div class="flex space-x-4">
              <a 
                href="/doc/Youssef Bouayez.pdf" 
                download
                class="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <ArrowDownTrayIcon class="w-5 h-5" />
                <span>Download CV</span>
              </a>
              <a 
                href="#portfolio" 
                class="px-6 py-3 border-2 border-gray-900 hover:bg-gray-900 hover:text-white rounded-lg transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <BriefcaseIcon class="w-5 h-5" />
                <span>View Portfolio</span>
              </a>
            </div>
          </div>
          
          <div class="relative" data-aos="fade-left">
            <div class="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/imges/my-photo.jpg" 
                alt="Youssef Bouayez - Full-Stack Developer"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500 rounded-lg opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowDownTrayIcon, BriefcaseIcon } from '@heroicons/vue/24/outline'
</script>
