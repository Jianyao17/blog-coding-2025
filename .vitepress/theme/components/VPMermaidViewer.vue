<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import panzoom from 'panzoom'
import appConfig from '../../appConfig'

// Refs
const previewContainer = ref(null)
const panzoomInstance = ref(null)
const isVisible = ref(false)
const isLocked = ref(false)

// Viewer controls
function showViewer(container) 
{
  const svg = container.querySelector('.mermaid-render').innerHTML
  previewContainer.value.innerHTML = svg
  isVisible.value = true
  initPanzoom()
}

function hideViewer() 
{
  isVisible.value = false
  disposePanzoom()
}

// Panzoom setup
function initPanzoom() 
{
  disposePanzoom()
  panzoomInstance.value = panzoom(previewContainer.value, 
  {
    ...appConfig.mermaidViewerOptions.panzoom,
    beforeMouseDown: e => isLocked.value
  })
}

function disposePanzoom() 
{
  panzoomInstance.value?.dispose()
  panzoomInstance.value = null
}

// Download Diagarm as PNG
const downloadPNG = () => 
{
  const svg = previewContainer.value?.querySelector('svg')
  if (!svg) return
  
  // Get SVG dimensions
  const svgData = new XMLSerializer().serializeToString(svg)
  const { width, height } = svg.getBoundingClientRect()
  
  // Calculate optimal scale based on screen height
  const maxHeight = Math.min(window.innerHeight * 2, 1440) // Cap at 1440px
  const scale = Math.min(maxHeight / height, 3) // Cap scale at 3x
  
  // Create scaled canvas
  const canvas = document.createElement('canvas')
  canvas.width = width * scale
  canvas.height = height * scale
  
  const ctx = canvas.getContext('2d')
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.scale(scale, scale)
  
  const img = new Image()
  img.onload = () => 
  {
    ctx.drawImage(img, 0, 0, width, height)
    
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'diagram.png'
    link.click()
  }
  img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
}

const center = () => 
{
  const rect = previewContainer.value?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
};

// Debounced zoom controls
let zoomTimeout
const debouncedZoom = (fn) => 
{
  clearTimeout(zoomTimeout)
  zoomTimeout = setTimeout(() => fn(), 50)
}

const zoomIn = () => debouncedZoom(() => panzoomInstance.value?.smoothZoom(center().x, center().y, 1.5))
const zoomOut = () => debouncedZoom(() => panzoomInstance.value?.smoothZoom(center().x, center().y, 0.5))
const resetView = () => 
{
  if (!panzoomInstance.value) return
  
  // Reset zoom and position
  panzoomInstance.value.zoomAbs(0, 0, 1)
  panzoomInstance.value.moveTo(0, 0)
}

// Event handlers
const toggleLock = () => isLocked.value = !isLocked.value
const handleEscape = e => e.key === 'Escape' && hideViewer()
const handleAlt = e => isLocked.value = e.altKey

// Lifecycle handlers
const addListeners = () => 
{
  document.querySelectorAll('.mermaid-container')
    .forEach(el => el.addEventListener('click', () => showViewer(el)))
  
  window.addEventListener('keydown', handleEscape)
  window.addEventListener('keydown', handleAlt)
  window.addEventListener('keyup', handleAlt)
}

const removeListeners = () => 
{
  document.querySelectorAll('.mermaid-container')
    .forEach(el => el.removeEventListener('click', () => showViewer(el)))
    
  window.removeEventListener('keydown', handleEscape)
  window.removeEventListener('keydown', handleAlt)
  window.removeEventListener('keyup', handleAlt)
}

onMounted(addListeners)
onUnmounted(() => {
  removeListeners()
  hideViewer()
})
</script>

<template>
  <Transition name="viewer-fade">
    <div v-show="isVisible" 
         class="viewer-backdrop viewer-fixed viewer-open"
         @click.self="hideViewer">
      <div class="viewer-content">
        <div ref="previewContainer" @click.self="hideViewer"
             class="preview-container viewer-canvas" />

        <div class="viewer-toolbar">
          <ul>
            <li class="viewer-zoom-in" @click="zoomIn" />
            <li class="viewer-zoom-out" @click="zoomOut" />
            <li class="viewer-reset" @click="resetView" />
            <li class="viewer-download" @click="downloadPNG" />
            <li :class="['viewer-lock', {'is-active': isLocked}]" @click="toggleLock" />
          </ul>
        </div>

        <button class="close-btn viewer-button" @click="hideViewer">×</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.viewer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.viewer-content {
  position: relative;
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;
}

.preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.preview-container :deep(svg) 
{
  display: flex;
  padding: 32px;
  border-radius: 8px;
}

.viewer-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 24px;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.15s;
  display: grid;
  place-items: center;
}

.viewer-toolbar {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.viewer-toolbar ul {
  display: flex;
  list-style: none;
  padding: 8px;
  margin: 0;
  gap: 8px;
}

.viewer-toolbar li {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.viewer-toolbar li:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.viewer-toolbar li::before {
  content: '';
  position: absolute;
  top: 18px;
  left: 18px;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* Icon definitions */
.viewer-zoom-in::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3C/svg%3E");
}

.viewer-zoom-out::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M19 13H5v-2h14v2z'/%3E%3C/svg%3E");
}

.viewer-reset::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8s-3.58-8-8-8z'/%3E%3C/svg%3E");
}

.viewer-download::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M19 9h-4V3H9v6H5l7 7l7-7zM5 18v2h14v-2H5z'/%3E%3C/svg%3E");
}

.viewer-lock::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1c1.71 0 3.1 1.39 3.1 3.1v2z'/%3E%3C/svg%3E");
}

.viewer-lock.is-active {
  background-color: var(--vp-button-brand-bg) !important;
}

.viewer-lock.is-active::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1c1.71 0 3.1 1.39 3.1 3.1v2z'/%3E%3C/svg%3E");
}

.viewer-fade-enter-active,
.viewer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.viewer-fade-enter-from,
.viewer-fade-leave-to {
  opacity: 0;
}

:deep(.viewer-open) {
  overflow: hidden;
}
</style>