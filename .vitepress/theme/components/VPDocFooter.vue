<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import { useEditLink } from 'vitepress/dist/client/theme-default/composables/edit-link'
import { usePrevNext } from '../composables/usePreviousNext'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import VPDateTime from './VPDateTime.vue'
import VPGoogleAds from './VPGoogleAds.vue'
import VPGiscus from './VPGiscus.vue'

const { theme, page, frontmatter } = useData()

const editLink = useEditLink()
const { prev, next } = usePrevNext()

const hasEditLink = computed(
  () => theme.value.editLink && frontmatter.value.editLink !== false
)
const hasCreatedAt = computed(() => frontmatter.value.createdAt)
const hasLastUpdated = computed(() => frontmatter.value.lastUpdated)
const showFooter = computed(
  () =>
    hasEditLink.value ||
    hasCreatedAt.value ||
    hasLastUpdated.value ||
    prev.value ||
    next.value
)
</script>

<template>
  <footer v-if="showFooter" class="VPDocFooter">
    <slot name="doc-footer-before" />

    <div v-if="hasEditLink || hasCreatedAt" class="edit-info">
      <div v-if="hasEditLink" class="edit-link">
        <VPLink class="edit-link-button" :href="editLink.url" :no-icon="true">
          <span class="vpi-square-pen edit-link-icon" />
          {{ editLink.text }}
        </VPLink>
      </div>

      <div v-if="hasCreatedAt || hasLastUpdated" class="edit-date">
        <VPDateTime v-if="hasCreatedAt" :date="frontmatter.createdAt" label="Created At" />
        <VPDateTime v-if="hasLastUpdated" :date="frontmatter.lastUpdated" label="Last Updated" />
      </div>
    </div>

    <nav
      v-if="prev?.link || next?.link"
      class="prev-next"
      aria-labelledby="doc-footer-aria-label"
    >
      <span class="visually-hidden" id="doc-footer-aria-label">Pager</span>

      <div class="pager">
        <VPLink
          v-if="prev?.link"
          class="pager-link prev"
          :href="prev.link"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.prev || 'Previous page'"
          ></span>
          <span class="title" v-html="prev.text"></span>
        </VPLink>
      </div>
      <div class="pager">
        <VPLink
          v-if="next?.link"
          class="pager-link next"
          :href="next.link"
        >
          <span
            class="desc"
            v-html="theme.docFooter?.next || 'Next page'"
          ></span>
          <span class="title" v-html="next.text"></span>
        </VPLink>
      </div>
    </nav>
    
    <div class="ads-container">
      <VPGoogleAds orientation="horizontal"/>
    </div>

    <div class="comments-container" id="comments">
      <h1 class="comments-header">
        <span class="comments-icon"></span>
        <span>Comments</span>
      </h1>
      <div class="comments-content">
        <VPGiscus />
      </div>
    </div>

  </footer>
</template>

<style scoped>
.VPDocFooter {
  margin-top: 64px;
}

.edit-date {
  display: flex;
  flex-direction: column;
  justify-items: end;
  line-height: 24px;
  font-size: var(--vp-custom-block-font-size);
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .edit-date {
    line-height: 32px;
    font-size: 14px;
  }
}

.edit-info {
  padding-bottom: 18px;
}

.edit-link {
  margin-bottom: 16px;
}

@media (min-width: 640px) {
  .edit-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;
  }
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.edit-link-button:hover {
  color: var(--vp-c-brand-2);
}

.edit-link-icon {
  margin-right: 8px;
}

.prev-next {
  border-top: 1px solid var(--vp-c-divider);
  padding: 24px 0;
  display: grid;
  grid-row-gap: 8px;
}

@media (min-width: 640px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}

.pager-link {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
}

.pager-link:hover {
  border-color: var(--vp-c-brand-1);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.ads-container {
  height: 144px;
  margin-bottom: 36px;
}

@media (max-width: 640px) {
  .ads-container {
    height: 120px;
  }
}


.comments-header {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 32px;

  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 16px;
}

.comments-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;

  background-color: var(--vp-c-text-1);
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16'%3E%3Cpath d='M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z'/%3E%3C/svg%3E");
  mask-repeat: no-repeat;
  mask-size: contain;
}
</style>
