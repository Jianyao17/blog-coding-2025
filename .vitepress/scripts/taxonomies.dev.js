import { GenerateTaxonomiesJSON } from './taxonomies';
import path from 'path'


export function TaxonomiesHotUpdate() 
{
  return {
    name: 'vite-plugin-taxonomyDev',
    apply: 'serve',
    handleHotUpdate({ file, server })
    {
      if (!file.endsWith('.md') && !file.startsWith('./blog')) return

      GenerateTaxonomiesJSON('./blog/public');
      console.log(`File ${path.relative('./blog', file)} has been updated`);

      // Trigger reload pada client.
      // Disini kita menggunakan full reload. Jika ingin lebih halus, bisa dibuat virtual module untuk taxonomies.
      server.ws.send({ type: 'full-reload' });
    }
  }
}