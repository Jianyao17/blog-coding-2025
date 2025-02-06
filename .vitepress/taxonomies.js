import { existsSync, mkdirSync, readdirSync, 
         readFileSync, writeFileSync } from 'fs';
import appConfig from './appConfig'
import matter from 'gray-matter';
import path from 'path';

const blogDir = appConfig.sourceDir;
const outputDir = appConfig.outputDir;

export function GenerateTaxonomiesJSON(outDir = outputDir)
{
  const listData = GetListFrontmatterData()  
  const taxonomies = CreateTaxonomiesData(listData)

  if (!existsSync(outDir)) 
    mkdirSync(path.dirname(outDir), { recursive: true })

  writeFileSync(path.join(outDir, 'taxonomies.json'), JSON.stringify(taxonomies, null, 2))
  console.log(`taxonomies.json created at dir: ${outDir}\n`);
}


function GetListFrontmatterData()
{
  return readdirSync(blogDir, { withFileTypes: true, recursive: true })
    .filter(dir => (!dir.isDirectory() && dir.name.endsWith('.md')))
    .map(dir =>
    {
      const filePath = path.join(dir.parentPath, dir.name)
      const relativePath = path.relative(blogDir, filePath)
      const content = readFileSync(filePath, 'utf-8')
      const { data } = matter(content)

      return { relativePath, frontmatter: data }
    })
}


function CreateTaxonomiesData(rawData)
{
  const taxonomies = { series: {}, tags: {} }   
  console.log('');
  
  rawData 
    .filter(({ frontmatter }) => frontmatter.tags || frontmatter.series)
    .forEach(({ relativePath, frontmatter }) => 
    {              
      // Generate URL path & Generate thumbnail path
      const linkUrl = pathToSlug(relativePath.replace(/\.md$/, ''))
      const imgPath = frontmatter.thumbnail 
              ? pathToSlug(path.join(path.dirname(relativePath), frontmatter.thumbnail))
              : null

      const metadata = 
      {
        lang: frontmatter.lang || 'id',
        createdAt: frontmatter.createdAt || null,
        lastUpdated: frontmatter.lastUpdated || frontmatter.date || null,

        title: frontmatter.title || path.parse(relativePath).name,
        description: frontmatter.description || null,
        readTime: frontmatter.readTime || null,
        author: frontmatter.author || null,
        
        series: frontmatter.series || null,
        tags: frontmatter.tags || null,
        thumbnail: imgPath ? `/${imgPath}` : null,
        link: linkUrl ? `/${linkUrl}` : null
      }

      if (frontmatter.series) 
      {
        if (!taxonomies.series[frontmatter.series]) taxonomies.series[frontmatter.series] = [];
        taxonomies.series[frontmatter.series].push(metadata);
  
        console.log(`Added to Series [${frontmatter.series}]: ${relativePath}`);
      }
  
      if (frontmatter.tags) 
      {
        frontmatter.tags.forEach((tag) => {
          if (!taxonomies.tags[tag]) taxonomies.tags[tag] = [];
          taxonomies.tags[tag].push(metadata);
          console.log(`Added to Tag [${tag}]: ${relativePath}`);
        });
      }
    })
  return taxonomies
}


// Fungsi pathToSlug yang sama
function pathToSlug(str) {
  return str
    .toString()
    .normalize('NFKD')
    .replace(/\\/g, '/')
    .split('/')
    .map(segment => {
      const match = segment.match(/^(.*?)(\.\w+)?$/)
      const name = match[1]
      const ext = match[2] || ''

      return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/-+/g, '-') + ext
    })
    .filter(Boolean)
    .join('/')
}
