import { ref, onMounted } from 'vue'

export const useCarousel = (layout) => 
{
  const carousel = ref(null);
  const showPrev = ref(false);
  const showNext = ref(false);
  const scrollAmount = 400;

  const handleScroll = () => 
  {
    if (!carousel.value) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel.value;
    showPrev.value = scrollLeft > 0;
    showNext.value = scrollLeft + clientWidth < scrollWidth;
  };

  const scroll = (direction) => 
  {
    carousel.value?.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
    handleScroll();
  };

  const handleWheel = (e) => 
  {
    if (!carousel.value || layout.value !== 'scroll') return;

    e.preventDefault();
    carousel.value.scrollBy({ left: e.deltaY > 0 ? 400 : -400, behavior: 'smooth' });
    handleScroll();
  };

  onMounted(handleScroll);
  return { carousel, showPrev, showNext, scroll, handleWheel };
};