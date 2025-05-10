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

    mapping: "pathname",
    inputPosition: "top",
    reactionsEnabled: "1",
    emitMetadata: "0",
  },

  googleAds: {
    enabled: false,
    adSlot: 'YOUR_GOOGLE_ADS_SLOT',        
  },

  mermaidOptions: {
    securityLevel: 'loose',
    theme: 'dark',
    flowchart: { 
      diagramPadding: 15,
      useMaxWidth: true,
      htmlLabels: true
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50
    },
    gantt: {
      axisFormat: '%Y-%m-%d'
    },
    er: {
      layoutDirection: 'TB'
    },
  },

  mermaidViewerOptions: {
    panzoom: {
      zoomDoubleClickSpeed: 1,
      transformOrigin: {x: 0.25, y: 0.15},
      autoCenter: true,
      maxZoom: 10,
      minZoom: 1,
    }
  }
}
