<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import VPDateTime from './VPDateTime.vue';

const { theme, page, lang } = useData()

const config = defineProps({
  showLabel: {
    type: Boolean,
    default: false
  }
});

const date = computed(() => new Date(page.value.lastUpdated!))
</script>

<template>
  <p class="VPLastUpdated">
    <span class="lastUpdatedText" v-if="config.showLabel">{{ theme.lastUpdated?.text || theme.lastUpdatedText || 'Last updated' }}: </span>
    <VPDateTime :date="date" />
  </p>
</template>

<style scoped>
.VPLastUpdated {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  line-height: 24px;
  font-size: var(--vp-custom-block-font-size);
  color: var(--vp-c-text-2);
}

.lastUpdatedText {
  color: var(--vp-c-text-3);
  font-weight: normal;
  margin-right: 4px;
}

@media (min-width: 640px) {
  .VPLastUpdated {
    line-height: 32px;
    font-size: 14px;
  }
}
</style>
