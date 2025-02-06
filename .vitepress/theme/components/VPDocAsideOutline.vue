<script setup lang="ts">
import { onContentUpdated } from 'vitepress'
import { computed, ref, shallowRef } from 'vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import {
  getHeaders,
  resolveTitle,
  useActiveAnchor,
  type MenuItem
} from 'vitepress/dist/client/theme-default/composables/outline'
import VPDocOutlineItem from 'vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue'

const { frontmatter, theme } = useData()

const headers = shallowRef<MenuItem[]>([])

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
})

const marker = ref()
const container = ref()
const overflowFade = computed(() => 
{
  const content = document.querySelector('.content');
  console.log(content);
  
  return content?.scrollHeight > content?.clientHeight ? true : false
})

useActiveAnchor(container, marker)
</script>

<template>
  <nav
    aria-labelledby="doc-outline-aria-label"
    class="VPDocAsideOutline"
    :class="{ 
      'has-outline'   : headers.length > 0,
     }"
    ref="container"
  >
    <div class="content">
      <div class="outline-marker" ref="marker" />

      <div
        aria-level="2"
        class="outline-title"
        id="doc-outline-aria-label"
        role="heading"
      >
        {{ resolveTitle(theme) }}
      </div>

      <VPDocOutlineItem :headers="headers" :root="true" />
    </div>
  </nav>
</template>

<style scoped>
.VPDocAsideOutline {
  display: none;
}

.VPDocAsideOutline.has-outline {
  display: block;
  mask-image: linear-gradient(
    to bottom,
    var(--vp-c-bg) 5%,
    var(--vp-c-bg) 95%,
    transparent 100%
  );
}

.content {
  position: relative;
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
  font-size: 13px;
  font-weight: 500;
  max-height: calc(100vh - 256px); /* Sesuaikan nilai sesuai kebutuhan */
  
  overflow-y: auto;  
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}

.content::-webkit-scrollbar-track {
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: var(--vp-c-divider);
  border: 2px solid transparent;
  background-clip: content-box;
}

.content::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-divider-dark);
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  opacity: 0;
  width: 2px;
  border-radius: 2px;
  height: 18px;
  background-color: var(--vp-c-brand-1);
  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.5s,
    opacity 0.25s;
}

.outline-title {
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
}
</style>
