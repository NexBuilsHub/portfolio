<template>
  <div class="flex flex-col h-full justify-center gap-6 md:gap-8">
    <div class="text-center">
      <div class="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center mx-auto mb-5">
        <component :is="icon" class="w-10 h-10 md:w-12 md:h-12 text-white" />
      </div>
      <span class="text-sm font-mono text-accent-cyan tracking-widest">0{{ index + 1 }}</span>
      <h3 class="text-4xl md:text-5xl font-bold text-white font-display mt-2">{{ category.title }}</h3>
    </div>

    <p class="text-gray-300 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto">
      {{ category.description }}
    </p>

    <div class="grid sm:grid-cols-2 gap-4 md:gap-5">
      <div
        v-for="skill in category.skills"
        :key="skill.name"
        class="flex gap-4 p-4 md:p-5 rounded-xl bg-white/[0.06] border border-white/15"
      >
        <div class="w-1.5 rounded-full bg-gradient-to-b from-accent-violet to-accent-cyan shrink-0" />
        <div class="min-w-0">
          <h4 class="text-white font-semibold text-base md:text-lg">{{ skill.name }}</h4>
          <p class="text-gray-400 text-sm md:text-base mt-1.5 leading-relaxed">{{ skill.detail }}</p>
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
})
</script>
