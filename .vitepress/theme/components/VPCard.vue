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
  isFirst: {
    type: Boolean,
    default: false
  },
  showTags: {
    type: Boolean,
    default: true
  },
  showDesc: {
    type: Boolean,
    default: true
  },
  showMetaInfo: {
    type: Boolean,
    default: true
  },
});

const href = computed(() => withBase(props.article.link));

const isNew = computed(() => 
  props.article.createdAt && 
  new Date(props.article.createdAt) >= 
  new Date().setDate(new Date().getDate() - 7)
);

const isUpdated = computed(() => 
  props.article.lastUpdated && 
  new Date(props.article.lastUpdated) >= 
  new Date().setDate(new Date().getDate() - 7)
);

</script>

<template>
  <a :href="href" class="card" :class="mode">
    <!-- Badges -->
    <div class="badges">
      <div v-if="isNew" class="badge new">New 🔥</div>
      <div v-if="isUpdated && !isNew" class="badge updated">Updated</div>
    </div>

    <!-- Thumbnail -->
    <div v-if="article.thumbnail" class="thumbnail">
      <VPImage 
        :src="article.thumbnail"
        :alt="article.title"
        :isFirst="isFirst"
        class="thumbnail-img"
      />
    </div>

    <!-- Content -->
    <div class="content">
      <div class="main">
        <!-- Tags -->
        <div v-if="showTags && article.tags?.length" class="tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <!-- Title -->
        <h3 class="title">{{ article.title }}</h3>

        <!-- Description -->
        <p v-if="article.description && showDesc" class="description">
          {{ article.description }}
        </p>
      </div>

      <!-- Meta Info -->
      <div v-if="showMetaInfo && (article.createdAt || article.readTime)" class="meta">
        <VPDateTime v-if="article.createdAt" :date="article.createdAt"/>
        <span v-if="article.createdAt && article.readTime" class="separator">·</span>
        <span v-if="article.readTime" class="read-time">{{ article.readTime }} Min Read</span>
      </div>
    </div>
  </a>
</template>

<style scoped>
/* Base Card Styles */
.card {
  display: flex;
  position: relative;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
  text-decoration: none;
  transition: all 0.2s ease;
  overflow: hidden;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}

/* Layout Modes */
.square {
  flex-direction: column !important;
}

.list {
  flex-direction: row !important;
  max-height: 150px;
}

/* Thumbnail Styles */
.thumbnail {
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
}

.square .thumbnail {
  aspect-ratio: 2/1;
}

.list .thumbnail {
  width: 300px;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
}

/* Content Styles */
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  min-height: 0;
  flex: 1;
}

.main {
  flex: 1;
}

/* Tags */
.tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.tag {
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
  text-transform: capitalize;
}

/* Title */
.title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}

.list .title {
  font-size: 1.1rem;
}

/* Description */
.description {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.list .description {
  -webkit-line-clamp: 2;
}

/* Meta Info */
.meta {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.separator {
  margin: 0 0.5rem;
}

/* Badges */
.badges {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 10;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.badge.new {
  background-color: var(--vp-c-red-2);
}

.badge.updated {
  background-color: var(--vp-c-brand-2);
}

.list .badges {
  display: none;
}

.list .description {
  -webkit-line-clamp: 1;
}

.list .title {
  -webkit-line-clamp: 2;
}

/* Responsive */
@media (max-width: 768px) {
  .list {
    min-height: 120px;
  }
  
  .list .thumbnail {
    width: 220px;
  }
  
  .content {
    padding: 0.75rem;
  }
  
  .title {
    font-size: 1rem;
  }
  
  .list .title {
    font-size: 0.95rem;
  }
  
  .description {
    font-size: 0.8rem;
  }
  
  .meta {
    font-size: 0.75rem;
    margin-top: 0.5rem;
  }
  
  .tags {
    margin-bottom: 0.25rem;
  }
  
  .tag {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .list {
    min-height: 90px;
  }

  .list .content {
    justify-content: space-around;
    row-gap: 6px;
  }

  .list .title {
    font-size: 0.9rem;
    margin-bottom: 0rem;
  }

  .list .thumbnail {
    width: 90px;
  }
  
  .list .tags {
    display: none;
  }

  .list .description {
    display: none;
  }

  .list .meta {
    margin-top: 0rem;
  }
  
}
</style>