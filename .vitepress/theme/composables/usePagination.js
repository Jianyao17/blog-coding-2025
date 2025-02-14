import { ref, computed } from 'vue'

export const usePagination = (layout) => 
{
  const currentPage = ref(1)
  const pagination = ref(0)
  const listItems = ref([])

  function paginateItems(items, paginate) 
  {
    pagination.value = paginate
    listItems.value = items

    if (pagination.value <= 0 || layout === 'scroll') 
      return listItems.value
    
    const start = (currentPage.value - 1) * pagination.value
    const end = start + pagination.value

    return listItems.value.slice(start, end)
  }

  const totalPages = computed(() => 
  {
    if (pagination.value <= 0 || layout === 'scroll') return 0    
    return Math.ceil(listItems.value.length / pagination.value)
  })


  return {
    totalPages,
    currentPage,
    paginateItems
  }
}