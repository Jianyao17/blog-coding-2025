<script setup lang="ts">
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import VPDocAsideCarbonAds from 'vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue'
import VPDocAsideOutline from './VPDocAsideOutline.vue'
import VPBackToTop from './VPBackToTop.vue';

const { theme } = useData()
</script>

<template>
  <div class="VPDocAside">
    <slot name="aside-top" />

    <div class="outline-wrapper">
      <slot name="aside-outline-before" />
      <VPDocAsideOutline />
      <slot name="aside-outline-after" />
    </div>
    
    <span class="sparator"></span>
    
    <div class="static-section">
      <VPBackToTop />
      <div class="spacer" />
  
      <slot name="aside-ads-before" />
      <VPDocAsideCarbonAds v-if="theme.carbonAds" :carbon-ads="theme.carbonAds" />
      <slot name="aside-ads-after" />
      
      <slot name="aside-bottom" />
    </div>
  </div>
</template>

<style scoped>
.VPDocAside {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-items: start;
  flex-grow: 1;
}

.outline-wrapper {
  flex: 0;
  min-height: 0; /* Critical for flex scroll */
  overflow-y: auto;
  position: relative;
}

.static-section {
  background: var(--vp-c-bg);
  z-index: 1;
}

.sparator {
  margin: 16px 0;
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
  content: "";
}

.spacer {
  flex-grow: 1;
}

.VPDocAside :deep(.spacer + .VPDocAsideSponsors),
.VPDocAside :deep(.spacer + .VPDocAsideCarbonAds) {
  margin-top: 24px;
}

.VPDocAside :deep(.VPDocAsideSponsors + .VPDocAsideCarbonAds) {
  margin-top: 16px;
}
</style>
