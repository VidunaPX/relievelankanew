import React, { useState } from 'react';
import '../styleCompants/Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4" style={{ background: 'linear-gradient(to bottom, rgba(8,8,6,0.85), transparent)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-white no-underline">
          <i className="fa-solid fa-leaf text-lg" style={{ color: 'var(--accent)' }}></i>
          <span className="font-display text-xl tracking-tight">Relieve Lanka</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#crisis" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('crisis'); }}>Crisis</a>
          <a href="#intervention" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('intervention'); }}>Relief</a>
          <a href="#impact" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('impact'); }}>Impact</a>
          <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('about'); }}>About</a>
          <a href="#donate" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('donate'); }}>Donate</a>
        </div>
        
        <button 
          className="md:hidden text-white text-xl" 
          onClick={toggleMobileMenu} 
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      
      <div 
        id="mobileMenu" 
        className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden mt-4 pb-4 flex-col gap-4 items-center`}
      >
        <a href="#crisis" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('crisis'); }}>Crisis</a>
        <a href="#intervention" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('intervention'); }}>Relief</a>
        <a href="#impact" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('impact'); }}>Impact</a>
        <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('about'); }}>About</a>
        <a href="#donate" className="nav-link" onClick={(e) => { e.preventDefault(); smoothScrollTo('donate'); }}>Donate</a>
      </div>
    </nav>
  );
};

export default Header;
