import React, { useState, useEffect, useRef } from 'react';
import '../styleCompants/Hero.css';
import "../styles/global.css"
import myVideo from '/hero_video.mp4';
import { smoothScrollToId } from '../utils/smoothScroll';

const NAV_ITEMS = [
  { label: 'What We Tackle', id: 'crisis' },
  { label: 'Goals & Objectives', id: 'goals' },
  { label: 'Our Work', id: 'impact' },
  { label: 'Donate', id: 'donate' },
];

const Hero = ({ onShowDonationDetails }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const menuRef = useRef(null);
  const lastScrollY = useRef(0);
  const navVisibleRef = useRef(true);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const scrollUpThreshold = 12;
    const scrollDownThreshold = 8;
    const topRevealOffset = 80;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      let nextVisible = navVisibleRef.current;

      if (currentY <= topRevealOffset) {
        nextVisible = true;
      } else if (delta > scrollDownThreshold) {
        nextVisible = false;
        if (menuOpenRef.current) setMenuOpen(false);
      } else if (delta < -scrollUpThreshold) {
        nextVisible = true;
      }

      if (nextVisible !== navVisibleRef.current) {
        navVisibleRef.current = nextVisible;
        setNavVisible(nextVisible);
      }

      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (elementId) => {
    setMenuOpen(false);
    setNavVisible(true);
    smoothScrollToId(elementId, { offset: 24 });
    lastScrollY.current = window.scrollY;
  };

  return (
    <section id="hero" className="relative">
      <div className="hero-video-shell">
        <div className="video-background">
          <img className="video-logo" src="/relieveLankalogo.png" alt="Relieve Lanka logo" />

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

      <div
        ref={menuRef}
        className={`video-nav video-nav--floating${navVisible ? ' video-nav--visible' : ' video-nav--hidden'}`}
      >
        <button
          className="hamburger-button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
        {menuOpen && (
          <div className="video-menu">
            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;