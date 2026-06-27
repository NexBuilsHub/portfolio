<template>
  <div :class="tileClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v),
  },
})

const tileClasses = computed(() => {
  const base = 'glass-card p-6 hover:border-accent-violet/30 transition-all duration-300'
  const sizes = {
    small: 'md:col-span-1 md:row-span-1',
    medium: 'md:col-span-2 md:row-span-1',
    large: 'md:col-span-2 md:row-span-2',
  }
  return `${base} ${sizes[props.size]}`
})
</script>
