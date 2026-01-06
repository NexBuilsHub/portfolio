<template>
  <section id="news" class="py-20 bg-gray-900 text-white">
    <div class="container mx-auto px-6">
      <h2 class="text-5xl font-bold mb-12 text-center" data-aos="fade-up">Latest News</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <article 
          v-for="(article, index) in news" 
          :key="index"
          class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="h-48 bg-gradient-to-br from-pink-500 to-blue-500"></div>
          <div class="p-6">
            <p class="text-gray-400 text-sm mb-2">{{ article.date }}</p>
            <h3 class="text-xl font-bold mb-3">{{ article.title }}</h3>
            <p class="text-gray-400 mb-4">{{ article.excerpt }}</p>
            <a href="#" class="text-pink-500 hover:text-pink-400 font-semibold">Read More →</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const news = [
  {
    title: 'The Lorem Ipsum generators',
    date: 'March 16, 2021',
    excerpt: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some passages of form.'
  },
  {
    title: 'New Framework Release',
    date: 'February 10, 2021',
    excerpt: 'Latest updates and features in modern web development frameworks that are changing the industry.'
  },
  {
    title: 'Best Practices 2024',
    date: 'January 5, 2021',
    excerpt: 'Essential coding practices and design patterns every developer should know in the current year.'
  }
]
</script>

