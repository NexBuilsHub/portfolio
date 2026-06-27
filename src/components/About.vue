<template>
  <section id="about" class="py-24 bg-obsidian bg-mesh-gradient">
    <div class="container mx-auto px-6">
      <SectionReveal>
        <h2 class="section-heading text-center">Profile</h2>
      </SectionReveal>

      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-12">
        <SectionReveal :delay="100">
          <GlassCard padding="p-8 text-center md:text-left">
            <p class="text-lg text-gray-300 mb-6 leading-relaxed">
              {{ profile.bio }}
            </p>
            <p class="text-gray-400 mb-8 leading-relaxed">
              Experienced in building multi-tenant SaaS systems, AI reception solutions, and Shopify automation tools — from architecture design to cloud deployment and monitoring.
            </p>
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <MagneticButton>
                <a
                  :href="cvUrl"
                  download="Youssef Bouayez.pdf"
                  class="interactive inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-violet to-accent-cyan text-white rounded-xl font-semibold text-sm"
                >
                  <ArrowDownTrayIcon class="w-5 h-5" />
                  Download CV
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#projects"
                  class="interactive inline-flex items-center gap-2 px-6 py-3 glass-card text-white rounded-xl font-semibold text-sm hover:border-accent-violet/40"
                >
                  <BriefcaseIcon class="w-5 h-5" />
                  View Portfolio
                </a>
              </MagneticButton>
            </div>
          </GlassCard>
        </SectionReveal>

        <SectionReveal :delay="200">
          <div class="relative">
            <div class="aspect-[4/5] rounded-2xl overflow-hidden glass-card p-1">
              <img
                :src="photoUrl"
                :alt="`${profile.name} - ${profile.title}`"
                class="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-violet/20 rounded-2xl blur-2xl -z-10" />
          </div>
        </SectionReveal>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowDownTrayIcon, BriefcaseIcon } from '@heroicons/vue/24/outline'
import { profile, getCvPath } from '../data/profile'
import { useAssetPath } from '../composables/useAssetPath'
import SectionReveal from './ui/SectionReveal.vue'
import GlassCard from './ui/GlassCard.vue'
import MagneticButton from './ui/MagneticButton.vue'

const cvUrl = getCvPath()
const { getAssetPath } = useAssetPath()
const photoUrl = getAssetPath('/imges/my-photo.jpg')
</script>
