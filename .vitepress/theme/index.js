// https://vitepress.dev/guide/custom-theme
import { h, provide } from 'vue'
import DefaultTheme from 'vitepress/theme';
import Layout from './AppLayout.vue';

import VPListArticles from './components/VPListArticles.vue';
import VPMermaid from './components/VPMermaid.vue';
import VPImage from './components/VPImage.vue';

import 'katex/dist/katex.min.css'
import './viewer.css';
import './style.css';
import VPLatex from './components/VPLatex.vue';



export default {
  extends: DefaultTheme,
  Layout: Layout,

  enhanceApp({ app, router, siteData }) {
    app.component('VPListArticles', VPListArticles); 
    
    app.component('VPMermaid', VPMermaid);
    app.component('VPImage', VPImage);    
    app.component('VPLatex', VPLatex);
  },
}
