<template>
  <section id="product" class="py-24 bg-obsidian bg-mesh-gradient">
    <div class="container mx-auto px-6 max-w-6xl">
      <SectionReveal>
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-accent-cyan border border-accent-cyan/30 bg-accent-cyan/10 mb-4">
            Featured Product
          </span>
          <h2 class="section-heading">Explore My Product</h2>
          <p class="section-subheading">
            This is my best product — built, owned, and shipped by me
          </p>
        </div>
      </SectionReveal>

      <SectionReveal :delay="120">
        <div class="glass-card rounded-2xl border border-white/15 overflow-hidden">
          <div class="grid lg:grid-cols-2 gap-0">
            <!-- Preview -->
            <div class="relative bg-black min-h-[280px] lg:min-h-[420px]">
              <img
                :src="getAssetPath(featuredProduct.poster)"
                :alt="`${featuredProduct.name} preview`"
                class="w-full h-full object-cover object-top absolute inset-0"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
              <div class="absolute bottom-6 left-6 right-6">
                <p class="text-accent-violet text-sm font-semibold uppercase tracking-wider mb-1">Best product</p>
                <h3 class="text-3xl md:text-4xl font-bold text-white font-display">{{ featuredProduct.name }}</h3>
              </div>
            </div>

            <!-- Copy -->
            <div class="p-8 md:p-10 lg:p-12 flex flex-col justify-center text-center md:text-left">
              <p class="text-accent-cyan font-medium mb-3">{{ featuredProduct.tagline }}</p>
              <p class="text-gray-300 leading-relaxed mb-6">
                {{ featuredProduct.description }}
              </p>

              <ul class="space-y-3 mb-8">
                <li
                  v-for="item in featuredProduct.highlights"
                  :key="item"
                  class="flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-3 text-gray-400 text-sm"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-accent-violet shrink-0 md:mt-2" />
                  {{ item }}
                </li>
              </ul>

              <div class="flex flex-wrap gap-2 mb-10 justify-center md:justify-start">
                <span
                  v-for="tech in featuredProduct.tech"
                  :key="tech"
                  class="px-3 py-1 text-xs rounded-full bg-accent-violet/10 text-accent-violet border border-accent-violet/20"
                >
                  {{ tech }}
                </span>
              </div>

              <div class="flex justify-center md:justify-start">
                <MagneticButton>
                  <a
                    :href="featuredProduct.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="interactive inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-accent-violet to-accent-cyan text-white rounded-xl font-semibold text-sm shadow-lg shadow-accent-violet/25 hover:shadow-accent-violet/40 transition-shadow"
                  >
                    Explore Smart Reception
                    <ArrowTopRightOnSquareIcon class="w-4 h-4" />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </div>
  </section>
</template>

<script setup>
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { featuredProduct } from '../data/product'
import { useAssetPath } from '../composables/useAssetPath'
import SectionReveal from './ui/SectionReveal.vue'
import MagneticButton from './ui/MagneticButton.vue'

const { getAssetPath } = useAssetPath()
</script>
