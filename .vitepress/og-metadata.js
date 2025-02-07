import { createTitle } from "vitepress/dist/client/shared.js";

export function InsertOGMetadata(pageData, context)
{
  if (!pageData.relativePath.endsWith('.md')) return

  // Generate canonical URL
  const pagePath = pageData.relativePath
  const siteData = context.siteConfig.site
  
  const title = createTitle(siteData, pageData)
  const hostname = context.siteConfig.sitemap.hostname
  const pageUrl = new URL(pagePath, hostname).href

  const head = GenerateSocialMeta(pageData.frontmatter, pageUrl, title, siteData)
  pageData.frontmatter.head ??= [];
  pageData.frontmatter.head.push(...head);
}


export function GenerateSocialMeta(frontmatter, pageUrl, title, siteData) 
{
  const meta = [];
  const {
    lang,
    description,
    thumbnail,
    author,
    tags,
    createdAt,
    lastUpdated
  } = frontmatter;

  // Basic Open Graph
  meta.push(['meta', { property: 'og:type', content: 'article' }])
  meta.push(['meta', { property: 'og:title', content: title }])
  meta.push(['meta', { property: 'og:description', content: description }])
  meta.push(['meta', { property: 'og:url', content: pageUrl }])
  meta.push(['meta', { property: 'og:site_name', content: siteData.title }])  
  meta.push(['meta', { property: 'og:locale', content: lang }])

  // Article metadata
  if (createdAt) {
    meta.push(['meta', { property: 'article:published_time', content: createdAt }])
  }
  if (lastUpdated) {
    meta.push(['meta', { property: 'article:modified_time', content: lastUpdated }])
  }
  if (tags) {
    tags.forEach(tag => {
      meta.push(['meta', { property: 'article:tag', content: tag }])
    })
  }

  // Authors
  if (author && Array.isArray(author)) {
    author.forEach(authorItem => {
      meta.push(['meta', { property: 'article:author', content: authorItem.name }])
    })
  }

  // Images
  if (thumbnail) {
    const imageUrl = new URL(thumbnail, pageUrl).href
    meta.push(['meta', { property: 'og:image', content: imageUrl }])
    meta.push(['meta', { name: 'twitter:image', content: imageUrl }])
  }

  // Twitter Card
  meta.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
  meta.push(['meta', { name: 'twitter:title', content: title }])
  meta.push(['meta', { name: 'twitter:description', content: description }])
  
  return meta;
}