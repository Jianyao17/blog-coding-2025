import { defineConfig } from 'vitepress'
import { transoformImages } from './img-processing.js';
import { GenerateTaxonomiesJSON } from './taxonomies.js';
import { TaxonomiesHotUpdate } from './taxonomies.dev.js';
import { copyAssetsToBuild } from './copy-assets.js';


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Blog Coding",
  description: "A Coding Blog Site",
  srcDir: './blog',
  
  // ============ Vitepress Theme ============
  themeConfig: 
  {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    
    // ============ Navbar Link ============
    nav: [
      { text: 'Unity Tutorial', link: '/' },
      { text: 'C# Tutorial', link: '/markdown-examples' },
      { text: 'Tags', link: '/unity/'}
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/',
      text: 'View Project Source Code on GitHub'
    },
    lastUpdated: true,
    outline: {
      level: [1, 3]
    }
  },

  // ============ Localization ============
  locales: {
    root: {
      label: 'Indonesia',
      lang: 'id',
    },
    en: {
      label: 'English',
      lang: 'en', 
      // other locale specific properties...
    }
  },

  cleanUrls: true,  
  markdown: {
    config: (md) => md.use((md) => 
    {
      // Replace <img> inside markdown content with 
      // custom VPImage component
      md.renderer.rules.image = (tokens, idx) => 
      {
        const token = tokens[idx]
        const src = token.attrGet('src')
        const alt = token.attrGet('alt')

        return `
          <VPImage 
            src="${src}" 
            alt="${alt}"/>
        `
      }
    })
  },

  // ============ Scripts Runner ============
  async buildEnd() 
  {
    copyAssetsToBuild();
    GenerateTaxonomiesJSON();
    transoformImages();
  },

  vite: {
    plugins: [
      TaxonomiesHotUpdate()
    ]
  }
})
