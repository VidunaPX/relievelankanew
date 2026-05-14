import React from 'react';
import '../styleCompants/Crisis.css';

const Crisis = () => {
  return (
    <section id="crisis" className="flex items-center relative" style={{ minHeight: '100vh' }}>
      <div className="section-content max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
        <div>
          {/* <span className="inline-block text-xs uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ color: '#B87A3D', border: '1px solid rgba(184,122,61,0.25)', background: 'rgba(184,122,61,0.04)' }}>
            <i className="fa-solid fa-cloud-rain mr-1"></i> The Crisis
          </span> */}
          <h2 className="font-display text-3xl md:text-5xl text-white mb-6 leading-tight">
            Schooling Disrupted.<br /> Education Paused.
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(214,207,194,0.45)' }}>
            In the wake of Cyclone Ditwah, 'free' education is no longer enough. Families living below the poverty line cannot afford the 2-3 hour journey to remaining schools or the equipment lost to the water. We target the most vulnerable students in the Mine Divisional Secretariat, providing the capital needed to overcome a system that currently filters out those without means.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card text-center">
              <div className="font-display text-2xl text-white mb-1">340+</div>
              <div className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>Schools Damaged</div>
            </div>
            <div className="stat-card text-center">
              <div className="font-display text-2xl text-white mb-1">180K</div>
              <div className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>Students Affected</div>
            </div>
            <div className="stat-card text-center">
              <div className="font-display text-2xl text-white mb-1">12</div>
              <div className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>Districts Hit</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="students_flood.jpg" 
            alt="Flood damage in Sri Lanka"
            className="rounded-2xl w-full object-cover" 
            style={{ filter: 'brightness(0.5) saturate(0.4) sepia(0.2)', border: '1px solid rgba(184,122,61,0.12)' }}
          />
          <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(to top, rgba(30,18,10,0.85), transparent 50%)' }}></div>
          <div className="absolute bottom-4 left-4 text-xs" style={{ color: 'rgba(214,207,194,0.3)' }}>
            <i className="fa-solid fa-camera mr-1"></i> Flood-affected region, 2024
          </div>
        </div>
      </div>
    </section>
  );
};

export default Crisis;
