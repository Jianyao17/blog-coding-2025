<script setup>
import { computed, onMounted, ref } from 'vue'
import appConfig from '../../appConfig'
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

const renderedSvg = ref('')
const isCopied = ref(false)

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
  mermaid.initialize(appConfig.mermaidOptions)  
  const code = mermaidToRender.value; 
 
  try 
  {
    const { svg } = await mermaid.render(props.id, code)
    renderedSvg.value = svg

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