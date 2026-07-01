import React, { useState, useEffect, useRef } from 'react';
import '../styleCompants/Donate.css';

const Donate = ({ onDonation, funding = 0, goal = 50000, donors = 0 }) => {
  const [customAmount, setCustomAmount] = useState('');
  const [fundPercent, setFundPercent] = useState(0);
  const progressRingRef = useRef(null);
  const milestoneMarkersRef = useRef(null);
  const ringParticlesRef = useRef(null);

  useEffect(() => {
    const percentage = Math.min((funding / goal) * 100, 100);
    setFundPercent(Math.round(percentage));
    updateProgressRing(percentage);
    updateMilestones(percentage);
  }, [funding, goal]);

  useEffect(() => {
    const interval = setInterval(createRingParticle, 1400);
    return () => clearInterval(interval);
  }, []);

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

  const createRingParticle = () => {
    if (ringParticlesRef.current) {
      const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      particle.setAttribute('cx', 270);
      particle.setAttribute('cy', 270);
      particle.setAttribute('r', 2);
      particle.classList.add('ring-particle');

      const angle = Math.random() * Math.PI * 2;
      const distance = 213.75;
      const endX = 270 + Math.cos(angle) * distance;
      const endY = 270 + Math.sin(angle) * distance;
      particle.style.transition = 'all 2s ease-out';

      ringParticlesRef.current.appendChild(particle);

      setTimeout(() => {
        particle.setAttribute('cx', endX);
        particle.setAttribute('cy', endY);
        particle.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        if (ringParticlesRef.current.contains(particle)) {
          ringParticlesRef.current.removeChild(particle);
        }
      }, 2000);
    }
  };

  const processDonation = () => {
    const amount = customAmount;
    if (amount && amount > 0) {
      onDonation(parseFloat(amount));
      setCustomAmount('');
      showToast(`Thank you for your $${amount} donation!`);
    }
  };

  const showToast = (message) => {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  };

  const triggerRippleFlash = () => {
    const rippleFlash = document.getElementById('rippleFlash');
    if (rippleFlash) {
      rippleFlash.classList.add('active');
      setTimeout(() => {
        rippleFlash.classList.remove('active');
      }, 150);
    }
  };

  return (
    <section id="donate" className="flex items-center relative" style={{ minHeight: '100vh' }}>
      <div className="section-content max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="text-left">
            <h2 className="font-display text-3xl md:text-5xl text-white mb-4 leading-tight">
              Fund a Future
            </h2>
            <p className="text-sm md:text-base mb-10 max-w-xl" style={{ color: 'rgba(214,207,194,0.45)' }}>
              Donate to us at our GoFundMe!
            </p>

            
            <button 
              className="donate-cta" 
              onClick={() => {
                processDonation();
                triggerRippleFlash();
              }}
            >
              Donate Now
              <i className="fa-solid fa-water ml-2 text-sm"></i>
            </button>

            
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative inline-block">
              <svg width="500" height="500" viewBox="0 0 540 540" className="ring-breathing progress-ring-container" aria-label="Donation progress">
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A9B6E"/>
                    <stop offset="50%" stopColor="var(--accent-bright)"/>
                    <stop offset="100%" stopColor="#8FE4A6"/>
                  </linearGradient>
                  <linearGradient id="ringGradientDanger" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C9A84C"/>
                    <stop offset="100%" stopColor="#E6C75C"/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <circle cx="270" cy="270" r="247.5" fill="none" strokeWidth="1" stroke="rgba(74,155,110,0.1)" strokeDasharray="5 10"/>
                <circle cx="270" cy="270" r="236.25" fill="none" strokeWidth="1" stroke="rgba(74,155,110,0.15)" strokeDasharray="3 7"/>
                <circle cx="270" cy="270" r="213.75" fill="none" strokeWidth="18" className="progress-ring-bg"/>
                <circle 
                  ref={progressRingRef}
                  cx="270" cy="270" r="213.75" fill="none" strokeWidth="18"
                  className="progress-ring-fill" strokeLinecap="round"
                  strokeDasharray="1343.25" strokeDashoffset="1343.25"
                  transform="rotate(-90 270 270)" filter="url(#glow)"
                />
                <g ref={milestoneMarkersRef}>
                  <circle cx="483.75" cy="270" r="6.75" fill="rgba(255,255,255,0.3)" className="milestone-marker" data-progress="25"/>
                  <circle cx="270" cy="56.25" r="6.75" fill="rgba(255,255,255,0.3)" className="milestone-marker" data-progress="50"/>
                  <circle cx="56.25" cy="270" r="6.75" fill="rgba(255,255,255,0.3)" className="milestone-marker" data-progress="75"/>
                </g>
                <g ref={ringParticlesRef}></g>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-display text-5xl text-white">{fundPercent}%</span>
                <span className="text-sm mt-2" style={{ color: 'rgba(214,207,194,0.4)' }}>of goal reached</span>
              </div>

              <div className="absolute -top-4 -right-4 stat-float-card">
                <div className="text-right">
                  <span className="font-display text-xl text-white">${funding.toLocaleString()}</span>
                  <p className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>raised</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 stat-float-card">
                <div className="text-left">
                  <span className="font-display text-xl" style={{ color: 'rgba(214,207,194,0.5)' }}>${goal.toLocaleString()}</span>
                  <p className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>goal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
