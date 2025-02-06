<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
})

const show = ref(false)
const scrollThreshold = 200
const btnClass = computed(() => props.isMobile == true ? 'mobile-btn' : 'desktop-btn')
const opacity = computed(() => show.value ? 1.0 : 0.0)
let isScrolling = false

// Handle scroll dengan pengecekan environment
const handleScroll = () => {
  if (typeof window === 'undefined' || isScrolling) return
  
  isScrolling = true
  show.value = window.scrollY > scrollThreshold
  
  requestAnimationFrame(() => { isScrolling = false })
}

// Scroll ke atas dengan pengecekan browser API
const goTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Lifecycle hooks untuk client-side only
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <button @click="goTop"
    :style="`opacity: ${opacity};`"
    :class="btnClass">
    <span class="icon">↑</span>
    <span class="label">Back To Top</span> 
  </button>
</template>

<style scoped>

.desktop-btn {
  display: flex;
  position: relative;
  justify-content: start;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
  cursor: pointer;
  border: none;
  
  .label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    margin-left: 8px;
  }
}

.desktop-btn:hover {
  color: var(--vp-c-text-1);
}

.mobile-btn {
  display: none;
}

@media (max-width: 1080px) {
  .mobile-btn {
    display: block;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--vp-c-brand-1);
    color: var(--vp-c-border);
    cursor: pointer;
    z-index: 3;
    
    .icon {
      font-size: large;
      font-weight: 500;
    }
    
    .label {
      display: none;
    }
  }
  
  .mobile-btn:hover {
    transform: scale(0.98);
  }
}

</style>