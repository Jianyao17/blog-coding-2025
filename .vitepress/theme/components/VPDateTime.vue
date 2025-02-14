<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import VPTooltip from './VPTooltip.vue';

const { theme, lang } = useData()
const props = defineProps({
  toolTip: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  date: {
    type: [String, Date],
    required: true
  }
})

// Date formatting logic
const date = computed(() => new Date(props.date));

const isoDatetime = computed(() => date.value.toISOString());
const datetime = ref('');


onMounted(() => {
  watchEffect(() => 
  {    
    datetime.value = new Intl.DateTimeFormat(
      theme.value.lastUpdated?.formatOptions?.forceLocale ? lang.value : undefined,
      theme.value.lastUpdated?.formatOptions ?? {
        dateStyle: 'long'
      }
    ).format(date.value);
  });
});

const formattedDate = computed(() => datetime.value);
</script>

<template>
  <p class="datetime-container" >
    <span class="label-text" v-if="label">{{ label }}: </span>
    <time :datetime="isoDatetime" class="date">{{ formattedDate }}</time>
    <VPTooltip v-if="toolTip">{{ toolTip }}</VPTooltip>
  </p>
</template>

<style scoped>
.datetime-container {
  display: flex;
  position: relative;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0;
}

.label-text {
  color: var(--vp-c-text-3);
  margin-right: 4px;
}

.datetime-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
</style>