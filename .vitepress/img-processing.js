import { join, parse, relative, extname } from 'path'
import { mkdirSync, readdirSync } from 'fs'
import appConfig from './appConfig'
import sharp from 'sharp'

export const imgConfig = {
  inputDir: appConfig.sourceDir,
  outputDir: appConfig.outputDir,
  formats: appConfig.imgFormats,
}

const isImageValid = (path) => 
  appConfig.validImage.includes(extname(path).toLowerCase())

const isExcludeFolder = (path) => 
  appConfig.excludeFolder.some(stirng => path.includes(stirng))


function getImages(dir) 
{
  const items = readdirSync(dir, { withFileTypes: true, recursive: true })
  let files = []
  for (const item of items)
  {
    const imgPath = join(item.parentPath, item.name)

    // skip jika file bukan image, sebuah directory, dan termasuk folder diabaikan
    if (!isImageValid(imgPath) || isExcludeFolder(imgPath) || item.isDirectory()) continue
    files.push(relative(dir, imgPath))
  }
  return files
}


// Main Function
export function TransoformImages() 
{
  const images = getImages(imgConfig.inputDir)
  for (const img of images)
  {    
    const inPath = join(imgConfig.inputDir, img)
    const outPath = join(imgConfig.outputDir, img.replace(extname(img), ''))
    
    for (const { format, quality, sizes } of imgConfig.formats) {
      for (const size of sizes) 
      {
        processImage(inPath, outPath, 
          { format, quality, ...size })
      }
    }
  }
}

function processImage(inPath, outPath, { format, quality, width, height }) 
{
  const isGif = extname(inPath).toLowerCase() === '.gif'
  const targetFormat = isGif ? 'gif' : format
  const outputPath = `${outPath}_${width || 'auto'}x${height || 'auto'}.${targetFormat}`
  
  mkdirSync(parse(outputPath).dir, { recursive: true })
  sharp(inPath, { animated: isGif })
    .resize({ width: width, height: height, fit: 'inside', withoutEnlargement: true})
    .toFormat(targetFormat, isGif ? {} : { quality })
    .toFile(outputPath)
    .then(() => console.log('Img Transformed:', outputPath))
    .catch(err => console.error('Error:', err))
}

