<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import appConfig from '../../app.config'
import panzoom from 'panzoom'

const previewContainer = ref(null)
const panzoomInstance = ref(null)
const isVisible = ref(false)
const isLocked = ref(false)

async function showViewer(container) 
{
  if (!container || !previewContainer.value) return
  
  try {
    const math = container.querySelector('.math-render')?.innerHTML
    if (!math) return
    
    // Set visible first
    isVisible.value = true
    
    // Wait for DOM update
    await nextTick()
    
    // Set content and init after DOM is ready
    if (previewContainer.value) 
    {
      previewContainer.value.innerHTML = math
      initPanzoom()
    }
  } catch (err) {
    console.error('Error showing LaTeX viewer:', err)
    hideViewer()
  }
}

function hideViewer() 
{
  isVisible.value = false
  disposePanzoom()
}

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
  const rect = previewContainer.value?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 }
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

// Debounced zoom controls
let zoomTimeout
const debouncedZoom = (fn) => 
{
  clearTimeout(zoomTimeout)
  zoomTimeout = setTimeout(() => fn(), 50)
}

// Zoom controls
const zoomIn = () => debouncedZoom(() => panzoomInstance.value?.smoothZoom(center().x, center().y, 1.5))
const zoomOut = () => debouncedZoom(() => panzoomInstance.value?.smoothZoom(center().x, center().y, 0.5))
const resetView = () => 
{
  if (!panzoomInstance.value) return

  panzoomInstance.value?.zoomAbs(0, 0, 1)
  panzoomInstance.value?.moveTo(0, 0) 
}

// Event handlers
const toggleLock = () => isLocked.value = !isLocked.value
const handleEscape = e => e.key === 'Escape' && hideViewer()

// Lifecycle handlers
const addListeners = () => 
{
  document.querySelectorAll('.math-block-container')
    .forEach(el => el.addEventListener('click', () => showViewer(el)))
  
  window.addEventListener('keydown', handleEscape)
}

const removeListeners = () => 
{
  document.querySelectorAll('.math-block-container')
    .forEach(el => el.removeEventListener('click', () => showViewer(el)))
  
  window.removeEventListener('keydown', handleEscape)
}

onMounted(addListeners)
onUnmounted(() => {
  removeListeners()
  hideViewer()
})
</script>

<template>
  <Transition name="fade">
    <div v-show="isVisible" 
      class="viewer-backdrop viewer-fixed viewer-open" 
      @click.self="hideViewer">
      
      <div class="viewer-content">
        <div ref="previewContainer" @click.self="hideViewer"
          class="preview-container viewer-canvas"/>

        <div class="viewer-toolbar">
          <ul>
            <li class="viewer-zoom-in" @click="zoomIn" />
            <li class="viewer-zoom-out" @click="zoomOut" />
            <li class="viewer-reset" @click="resetView" />
            <li :class="['viewer-lock', {'is-active': isLocked}]" 
                @click="toggleLock" />
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
  padding: 32px;
  font-size: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.viewer-toolbar {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
}

.viewer-toolbar ul {
  display: flex;
  gap: 8px;
  padding: 8px;
  margin: 0;
  list-style: none;
}

.viewer-toolbar li {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.viewer-toolbar li:hover {
  background: rgba(255, 255, 255, 0.2);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
