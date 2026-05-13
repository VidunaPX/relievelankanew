
import React from 'react';
import '../styleCompants/AboutUs.css';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Viduna Pilanthange',
      role: 'Founder',
      icon: 'fa-stethoscope',
      image: 'vidunaimage.png',
      bio: '15+ years in humanitarian relief. Former UN coordinator specializing in disaster response and community resilience programs.'
    },
    {
      name: 'Deepaka Wickramasekara',
      role: 'Program Director',
      icon: 'fa-hands-holding-child',
      image: 'deepimage.png',
      bio: 'Education specialist focused on learning continuity. Led 50+ school rebuilding projects across South Asia with innovative approaches.'
    },
    {
      name: 'Jaynil Patel',
      role: 'Water & Sanitation Lead',
      icon: 'fa-droplet',
      image: 'https://picsum.photos/seed/team3/300/300.jpg',
      bio: 'Environmental engineer with expertise in water systems. Designed and implemented 200+ clean water solutions in disaster zones.'
    },
    {
      name: 'Joshitaa ',
      role: 'Operations Manager',
      icon: 'fa-chart-line',
      image: 'https://picsum.photos/seed/team4/300/300.jpg',
      bio: 'Logistics and supply chain expert. Coordinated relief efforts for 12 major disasters, ensuring efficient resource distribution.'
    }
  ];

  return (
    <section id="about" className="flex items-center relative" style={{ minHeight: '100vh' }}>
      <div className="section-content max-w-6xl mx-auto px-6 py-24 text-center w-full">
        <span className="inline-block text-xs uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ color: 'var(--accent)', border: '1px solid rgba(74,155,110,0.25)', background: 'rgba(74,155,110,0.04)' }}>
          <i className="fa-solid fa-users mr-1"></i> About Us
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-white mb-6 leading-tight">
          The Team Behind<br />
          <span style={{ color: 'var(--accent-bright)' }}>The Recovery</span>
        </h2>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-16" style={{ color: 'rgba(214,207,194,0.45)' }}>
          Dedicated professionals united by a single mission: restoring hope and rebuilding communities across Sri Lanka. Each member brings unique expertise to create lasting change.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="relative mb-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-3" 
                  style={{ borderColor: 'var(--accent)', filter: 'brightness(0.9) saturate(0.8)' }}
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center" 
                  style={{ background: 'var(--accent)', color: 'white' }}>
                  <i className={`fa-solid ${member.icon} text-xs`}></i>
                </div>
              </div>
              <h3 className="font-display text-xl text-white mb-2">{member.name}</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--accent-bright)' }}>{member.role}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(214,207,194,0.35)' }}>
                {member.bio}
              </p>
              <div className="flex justify-center gap-3 mt-4">
                <a 
                  href="#" 
                  style={{ color: 'rgba(214,207,194,0.25)', transition: 'color 0.3s' }} 
                  onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                  onMouseOut={(e) => e.target.style.color = 'rgba(214,207,194,0.25)'}
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin text-sm"></i>
                </a>
                <a 
                  href="#" 
                  style={{ color: 'rgba(214,207,194,0.25)', transition: 'color 0.3s' }} 
                  onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                  onMouseOut={(e) => e.target.style.color = 'rgba(214,207,194,0.25)'}
                  aria-label="Twitter"
                >
                  <i className="fa-brands fa-x-twitter text-sm"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm" style={{ color: 'rgba(214,207,194,0.25)' }}>
            <i className="fa-solid fa-heart text-xs mr-1" style={{ color: 'var(--accent)' }}></i>
            Together, we've rebuilt 89 schools and restored hope to over 180,000 families
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
