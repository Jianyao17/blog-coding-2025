<script setup>
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import mermaid from 'mermaid'
import appConfig from '../../appConfig'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const container = ref(null)
const renderedSvg = ref('')
const isCopied = ref(false)

async function copyToClipboard() 
{
  const code = container.value?.textContent?.trim()
  if (!code) return

  try {
    await navigator.clipboard.writeText(code)
    
    isCopied.value = true
    setTimeout(() => { isCopied.value = false}, 2000)
  } catch (err) 
  {
    const textarea = document.createElement('textarea')
    textarea.value = code
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    isCopied.value = true
    setTimeout(() => { isCopied.value = false }, 2000)
  }
}

onMounted(async () => 
{
  mermaid.initialize(appConfig.mermaidOptions)  
  try {
    const { svg } = await mermaid.render(props.id, container.value.textContent)
    renderedSvg.value = svg
  } catch (error) {
    console.error('Failed to render diagram:', error)
    renderedSvg.value = `<div class="error">Error rendering diagram: ${error.message}</div>`
  }
})
</script>

<template>
  <div class="mermaid-container">
    <pre ref="container" style="display: none">
      <slot></slot>
    </pre>
    <div class="mermaid-render" v-html="renderedSvg"></div>
    <button class="copy" 
      :class="{ copied: isCopied }" 
      @click.stop="copyToClipboard"></button>
    <span class="lang">mermaid</span>
  </div>
</template>

<style scoped>
.mermaid-container {
  position: relative;
  cursor: pointer;
  margin: 16px auto;
  padding: 24px;
  background-color: var(--vp-c-bg) !important;
  border-radius: 8px;
  overflow: auto;
}

.mermaid-render :deep(svg) {
  max-width: 100%;
  height: auto;
}

.mermaid-container .lang {
  font-weight: normal !important;
  font-size: 12px !important;
  top: 0px !important;
}
</style>