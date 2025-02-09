<script setup lang="ts">
import { onMounted } from 'vue';
import appConfig from '../../appConfig';

defineProps({
  orientation: {
    type: String,
    default: 'vertical',
  }
})

const googleAdsConfig = appConfig.googleAds;

// onMounted(() => 
// {
//   // Inisialisasi Google Ads.
//   // Jika script sudah tersedia, cukup push konfigurasi untuk menampilkan iklan.
//   if (window.adsbygoogle && typeof window.adsbygoogle.push === 'function') 
//   {
//     window.adsbygoogle.push({});
//   } 
//   else 
//   {
//     // Jika belum dimuat, tambahkan script Google Ads secara dinamis
//     const script = document.createElement('script');
//     script.async = true;
//     script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
//     document.head.appendChild(script);
//     script.onload = () => { (window.adsbygoogle = window.adsbygoogle || []).push({}) };
//   }
// });
</script>

<template>
  <slot name="ads-top" />
  <div v-if="orientation === 'vertical'" class="ads-vertical">
    <ins class="adsbygoogle"
         :data-ad-client="googleAdsConfig.clientId"
         :data-ad-slot="googleAdsConfig.adSlot"></ins>
  </div>
  <div v-else class="ads-horizontal">
    <ins class="adsbygoogle"
         :data-ad-client="googleAdsConfig.clientId"
         :data-ad-slot="googleAdsConfig.adSlot"></ins>
  </div>
  <slot name="ads-bottom" />
</template>

<style scoped>
.ads-vertical {
  display: flex;
  height: 75vh;
  background-color: red;
  border-radius: 8px;
}

.ads-horizontal {
  display: flex;
  height: 100%;
  background-color: red;
  border-radius: 8px;
}
</style>
