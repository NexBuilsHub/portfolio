<template>
  <section id="projects" class="py-24 bg-obsidian bg-mesh-gradient">
    <div class="container mx-auto px-6">
      <SectionReveal>
        <h2 class="section-heading text-center">Projects</h2>
        <p class="section-subheading">
          AI platforms, SaaS systems, and full-stack applications
        </p>
      </SectionReveal>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] mt-12">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :class="[
            'glass-card overflow-hidden cursor-pointer interactive group transition-transform duration-200',
            project.featured ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1',
          ]"
          :style="tiltStyles[index]"
          data-cursor="pointer"
          @mousemove="(e) => onTiltMove(e, index)"
          @mouseleave="() => onTiltLeave(index)"
          @click="openModal(index)"
        >
          <div class="h-full flex flex-col">
            <div :class="['overflow-hidden bg-black relative', project.featured ? 'h-56' : 'h-36']">
              <!-- Closed card: poster/thumbnail only — no autoplay -->
              <img
                v-if="project.video && project.poster"
                :src="getAssetPath(project.poster)"
                :alt="`${project.title} preview`"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                v-else-if="project.video"
                class="w-full h-full flex items-center justify-center bg-charcoal group-hover:scale-105 transition-transform duration-500"
              >
                <div class="text-center">
                  <div class="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 border border-white/20">
                    <PlayIcon class="w-7 h-7 text-white ml-1" />
                  </div>
                  <span class="text-xs text-gray-400">Click to play demo</span>
                </div>
              </div>
              <img
                v-else-if="project.image"
                :src="getAssetPath(project.image)"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                @error="(e) => (e.target.style.display = 'none')"
              />
              <div
                v-else
                :class="['w-full h-full flex items-center justify-center bg-gradient-to-br', project.gradient || 'from-accent-violet to-accent-cyan']"
              >
                <SparklesIcon class="w-16 h-16 text-white/60" />
              </div>
              <div
                v-if="project.video"
                class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
              >
                <div class="w-12 h-12 rounded-full bg-accent-violet/80 flex items-center justify-center">
                  <PlayIcon class="w-6 h-6 text-white ml-0.5" />
                </div>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col">
              <h3 :class="['font-bold text-white mb-2', project.featured ? 'text-2xl' : 'text-lg']">
                {{ project.title }}
              </h3>
              <p class="text-gray-400 text-sm mb-4 flex-1">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.tech.slice(0, project.featured ? 5 : 3)"
                  :key="tech"
                  class="px-2 py-1 text-xs rounded-full bg-accent-violet/10 text-accent-violet border border-accent-violet/20"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionReveal :delay="200">
        <p class="text-center text-gray-500 mt-12">
          These are featured projects. I have more — if you're interested,
          <a href="#contact" class="text-accent-cyan hover:text-accent-violet transition-colors interactive">contact me</a>.
        </p>
      </SectionReveal>
    </div>

    <Transition name="modal">
      <div
        v-if="selectedProject !== null"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
          <div class="sticky top-0 glass-card border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
            <span class="text-gray-300 font-semibold">{{ projects[selectedProject].title }}</span>
            <div class="flex items-center gap-3">
              <button
                class="interactive p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
                :disabled="selectedProject === 0"
                @click="selectedProject--"
              >
                <ChevronLeftIcon class="w-5 h-5 text-gray-300" />
              </button>
              <span class="text-gray-500 text-sm">{{ selectedProject + 1 }} / {{ projects.length }}</span>
              <button
                class="interactive p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
                :disabled="selectedProject === projects.length - 1"
                @click="selectedProject++"
              >
                <ChevronRightIcon class="w-5 h-5 text-gray-300" />
              </button>
              <button class="interactive p-2 hover:bg-white/10 rounded-full transition-colors" @click="closeModal">
                <XMarkIcon class="w-6 h-6 text-gray-300" />
              </button>
            </div>
          </div>

          <div class="p-6">
            <p class="text-gray-500 text-sm mb-4">{{ projects[selectedProject].period }}</p>
            <p class="text-gray-300 leading-relaxed mb-6">{{ projects[selectedProject].fullDescription }}</p>

            <div v-if="projects[selectedProject].video" class="mb-6 rounded-xl overflow-hidden border border-white/10 bg-black">
              <video
                ref="modalVideoRef"
                :key="projects[selectedProject].id"
                :src="getAssetPath(projects[selectedProject].video)"
                :poster="projects[selectedProject].poster ? getAssetPath(projects[selectedProject].poster) : undefined"
                class="w-full h-auto"
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                muted
                playsinline
                @loadeddata="playModalVideo"
                @volumechange="forceSilent"
              />
            </div>

            <div v-if="projects[selectedProject].images?.length" class="space-y-4 mb-6">
              <img
                v-for="(img, i) in projects[selectedProject].images"
                :key="i"
                :src="getAssetPath(img)"
                :alt="`${projects[selectedProject].title} screenshot ${i + 1}`"
                class="w-full rounded-xl border border-white/10"
              />
            </div>

            <div class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="tech in projects[selectedProject].tech"
                :key="tech"
                class="px-3 py-1 text-sm rounded-full bg-accent-violet/10 text-accent-violet border border-accent-violet/20"
              >
                {{ tech }}
              </span>
            </div>

            <MagneticButton>
              <a
                href="#contact"
                class="interactive inline-block px-6 py-2 bg-gradient-to-r from-accent-violet to-accent-cyan text-white rounded-xl font-semibold text-sm"
                @click="closeModal"
              >
                Contact Me
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { SparklesIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon, PlayIcon } from '@heroicons/vue/24/outline'
import { projects } from '../data/projects'
import { useAssetPath } from '../composables/useAssetPath'
import SectionReveal from './ui/SectionReveal.vue'
import MagneticButton from './ui/MagneticButton.vue'

const { getAssetPath } = useAssetPath()
const selectedProject = ref(null)
const modalVideoRef = ref(null)
const tiltStyles = ref(projects.map(() => ({})))

const playModalVideo = () => {
  const video = modalVideoRef.value
  if (!video) return
  video.muted = true
  video.volume = 0
  video.defaultMuted = true
  video.play().catch(() => {})
}

const forceSilent = (e) => {
  const video = e.target
  video.muted = true
  video.volume = 0
}

const pauseModalVideo = () => {
  const video = modalVideoRef.value
  if (!video) return
  video.pause()
  video.currentTime = 0
}

watch(selectedProject, async (val) => {
  if (val === null) {
    pauseModalVideo()
    return
  }
  await nextTick()
  playModalVideo()
})

const onTiltMove = (e, index) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  tiltStyles.value[index] = {
    transform: `perspective(800px) rotateX(${-py * 10}deg) rotateY(${px * 10}deg)`,
  }
}

const onTiltLeave = (index) => {
  tiltStyles.value[index] = { transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)' }
}

const openModal = (index) => {
  selectedProject.value = index
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  pauseModalVideo()
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
