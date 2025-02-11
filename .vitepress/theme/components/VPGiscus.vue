<script setup>
import Giscus from '@giscus/vue'
import appConfig from '../../appConfig';
import { useData } from 'vitepress';
import { computed } from 'vue';

const { isDark } = useData()
const theme = computed(() => 
  isDark.value
    ? giscus.themes.dark 
    : giscus.themes.light
)

const giscus = 
{
  repo: import.meta.env.VITE_GISCUS_REPO,
  repoId: import.meta.env.VITE_GISCUS_REPO_ID,
  category: import.meta.env.VITE_GISCUS_CATEGORY,
  categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID,
  ...appConfig.giscus
}
</script>

<template>
  <div class="giscus">
    <Giscus 
      id="giscus_comment"
      loading="lazy"
      
      :theme="theme"
      :lang="giscus.lang"
  
      :repo="giscus.repo"
      :repoId="giscus.repoId"
      :category="giscus.category"
      :categoryId="giscus.categoryId"
  
      :mapping="giscus.mapping"
      :inputPosition="giscus.inputPosition"
      :reactionsEnabled="giscus.reactionsEnabled"
      :emitMetadata="giscus.emitMetadata"
    />
  </div>
</template>

<style scoped>
.giscus {
  margin-top: 32px;
}
</style>