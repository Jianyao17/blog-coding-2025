
export const useArticleSorting = () => 
{
  const articleSortOptions = (hasOrder) => 
  [
    ...(hasOrder ? [
      { value: 'chapter-ascending',   label: 'Chapter - Ascending' },
      { value: 'chapter-descending',  label: 'Chapter - Descending' },
    ] : []),
    { value: 'title-ascending',   label: 'Title - Ascending' },
    { value: 'title-descending',  label: 'Title - Descending' },
    { value: 'date-ascending',    label: 'Date - Ascending' },
    { value: 'date-descending',   label: 'Date - Descending' },
  ];

  const dateSort = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);
  const articleSortStrategies = 
  {
    'title-ascending'   : (a, b) => a.title.localeCompare(b.title),
    'title-descending'  : (a, b) => b.title.localeCompare(a.title),
    'chapter-ascending' : (a, b) => a.order - b.order,
    'chapter-descending': (a, b) => b.order - a.order,
    'date-ascending'    : (a, b) => dateSort(a, b) || a.title.localeCompare(b.title),
    'date-descending'   : (a, b) => dateSort(b, a) || b.title.localeCompare(a.title)
  };

  const sortedItems = (items, orderBy, hasOrder) => 
  {    
    if (!hasOrder && orderBy.startsWith('chapter')) return items;
    return [...items].sort(articleSortStrategies[orderBy] || (() => 0));
  };

  return { articleSortOptions, sortedItems };
};