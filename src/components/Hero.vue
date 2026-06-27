<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian">
    <div class="absolute inset-0 z-0 bg-mesh-gradient" />
    <Suspense>
      <HeroScene class="z-0" />
    </Suspense>
    <div class="absolute inset-0 z-10 bg-obsidian/40" />

    <div class="relative z-20 container mx-auto px-6 py-32 w-full">
      <div class="max-w-4xl">
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
        <p class="text-gray-400 mb-8 max-w-2xl text-lg leading-relaxed">
          Building SaaS platforms, AI-powered applications, and cloud infrastructure.
        </p>

        <div class="flex flex-wrap gap-3 mb-10 text-sm text-gray-400">
          <a :href="`mailto:${profile.contact.email}`" class="interactive flex items-center gap-2 glass-card px-4 py-2 hover:border-accent-violet/40">
            <EnvelopeIcon class="w-4 h-4 text-accent-cyan" />
            {{ profile.contact.email }}
          </a>
          <a :href="`tel:${profile.contact.phone.replace(/\s/g, '')}`" class="interactive flex items-center gap-2 glass-card px-4 py-2 hover:border-accent-violet/40">
            <PhoneIcon class="w-4 h-4 text-accent-cyan" />
            {{ profile.contact.phone }}
          </a>
          <span class="flex items-center gap-2 glass-card px-4 py-2">
            <MapPinIcon class="w-4 h-4 text-accent-cyan" />
            {{ profile.contact.location }}
          </span>
        </div>

        <div class="flex flex-wrap gap-4">
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
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/vue/24/outline'
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
