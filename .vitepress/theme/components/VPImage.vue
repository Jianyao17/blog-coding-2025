<script setup lang="js">
import { computed, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  src: {
    type: String,
  },
  alt: {
    type: String,
  },
  width: {
    type: String,
    default: `
        (max-width: 767px) 100vw,
        (min-width: 768px) and (max-width: 1023px) 80vw,
        (min-width: 1024px) 60vw,
        100vw
      `
  },
  isFirst: {
    type: Boolean,
    default: false
  }
})

const baseSrc = ref('')
const imgSet = ref('')
const gifSet = ref('')
const imgType = computed(() => 
  props.src?.includes('.gif') ? 'gif' : 'webp')

const isLoaded = ref(false)
const hasError = ref(false)

const handleLoad = () => { isLoaded.value = true }
const handleError = () => 
{ 
  imgSet.value = `${props.src} 1600w`
  gifSet.value = `${props.src} 1600w`
}

const updateSrcSets = (src) => 
{
  if (src == (null || undefined)) return

  const sizes = [300, 600, 1000, 1600] 
  baseSrc.value = getBasePath(src)

  imgSet.value = sizes
    .map(size => `${baseSrc.value}_${size}xauto.webp ${size}w`)
    .join(', ')

  gifSet.value = sizes
    .map(size => `${baseSrc.value}_${size}xauto.gif ${size}w`)
    .join(', ')  
}

const getBasePath = (src) => 
{
  // Split pada ekstensi file terakhir (handle kasus multiple dots)
  const parts = src.split(/\.(?=[^.]+$)/)
  return parts.length > 1 ? parts[0] : src
}

// Handle perubahan props
watch(
  () => props.src,
  (newSrc) => {
    isLoaded.value = false
    hasError.value = false
    updateSrcSets(newSrc)
  },
  { immediate: true }
)

// Reset state saat komponen di-unmount
onUnmounted(() => {
  isLoaded.value = false
  hasError.value = false
})
</script>

<template>
  <picture :key="src">
    <source v-if="imgType === 'webp'"
      type="image/webp"
      :srcset="imgSet"
      :sizes="width"
    >
    <source v-if="imgType === 'gif'"
      type="image/gif"
      :srcset="gifSet"
      :sizes="width"
    >
    <!-- Gambar utama -->
    <img v-show="src" 
        :src="src"    class="img"
        :alt="alt"    decoding="async"      
        :loading="isFirst === true ? 'eager' : 'lazy'"
        @load="handleLoad" @error="handleError"
    />
  </picture>
</template>

<style scoped>
.img {
  width: inherit;
  cursor: pointer;
  border-radius: 8px;
}
</style>