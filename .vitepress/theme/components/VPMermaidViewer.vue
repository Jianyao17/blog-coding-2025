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

const center = () => 
{
  const rect = previewContainer.value?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
};


// Zoom controls
const zoomIn = () => panzoomInstance.value?.smoothZoom(center().x, center().y, 1.2)
const zoomOut = () => panzoomInstance.value?.smoothZoom(center().x, center().y, 0.8)

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
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.viewer-toolbar :deep(ul) {
  display: flex;
  gap: 8px;
  padding: 8px;
  margin: 0 auto 16px;
  border-radius: 24px;
}

.viewer-toolbar :deep(li) {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-border);
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
}

.viewer-toolbar :deep(li::before) {
  position: absolute;
  top: 18px;
  left: 18px;
  transform: translate(-50%, -50%);
  font-size: 16px;
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