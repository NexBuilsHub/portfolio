<template>
  <div class="min-h-screen">
    <Header />
    <Hero />
    <About />
    <Experience />
    <Skills />
    <Awards />
    <News />
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Experience from './components/Experience.vue'
import Skills from './components/Skills.vue'
import Awards from './components/Awards.vue'
import News from './components/News.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import AOS from 'aos'

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
  })
})
</script>

<style>
/* Additional global styles if needed */
</style>
