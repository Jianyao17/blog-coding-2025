
const btnStyle = {
  size: 'large',
  show: 4,
}

export default
{
  sourceDir: './blog',
  outputDir: './.vitepress/dist',

  excludeFolder: [
    'public'
  ],

  validImage: [
    '.png', '.jpg', '.jpeg', '.gif', '.webp'
  ],

  imgFormats: [
    { 
      format: 'webp', 
      quality: 95,
      sizes: [ 
        { width: 300 }, 
        { width: 600 }, 
        { width: 1000 }, 
        { width: 1600 }, 
      ]
    },
  ],

  imgViewerOptions: 
  {
    navbar: 4,
    title: true,
    backdrop: true,
    filter: (img) => 
      !img.classList.contains('img-ignore'),

    toolbar: {
      zoomIn: btnStyle,
      zoomOut: btnStyle,
      prev: btnStyle,
      next: btnStyle,
      rotateLeft: btnStyle,
      rotateRight: btnStyle
    },

    inheritedAttributes: [
      'crossOrigin', 
      'referrerPolicy', 
      'decoding', 
      'loading', 
      'useMap',
      'isMap', 
    ]
  },

  giscus: {
    lang: "en", // UI language
    themes: {
      dark: "transparent_dark",
      light: "light"
    },

    repo: "username/repository", 
    repoId: "YOUR_REPO_ID", 
    category: "General", 
    categoryId: "YOUR_CATEGORY_ID", 

    mapping: "pathname",
    inputPosition: "top",
    reactionsEnabled: "1",
    emitMetadata: "0",
  },

  googleAds: {
    clientId: 'YOUR_GOOGLE_ADS_CLIENT_ID', 
    adSlot: 'YOUR_GOOGLE_ADS_SLOT',        
  }
}
