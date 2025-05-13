<script setup>
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import appConfig from '../../app.config'
import mermaid from 'mermaid'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  diagramCode: {
    type: String,
    required: true
  },
  bgColor: { 
    type: String, 
    default: 'transparent' 
  }
})

const { isDark } = useData()
const isCopied = ref(false)

const renderedSvg = computed(() => isDark.value ? darkSvg.value : lightSvg.value)
const lightSvg = ref('')
const darkSvg = ref('')

// Kode Mermaid yang sudah di-decode dan di-trim
const mermaidToRender = computed(() => 
{
  try 
  {
    // Decode kode yang diterima dari prop
    const decoded = decodeURIComponent(props.diagramCode);
    return decoded.trim(); // Trim whitespace di awal/akhir keseluruhan blok

  } catch (e) {
    console.error("Error decoding diagram code:", e);
    return `%% Error decoding diagram code: ${e.message} %%`;
  }
});


const containerStyle = computed(() => ({ 
  backgroundColor: props.bgColor || null
}));

async function copyToClipboard() 
{
  const code = mermaidToRender.value;
  if (!code) return

  try {
    await navigator.clipboard.writeText(code)

    isCopied.value = true
    setTimeout(() => { isCopied.value = false}, 2000)
  } catch (err) 
  {
    const textarea = document.createElement('textarea')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    textarea.value = code

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
  const code = mermaidToRender.value
  
  try 
  {
    // Render light theme
    mermaid.initialize({ ...appConfig.mermaidOptions, theme: 'neutral' })
    const { svg: light } = await mermaid.render(`${props.id}-light`, code)
    lightSvg.value = light

    // Render dark theme
    mermaid.initialize({ ...appConfig.mermaidOptions, theme: 'dark' })
    const { svg: dark } = await mermaid.render(`${props.id}-dark`, code)
    darkSvg.value = dark

  } catch (error) {
    console.error('Failed to render diagram:', error)
  }
})
</script>

<template>
  <div class="mermaid-container" :style="containerStyle">
    <div class="mermaid-render" v-html="renderedSvg"></div>
    <button class="copy" :class="{ copied: isCopied }" 
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
  border-radius: 8px;
  overflow: auto;
}

.mermaid-render :deep(svg) {
  max-width: 100% !important;
  height: auto;
}

.mermaid-container .lang {
  font-weight: normal !important;
  font-size: 12px !important;
  top: 0px !important;
}
</style>