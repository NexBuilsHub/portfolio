<template>
  <component
    :is="tag"
    ref="elRef"
    class="inline-block transition-transform duration-200 ease-out"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup>
import { ref } from 'vue'
import { useMagnetic } from '../../composables/useMagnetic'

const props = defineProps({
  tag: { type: String, default: 'div' },
  strength: { type: Number, default: 0.35 },
})

const elRef = ref(null)
const { x, y } = useMagnetic(elRef, props.strength)
</script>
