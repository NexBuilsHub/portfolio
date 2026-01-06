<template>
  <section id="portfolio" class="py-20 bg-gray-900 text-white">
    <div class="container mx-auto px-6">
      <h2 class="text-5xl font-bold mb-4 text-center" data-aos="fade-up">My Experience</h2>
      <p class="text-gray-400 text-center mb-12" data-aos="fade-up" data-aos-delay="100">
        Professional experience and projects I've worked on
      </p>

      <!-- Work Experience Timeline -->
      <div class="max-w-4xl mx-auto space-y-8 mb-16">
        <div 
          v-for="(exp, index) in experiences" 
          :key="index"
          class="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all duration-300"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center">
                <BriefcaseIcon class="w-6 h-6 text-white" />
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold mb-2">{{ exp.title }}</h3>
              <p class="text-pink-400 font-semibold mb-2">{{ exp.company }}</p>
              <p class="text-gray-400 mb-4">{{ exp.period }}</p>
              <p class="text-gray-300 leading-relaxed">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="mt-16">
        <h3 class="text-3xl font-bold mb-8 text-center">Projects</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(project, index) in projects" 
            :key="index"
            class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="h-48 bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center">
              <component :is="project.icon" class="w-16 h-16 text-white" />
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
    </div>
  </section>
</template>

<script setup>
import { BriefcaseIcon, CodeBracketIcon, DevicePhoneMobileIcon, CloudIcon, GlobeAltIcon, ServerIcon } from '@heroicons/vue/24/outline'

const experiences = [
  {
    title: 'Freelance Full-Stack Developer',
    company: 'Remote',
    period: '2024 – Present',
    description: 'Full-stack web and mobile development, collaborating with clients and a small team to transform ideas into scalable, high-performance applications, including multi-tenant platforms, using modern and innovative technologies.'
  },
  {
    title: 'Cloud Developer',
    company: 'YOUR AWS',
    period: 'May 2024 – July 2024',
    description: 'Cloud development using AWS services for application hosting, domain management, security configuration, and performance optimization, while solving cloud-related issues and providing technical support.'
  },
  {
    title: 'Full-Stack Web Developer',
    company: 'DIGIEVENTS',
    period: 'May 2023 – April 2024',
    description: 'Full-stack web development, working closely with the team to turn concepts into interactive and efficient web applications and extensions by leveraging advanced and innovative technologies.'
  }
]

const projects = [
  {
    title: 'Multi-Tenant Platform',
    description: 'Scalable multi-tenant SaaS platform with advanced features',
    tech: ['React', 'Next.js', 'Symfony', 'AWS'],
    icon: CodeBracketIcon
  },
  {
    title: 'Mobile Application',
    description: 'Cross-platform mobile app with React Native and Expo',
    tech: ['React Native', 'Expo', 'Node.js'],
    icon: DevicePhoneMobileIcon
  },
  {
    title: 'Cloud Infrastructure',
    description: 'AWS-based cloud solutions and deployment automation',
    tech: ['AWS', 'Docker', 'CI/CD'],
    icon: CloudIcon
  },
  {
    title: 'Web Application',
    description: 'Modern web application with Vue.js and Symfony backend',
    tech: ['Vue.js', 'Symfony', 'PHP'],
    icon: GlobeAltIcon
  },
  {
    title: 'WordPress Website',
    description: 'Dynamic WordPress website with custom functionality',
    tech: ['WordPress', 'PHP', 'MySQL'],
    icon: ServerIcon
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    tech: ['React', 'Node.js', 'MongoDB'],
    icon: CodeBracketIcon
  }
]
</script>
