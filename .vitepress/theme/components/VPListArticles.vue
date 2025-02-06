<script setup>
import { ref, computed } from 'vue';
import { useLocalizationUrl } from '../composables/useLocalizationUrl';
import { useCaseInsensitiveSearch } from '../composables/useCaseInsensitiveSearch';
import { useArticleSorting } from '../composables/useSortingArticle';
import { useTaxonomies } from '../composables/useTaxonomies';
import { useCarousel } from '../composables/useCarousel';
import VPCard from './VPCard.vue';

const props = defineProps({
  heading: String,
  layout: {
    type: String,
    default: 'list',
    validator: (value) => 
      ['grid', 'list', 'scroll'].includes(value)
  },
  orderBy: {
    type: String,
    default: 'title-ascending',
    validator: (value) => [
      'title-ascending',
      'title-descending',
      'date-ascending',
      'date-descending',
      'chapter-ascending',
      'chapter-descending'
    ].includes(value)
  },
  content: {
    Type: 'tags' | 'series',
    Name: String
  },
  useFilter: {
    type: Boolean,
    default: true
  },
})

const { lang } = useLocalizationUrl()
const { findCaseInsensitive } = useCaseInsensitiveSearch()
const { articleSortOptions, sortedItems } = useArticleSorting()
const { carousel, handleWheel, scroll, showNext, showPrev } = useCarousel(props.layout)

// Fetch Article's Taxonomies from json 
const { taxonomies } = useTaxonomies()
const collection = computed(() => findCaseInsensitive(taxonomies.value , props.content.Type));
const items = computed(() => findCaseInsensitive(collection.value, props.content.Name));

const articles = computed(() => 
  Object.entries(items.value)
        .map(([index, items]) => ({ index, ...items, })))

const searchInput = ref('')
const hasOrder = computed(() => articles.value.every(article => 'order' in article))
const cardMode = computed(() => ['grid', 'scroll'].includes(props.layout) ? 'square' : 'list')
const orderBy  = ref(hasOrder.value ? props.orderBy  : 'title-ascending')
const count = computed(() => filteredArticles.value.length)

// Filtered and sorted articles
const filteredArticles = computed(() => 
{
  const filtered = articles.value
    .filter(article => article.lang?.toLowerCase().includes(lang.value.replace('/', '')))
    .filter(article => article.title.toLowerCase().includes(searchInput.value.toLowerCase()));
  return sortedItems(filtered, orderBy.value, hasOrder.value);
});

</script>

<template>
  <div>
    <h2 v-if="heading" class="header">
      <div>{{ heading }}</div>
      <div class="count">{{ count }}</div>
    </h2>
    <div v-if="useFilter" class="filter">
      <div class="search-container">
        <input type="text" v-model="searchInput" placeholder="Search Article..." class="search-input" />
        <span class="search-label">
          <span class="vp-icon DocSearch-Search-Icon"></span>
        </span>
      </div>
      <div class="orderby-container">
        <label class="orderby-label">Order By:</label>
        <select class="orderby-input" v-model="orderBy">
          <option v-for="option in articleSortOptions(hasOrder)" 
            :value="option.value">{{ option.label }}</option>
        </select>
      </div>
    </div>
    <div :class="layout" ref="carousel" @wheel="handleWheel">
      <VPCard v-for="article in filteredArticles" :key="article.index" 
            :mode="cardMode" :isFirst="article.index == 0" class="scroll-item"
            :article="article" />
    </div>
    <button v-if="showPrev"
      @click="scroll('prev')"
      class="nav-button prev"
      aria-label="Previous">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button v-if="showNext"
      @click="scroll('next')"
      class="nav-button next"
      aria-label="Next">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
</template>


<style scoped>
input, select, option {
  font-family: inherit;
}

.header {
  display: flex;
  flex-direction: row;
  column-gap: 12px;

  .count {
    width: 32px;
    font-size: 14px;
    text-align: center;
    padding-right: 1px;
    border-radius: 8px;
    background-color: var(--vp-c-bg-alt);
  }
}

.filter {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 16px;
  gap: 8px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 12px;
}

.list {
  display: flex;
  flex-direction: column; 
  gap: 12px;
}

.scroll {
  width: 100%;
  display: inline-flex;
  overflow-x: scroll;
  padding: 16px 8px;
  gap: 12px;

  scrollbar-width: thin;
  scroll-behavior: smooth;
  scrollbar-color: var(--vp-c-border) var(--vp-c-bg-alt);
  scroll-snap-type: x proximity;

  /* Menambahkan masking gradient */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
  
  .scroll-item {
    flex: 0 0 calc((100% / 3) - 12px);

    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  @media (max-width: 960px) {
    .scroll-item {
      flex: 0 0 calc((100% / 2) - 8px);
    }
  }

  @media (max-width: 640px) {
    .scroll-item {
      flex: 0 0 calc((100%) - 8px);
    }
  }
}

.nav-button {
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  opacity: 0.9;
  z-index: 2;
}

.nav-button:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-50%) scale(1.05);
  opacity: 1;
}

.nav-button svg {
  width: 24px;
  height: 24px;
  stroke: var(--vp-c-text-1);
  stroke-width: 2px;
}

.nav-button:hover svg {
  stroke: var(--vp-c-brand-1);
}

.prev {
  left: -24px;

  svg {
    margin-right: 2px;
  }
}

.next {
  right: -24px;

  svg {
    margin-left: 2px;
  }
}

@media (max-width: 640px) {
  .prev {
    left: -16px;
  }

  .next {
    right: -16px;
  }
}

@media (min-width: 640px) {
  .grid, .list, .scroll {
    gap: 16px;
  }

  .filter {
    margin-bottom: 24px;
  }
}

.search-container {
  position: relative;
  flex-grow: 1;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0px 12px;
  background-color: var(--vp-c-bg-alt);
}

.search-container:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
}

.search-input {
  width: 100%;
  height: 40px;
  padding-left: 24px;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

.search-label {
  position: absolute;
  display: inline;
  pointer-events: none;
  display: flex;
  align-items: center;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.search-container .DocSearch-Search-Icon {
  position: relative;
  margin-right: 8px;
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-1);
  fill: currentColor;
  transition: color 0.5s;
}

.orderby-container {
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-alt);
  max-width: 18rem;
}

.orderby-input {
  height: 40px;
  display: flex;
  flex-grow: 1;
  padding-left: 12px;
  border-radius: 0 8px 8px 0;
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

.orderby-container:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
}

.orderby-label {
  display: flex;
  font-size: 14px;
  padding-left: 12px;
  padding-right: 12px;
  justify-content: end;
}

.DocSearch-Search-Icon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' stroke-width='1.6' viewBox='0 0 20 20'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' d='m14.386 14.386 4.088 4.088-4.088-4.088A7.533 7.533 0 1 1 3.733 3.733a7.533 7.533 0 0 1 10.653 10.653z'/%3E%3C/svg%3E");
}
</style>
