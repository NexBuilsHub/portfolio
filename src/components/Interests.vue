<template>
  <section id="interests" class="py-24 bg-obsidian bg-mesh-gradient">
    <div class="container mx-auto px-6">
      <SectionReveal>
        <h2 class="section-heading text-center">Technical Interests</h2>
        <p class="section-subheading">
          What drives my engineering approach
        </p>
      </SectionReveal>

      <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-12">
        <SectionReveal
          v-for="(interest, index) in technicalInterests"
          :key="interest.title"
          :delay="index * 100"
        >
          <GlassCard padding="p-8" class="h-full">
            <h3 class="text-xl font-bold text-white mb-3">{{ interest.title }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ interest.description }}</p>
          </GlassCard>
        </SectionReveal>
      </div>

      <SectionReveal :delay="400">
        <div class="mt-16 max-w-3xl mx-auto text-center">
          <h3 class="font-display text-3xl text-white mb-6">Languages</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <div
              v-for="lang in languages"
              :key="lang.name"
              class="glass-card px-6 py-4 interactive"
            >
              <span class="text-white font-semibold">{{ lang.name }}</span>
              <span class="text-gray-500 mx-2">·</span>
              <span class="text-accent-cyan text-sm">{{ lang.level }}</span>
            </div>
          </div>
        </div>
      </SectionReveal>
    </div>
  </section>
</template>

<script setup>
import { technicalInterests, languages } from '../data/interests'
import SectionReveal from './ui/SectionReveal.vue'
import GlassCard from './ui/GlassCard.vue'
</script>
