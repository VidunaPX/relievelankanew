import React from 'react';
import '../styleCompants/PostSection.css';

const phrases = [
  'Helping 100+ People',
  'From Youth, For Youth',
  'Education Over Circumstance',
  'Direct Impact, Real Results',
  'Community-Led Support'
];

const PostSection = () => {
  return (
    <section className="post-section post-carousel">
      <div className="carousel-shell" aria-live="polite">
        <div className="carousel-track" aria-hidden="true">
          {phrases.map((text, index) => (
            <div className="carousel-slide" key={`${text}-${index}`}>
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostSection;