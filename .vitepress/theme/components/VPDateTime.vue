<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useData } from 'vitepress/dist/client/theme-default/composables/data'

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
  watchEffect(() => {
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
    <div class="tooltip" v-if="toolTip">{{ toolTip }}</div>
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

.tooltip {
  opacity: 0;
  transition: opacity 0.2s;
  visibility: hidden;
  
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-custom-block-info-border);
  color: var(--vp-c-text-1);

  box-shadow: var(--vp-shadow-3);
  border-radius: 6px;
  padding: 6px 16px;

  text-align: center;
  line-height: 24px;
  white-space: nowrap;
  
  position: absolute;
  margin-left: -50%; /* Use half of the width (120/2 = 60), to center the tooltip */
  top: 100%;
  left: 50%;
  z-index: 1;
}

.tooltip::after {
  content: " ";
  position: absolute;
  bottom: 100%;  /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent var(--vp-c-bg-soft) transparent;
}
</style>