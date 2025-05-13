<script setup>
import Viewer from 'viewerjs';
import { useRoute } from 'vitepress';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import appConfig from '../../app.config.js';

const options = appConfig.imgViewerOptions
const viewerInstance = ref(null)
const route = useRoute()

function showViewer()
{
  if (!viewerInstance.value) return
  viewerInstance.value.show()
}

const addListener = () => 
{
  const imgContainer = document.body.querySelector(".VPDoc");
  viewerInstance.value ??= new Viewer(imgContainer, options);

  document.body
    .querySelectorAll('.VPDoc img:not(.img-ignore)')
    .forEach(item => item.addEventListener('click', showViewer))
}

const removeListener = () => 
{
  if (viewerInstance.value) 
  { 
    viewerInstance.value.destroy();
    viewerInstance.value = null;
  }

  document.body
    .querySelectorAll('.VPDoc img:not(.img-ignore)')
    .forEach(item => item.removeEventListener('click', showViewer))
}

watch(() => route.path, () => 
{
  removeListener()
  addListener()
})

onMounted(addListener)
onUnmounted(removeListener)

</script>

<template>
</template>

<style scoped>
</style>