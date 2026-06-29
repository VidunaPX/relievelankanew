import React from 'react';
import '../styleCompants/Hero.css';
import "../styles/global.css"

const Hero = ({ onShowDonationDetails }) => {
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="flex items-center justify-center relative" style={{ minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-6 w-full">
        <div className="text-center">
          <h1 className="hero-title font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 animate-fade-in-up">
            Relieve Lanka<br />
            <span style={{ color: 'var(--accent-bright)' }}> Different Worlds</span>
          </h1>

          <p className="text-base md:text-lg mx-auto max-w-xl mb-8 animate-fade-in-up delay-200" style={{ color: 'rgba(214,207,194,0.5)', lineHeight: '1.7' }}>
            Talent is universal. Opportunity is not. While we prepare for our futures, our peers in Sri Lanka are fighting to continue their education.
          </p>

          <div className="animate-fade-in-up delay-600 flex justify-center">
            <button 
              className="donate-cta" 
              onClick={() => smoothScrollTo('donate')} 
              aria-label="Scroll to donation section"
            >
              About our Cause
              <i className="fa-solid fa-arrow-down ml-2 text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
