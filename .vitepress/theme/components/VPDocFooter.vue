<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import { useEditLink } from 'vitepress/dist/client/theme-default/composables/edit-link'
import { usePrevNext } from '../composables/usePreviousNext'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import VPDateTime from './VPDateTime.vue'

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
  padding-top: 24px;
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
</style>
