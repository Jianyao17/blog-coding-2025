import { useTaxonomies } from './useTaxonomies'
import { useData } from 'vitepress'
import { computed } from 'vue'

export function usePrevNext() 
{
  const { page } = useData()
  const { taxonomies } = useTaxonomies()
  
  const normalizeUrl = url => 
  {
    return url.toLowerCase()
      .replace(/^\//, '') // Hapus leading slash
      .replace(/(^|\/)index$/, '')
      .replace(/\.md$/, '')
      .replace(/\/$/, '')
      .trim()
  }

  function baseDir(url) 
  {
    if (!url) return ''
    const processed = url
      .replace(/\.md$/, '')
      .replace(/(^|\/)index$/, '')
      .replace(/^\/|\/$/g, '')
    
    const parts = processed.split('/').filter(p => p)
    if (parts.length < 1) return ''
    
    parts.pop()
    return parts.length > 0 ? parts[parts.length - 1] : ''
  }


  const sortedPages = computed(() => 
  {
    // Jika taxonomies belum ada, kembalikan array kosong.
    if (!taxonomies.value || !taxonomies.value.items) return []

    const parrentDir = baseDir(page.value.relativePath)
    const relativePath = normalizeUrl(page.value.relativePath)
    
    // Ambil semua halaman dan buat salinan untuk diurutkan
    const pages = computed(() => 
    {      
      return Object.entries(taxonomies.value.items)
                   .filter(([, article]) => baseDir(article.link) === parrentDir)
                   .map(([id, article]) => article)
    })             
    
    return pages.value.sort((a, b) => 
    {
      // Ambil nilai order dari frontmatter atau default ke Infinity
      const orderA = a?.order ?? Infinity
      const orderB = b?.order ?? Infinity
      
      // Urutkan berdasarkan order terlebih dahulu
      if (orderA !== orderB) {
        return orderA - orderB
      }
      
      // Jika order sama, urutkan berdasarkan path
      return a.link.localeCompare(b.link)
    })
  })

  const currentIndex = computed(() => 
  {    
    return sortedPages.value.findIndex(p => 
      normalizeUrl(p.link) === normalizeUrl(page.value.relativePath))
  })

  const prev = computed(() => {        
    if (currentIndex.value > 0) {
      const prevPage = sortedPages.value[currentIndex.value - 1]
      return {
        text: prevPage.title,
        link: prevPage.link
      }
    }
  })

  const next = computed(() => {
    if (currentIndex.value < sortedPages.value.length - 1
        && currentIndex.value > -1) 
    {
      const nextPage = sortedPages.value[currentIndex.value + 1]
      return {
        text: nextPage.title,
        link: nextPage.link
      }
    }
  })

  return {
    prev,
    next
  }
}