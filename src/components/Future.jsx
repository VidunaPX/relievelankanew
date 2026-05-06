import React from 'react';
import '../styleCompants/Future.css';

const Future = () => {
  const futureInitiatives = [
    {
      icon: 'fa-shield-halved',
      title: 'Flood-Resilient Schools',
      description: 'Elevated structures with drainage systems designed for 50-year flood events'
    },
    {
      icon: 'fa-people-group',
      title: 'Community Response Teams',
      description: '500+ trained volunteers across 12 districts for rapid local response'
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Education Endowment',
      description: 'Long-term fund ensuring no student drops out due to disaster-related poverty'
    }
  ];

  return (
    <section id="future" className="flex items-center relative" style={{ minHeight: '100vh' }}>
      <div className="section-content max-w-4xl mx-auto px-6 py-24 text-center w-full">
        <span className="inline-block text-xs uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.04)' }}>
          <i className="fa-solid fa-sun mr-1"></i> The Future
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-white mb-6 leading-tight">
          Sustainable Recovery.<br />
          <span style={{ color: 'var(--gold)' }}>A Forest That Keeps Growing.</span>
        </h2>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: 'rgba(214,207,194,0.45)' }}>
          Beyond emergency relief, we're building flood-resistant infrastructure, training community disaster response teams, and establishing education endowments. The forest doesn't stop growing — and neither does our commitment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {futureInitiatives.map((initiative, index) => (
            <div key={index} className="stat-card text-center">
              <i className={`fa-solid ${initiative.icon} text-2xl mb-3`} style={{ color: 'var(--gold)' }}></i>
              <div className="text-sm font-medium text-white mb-1">{initiative.title}</div>
              <div className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>{initiative.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Future;
