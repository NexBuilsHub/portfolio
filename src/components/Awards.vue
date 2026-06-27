<template>
  <section id="education" class="py-24 bg-obsidian">
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-12 md:gap-20 lg:gap-28 items-center max-w-6xl mx-auto">
        <div class="md:pr-4 lg:pr-10">
          <SectionReveal>
            <CertificateStack />
          </SectionReveal>
        </div>

        <div class="md:pl-4 lg:pl-10">
          <SectionReveal :delay="150">
          <h2 class="section-heading">Education & Certifications</h2>
          <div class="space-y-6 mt-8">
            <div
              v-for="(item, index) in education"
              :key="index"
              class="border-l-2 border-accent-violet pl-6 py-2"
            >
              <h3 class="text-lg font-bold text-white mb-1">{{ item.title }}</h3>
              <p class="text-gray-400 text-sm">{{ item.institution }}</p>
              <p class="text-accent-cyan text-sm font-medium mt-1">{{ item.period }}</p>
            </div>
          </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { education } from '../data/education'
import SectionReveal from './ui/SectionReveal.vue'
import CertificateStack from './CertificateStack.vue'
</script>
