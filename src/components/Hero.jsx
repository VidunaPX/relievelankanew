import React, { useState, useEffect, useRef } from 'react';
import '../styleCompants/Hero.css';
import "../styles/global.css"
import myVideo from '../assets/hero_video.mp4';

const Hero = ({ onShowDonationDetails }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen">
      <div className="hero-video-shell">
        <div className="video-background">
          <img className="video-logo" src="/relieveLankalogo.png" alt="Relieve Lanka logo" />
          
          <div className="video-nav" ref={menuRef}>
            <button className="hamburger-button" onClick={() => setMenuOpen(!menuOpen)}>
              <span></span><span></span><span></span>
            </button>
            {menuOpen && (
              <div className="video-menu">
                <button onClick={() => { smoothScrollTo('Crisis'); setMenuOpen(false); }}>Crisis</button>
                <button onClick={() => { smoothScrollTo('Solution'); setMenuOpen(false); }}>Solution</button>
                <button onClick={() => { smoothScrollTo('Fund'); setMenuOpen(false); }}>Fund</button>
                <button onClick={() => { smoothScrollTo('Our Projects'); setMenuOpen(false); }}>Our Projects</button>
              </div>
            )}
          </div>
          
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src={myVideo} type="video/mp4" />
          </video>
          
          <div className="hero-content">
            <h1 className="hero-title"> Ensuring potential is defined by intellect, not circumstance</h1>
            <div className="cta-wrapper">
              <button className="cta-button-white" onClick={onShowDonationDetails}>
                  Donate 
              </button>
              <p className="cta-text">
                 to save a future.
           </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;