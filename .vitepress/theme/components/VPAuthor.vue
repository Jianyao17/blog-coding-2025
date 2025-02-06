<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

// Ambil data author dari frontmatter
const { page } = useData()

// Ambil data author dari frontmatter, fallback ke objek kosong jika tidak ada
const author = computed(() => {
  const authorData = page.value.frontmatter.author?.[0] || {}
  return {
    name: authorData.name || "Unknown Author",
    avatar: authorData.avatar?.trim() || null, // Pastikan avatar bukan string kosong
    link: authorData.link?.trim() || null     // Pastikan link bukan string kosong
  }
})
</script>

<template>
  <div class="author">
    <!-- Jika ada avatar dan link -->
    <template v-if="author.avatar && author.link">
      <a :href="author.link" target="_blank" rel="noopener noreferrer" class="author-link">
        <img :src="author.avatar" :alt="author.name" class="author-avatar img-ignore" loading="lazy"/>
        {{ author.name }}
      </a>
    </template>

    <!-- Jika hanya ada avatar tanpa link -->
    <template v-else-if="author.avatar">
      <div class="author-avatar-container">
        <img :src="author.avatar" :alt="author.name" class="author-avatar" loading="lazy"/>
        {{ author.name }}
      </div>
    </template>

    <!-- Jika ada nama dan link -->
    <template v-else-if="author.name && author.link">
      <a :href="author.link" target="_blank" rel="noopener noreferrer" class="author-link">
        <span>{{ author.name }}</span>
      </a>
    </template>

    <!-- Jika hanya ada nama -->
    <template v-else>
      <span>{{ author.name }}</span>
    </template>
  </div>
</template>

<style scoped>
.author {
  display: flex;
  align-items: center;
  color: var(--vp-c-text-2);
  font-size: 14px;
  gap: 8px;
}

.author-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.author-link:hover {
  color: var(--vp-custom-block-info-text);
  text-decoration: underline;
}

.author-avatar-container {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
}
</style>
