import React, { useState, useEffect } from 'react';
import './styles/global.css';
import './styles/waterfall.css';

import BackgroundEffects from './components/BackgroundEffects';
import Hero from './components/Hero';
import Crisis from './components/Crisis';
import OurWork from './components/OurWork';
import AboutUs from './components/AboutUs';
import Donate from './components/Donate';
import PostSection from './components/postSection';
import DonationHoriz from './components/DonationHoriz';
import Footer from './components/Footer';

import useScrollObserver from './hooks/useScrollObserver';

const App = () => {
  const [funding, setFunding] = useState(0);
  const [donors, setDonors] = useState(0);
  const goal = 10000;

  // Initialize scroll observer
  useScrollObserver();

  // Use fixed funding and donor count
  useEffect(() => {
    setFunding(52);
    setDonors(1);
  }, []);

  const handleDonation = (amount) => {
    setFunding(prev => Math.min(prev + amount, goal));
    setDonors(prev => prev + 1);
  };

  const handleShowDonationDetails = () => {
    const donateSection = document.getElementById('donate');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Toast Notification */}
      <div
        id="toast"
        className="toast"
        role="alert"
        aria-live="polite"
      ></div>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero onShowDonationDetails={handleShowDonationDetails} />
        <PostSection />
        <Crisis />

        {/* <DonationJourney /> */}

        <DonationHoriz />

        <OurWork />

        <Donate
          onDonation={handleDonation}
          funding={funding}
          goal={goal}
          donors={donors}
        />

         {/* <AboutUs /> */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;