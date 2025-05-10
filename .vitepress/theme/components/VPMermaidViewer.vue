<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import panzoom from 'panzoom'
import appConfig from '../../appConfig'

const previewContainer = ref(null)
const panzoomInstance = ref(null)
const isVisible = ref(false)
const isLocked = ref(false)

function showViewer(container) 
{
  // Get the rendered SVG from mermaid container
  const svg = container.querySelector('.mermaid-render').innerHTML
  
  // Set SVG to preview container
  previewContainer.value.innerHTML = svg
  isVisible.value = true

  // Initialize panzoom
  nextTick(() => 
  {
    if (panzoomInstance.value) 
    panzoomInstance.value.dispose()
    
    const svgElement = previewContainer.value.querySelector('svg')
    if (svgElement) 
    {
      panzoomInstance.value = panzoom(svgElement, { 
        ...appConfig.mermaidViewerOptions.panzoom,

        // Allow text selection when holding the Alt key or when locked
        beforeMouseDown: e => isLocked.value
      })
    }
  })
}

function hideViewer() 
{
  isVisible.value = false
  if (panzoomInstance.value) 
  {
    panzoomInstance.value.dispose()
    panzoomInstance.value = null
  }
}

const { x, y } = appConfig.mermaidViewerOptions.panzoom.transformOrigin
const zoomIn = () => panzoomInstance.value?.smoothZoom(0.0, 0.0, 1.2)
const zoomOut = () => panzoomInstance.value?.smoothZoom(0.0, 0.0, 0.8)

const handleAlt = e => isLocked.value = e.altKey

function toggleLock() 
{
  isLocked.value = !isLocked.value
}

// Add keyboard event listener
const handleKeyDown = e => e.key === 'Escape' && isVisible.value && hideViewer();

const addListener = () => 
{
  window.addEventListener('touchstart', hideViewer)
  window.addEventListener('keydown', handleKeyDown)
  document
    .querySelectorAll('.mermaid-container')
    .forEach(container => container.addEventListener('click', () => showViewer(container)))
}

const removeListener = () => 
{
  window.removeEventListener('touchstart', hideViewer)
  window.removeEventListener('keydown', handleKeyDown)
  document
    .querySelectorAll('.mermaid-container')
    .forEach(container => container.removeEventListener('click', showViewer))
}

onMounted(() => {
  addListener()
  window.addEventListener('keydown', handleAlt)
  window.addEventListener('keyup', handleAlt) 
})

onUnmounted(() => 
{
  removeListener()
  hideViewer()
  window.removeEventListener('keydown', handleAlt)
  window.removeEventListener('keyup', handleAlt)
})
</script>

<template>
  <Transition name="viewer-fade">
    <div v-show="isVisible" class="viewer-backdrop viewer-fixed viewer-open">
      <div class="viewer-content">
        <div ref="previewContainer" 
          class="preview-container viewer-canvas" 
          @touchstart.self="hideViewer"
          @click.self="hideViewer" >
        </div>

        <!-- Toolbar -->
        <div class="viewer-toolbar">
          <ul>
            <li class="viewer-zoom-in" @click="zoomIn" />
            <li class="viewer-zoom-out" @click="zoomOut" />
            <li :class="['viewer-one-to-one', {'viewer-active': isLocked}]" 
              @click.self="toggleLock" />
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
  backdrop-filter: blur(4px);         /* Efek blur */
  -webkit-backdrop-filter: blur(4px); /* Dukungan untuk Safari */ 
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.viewer-content {
  position: relative;
  background: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-container :deep(svg) {
  padding: 32px;
  border-radius: 8px;
}

/* Override default button style */
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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s;
  border: none;
  padding: 0;
}

.viewer-button:hover {
  background-color: rgba(0, 0, 0, 0.6);
}

/* Prevent page scrolling when modal is open */
:deep(.viewer-open) {
  overflow: hidden;
}

/* Override transition classes */
.viewer-fade-enter-active,
.viewer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.viewer-fade-enter-from,
.viewer-fade-leave-to {
  opacity: 0;
}

.viewer-toolbar {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.viewer-toolbar :deep(ul) {
  display: inline-flex;
  margin: 0 auto 16px;
  overflow: hidden;
  padding: 8px 8px;
  gap: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 24px;
  backdrop-filter: blur(4px);
}

.viewer-toolbar :deep(li) {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--vp-c-border);
  border-radius: 50%;
  cursor: pointer;
  height: 40px;  /* Increased from 24px */
  width: 40px;   /* Increased from 24px */
  overflow: hidden;
  transition: background-color 0.15s;
  position: relative;
}

.viewer-toolbar :deep(li:hover) {
  background-color: rgba(0, 0, 0, 0.8);
}

.viewer-toolbar :deep(li.viewer-active) {
  background-color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.viewer-toolbar :deep(li::before) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 16px;  /* Added font size */
}
</style>