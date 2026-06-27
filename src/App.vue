<template>
  <div class="min-h-screen bg-obsidian">
    <CustomCursor />
    <Header />
    <Hero />
    <About />
    <ExperienceTimeline />
    <ProjectsBento />
    <FeaturedProduct />
    <Skills />
    <Interests />
    <Awards />
    <Footer />
  </div>
</template>

<script setup>
import CustomCursor from './components/ui/CustomCursor.vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import ExperienceTimeline from './components/ExperienceTimeline.vue'
import ProjectsBento from './components/ProjectsBento.vue'
import FeaturedProduct from './components/FeaturedProduct.vue'
import Skills from './components/Skills.vue'
import Interests from './components/Interests.vue'
import Awards from './components/Awards.vue'
import Footer from './components/Footer.vue'
</script>
