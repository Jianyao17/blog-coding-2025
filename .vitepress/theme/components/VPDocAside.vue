<script setup lang="ts">
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import VPDocAsideCarbonAds from 'vitepress/dist/client/theme-default/components/VPDocAsideCarbonAds.vue'
import VPDocAsideOutline from './VPDocAsideOutline.vue'
import VPBackToTop from './VPBackToTop.vue';
import VPAnchorLink from './VPAnchorLink.vue';

const { theme } = useData()
const discusIcon = `
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16'%3E%3Cpath d='M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z'/%3E%3C/svg%3E");
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
`
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
      <VPAnchorLink 
        href="#comments" 
        label="Scroll To Comments"
        :icon="discusIcon" />
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
