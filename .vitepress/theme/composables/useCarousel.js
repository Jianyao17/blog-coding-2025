import { ref, computed, onMounted, onUnmounted } from 'vue'

export const useCarousel = (layout) => 
{
  const carousel = ref(null)
  const scrollPos = ref(-1)
  const scrollAmount = 400

  const showPrev = computed(() => UpdateVisibility(true))
  const showNext = computed(() => UpdateVisibility(false))

  const UpdateVisibility = (isPrev) => 
  {
    if (!carousel.value || layout !== 'scroll') return false

    const { scrollWidth, clientWidth } = carousel.value
    return isPrev ? scrollPos.value > 0 : scrollPos.value + clientWidth < scrollWidth
  };

  const scroll = (direction) => 
  {
    carousel.value?.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => scrollPos.value = carousel.value?.scrollLeft

  onMounted(() => carousel.value?.addEventListener('scroll', handleScroll))
  onUnmounted(() => carousel.value?.removeEventListener('scroll', handleScroll))

  return { carousel, showPrev, showNext, scroll };
};