import fs from 'fs/promises'
import path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'
import chalk from 'chalk'

/**
 * Converts a given string to kebab-case format.
 */
const toKebabCase = str => 
  str.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-').toLowerCase()
    .replace(/[^a-z0-9-]/g, '')


const extractLanguage = (filename, dirPath) => 
{
  const dirName = path.basename(dirPath)
  
  // Format index.[lang].md
  const indexMatch = filename.match(/^index\.([a-z]+)\.md$/)
  if (indexMatch) return indexMatch[1]
  
  // Format [folder].[lang].md
  const folderMatch = filename.match(new RegExp(`^${dirName}\\.([a-z]+)\\.md$`))
  return folderMatch ? folderMatch[1] : null
}

const validateFrontmatter = (frontmatter) => 
{
  const errors = []
  if (!frontmatter.order) errors.push('Missing order property')
  if (!frontmatter.lang) errors.push('Missing lang property')
  if (!frontmatter.title) errors.push('Missing title property')
  if (!frontmatter.description) errors.push('Missing description property')

  if (!frontmatter.createdAt) errors.push('Missing createdAt property')
  if (!frontmatter.lastUpdated) errors.push('Missing lastUpdated property')
  
  if (!frontmatter.thumbnail) errors.push('Missing thumbnail property')
  if (!frontmatter.readTime) errors.push('Missing readTime property')
  if (!frontmatter.author) errors.push('Missing author property')
  
  if (!frontmatter.tags) errors.push('Missing tags property')
  if (!frontmatter.series) errors.push('Missing series property')
  return { valid: errors.length === 0, errors }
}

// TODO: fix link validation
const validateImgLinks = (content, filePath, allAssets) => 
{
  // Regex for markdown: ![...](...)
  const imageRegex = /!\[.*?\]\((.*?)\)/g
  const images = [...content.matchAll(imageRegex)].map(m => m[1])
  const errors = []
  
  images.forEach(imgPath => 
  {
    // Resolve path relative terhadap lokasi file
    const resolved = path.resolve(path.dirname(filePath), imgPath)
      
    // Cek 3 kondisi:
    // 1. File tidak ada di daftar
    // 2. Bukan URL eksternal
    // 3. Bukan anchor link
    if (!allAssets.has(resolved) && 
        !imgPath.startsWith('http') && 
        !imgPath.startsWith('#')) {
      errors.push(`Gambar tidak ditemukan: ${imgPath}`)
    }
  })

  return { valid: errors.length === 0, errors }
}

// Convert ![[image.png]] to ![image](image.png)
const convertObsidianImages = content => 
{
  const obsidianImgRegex = /!\[\[([^\]\n]+)\]\]/g
  return content.replace(obsidianImgRegex, (match, file) => 
  {
    console.log(chalk.gray(`Converting: ${match} to ![${file}](${file})`));
    const imageName = path.basename(file, path.extname(file))
    return `![${imageName}](${file})`
  })
}



const transferMarkdown = async (file, source, output) => 
{
  const dirPath = path.dirname(file)
  const fileName = path.basename(file)
  const lang = extractLanguage(fileName, dirPath)
  
  if (!lang) return null

  // Transform relative path to kebab-case
  const relativePath = path.relative(source, dirPath)
  const kebabPath = relativePath.split(path.sep)
    .map(part => toKebabCase(part))
    .join(path.sep)

  // Create output directory and file
  const outputDir = path.join(output, lang, kebabPath)
  const outputFile = path.join(outputDir, 'index.md')
  
  try {
    // Read and parse the file
    const content = await fs.readFile(file, 'utf8')
    const { data: frontmatter, content: mdContent } = matter(content)

    // Convert Obsidian image links to markdown format
    const markdown = convertObsidianImages(mdContent)

    // Recombine frontmatter and content
    const newContent = matter.stringify(markdown, frontmatter)

    // Make and write the file to the output directory
    await fs.mkdir(outputDir, { recursive: true })
    await fs.writeFile(outputFile, newContent, 'utf8')
    
    return {
      path: outputFile,
    }
  } catch (err) {
    console.error(chalk.red(`Error processing ${file}:`), err.message)
    return null
  }
}


const transferAssets = async (source, output, lang, allAssets) => 
{
  const assetFiles = await glob(`${source}/**/*`, { 
    ignore: ['**/*.md'], 
    nodir: true 
  })
  
  for (const assetFile of assetFiles) 
  {
    const dirPath = path.dirname(assetFile)
    const relativeToSource = path.relative(source, dirPath)

    const kebabPath = relativeToSource.split(path.sep)
      .map(part => toKebabCase(part)).join(path.sep)
    
    const outputDir = path.join(output, lang, kebabPath)
    const outputFile = path.join(outputDir, path.basename(assetFile))

    await fs.mkdir(outputDir, { recursive: true })
    await fs.copyFile(assetFile, outputFile)
    
    console.log(chalk.gray(`Copied Asset: ${path.relative(output, outputFile)}`))
    allAssets.add(path.resolve(outputFile))
  }
}


const generateIndexFiles = async (output, lang) => 
{
  // Get all directories in the language folder
  let directories = await glob(`${output}/${lang}/**/`, { nodir: false })
    
  for (const dir of directories) 
  {
    const indexPath = path.join(dir, 'index.md')
    const dirName = path.basename(dir)

    if (dirName === 'assets') continue // Skip assets directories

    try {
      // Check if index.md already exists
      await fs.access(indexPath)
    } catch {
      // If it doesn't exist, create it
      const dirName = path.basename(dir)
      await fs.writeFile(indexPath, generateIndexContent(dirName))
      console.log(chalk.gray(`Generated: ${path.relative(output, indexPath)}`))
    }
  }
}

const generateIndexContent = dirName => 
{
  const title = dirName.split('-')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ')

  return `---
layout: home
title: ${title}
---
<VPListArticles 
  heading="${title}"
  layout="grid"
  orderBy="date-descending"
  :paginate="3"
  :content="{ Type: 'items', Name: '${title.toLowerCase()}' }"
/>`
}

const main = async (source, output) => 
{
  console.log(chalk.blue('\nStarting transformation...'))
  
  // Get all markdown files
  const files = await glob(`${source}/**/*.md`)
  const allArticles = new Set()
  const allAssets = new Set()
  
  // Process all markdown files
  for (const file of files) 
  {
    // Copy & transform markdown to destination
    const result = await transferMarkdown(file, source, output)
    if (!result) continue
    
    allArticles.add(result.path)
    console.log(chalk.gray(`Processed: ${path.relative(output, result.path)}`))
  }
  console.log(chalk.cyan('All markdown files processed successfully'))


  // Generate index files & transfer assets for each language
  const langs = (await fs.readdir(output, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  console.log('');
  
  // Tunggu semua generateIndexFiles selesai
  await Promise.all(langs.map(lang => generateIndexFiles(output, lang)))
  console.log(chalk.cyan('All Index files generated successfully\n'))

  // Tunggu semua transferAssets selesai
  await Promise.all(langs.map(lang => transferAssets(source, output, lang, allAssets)))
  console.log(chalk.cyan('All assets copied successfully'))

  console.log('');


  // Validate all files
  const results = []

  for (const article of allArticles)
  {
    // Read and parse the file
    const content = await fs.readFile(article, 'utf8')
    const { data: frontmatter, content: mdContent } = matter(content)

    // Validate frontmatter and links
    const fmValidation = validateFrontmatter(frontmatter)
    const linkValidation = validateImgLinks(mdContent, article, allAssets)

    results.push({
      path: article,
      valid: fmValidation.valid && linkValidation.valid,
      errors: [
        ...fmValidation.errors.map(e => `Frontmatter: ${e}`),
        ...linkValidation.errors.map(e => `Image link: ${e}`)
      ]
    });
  }


  // Print results
  const valid = results.filter(r => r.valid)
  const invalid = results.filter(r => !r.valid)

  console.log(chalk.green(`\nValid articles (${valid.length}):`))
  valid.forEach(v => console.log(`- ${path.relative(output, v.path)}`))

  if (invalid.length) 
  {
    console.log(chalk.red(`\nInvalid articles (${invalid.length}):`))
    invalid.forEach(({ path: p, errors }) => 
    {
      console.log(`- ${path.relative(output, p)}`)
      errors.forEach(e => console.log(`  ${chalk.red('!')} ${chalk.yellow(e)}`))
    })
  }

  console.log(chalk.green(`\nTotal articles processed: ${results.length}`))
}

// Ambil source dan destination dari command line
const [,, sourceArg, destArg] = process.argv

if (!sourceArg || !destArg) 
{
  console.log(chalk.yellow('Usage: node copy_content.js <source_dir> <destination_dir>'))
  process.exit(1)
}
main(sourceArg, destArg).catch(console.error)