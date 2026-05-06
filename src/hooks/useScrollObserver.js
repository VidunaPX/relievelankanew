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
        // Change atmosphere color based on scroll progress
        if (scrollProgress < 0.25) {
          atmosphere.style.background = 'radial-gradient(ellipse at 50% 60%, rgba(30,18,10,0.15), transparent 60%)';
        } else if (scrollProgress < 0.5) {
          atmosphere.style.background = 'radial-gradient(ellipse at 50% 60%, rgba(15,26,13,0.15), transparent 60%)';
        } else if (scrollProgress < 0.75) {
          atmosphere.style.background = 'radial-gradient(ellipse at 50% 60%, rgba(74,155,110,0.15), transparent 60%)';
        } else {
          atmosphere.style.background = 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.15), transparent 60%)';
        }
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
