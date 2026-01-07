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
            @click="openModal(index)"
            class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="h-48 overflow-hidden">
              <img 
                v-if="project.image"
                :src="getImagePath(project.image)" 
                :alt="project.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div v-else class="h-full bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center">
                <component :is="project.icon" class="w-16 h-16 text-white" />
              </div>
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

    <!-- Project Modal -->
    <Transition name="modal">
      <div 
        v-if="selectedProject !== null"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center">
                <span class="text-white font-bold text-sm">YB</span>
              </div>
              <span class="text-gray-700 font-semibold">Made by Youssef Bouayez</span>
            </div>
            <div class="flex items-center space-x-4">
              <button 
                @click="previousProject"
                class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                :disabled="selectedProject === 0"
              >
                <ChevronLeftIcon class="w-5 h-5 text-gray-700" />
              </button>
              <span class="text-gray-600 font-medium">{{ (selectedProject || 0) + 1 }} of {{ projects.length }}</span>
              <button 
                @click="nextProject"
                class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                :disabled="selectedProject === projects.length - 1"
              >
                <ChevronRightIcon class="w-5 h-5 text-gray-700" />
              </button>
              <button 
                @click="closeModal"
                class="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon class="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

          <!-- Modal Content -->
          <div v-if="selectedProject !== null" class="p-6">
            <div class="mb-4">
              <span class="text-gray-500 text-sm">From: {{ projects[selectedProject].period || '2024' }}</span>
            </div>
            <div class="flex items-start justify-between mb-6">
              <h2 class="text-4xl font-bold text-gray-900">{{ projects[selectedProject].title }}</h2>
              <button 
                @click="scrollToContact"
                class="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
              >
                Contact
              </button>
            </div>
            <p class="text-gray-700 mb-6 leading-relaxed">{{ projects[selectedProject].fullDescription || projects[selectedProject].description }}</p>
            
            <!-- Project Details -->
            <div class="flex flex-wrap gap-4 mb-6">
              <div v-if="projects[selectedProject].priceRange" class="px-4 py-2 bg-gray-100 rounded-lg">
                <span class="text-gray-600 text-sm">Price range:</span>
                <span class="text-gray-900 font-semibold ml-2">{{ projects[selectedProject].priceRange }}</span>
              </div>
              <div v-if="projects[selectedProject].duration" class="px-4 py-2 bg-gray-100 rounded-lg">
                <span class="text-gray-600 text-sm">Project duration:</span>
                <span class="text-gray-900 font-semibold ml-2">{{ projects[selectedProject].duration }}</span>
              </div>
            </div>

            <!-- Project Images -->
            <div v-if="projects[selectedProject].images && projects[selectedProject].images.length > 0" class="space-y-4">
              <div 
                v-for="(image, imgIndex) in projects[selectedProject].images" 
                :key="imgIndex"
                class="rounded-lg overflow-hidden border border-gray-200"
              >
                <img 
                  :src="getImagePath(image)" 
                  :alt="`${projects[selectedProject].title} - Image ${imgIndex + 1}`"
                  class="w-full h-auto"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Tech Stack -->
            <div class="mt-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">Technologies Used</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in projects[selectedProject].tech" 
                  :key="tech"
                  class="px-4 py-2 bg-pink-500/10 text-pink-600 rounded-full font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { BriefcaseIcon, CodeBracketIcon, DevicePhoneMobileIcon, CloudIcon, GlobeAltIcon, ServerIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/vue/24/outline'

// Import images from public folder
// Note: In Vite, public folder assets are served from root
// So we can use them directly with /imges/ path

const selectedProject = ref(null)

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
    fullDescription: 'I developed this multi-tenant SaaS platform as an investment project, which I sponsored myself along with a friend. As the project leader and team manager (chef d\'équipe), I was responsible for the overall project development and advancement. I coordinated a team of junior developers, assigning tasks and ensuring project milestones were met. My primary responsibilities included managing the development workflow, overseeing the team\'s progress, and handling critical technical challenges. I took on the most complex tasks, including infrastructure setup, Docker containerization, deployment strategies, and the initial project architecture. The platform features advanced multi-tenancy capabilities, allowing multiple organizations to use the same application instance while maintaining complete data isolation. Built with modern technologies including Next.js for the frontend, Symfony for the backend API, Nginx for reverse proxy and load balancing, and deployed on AWS infrastructure with Docker for containerization. The platform includes comprehensive user management, billing systems, subscription management, and scalable architecture designed to handle growth and multiple tenants efficiently.',
    tech: ['Nginx', 'Next.js', 'Symfony', 'AWS', 'Docker'],
    icon: CodeBracketIcon,
    image: '/imges/multitanent.jpeg',
    images: ['/imges/multitanent.png', '/imges/multitanent.jpeg', '/imges/multitanent1.jpeg'],
    period: '2024',
    priceRange: 'Contact for pricing',
    duration: '4-12 weeks'
  },
  {
    title: 'Mobile Application',
    description: 'Cross-platform mobile app with React Native and Expo',
    fullDescription: 'The app helps users join events or conferences by simply scanning a barcode on the badge. It sends notifications, reminding users one day before the event starts. Users can also view a history of all the events they attended, see the sponsors of these conferences, and watch live videos of the congresses and workshops. Additionally, I have developed a cross-platform solution for managing registrations and issuing badges. In the mobile app, users can scan the barcode to access all relevant information. This hybrid app was developed using PWS, ReactJS, and React Native to create APKs for both Android and iOS.',
    tech: ['React Native', 'Expo', 'Node.js'],
    icon: DevicePhoneMobileIcon,
    image: '/imges/mobile1.webp',
    images: ['/imges/mobile.webp', '/imges/mobile1.webp'],
    period: '2024',
    priceRange: 'Contact for pricing',
    duration: '3-6 weeks'
  },
  {
    title: 'Cloud Infrastructure',
    description: 'AWS-based cloud solutions and deployment automation',
    fullDescription: 'Cloud infrastructure setup and deployment automation using AWS services, including EC2, S3, RDS, and CI/CD pipelines for efficient application deployment.',
    tech: ['AWS', 'Docker', 'CI/CD'],
    icon: CloudIcon,
    image: null,
    images: [],
    period: '2024',
    priceRange: '$200-$600',
    duration: '1-3 weeks'
  },
  {
    title: 'Web Application',
    description: 'Modern web application with React, Vue.js and Symfony backend',
    fullDescription: 'I developed this comprehensive web application independently for a client who operates stores specializing in PC gaming equipment and accessories. The system is built using React and Vue.js for the frontend, with a Symfony backend API. The platform provides complete management solutions for all aspects of the business operations. It includes delivery driver (livreur) management, allowing tracking and coordination of delivery personnel. The technician management module handles service appointments and technical support scheduling. The point de vente (sales point) system tracks daily cash register results, recording all entries and transactions for each day. The application also features check management (gestion chèques) for financial tracking, delivery agency management for coordinating multiple delivery locations, and comprehensive logging system for audit trails and activity monitoring. Additionally, I am currently developing a mobile application that integrates with this system. The mobile app includes Firebase notification system integration, providing real-time push notifications. The system also features real-time data synchronization for tracking delivery drivers on an interactive map, allowing live monitoring of delivery personnel locations and routes. This enables efficient logistics management and improved customer service through accurate delivery tracking.',
    tech: ['React.js', 'Vue.js', 'Symfony', 'PHP', 'Firebase'],
    icon: GlobeAltIcon,
    image: '/imges/webapp.png',
    images: ['/imges/webapp.png', '/imges/webapp1.png', '/imges/webapp2.png'],
    period: '2023',
    priceRange: 'Contact for pricing',
    duration: '2-5 weeks'
  },
  {
    title: 'WordPress WooCommerce Project',
    description: 'Dynamic WordPress website with custom functionality',
    fullDescription: 'In my WordPress WooCommerce project, I can guide you through the entire process of setting up your online store. Whether you prefer using WordPress on a Bitnami stack, Ubuntu, or Amazon Lightsail, I can help you choose the best domain name and configure your EC2 instance. I will assist you in selecting the optimal themes and designing a layout that aligns with your product and blog concept. Together, we will create an engaging and user-friendly experience that effectively showcases your offerings.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
    icon: ServerIcon,
    image: '/imges/wordPress.webp',
    images: ['/imges/wordPress.webp', '/imges/wordPress1.webp'],
    period: 'May 2024',
    priceRange: '$50-$100',
    duration: '1-7 days'
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    fullDescription: 'A complete e-commerce platform with shopping cart, payment gateway integration, order management, and admin dashboard for managing products and orders.',
    tech: ['React', 'Node.js', 'MongoDB'],
    icon: CodeBracketIcon,
    image: null,
    images: [],
    period: '2024',
    priceRange: '$600-$1200',
    duration: '4-8 weeks'
  }
]

const openModal = (index) => {
  selectedProject.value = index
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}

const nextProject = () => {
  if (selectedProject.value !== null && selectedProject.value < projects.length - 1) {
    selectedProject.value++
  }
}

const previousProject = () => {
  if (selectedProject.value !== null && selectedProject.value > 0) {
    selectedProject.value--
  }
}

const getImagePath = (imagePath) => {
  if (!imagePath) return ''
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath
  // For public folder assets with base path, we need to include the base path
  // Base path is '/portfolio/' as defined in vite.config.js
  const basePath = '/portfolio/'
  // Remove leading slash if present, then add base path
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  return basePath + cleanPath
}

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  // Optionally set a fallback image
  event.target.style.display = 'none'
}

const scrollToContact = () => {
  closeModal()
  // Wait a bit for modal to close, then scroll
  setTimeout(() => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 300)
}
</script>

<style scoped>
/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .bg-white {
  transform: scale(0.9);
  opacity: 0;
}

.modal-leave-to .bg-white {
  transform: scale(0.9);
  opacity: 0;
}
</style>
