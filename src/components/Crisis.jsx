import React, { useState, useEffect, useCallback } from 'react';
import '../styleCompants/Crisis.css';
import useEmblaCarousel from 'embla-carousel-react';
import image1 from '/image1.jpg';
import image2 from '/image2.jpg';
import image3 from '/image3.jpeg';

const SLIDE_DATA = [
  { title: "Interrupted Learning", desc: "School attendance in the region is inconsistent, shaped by distance, seasonal work, and household responsibilities. Gaps add up over time, and there's little support to help kids catch back up once they fall behind.", image: image1 },
  { title: "Limited Learning Materials", desc: "Books, study space, and basic supplies are scarce outside of school hours. Many kids have nowhere to read, practice, or continue learning once the school day ends.", image: image2 },
  { title: "Weather & Environmental Disruptions", desc: "The Knuckles Mountain Range brings heavy monsoon seasons and difficult terrain, which regularly disrupt school access and daily routines for families in the area.", image: image3 }
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
          </div>

          <div className="content-section">
            <div className="content-row">
              <div className="nav-panel">
                <div className="buttons-wrapper">
                  <button className="nav-btn prev" onClick={scrollPrev} aria-label="Previous slide">
                    &lt;
                  </button>
                  <button className="nav-btn next" onClick={scrollNext} aria-label="Next slide">
                    &gt;
                  </button>
                </div>
                <h3 className="content-heading">What we tackle</h3>
              </div>
              <div className="vertical-divider" aria-hidden="true" />
              <div className="text-area">
                <h2>{SLIDE_DATA[selectedIndex].title}</h2>
                <div className="desc-box">
                  <p>{SLIDE_DATA[selectedIndex].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Crisis;