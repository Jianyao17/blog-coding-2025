<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress'

const { page } = useData()

// Ambil raw markdown content
const mdContent = computed(() => page.value.content)
</script>

<template>
  <Content :content="mdContent" />
</template>