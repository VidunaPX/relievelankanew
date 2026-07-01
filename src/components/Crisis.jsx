import React, { useState, useEffect, useCallback } from 'react';
import '../styleCompants/Crisis.css';
import useEmblaCarousel from 'embla-carousel-react';

const SLIDE_DATA = [
  { title: "Header 1", desc: "Description for image 1" },
  { title: "Header 2", desc: "Description for image 2" },
  { title: "Header 3", desc: "Description for image 3" }
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
   <section id="Crisis">
    <div className="crisis-component-wrapper">
      <div className="crisis-container">
        {/* Carousel Section */}
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {SLIDE_DATA.map((_, i) => (
                <div className="embla__slide" key={i}>
                  <div className="stat-card">Image {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
          <button className="nav-btn prev" onClick={scrollPrev}>&lt;</button>
          <button className="nav-btn next" onClick={scrollNext}>&gt;</button>
        </div>
            
        {/* Text and Action Section */}
        <div className="content-section">
          <div className="text-area">
            <h2>{SLIDE_DATA[selectedIndex].title}</h2>
            <p>{SLIDE_DATA[selectedIndex].desc}</p>
          </div>
          <div className="action-area">
            <button className="primary-btn">Start Action</button>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Crisis;