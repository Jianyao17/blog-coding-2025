import { join, relative, extname, parse } from 'path'
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import appConfig from '../app.config'


const blogDir = appConfig.sourceDir
const outputDir = appConfig.outputDir

const isExcludeFolder = (path) => 
  appConfig.excludeFolder.some(stirng => path.includes(stirng))


export function CopyAssetsToBuild() 
{
  const items = readdirSync(blogDir, { withFileTypes: true, recursive: true })
  for (const item of items)
  {
    // skip jika file sebuah markdown, sebuah directory, dan termasuk folder diabaikan
    if (extname(item.name) === '.md' || isExcludeFolder(item.parentPath) || item.isDirectory()) 
      continue
    
    // copy asset ke path tujuan
    const assetInPath = join(item.parentPath, item.name)
    const assetOutPath = join(outputDir, relative(blogDir, assetInPath))
    
    // Buat directory jika tidak ada
    if (!existsSync(parse(assetOutPath).dir)) 
      mkdirSync(parse(assetOutPath).dir, { recursive: true })

    copyFileSync(assetInPath, assetOutPath)
    console.log('Copied Asset: ', assetInPath);
  }
  console.log('All assets have been copied\n');
}