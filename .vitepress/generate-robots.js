import fs from 'fs'
import { join } from 'path'
import appConfig from './appConfig'

export function GenerateRobotsTxt(baseUrl) 
{
  const content = `
    User-agent: *
    Allow: /
    Sitemap: ${baseUrl}/sitemap.xml
  `.trim()

  fs.writeFileSync(join(appConfig.outputDir, 'robots.txt'), content, 'utf8')
  console.log('robots.txt generated successfully!')
}
