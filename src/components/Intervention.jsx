
import '../styleCompants/Intervention.css';

const Intervention = () => {
  const reliefItems = [
    {
      icon: 'fa-droplet',
      title: 'Student-Based Grants',
      description: 'Merit-based scholarships that cover the "hidden costs'
    },
    {
      icon: 'fa-tent',
      title: 'School Infrastructure',
      description: 'Restoring flood-damaged classrooms with 24/7 learning facilities'
    },
    {
      icon: 'fa-book-open',
      title: 'Direct Accountability',
      description: 'We use direct reimbursement and bi-weekly audits to ensure every dollar fuels academic success, not misuse'
    }
  ];

  return (
    <section id="intervention" className="flex items-center relative" style={{ minHeight: '100vh' }}>
      <div className="section-content max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
        <div className="order-2 md:order-1 relative">
          <img 
            src="https://picsum.photos/seed/lankarelief44/600/450.jpg" 
            alt="Relief supplies distribution"
            className="rounded-2xl w-full object-cover" 
            style={{ filter: 'brightness(0.6) saturate(0.6) sepia(0.1)', border: '1px solid rgba(74,155,110,0.12)' }}
          />
          <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(to top, rgba(15,26,13,0.75), transparent 50%)' }}></div>
        </div>
        <div className="order-1 md:order-2">
          {/* <span className="inline-block text-xs uppercase tracking-widest mb-4 px-3 py-1 rounded-full" style={{ color: 'var(--accent)', border: '1px solid rgba(74,155,110,0.25)', background: 'rgba(74,155,110,0.04)' }}>
            <i className="fa-solid fa-hand-holding-heart mr-1"></i> Intervention
          </span> */}

          <h2 className="font-display text-3xl md:text-5xl text-white mb-6 leading-tight">
            Precision-Based Recovery.<br />Education is the only way out..
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(214,207,194,0.45)' }}>
            Relieve Lanka was founded by Grade 11 students with a single realization: talent is universal, but opportunity is not. We don't provide generic handouts; we invest in a precision-based plan to ensure that merit remains the only determinant for success in Sri Lanka. By leveraging localized connections and a 90% fund-to-field model, we bypass traditional overhead to put your donation directly into the hands of the students who need it most.
          </p>
          <div className="space-y-4">
            {reliefItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(74,155,110,0.08)', color: 'var(--accent)' }}>
                  <i className={`fa-solid ${item.icon} text-sm`}></i>
                </div>
                <div>
                  <div className="text-sm font-medium text-white mb-0.5">{item.title}</div>
                  <div className="text-xs" style={{ color: 'rgba(214,207,194,0.35)' }}>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intervention;
