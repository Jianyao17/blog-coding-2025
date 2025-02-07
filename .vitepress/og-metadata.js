import { createTitle } from "vitepress/dist/client/shared.js";

export function InsertOGMetadata(pageData, context)
{
  if (!pageData.relativePath.endsWith('.md')) return

  // Generate canonical URL
  const pagePath = pageData.relativePath
  const sitename = context.siteConfig.site.title
  const title = createTitle(context.siteConfig.site, pageData)
  const hostname = context.siteConfig.sitemap.hostname
  const pageUrl = new URL(pagePath, hostname).href
  const currentLocale = context.siteConfig.site.localeIndex

  const head = GenerateSocialMeta(pageData.frontmatter, pageUrl, sitename, title, currentLocale)
  pageData.frontmatter.head ??= [];
  pageData.frontmatter.head.push(...head);
}


export function GenerateSocialMeta(frontmatter, pageUrl, siteName, title, locale) 
{
  const meta = [];
  const {
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
  meta.push(['meta', { property: 'og:site_name', content: siteName }])
  meta.push(['meta', { property: 'og:locale', content: locale === 'root' ? 'en' : locale }])

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