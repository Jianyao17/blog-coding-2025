import { useData } from "vitepress"
import { computed } from "vue"


export const useLocalizationUrl = () => 
{
  const { localeIndex } = useData()
  const lang = computed(() => localeIndex.value === 'root' ? '' : `/${localeIndex.value}`)
  const localeUrl = (inUrl) => inUrl.startsWith('/') ? lang.value + inUrl : `${lang.value}/${inUrl}`

  return { localeUrl }
}