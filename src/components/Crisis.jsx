import React, { useState, useEffect, useCallback } from 'react';
import '../styleCompants/Crisis.css';
import useEmblaCarousel from 'embla-carousel-react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpeg';

const SLIDE_DATA = [
  { title: "Interrupted Learning", desc: "Students in rural Yahangala communities face disrupted education due to limited school resources and ongoing recovery challenges, making consistent learning difficult.", image: image1 },
  { title: "Limited Learning Materials", desc: "Many students do not have consistent access to basic supplies like notebooks, pens, and textbooks, which affects their ability to fully participate in class.", image: image2 },
  { title: "Weather & Environmental Disruptions", desc: "Heavy rains, landslides, and seasonal weather conditions can interrupt schooling and strain already limited local infrastructure.", image: image3 }
];

const Crisis = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect(); // Set initial state
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section id="Crisis" className="crisis-section">
      <div className="crisis-component-wrapper">
        <div className="crisis-container">
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {SLIDE_DATA.map((slide, i) => (
                  <div className="embla__slide" key={i}>
                    <div className="stat-card">
                      <img src={slide.image} alt={slide.title} className="slide-image" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="nav-btn prev" onClick={scrollPrev} aria-label="Previous slide">
              &lt;
            </button>
            <button className="nav-btn next" onClick={scrollNext} aria-label="Next slide">
              &gt;
            </button>
          </div>

          <div className="content-section">
            <div className="text-area">
              <h2>{SLIDE_DATA[selectedIndex].title}</h2>
              <p>{SLIDE_DATA[selectedIndex].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Crisis;