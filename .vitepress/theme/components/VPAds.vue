<script setup lang="ts">
import { useData } from 'vitepress/dist/client/theme-default/composables/data'

const { theme } = useData()

defineProps({
  orientation: {
    type: String,
    default: 'vertical',
  }
})
</script>

<template>
  <slot name="ads-top" />
  <div class="ads-vertical" v-if="orientation === 'vertical'">
      Google Ads
  </div>
  <div class="ads-horizontal" v-else>
      Google Ads
  </div>
  <slot name="ads-bottom" />
</template>

<style scoped>
.ads-vertical {
  display: flex;
  height: 75vh;
  background-color: red;
  border-radius: 8px;
}

.ads-horizontal {
  display: flex;
  width: 100%;
  background-color: red;
  border-radius: 8px;
}
</style>
