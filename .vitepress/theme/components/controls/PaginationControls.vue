<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number
})

const emit = defineEmits(['page-change'])

const handlePageChange = (newPage) => {
  emit('page-change', newPage)
}
</script>

<template>
  <div v-if="totalPages > 1" class="pagination-controls">
    <button
      class="pagination-button"
      :disabled="currentPage === 1"
      @click="handlePageChange(currentPage - 1)"
    >
      Previous
    </button>
    <span class="page-indicator">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button
      class="pagination-button"
      :disabled="currentPage === totalPages"
      @click="handlePageChange(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination-controls {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
  cursor: pointer;
}

.pagination-button:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
  transform: translateY(-1px);
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-indicator {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
</style>