<script setup>
defineProps({
  showPrev: Boolean,
  showNext: Boolean
})

const emit = defineEmits(['scroll'])
</script>

<template>
  <button 
    v-if="showPrev"
    @click="emit('scroll', 'prev')"
    class="nav-button prev"
    aria-label="Previous"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  </button>
  <button 
    v-if="showNext"
    @click="emit('scroll', 'next')"
    class="nav-button next"
    aria-label="Next"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </button>
</template>

<style scoped>

.nav-button {
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  opacity: 0.9;
  z-index: 2;
}

.nav-button:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-50%) scale(1.05);
  opacity: 1;
}

.nav-button svg {
  width: 24px;
  height: 24px;
  stroke: var(--vp-c-text-1);
  stroke-width: 2px;
}

.nav-button:hover svg {
  stroke: var(--vp-c-brand-1);
}

.prev {
  left: -24px;

  svg {
    margin-right: 2px;
  }
}

.next {
  right: -24px;

  svg {
    margin-left: 2px;
  }
}

@media (max-width: 640px) {
  .prev {
    left: -16px;
  }

  .next {
    right: -16px;
  }
}
</style>