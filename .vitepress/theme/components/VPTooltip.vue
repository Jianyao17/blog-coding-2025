<script setup></script>

<template>
  <div class="tooltip">
    <slot></slot>
  </div>
</template>

<style scoped>
.tooltip {
  opacity: 0;
  transition: opacity 0.2s;
  visibility: hidden;
  
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-custom-block-info-border);
  color: var(--vp-c-text-1);

  box-shadow: var(--vp-shadow-3);
  border-radius: 6px;
  padding: 6px 16px;

  text-align: center;
  line-height: 24px;
  white-space: nowrap;
  
  position: absolute;
  margin-left: -50%; /* Use half of the width (120/2 = 60), to center the tooltip */
  top: 100%;
  left: 50%;
  z-index: 1;
}

.tooltip::after {
  content: " ";
  position: absolute;
  bottom: 100%;  /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent var(--vp-c-bg-soft) transparent;
}
</style>