import { defineConfig } from 'vitepress'
import { TransoformImages } from './img-processing.js';
import { GenerateTaxonomiesJSON } from './taxonomies.js';
import { TaxonomiesHotUpdate } from './taxonomies.dev.js';
import { GenerateRobotsTxt } from './generate-robots.js';
import { CopyAssetsToBuild } from './copy-assets.js';
import { InsertOGMetadata } from './og-metadata.js';
import { configDotenv } from 'dotenv';

// Load .env file
configDotenv()

const SITE_NAME = process.env.VITE_SITE_NAME
const SITE_DESC = process.env.VITE_SITE_DESCRIPTION
const BASE_URL =  process.env.VITE_SITE_URL

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: SITE_NAME,
  description: SITE_DESC,
  srcDir: './blog',
  lang: 'id',

  sitemap: {
    hostname: BASE_URL
  },
  
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
    config: (md) => 
    {
      // Replace <img> inside markdown content with 
      // custom VPImage component
      md.use((md) => {
        md.renderer.rules.image = (tokens, idx) => 
        {
          const token = tokens[idx];
          const src = token.attrGet('src');
          const alt = token.attrGet('alt');

          return `
          <VPImage 
            src="${src}" 
            alt="${alt}"/>
        `;
        };
      });

      // Add mermaid renderer
      md.use((md) => {
        const fence = md.renderer.rules.fence
        md.renderer.rules.fence = (...args) => 
        {
          const [tokens, idx] = args
          const token = tokens[idx]
          const lang = token.info.trim()

          if (lang === 'mermaid') 
          {
            // Encode the content of the token before passing it to the component
            const encodedContent = encodeURIComponent(token.content);
            return `
              <VPMermaid
                class="language-mermaid"
                id="mermaid-${idx}"
                diagramCode="${encodedContent}">
              </VPMermaid>`;
          }
          return fence(...args)
        }
      });
    }
  },

  // ============ Scripts Runner ============
  async buildEnd() 
  {
    CopyAssetsToBuild();
    GenerateRobotsTxt(BASE_URL);
    GenerateTaxonomiesJSON();
    TransoformImages();
  },

  transformPageData(pageData, ctx) {
    InsertOGMetadata(pageData, ctx)
  },

  vite: {
    plugins: [
      TaxonomiesHotUpdate()
    ]
  }
})
