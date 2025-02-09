<script setup>
import Giscus from '@giscus/vue'
import appConfig from '../../appConfig';
import { useData } from 'vitepress';
import { computed } from 'vue';

const { isDark } = useData()
const giscus = computed({ ...appConfig.giscus })
const theme = computed(() => 
  isDark 
  ? giscus.value.themes.dark 
  : giscus.value.themes.light
)

</script>

<template>
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
</template>

<style scoped>
</style>