    const imgSection = document.getElementById('img-section');
    let autoScrollTimer;
    function startAutoScroll(){
      autoScrollTimer = setInterval(() => {
        if (!imgSection) return;
        const maxScroll = imgSection.scrollWidth - imgSection.clientWidth;
        if (imgSection.scrollLeft >= maxScroll - 1) {
          imgSection.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          imgSection.scrollBy({ left: 2, behavior: 'auto' });
        }
      }, 20);
    }
    if (imgSection) {
      startAutoScroll();
      imgSection.addEventListener('mouseenter', () => clearInterval(autoScrollTimer));
      imgSection.addEventListener('mouseleave', startAutoScroll);
    }
 