import React, { useState, useEffect, useRef } from 'react';
import '../styleCompants/Donate.css';

const Donate = ({ onDonation, funding = 0, goal = 50000, donors = 0}) => {
  const [customAmount, setCustomAmount] = useState('');
  const [fundPercent, setFundPercent] = useState(0);
  const progressRingRef = useRef(null);
  const milestoneMarkersRef = useRef(null);

  useEffect(() => {
    const percentage = Math.min((funding / goal) * 100, 100);
    setFundPercent(Math.round(percentage));
    updateProgressRing(percentage);
    updateMilestones(percentage);
  }, [funding, goal]);

  const updateProgressRing = (percentage) => {
    if (progressRingRef.current) {
      const circumference = 2 * Math.PI * 213.75;
      const offset = circumference - (percentage / 100) * circumference;
      progressRingRef.current.style.strokeDashoffset = offset;
    }
  };

  const updateMilestones = (percentage) => {
    if (milestoneMarkersRef.current) {
      const markers = milestoneMarkersRef.current.querySelectorAll('.milestone-marker');
      markers.forEach(marker => {
        const progress = parseFloat(marker.dataset.progress);
        if (percentage >= progress) {
          marker.classList.add('achieved');
        } else {
          marker.classList.remove('achieved');
        }
      });
    }
  };

  useEffect(() => {
    const canvas = document.getElementById('waterfallCanvas');
    if (!canvas) return;

    const getViewportHeight = () => window.visualViewport?.height || window.innerHeight;

    canvas.style.transition = 'opacity 420ms ease, top 420ms ease';
    canvas.style.pointerEvents = 'none';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = `${getViewportHeight()}px`;
    canvas.style.top = '0';

    const updateCanvasBounds = () => {
      const donateEl = document.getElementById('donate');
      if (!donateEl) return;
      const rect = donateEl.getBoundingClientRect();
      const viewportHeight = getViewportHeight();
      const isVisible = rect.top < viewportHeight && rect.bottom > 0;

      canvas.style.opacity = isVisible ? '1' : '0';
      canvas.style.height = `${viewportHeight}px`;
    };

    updateCanvasBounds();
    window.addEventListener('scroll', updateCanvasBounds, { passive: true });
    window.addEventListener('resize', updateCanvasBounds);
    window.visualViewport?.addEventListener('resize', updateCanvasBounds);

    return () => {
      window.removeEventListener('scroll', updateCanvasBounds);
      window.removeEventListener('resize', updateCanvasBounds);
      window.visualViewport?.removeEventListener('resize', updateCanvasBounds);
    };
  }, []);

  return (
    <section id="donate" className="flex items-center relative" style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
      <div className="section-content max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Left Panel */}
          <div className="flex flex-col items-start text-left">
            <div className="donate-hero-panel mb-10" style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(20px)' }}>
              <h2 className="font-display text-3xl md:text-5xl text-white mb-4 leading-tight">
                Be Part of the Change
              </h2>
              <p className="text-sm md:text-base max-w-xl donate-panel-copy" style={{ color: 'rgba(255,255,255,0.95)' }}>
                We're partnering with a community in the Yahangala region of Sri Lanka to ensure every child has the resources they need to learn and thrive. Your support helps provide School Recovery Kits filled with essential learning materials, empowering students and strengthening educational opportunities within the community.
              </p>
            </div>

            <div className="flex justify-start">
              <a
                href="https://gofund.me/f1c00af39"
                target="_blank"
                rel="noopener noreferrer"
                className="donate-cta inline-block"
                style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.16)', padding: '10px 18px', borderRadius: '12px', color: '#fff' }}
              >
                Donate on GoFundMe
                <i className="fa-solid fa-water ml-2 text-sm"></i>
              </a>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex justify-center md:justify-end">
            <div className="relative inline-block" style={{ background: 'rgba(0,0,0,0.65)', borderRadius: '36px', padding: '18px' }}>
              <svg width="500" height="500" viewBox="0 0 540 540" className="ring-breathing progress-ring-container" aria-label="Donation progress" style={{ background: 'black', borderRadius: '30px' }}>
                <circle cx="270" cy="270" r="247.5" fill="none" strokeWidth="1" stroke="rgba(255,255,255,0.12)" strokeDasharray="5 10"/>
                <circle cx="270" cy="270" r="236.25" fill="none" strokeWidth="1" stroke="rgba(255,255,255,0.18)" strokeDasharray="3 7"/>
                <circle cx="270" cy="270" r="213.75" fill="none" strokeWidth="18" className="progress-ring-bg" stroke="rgba(0,0,0,0.35)"/>
                <circle 
                  ref={progressRingRef}
                  cx="270" cy="270" r="213.75" fill="none" strokeWidth="18"
                  className="progress-ring-fill" strokeLinecap="round"
                  stroke="var(--dark-blue)"
                  strokeDasharray="1343.25" strokeDashoffset="1343.25"
                  transform="rotate(-90 270 270)"
                />
                <g ref={milestoneMarkersRef}>
                  <circle cx="483.75" cy="270" r="6.75" fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" className="milestone-marker" data-progress="25"/>
                  <circle cx="270" cy="56.25" r="6.75" fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" className="milestone-marker" data-progress="50"/>
                  <circle cx="56.25" cy="270" r="6.75" fill="rgba(0,0,0,0.7)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" className="milestone-marker" data-progress="75"/>
                </g>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-sans text-5xl text-white font-bold">{fundPercent}%</span>
                <span className="text-sm mt-2 font-sans" style={{ color: 'rgba(255,255,255,0.78)' }}>of phase 1 goal reached</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;