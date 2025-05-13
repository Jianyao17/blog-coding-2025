<script setup lang="ts">
import { computed, onMounted } from 'vue';
import appConfig from '../../app.config';

defineProps({
  orientation: {
    type: String,
    default: 'vertical',
    validator: (v) => 
      ['vertical', 'horizontal', 'square'].includes(v)
  }
})

const initAds = () => (window.adsbygoogle = window.adsbygoogle || []).push({})
const googleAds = computed(() => 
({
  enabled: appConfig.googleAds.enabled,
  adSlot: appConfig.googleAds.adSlot,
  clientId: import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT
}))

onMounted(() => 
{
  // return jika google ads dinonaktifkan
  if (!googleAds.value.enabled) return

  // Inisialisasi Google Ads.
  // Jika script sudah tersedia, cukup push konfigurasi untuk menampilkan iklan.
  if (window.adsbygoogle && typeof window.adsbygoogle.push === 'function') 
  { initAds() } 
  else 
  {
    // Jika belum dimuat, tambahkan script Google Ads secara dinamis
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.onload = initAds()
    document.head.appendChild(script);
  }
});
</script>

<template>
  <slot name="ads-top" />
  <div :class="['ads-container', orientation]">
    <ins v-if="googleAds.enabled"
      class="adsbygoogle"
      :data-ad-client="googleAds.clientId"
      :data-ad-slot="googleAds.adSlot"
    />
  </div>
  <slot name="ads-bottom" />
</template>

<style scoped>
.ads-container {
  background-color: var(--vp-c-bg-alt);
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;
}

.ads-container.vertical {
  width: min(100%, 300px);
  height: min(100%, 970px);
  aspect-ratio: 1/2;
}

.ads-container.horizontal {
  width: min(100%, 970px);
  height: 100%;
}

.ads-container.square {
  aspect-ratio: 1/1;
}


.adsbygoogle {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
