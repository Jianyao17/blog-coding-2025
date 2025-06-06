<script setup>
import { ref, computed } from 'vue';
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import { useCaseInsensitiveSearch } from '../composables/useCaseInsensitiveSearch';
import { useArticleSorting } from '../composables/useSortingArticle';
import { useTaxonomies } from '../composables/useTaxonomies';
import { usePagination } from '../composables/usePagination';
import { useCarousel } from '../composables/useCarousel';

import CarouselControls from './controls/CarouselControls.vue';
import PaginationControls from './controls/PaginationControls.vue';
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
  paginate: {
    type: Number,
    default: 0
  },
  content: {
    Type: 'tags' | 'series' | 'items',
    Name: String
  },
  useFilter: {
    type: Boolean,
    default: true
  },
})

const { lang } = useData();
const { findCaseInsensitive } = useCaseInsensitiveSearch()
const { articleSortOptions, sortedItems } = useArticleSorting()
const { carousel, showNext, showPrev, scroll } = useCarousel(props.layout)
const { currentPage, totalPages, paginateItems } = usePagination(props.layout)


// Fetch Article's Taxonomies from json 
const { taxonomies } = useTaxonomies()
const collection = computed(() => findCaseInsensitive(taxonomies.value , props.content.Type));
const items = computed(() => findCaseInsensitive(collection.value, props.content.Name));

const articles = computed(() => 
  props.content.Type === 'items' // Load items if content type is items
  ? Object.entries(collection.value).map(([, item]) => item)
  : Object.entries(items.value).map(([, ref]) => taxonomies.value?.items[ref]))


const searchInput = ref('')
const hasOrder = computed(() => articles.value.every(article => 'order' in article))
const orderBy  = ref(hasOrder.value ? props.orderBy  : 'title-ascending')

// Filtered and sorted articles
const filteredArticles = computed(() => 
{  
  const filtered = articles.value
    .filter(article => article.lang?.toLowerCase().includes(lang.value))
    .filter(article => article.title.toLowerCase().includes(searchInput.value.toLowerCase()));
  return sortedItems(filtered, orderBy.value, hasOrder.value);
});

const paginatedArticles = computed(() => 
  paginateItems(filteredArticles.value, props.paginate))

const cardMode = computed(() => ['grid', 'scroll'].includes(props.layout) ? 'square' : 'list')
const count = computed(() => filteredArticles.value.length)
const placeholderCount = computed(() => 
{
  if (props.layout !== 'grid' || props.paginate <= 0) return 0;

  const itemCount = paginatedArticles.value.length;
  return itemCount % 4 ? 4 - (itemCount % 4) : 0;
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
    <div :class="layout" ref="carousel">
      <VPCard v-for="article in paginatedArticles" class="scroll-item" 
          :isFirst="article.index == 0" :key="article.index" 
          :article="article"            :showTags="false"
          :mode="cardMode" />

      <!-- Placeholder cards untuk mengisi ruang kosong -->
      <div v-if="layout === 'grid' && paginate > 0" 
           v-for="n in placeholderCount" 
           :key="`placeholder-${n}`" 
           class="card-placeholder"></div>
    </div>
    
    <PaginationControls
      v-if="paginate > 0 && layout !== 'scroll'"
      @page-change="newPage => currentPage = newPage"
      :current-page="currentPage"
      :total-pages="totalPages" />

    <!-- Carousel Controls -->
    <CarouselControls 
      v-if="layout === 'scroll'"
      :show-prev="showPrev"
      :show-next="showNext"
      @scroll="scroll" />

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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
}

.list {
  display: flex;
  flex-direction: column; 
  row-gap: 12px;
}

.scroll {
  width: 100%;
  display: inline-flex;
  overflow-x: scroll;
  padding: 16px 0px;
  gap: 12px;

  scrollbar-width: thin;
  scroll-behavior: smooth;
  scrollbar-color: var(--vp-c-border) var(--vp-c-bg-alt);
  scroll-snap-type: x proximity;

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

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

@media (min-width: 640px) {
  .grid, .list, .scroll {
    row-gap: 16px;
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
