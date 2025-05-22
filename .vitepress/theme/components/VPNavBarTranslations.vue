<script lang="ts" setup>
import VPFlyout from 'vitepress/dist/client/theme-default/components/VPFlyout.vue'
import VPMenuLink from 'vitepress/dist/client/theme-default/components/VPMenuLink.vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import { useLangs } from 'vitepress/dist/client/theme-default/composables/langs'
import { useTaxonomies } from '../composables/useTaxonomies'
import { computed } from 'vue'

const { theme } = useData()
const { localeLinks, currentLang } = useLangs({ correspondingLink: true })
const { taxonomies } = useTaxonomies();

const availableLocales = computed(() => 
  localeLinks.value.filter((locale: { link: string }) => 
  {
    // Normalize path: treat /foo/bar and /foo/bar/index as equivalent
    const normalize = (path: string) => path.replace(/\/index$/, '').replace(/\/$/, '');
    const normalizedLink = normalize(locale.link);

    // Find a matching taxonomy item with normalized path
    return Object
      .keys(taxonomies.value?.items || {})
      .some(key => normalize(key) === normalizedLink);
  })
)

</script>

<template>
  <VPFlyout
    v-if="localeLinks.length && currentLang.label"
    class="VPNavBarTranslations"
    icon="vpi-languages"
    :label="theme.langMenuLabel || 'Change language'"
  >
    <div class="items">
      <p class="title">{{ currentLang.label }}</p>

      <template v-for="locale in availableLocales" :key="locale.link">
        <VPMenuLink :item="locale" />
      </template>
    </div>
  </VPFlyout>
</template>

<style scoped>
.VPNavBarTranslations {
  display: none;
}

@media (min-width: 1280px) {
  .VPNavBarTranslations {
    display: flex;
    align-items: center;
  }
}

.title {
  padding: 0 24px 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
</style>
