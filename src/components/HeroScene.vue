<template>
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { useMediaQuery } from '@vueuse/core'
import { useReducedMotion } from '../composables/useReducedMotion'

const canvasRef = ref(null)
const isMobile = useMediaQuery('(max-width: 768px)')
const { prefersReducedMotion } = useReducedMotion()

let animationId = null
let renderer = null
let particles = null
let lines = null
const mouse = { x: 0, y: 0 }

const onMouseMove = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}

const onResize = () => {
  if (!renderer) return
  const camera = renderer.userData.camera
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  if (isMobile.value || prefersReducedMotion.value) return

  const canvas = canvasRef.value
  if (!canvas) return

  const count = 120
  const connectionDistance = 1.8

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.userData = { camera }
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const positions = new Float32Array(count * 3)
  const originalPositions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 2 + Math.random() * 1.5
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    originalPositions[i * 3] = x
    originalPositions[i * 3 + 1] = y
    originalPositions[i * 3 + 2] = z
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0x8b5cf6,
    size: 0.04,
    transparent: true,
    opacity: 0.8,
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  const linePositions = []
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = positions[i * 3] - positions[j * 3]
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist < connectionDistance) {
        linePositions.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        )
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.15,
  })
  lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  scene.add(lines)

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    const pos = particles.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3] = originalPositions[i * 3] + mouse.x * 0.3
      pos[i * 3 + 1] = originalPositions[i * 3 + 1] + mouse.y * 0.3
      pos[i * 3 + 2] = originalPositions[i * 3 + 2]
    }
    particles.geometry.attributes.position.needsUpdate = true

    particles.rotation.y += 0.001
    lines.rotation.y += 0.001

    renderer.render(scene, camera)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
  if (animationId) cancelAnimationFrame(animationId)
  renderer?.dispose()
})
</script>
