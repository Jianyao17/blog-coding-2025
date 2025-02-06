import { onBeforeMount, ref } from "vue";

export function useTaxonomies(fetchUrl = '/taxonomies.json')
{
  const taxonomies = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  async function LoadTaxonomies()
  {
    try {
      isLoading.value = true
      const response = await fetch(fetchUrl)

      if (!response.ok) // if response is not ok throw error
        console.error(`Failed to load taxonomies.json`)

      taxonomies.value = await response.json()
      isLoading.value = false
    } catch (e) {
      error.value = e
      console.error('Error at load taxonomies.json : ', e);
    }
  }

  onBeforeMount(LoadTaxonomies)

  return {
    LoadTaxonomies,
    taxonomies,
    isLoading,
    error
  }
}