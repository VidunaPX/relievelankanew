import { useEffect } from 'react';

const useScrollObserver = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section-content elements
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => observer.observe(section));

    // Handle scroll-based atmosphere changes
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollY / maxScroll;
      
      const atmosphere = document.getElementById('atmosphere');
      if (atmosphere) {
        if (scrollProgress < 0.25) {
          atmosphere.style.background = 'radial-gradient(ellipse at 50% 70%, rgba(52, 80, 135, 0.18), transparent 65%)';
        } else if (scrollProgress < 0.5) {
          atmosphere.style.background = 'radial-gradient(ellipse at 50% 70%, rgba(5, 9, 86, 0.2), transparent 65%)';
        } else if (scrollProgress < 0.75) {
          atmosphere.style.background = 'radial-gradient(ellipse at 50% 70%, rgba(117, 170, 255, 0.12), transparent 65%)';
        } else {
          atmosphere.style.background = 'radial-gradient(ellipse at 50% 70%, rgba(222, 216, 165, 0.1), transparent 65%)';
        }
        atmosphere.style.opacity = '1';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      sections.forEach(section => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useScrollObserver;
