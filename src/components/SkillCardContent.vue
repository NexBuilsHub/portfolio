<template>
  <div
    class="flex flex-col h-full justify-center gap-6 md:gap-8"
    :class="centered ? 'text-center items-center' : ''"
  >
    <div v-if="!hideHeader" class="text-center">
      <div
        class="rounded-2xl bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center mx-auto mb-5"
        :class="centered ? 'w-16 h-16' : 'w-20 h-20 md:w-24 md:h-24'"
      >
        <component :is="icon" class="text-white" :class="centered ? 'w-8 h-8' : 'w-10 h-10 md:w-12 md:h-12'" />
      </div>
      <span class="text-sm font-mono text-accent-cyan tracking-widest">0{{ index + 1 }}</span>
      <h3
        class="font-bold text-white font-display mt-2"
        :class="centered ? 'text-2xl' : 'text-4xl md:text-5xl'"
      >
        {{ category.title }}
      </h3>
    </div>

    <p
      class="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto"
      :class="centered ? 'text-sm' : 'text-base md:text-lg'"
    >
      {{ category.description }}
    </p>

    <div class="grid gap-3 md:gap-5 w-full" :class="centered ? 'grid-cols-1' : 'sm:grid-cols-2 gap-4'">
      <div
        v-for="skill in category.skills"
        :key="skill.name"
        class="rounded-xl bg-white/[0.06] border border-white/15 p-4 md:p-5"
        :class="centered ? 'text-center' : 'flex gap-4'"
      >
        <div
          v-if="!centered"
          class="w-1.5 rounded-full bg-gradient-to-b from-accent-violet to-accent-cyan shrink-0"
        />
        <div class="min-w-0" :class="centered ? 'mx-auto' : ''">
          <h4 class="text-white font-semibold" :class="centered ? 'text-sm' : 'text-base md:text-lg'">
            {{ skill.name }}
          </h4>
          <p class="text-gray-400 mt-1.5 leading-relaxed" :class="centered ? 'text-xs' : 'text-sm md:text-base'">
            {{ skill.detail }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  category: { type: Object, required: true },
  icon: { type: [Object, Function], required: true },
  index: { type: Number, required: true },
  centered: { type: Boolean, default: false },
  hideHeader: { type: Boolean, default: false },
})
</script>
