<template>
  <section id="portfolio" class="py-20 bg-gray-900 text-white">
    <div class="container mx-auto px-6">
      <h2 class="text-5xl font-bold mb-4 text-center" data-aos="fade-up">My Experience</h2>
      <p class="text-gray-400 text-center mb-12" data-aos="fade-up" data-aos-delay="100">
        Projects and work I've completed
      </p>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(project, index) in projects" 
          :key="index"
          class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="h-48 bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center">
            <span class="text-white text-4xl font-bold">{{ project.icon }}</span>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
            <p class="text-gray-400 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in project.tech" 
                :key="tech"
                class="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    tech: ['Vue.js', 'Node.js', 'MongoDB'],
    icon: '🛒'
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    tech: ['React', 'Firebase', 'TypeScript'],
    icon: '📋'
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media metrics',
    tech: ['Vue.js', 'Chart.js', 'REST API'],
    icon: '📊'
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application',
    tech: ['React Native', 'Node.js', 'PostgreSQL'],
    icon: '💳'
  },
  {
    title: 'Weather Forecast App',
    description: 'Real-time weather forecasting with maps',
    tech: ['Vue.js', 'OpenWeather API', 'Leaflet'],
    icon: '🌤️'
  },
  {
    title: 'Learning Management System',
    description: 'Online learning platform with video streaming',
    tech: ['Vue.js', 'Django', 'AWS'],
    icon: '🎓'
  }
]
</script>

