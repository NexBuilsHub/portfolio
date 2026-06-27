<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian">
    <div class="absolute inset-0 z-0 bg-mesh-gradient" />
    <Suspense>
      <HeroScene class="z-0" />
    </Suspense>
    <div class="absolute inset-0 z-10 bg-obsidian/40" />

    <div class="relative z-20 container mx-auto px-6 py-32 w-full">
      <div class="max-w-4xl mx-auto md:mx-0 text-center md:text-left">
        <p class="text-accent-cyan text-sm uppercase tracking-[0.3em] mb-4 font-medium">
          {{ profile.title }}
        </p>
        <h1 class="font-display text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-tight">
          {{ profile.name }}
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-4 h-8">
          <span class="text-accent-violet">{{ currentKeyword }}</span>
          <span class="animate-pulse text-accent-cyan">|</span>
        </p>
        <p class="text-gray-400 mb-8 max-w-2xl mx-auto md:mx-0 text-lg leading-relaxed">
          Building SaaS platforms, AI-powered applications, and cloud infrastructure.
        </p>

        <div class="flex flex-wrap gap-4 justify-center md:justify-start">
          <MagneticButton>
            <a
              href="#projects"
              class="interactive inline-block px-8 py-3 bg-gradient-to-r from-accent-violet to-accent-cyan text-white rounded-xl font-semibold text-sm shadow-lg shadow-accent-violet/25 hover:shadow-accent-violet/40 transition-shadow"
            >
              View Portfolio
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              :href="cvUrl"
              download="Youssef Bouayez.pdf"
              class="interactive inline-block px-8 py-3 glass-card text-white rounded-xl font-semibold text-sm hover:border-accent-violet/40 transition-colors"
            >
              Download CV
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { profile, getCvPath } from '../data/profile'
import MagneticButton from './ui/MagneticButton.vue'

const HeroScene = defineAsyncComponent(() => import('./HeroScene.vue'))

const cvUrl = getCvPath()
const keywords = profile.keywords
const currentKeyword = ref(keywords[0])
let keywordIndex = 0
let typeInterval = null

onMounted(() => {
  typeInterval = setInterval(() => {
    keywordIndex = (keywordIndex + 1) % keywords.length
    currentKeyword.value = keywords[keywordIndex]
  }, 3000)
})

onUnmounted(() => {
  if (typeInterval) clearInterval(typeInterval)
})
</script>
