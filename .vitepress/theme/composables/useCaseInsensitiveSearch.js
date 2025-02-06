
export const useCaseInsensitiveSearch = () => 
{
  const normalize = (str) => str?.toLowerCase() || '';
  const findCaseInsensitive = (obj, targetKey) => 
  {
    return Object.entries(obj || {})
      .find(([key]) => normalize(key) === normalize(targetKey))?.[1] || {};
  };
  return { normalize, findCaseInsensitive };
};