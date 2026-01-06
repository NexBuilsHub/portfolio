<template>
  <section id="contact" class="py-20 bg-white text-gray-900">
    <div class="container mx-auto px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12" data-aos="fade-up">
          <p class="text-pink-500 font-semibold mb-2">Starting a project!</p>
          <h2 class="text-5xl font-bold">Contact Me</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div data-aos="fade-right">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <input 
                  type="text" 
                  v-model="form.name"
                  placeholder="Your Name"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  v-model="form.email"
                  placeholder="Your Email"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <textarea 
                  v-model="form.message"
                  placeholder="Your Message"
                  rows="6"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none transition-colors resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                class="w-full px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="grid grid-cols-2 gap-6" data-aos="fade-left">
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="font-bold text-lg mb-4">Present Address</h3>
              <p class="text-gray-600">500 South Main Street</p>
              <p class="text-gray-600">Bishop, CA 93514</p>
            </div>
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="font-bold text-lg mb-4">Home Address</h3>
              <p class="text-gray-600">400 South Main Street</p>
              <p class="text-gray-600">Bishop, CA 93514</p>
            </div>
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="font-bold text-lg mb-4">Contact</h3>
              <p class="text-gray-600">example@domain.com</p>
              <p class="text-gray-600">+012 3344 556677</p>
            </div>
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="font-bold text-lg mb-4">Quick Link</h3>
              <div class="flex flex-wrap gap-2">
                <a href="#portfolio" class="text-pink-500 hover:text-pink-600">Blog</a>
                <a href="#portfolio" class="text-pink-500 hover:text-pink-600">Service</a>
                <a href="#portfolio" class="text-pink-500 hover:text-pink-600">Portfolio</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', form.value)
  alert('Thank you for your message! I will get back to you soon.')
  form.value = { name: '', email: '', message: '' }
}
</script>

