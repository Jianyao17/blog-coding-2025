<script setup>
import { useRoute } from 'vitepress';
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import { useLocalizationUrl } from '../composables/useLocalizationUrl';
import VPDateTime from './VPDateTime.vue';
import VPAuthor from './VPAuthor.vue';

const route = useRoute()
const { frontmatter } = useData()
const { localeUrl } = useLocalizationUrl()

const getBasePath = (src) => 
  src.replace(/\/$/, '')
        .split('/').slice(0, -1)
        .join('/') + '/';

const slugUrl = (pathName) => 
{
  const slug = pathName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `${localeUrl(slug)}/`
}
</script>

<template>
  <div class="props">
    <div class="tags-container">
      <a class="series" 
         v-if="frontmatter.series"
         :href="getBasePath(route.path)">
         {{ frontmatter.series }}
      </a>

      <span class="sparator" 
        v-if="frontmatter.series && frontmatter.tags"></span>

      <a class="tag" 
         v-for="tag in frontmatter.tags"
         :href="slugUrl(tag)">{{ tag }}</a>
    </div>
    <div class="container">
      <VPDateTime :date="frontmatter.lastUpdated" toolTip="Last Updated"/> ∙ 
      <VPAuthor />
    </div>
  </div>
</template>

<style scoped>
.props {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 12px;
  row-gap: 16px;
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 24px;
  font-size: var(--vp-custom-block-font-size);
  color: var(--vp-c-text-2);
  gap: 8px;
}

@media (min-width: 640px) {
  .container {
    line-height: 32px;
    font-size: 14px;
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 8px 12px;
  line-height: var(--vp-custom-block-font-size);
  border-radius: 8px;
  border: 1px solid transparent;
 
  font-size: var(--vp-custom-block-font-size);
  text-transform: capitalize;
  text-wrap: nowrap;
  cursor: pointer;
  
  color: var(--vp-c-text-1);
  border-color: var(--vp-custom-block-info-border);
  background-color: var(--vp-c-bg-soft);
}

.tag:hover {
  text-decoration-line: underline;
  border-color: var(--vp-c-border);
}

.series {
  padding: 8px 12px;
  line-height: var(--vp-custom-block-font-size);
  border-radius: 8px;
  border: 1px solid transparent;
 
  font-size: var(--vp-custom-block-font-size);
  text-transform: capitalize;
  text-wrap: nowrap;
  cursor: pointer;
  
  color: var(--vp-button-brand-text);
  border-color: var(--vp-button-brand-border);
  background-color: var(--vp-button-brand-bg);
}

.series:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-button-brand-hover-bg);
}

.sparator {
  width: 1px;
  background-color: var(--vp-c-divider);
  content: "";
}
</style>