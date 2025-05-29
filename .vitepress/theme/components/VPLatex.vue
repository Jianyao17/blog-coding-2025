<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
})

const isCopied = ref(false)
const latexCode = computed(() => decodeURIComponent(props.code).trim())

async function copyToClipboard() 
{
  try {
    const code = latexCode.value
    await navigator.clipboard.writeText(code)
    
    isCopied.value = true
    setTimeout(() => isCopied.value = false, 2000)
  } catch 
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
</script>

<template>
  <div class="math-block-container">
    <div class="math-render">
      <slot></slot>
    </div>
    <button class="copy" :class="{ copied: isCopied }" 
      @click.stop="copyToClipboard"></button>
    <span class="lang">latex</span>
  </div>
</template>

<style scoped>
.math-block-container {
  position: relative;
  cursor: pointer;
  margin: 16px auto;
  border-radius: 8px;
  background-color: inherit !important;
}

.math-render :deep(svg) {
  max-width: 100% !important;
}

.math-block-container .lang {
  font-weight: normal !important;
  font-size: 12px !important;
  top: 0px !important;
}
</style>
