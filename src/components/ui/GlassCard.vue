<template>
  <div :class="['glass-card', padding, hover && 'hover:border-white/20 transition-colors duration-300', $attrs.class]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  padding: { type: String, default: 'p-6' },
  hover: { type: Boolean, default: true },
})
</script>
