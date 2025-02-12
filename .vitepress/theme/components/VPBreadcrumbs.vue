<script setup lang="js">
import { useLocalizationUrl } from '../composables/useLocalizationUrl'
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

const { localeIndex } = useData()
const { localeUrl } = useLocalizationUrl()
const route = useRoute()

const breadcrumbs = computed(() => {
  const path = route.path
  const parts = path.split('/').filter(p => p)
  const crumbs = []

  let accumulatedPath = ''
  for (const part of parts) 
  {
    if (part.includes('index') 
    ||  part.includes(localeIndex.value)) continue

    // Hapus ekstensi .html atau .md dari bagian path
    const cleanLink = part.replace(/\.(html|md)$/, '')

    // Hapus angka di awal untuk judul
    const cleanTitle = cleanLink.replace(/^\d+-/, '')

    accumulatedPath += `/${cleanLink}`
    crumbs.push({
      title: formatTitle(cleanTitle),
      link: localeUrl(accumulatedPath) + '/'
    })
  }

  // Tambahkan link home di awal
  crumbs.unshift({
    title: 'Home',
    link: localeUrl('')
  })

  return crumbs
})

function formatTitle(str) {
  return str
    .split('-')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<template>
  <div class="breadcrumbs" v-if="breadcrumbs">
    <div v-for="(crumb, index) in breadcrumbs" :key="index" class="crumb">
      <a  :href="crumb.link"
          :class="{ 'current-page': index === breadcrumbs.length - 1 }">
          {{ crumb.title }}
      </a>
      <span class="separator" v-if="index < breadcrumbs.length - 1">/</span>
    </div>
  </div>
</template>

<style scoped>
.breadcrumbs {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0 16px 0;
}

.crumb {
  font-weight: 500;
  font-size: var(--vp-custom-block-font-size);
  color: var(--vp-c-text-2);
  line-height: 16px;
  white-space: nowrap;
}

.crumb:hover {
  color: var(--vp-c-text-1);
}

.separator {
  margin: 0 8px;
  color: var(--vp-c-border);
}

.current-page {
  color: var(--vp-c-text-1);
  pointer-events: none;
  text-decoration: none;
  font-weight: 500;
}
</style>