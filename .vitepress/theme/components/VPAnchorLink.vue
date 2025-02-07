<script setup lang="js">
defineProps({
  label: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: ''
  },
  icon: {
    type: String
  }
})
</script>

<template>
<a :href="href" 
    class="anchor-link">
    <span class="icon" v-if="icon" :style="icon"></span>
    <span class="label" v-if="label">{{ label }}</span>
</a>
</template>

<style scoped>

.anchor-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  color: var(--vp-c-text-2);
  
  .label {
    margin-left: 8px;
    font-size: 13px;
    font-weight: 500;
  }
}

.icon {
  width: 16px;
  height: 16px;
  background-color: var(--vp-c-text-2);
}

.anchor-link:hover {
  color: var(--vp-c-text-1);

  
  .icon {
    background-color: var(--vp-c-text-1);
  }
}
</style>