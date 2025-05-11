// https://vitepress.dev/guide/custom-theme
import { h, provide } from 'vue'
import DefaultTheme from 'vitepress/theme';
import Layout from './CustomLayout.vue';

import VPListArticles from './components/VPListArticles.vue';
import VPMermaid from './components/VPMermaid.vue';
import VPImage from './components/VPImage.vue';

import './viewer.css';
import './style.css';



export default {
  extends: DefaultTheme,
  Layout: Layout,

  enhanceApp({ app, router, siteData }) {
    app.component('VPListArticles', VPListArticles); 
    
    app.component('VPMermaid', VPMermaid);
    app.component('VPImage', VPImage);    
  },
}
