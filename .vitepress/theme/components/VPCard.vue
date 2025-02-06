
<script setup>
import { computed } from 'vue';
import { withBase } from 'vitepress';
import VPDateTime from './VPDateTime.vue';
import VPImage from './VPImage.vue';

const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    default: 'square', 
    validator: (value) => ['square', 'list'].includes(value)
  },
  displayTags: {
    type: Boolean,
    default: true
  },
  isFirst: {
    type: Boolean,
    default: false
  },
});

const href = computed(() => withBase(props.article.link));
const imgWidth = computed(() => (props.mode === 'list') ? '200px' : '600px')

</script>

<template>
  <a
    :href="href"
    :class="mode" 
    class="card"
  >
    <div class="card-content">
      <!-- Thumbnail Image -->
      <div v-if="article.thumbnail" class="thumbnail-container">
        <VPImage 
          :src="article.thumbnail"
          :alt="article.title"
          :isFirst="isFirst"
          :width="imgWidth"
          class="thumbnail-image" />
      </div>

      <div class="content-wrapper">
        <div class="main-content">
          <!-- Post Tags -->
          <div v-if="displayTags && article.tags.length" class="tags-container">
            <div v-for="(tag, index) in article.tags" :key="index" class="tag">
              {{ tag }}
            </div>
          </div>

          <!-- Title -->
          <span class="title">{{ article.title }}</span>

          <!-- Description -->
          <div v-if="article.description" class="description">
            {{ article.description }}
          </div>
        </div>

        <!-- Publish Date & Read Time -->
        <div v-if="article.createdAt || article.readTime" class="meta-info">
          <VPDateTime v-if="article.createdAt" :date="article.createdAt"/>
          <span v-if="article.createdAt && article.readTime" class="separator">·</span>
          <span v-if="article.readTime" class="read-time">{{ article.readTime }} Minutes</span>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped>

.card {
  display: block;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  background-color: var(--vp-c-bg-alt);
  transition: all 0.2s ease;
  transform-origin: center;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}

.card:active {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.list {
  @media (min-width: 960px) {
    max-height: 160px;

    .title {
      flex-wrap: nowrap;
      overflow-x: hidden;
    }
  }
  /* height: auto; */

  .card-content {
    display: flex;
    flex-direction: row;
  }

  .thumbnail-image {
    width: 300px;
  }
}

.square {
  .thumbnail-image {
    width: 100%;
  }
}

.thumbnail-container {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  height: inherit;
}

.thumbnail-image {
  inset: 0;
  object-fit: contain;
  border-radius: 0px;
  height: 100%;
}

.content-wrapper {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: min-content;
  flex-grow: 1;
}

.main-content {
  margin-bottom: 1rem;
  flex-shrink: 1;
}

.tags-container {
  position: relative;
  display: flex;
  margin-bottom: 0.25rem;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  text-transform: capitalize;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: var(--vp-c-brand-1);
}

.title {
  display: flex;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: var(--vp-c-text-1);
}

.title:hover {
  color: var(--vp-c-text-1);
}

.description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta-info {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
}

.separator {
  margin: 0 0.25rem;
}

@media (max-width: 960px) {
  .list {
    .thumbnail-image {
      object-fit: cover;
    }
  }
}

@media (max-width: 640px) {
  .list {
    .thumbnail-container {
      width: 30%;
    }
  
    .thumbnail-image {
      object-fit: cover;
    }
  
    .content-wrapper {
      padding: 0.65rem;
      width: 70%;
    }
  
    .main-content {
      margin-bottom: 0.2rem;
    }
  
    .title {
      font-size: 0.875rem;
      line-height: 1.3rem;
      margin-bottom: 0rem;
    }
  
    .meta-info {
      font-size: 0.75rem;
      line-height: 0.65rem;
    }
    
    .description {
      display: none;
    }
  
    .tags-container {
      display: none;
    }
  }
}
</style>