<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { useWindowSize } from '@vueuse/core'
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'
import VPMermaidViewer from '../VPMermaidViewer.vue'
import VPBreadcrumbs from '../VPBreadcrumbs.vue'
import VPDocAside from '../VPDocAside.vue'
import VPDocFooter from '../VPDocFooter.vue'
import VPBackToTop from '../VPBackToTop.vue'
import VPGoogleAds from '../VPGoogleAds.vue'
import VPImgViewer from '../VPImgViewer.vue'
import VPImage from '../VPImage.vue'
import VPProps from '../VPProps.vue'

const { width: vw } = useWindowSize({
  initialWidth: 0,
  includeScrollbar: false
})

const { theme, frontmatter } = useData()

const route = useRoute()
const { hasSidebar, hasAside, leftAside } = useSidebar()

const pageName = computed(() => route.path.replace(/[./]+/g, '_').replace(/_html$/, ''))

</script>

<template>
  <div class="VPDoc"
      :class="{ 'has-sidebar': hasSidebar, 'has-aside': hasAside }">
    <slot name="doc-top" />

    <div class="container" :style="vw ? { '--vp-offset': `calc(50% - ${vw / 2}px)` } : {}">

      <div>
        <VPImgViewer />
        <VPMermaidViewer />
        <VPBackToTop :isMobile="true"/>
      </div>
      <div v-if="hasAside" class="ads">
        <div class="ads-container">
          <VPGoogleAds orientation="vertical">
            <template #ads-top><slot name="ads-top" /></template>
            <template #ads-bottom><slot name="ads-bottom" /></template>
          </VPGoogleAds>
        </div>
      </div>

        <article class="content">
          <div class="content-container">
            <slot name="doc-before" />
            <VPBreadcrumbs />
            <main class="main">
              <div class="title">{{ frontmatter.title }}</div>
              <VPProps class="blog-props" />
              <VPImage 
                :isFirst="true"
                :src="frontmatter.thumbnail" 
                :alt="frontmatter.thumbnail"
                class="thumbnail"/>
              <div class="ads-container2">
                <VPGoogleAds orientation="horizontal" />
              </div>
              <Content
                class="vp-doc"
                :class="[
                  pageName,
                  theme.externalLinkIcon && 'external-link-icon-enabled'
                ]"
              />
            </main>
            <VPDocFooter>
              <template #doc-footer-before><slot name="doc-footer-before" /></template>
            </VPDocFooter>
            <slot name="doc-after" />
          </div>
        </article>

        <div v-if="hasAside" class="aside">
          <div class="aside-curtain" />
          <div class="aside-container">
            <div class="aside-content" :class="{'left-aside': leftAside}">
              <VPDocAside>
                <template #aside-top><slot name="aside-top" /></template>
                <template #aside-bottom><slot name="aside-bottom" /></template>
                <template #aside-outline-before><slot name="aside-outline-before" /></template>
                <template #aside-outline-after><slot name="aside-outline-after" /></template>
                <template #aside-ads-before><slot name="aside-ads-before" /></template>
                <template #aside-ads-after><slot name="aside-ads-after" /></template>
              </VPDocAside>
            </div>
          </div>
        </div>

    </div>
    <slot name="doc-bottom" />
  </div>
</template>

<style scoped>
.VPDoc {
  width: 100%;
  padding: 48px 24px;

  img {
    border-radius: 8px;
  }
}


.container {
  display: flex;
  margin: 0 auto;
  flex-grow: 1;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  order: 2;
}

@media (min-width: 640px) {
  .VPDoc {
    padding: 48px 48px;
  }
}

@media (min-width: 960px) {
  .VPDoc {
    padding: 48px 64px;
  }

  .content {
    padding: 0 24px;
  }
}

@media (min-width: 1080px) { 
  .VPDoc .aside {
    display: block;
  }

  .VPDoc .ads {
    display: block;
  }
}

@media (min-width: 1200px) {
  .VPDoc {
    padding: 48px 78px;
  }
}

.content {
  order: 2;
  position: relative;
  margin: 0 auto;
  width: 100%;
}

.content-container {
  margin: 0 auto;
}

.aside {
  position: relative;
  display: none;
  order: 3;
  padding-left: 32px;
  width: 100%;
  max-width: 232px;
}

.left-aside {
  order: 1;
  padding-left: unset;
  padding-right: 32px;
}

.aside-container {
  top: 0;
  position: fixed;
  padding-top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + var(--vp-doc-top-height, 0px) + 48px);
  width: 224px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: none;
}

.ads-container2 {
  height: 144px;
  margin-bottom: 36px;
}

@media (max-width: 640px) {
  .ads-container2 {
    height: 120px;
  }
}

.aside-curtain {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 224px;
  height: 32px;
  background: linear-gradient(transparent, var(--vp-c-bg) 70%);
}

.aside-content {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - (var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px));
  padding-bottom: 32px;
}


.ads {
  order: 1;
  position: relative;
  display: none;
  padding-right: 32px;
  width: 100%;
  max-width: 232px;
}

.ads-container {
  top: 0;
  position: fixed;
  padding-top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + var(--vp-doc-top-height, 0px) + 48px);
  padding-bottom: 64px;
  width: 200px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
}

.title {
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 48px;
  outline: none;
}

.thumbnail {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 32px;
}

.blog-props {
  margin: 32px 0;
}
</style>