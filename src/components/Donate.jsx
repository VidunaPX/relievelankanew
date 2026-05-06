import React, { useState } from 'react';
import '../styleCompants/Donate.css';

const Donate = ({ onDonation }) => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');

  const donationAmounts = [
    { amount: 10, description: 'Clean water for 1 family' },
    { amount: 25, description: 'School supplies for 5 students' },
    { amount: 50, description: 'Shelter repair kit' },
    { amount: 100, description: 'Rebuild a classroom corner' },
    { amount: 250, description: 'Sponsor a student\'s year' }
  ];

  const selectAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const clearAmountSelection = () => {
    setSelectedAmount(0);
  };

  const processDonation = () => {
    const amount = customAmount || selectedAmount;
    if (amount && amount > 0) {
      onDonation(parseFloat(amount));
      // Reset form
      setSelectedAmount(0);
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
      <div className="section-content max-w-2xl mx-auto px-6 py-24 text-center w-full">
        <span className="inline-block text-xs uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ color: 'var(--accent-bright)', border: '1px solid rgba(107,203,142,0.25)', background: 'rgba(107,203,142,0.04)' }}>
          <i className="fa-solid fa-droplet mr-1"></i> Add to the Flow
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-white mb-4 leading-tight">
          Choose Your Impact
        </h2>
        <p className="text-sm mb-10" style={{ color: 'rgba(214,207,194,0.35)' }}>
          Watch the waterfall respond to your generosity in real time
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {donationAmounts.map((item, index) => (
            <button 
              key={index}
              className={`amount-btn ${selectedAmount === item.amount ? 'selected' : ''}`}
              onClick={() => selectAmount(item.amount)}
            >
              <span className="text-2xl font-display">${item.amount}</span>
              <span className="block text-xs mt-1" style={{ color: 'rgba(214,207,194,0.35)' }}>{item.description}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-sm" style={{ color: 'rgba(214,207,194,0.35)' }}>Or enter custom:</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'rgba(214,207,194,0.35)' }}>$</span>
            <input 
              id="customAmount" 
              type="number" 
              min="1" 
              max="10000" 
              placeholder="0"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                clearAmountSelection();
              }}
              className="w-28 px-3 pl-7 py-2 rounded-lg text-sm text-white text-center font-medium outline-none focus:ring-2"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', '--tw-ring-color': 'var(--accent)' }}
            />
          </div>
        </div>

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

        <p className="text-xs mt-6" style={{ color: 'rgba(214,207,194,0.2)' }}>
          <i className="fa-solid fa-lock mr-1"></i> Secure simulation — no real payment processed
        </p>
      </div>
    </section>
  );
};

export default Donate;
