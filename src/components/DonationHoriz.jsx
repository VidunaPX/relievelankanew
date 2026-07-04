import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, GraduationCap, School, Bus, Library, TrendingUp } from "lucide-react";
import '../styleCompants/DonationHoriz.css';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { x: 0.08, y: 0.82, amount: "$0", label: "Start", title: "Journey Start", desc: "Every journey begins with a step.", icon: Bus, context: "Initial Phase" },
  { x: 0.3, y: 0.66, amount: "$2,500", label: "Supplies", title: "Supplies", desc: "euwajdajidwadjajdadhjwiadadiahdahjdoadhawhdwiakdawhdiadawdabdabdabwdwadhwuiehehoewdajdbwbdudghadhalikd.", icon: GraduationCap, context: "Preparation" },
  { x: 0.52, y: 0.5, amount: "$5,000", label: "Classroom", title: "Classroom", desc: "Renovating the learning hub.", icon: School, context: "Infrastructure" },
  { x: 0.72, y: 0.34, amount: "$7,500", label: "Support", title: "Support", desc: "Training for our educators.", icon: BookOpen, context: "Empowerment" },
  { x: 0.9, y: 0.16, amount: "$10,000", label: "Library", title: "Library", desc: "A sanctuary for knowledge.", icon: Library, context: "Legacy" },
];

const DonationHoriz = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const busRef = useRef(null);
  const mountainsRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const getMetrics = () => {
        const vh = window.innerHeight;
        return {
          distance: Math.max(trackRef.current.scrollWidth - window.innerWidth, 1),
          trackW: trackRef.current.scrollWidth,
          vh: vh,
          mountainOffsetY: Math.max(vh * -0.25, -120)
        };
      };

      const setBusPosition = (progress = 0) => {
        const p = Math.min(Math.max(progress, 0), 1);
        const { distance, trackW, vh } = getMetrics();
        const seg = p * (MILESTONES.length - 1);
        const i = Math.min(Math.floor(seg), MILESTONES.length - 2);
        const t = seg - i;
        const a = MILESTONES[i], b = MILESTONES[i + 1];

        setActiveIdx(Math.min(Math.floor(p * MILESTONES.length), MILESTONES.length - 1));
        gsap.set(trackRef.current, { x: -distance * p });
        gsap.set(busRef.current, {
          x: (a.x + (b.x - a.x) * t) * trackW,
          y: (a.y + (b.y - a.y) * t) * vh - 20,
          rotation: Math.atan2((b.y - a.y) * vh, (b.x - a.x) * trackW) * (180 / Math.PI),
          autoAlpha: 1
        });
      };

      setBusPosition(0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getMetrics().distance + 1000}`,
        pin: true,
        scrub: 1,
        onRefresh: (self) => setBusPosition(self.progress),
        onUpdate: (self) => {
          setBusPosition(self.progress);
          const p = self.progress;
          const { distance, trackW, vh, mountainOffsetY } = getMetrics();
          setActiveIdx(Math.min(Math.floor(p * MILESTONES.length), MILESTONES.length - 1));
          gsap.set(trackRef.current, { x: -distance * p });
          gsap.set(mountainsRef.current, { x: -distance * p * 0.06, y: mountainOffsetY });
          const seg = p * (MILESTONES.length - 1);
          const i = Math.min(Math.floor(seg), MILESTONES.length - 2);
          const t = seg - i;
          const a = MILESTONES[i], b = MILESTONES[i + 1];
          gsap.set(busRef.current, { 
            x: (a.x + (b.x - a.x) * t) * trackW, 
            y: (a.y + (b.y - a.y) * t) * vh - 20, 
            rotation: Math.atan2((b.y - a.y) * vh, (b.x - a.x) * trackW) * (180 / Math.PI) 
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="donation-section" style={{ backgroundColor: 'var(--dark-blue)', color: '#f8fbff' }}>
      <div className="donation-bottom-stack">
        <div className="donation-content-row">
          <div className="donation-context-panel">
            {MILESTONES.map((m, idx) => (
              <div key={m.context} className={`p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 transition-opacity duration-500 ${idx === activeIdx ? "opacity-100" : "opacity-0 absolute inset-0"}`}>
                <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-xs mb-1">
                  <TrendingUp size={14} /> {m.context}
                </div>
                <p className="text-sm italic opacity-80">"{m.desc}"</p>
              </div>
            ))}
          </div>

          <div className="donation-right-column">
            <div className="donation-heading-panel">
              <h2 className="font-serif text-4xl font-bold text-white">Goals & Objectives</h2>
            </div>

            <div className="donation-detail-panel">
              {MILESTONES.map((m, idx) => {
                const isActive = idx === activeIdx || (activeIdx === MILESTONES.length - 1 && idx === MILESTONES.length - 1);
                return (
                  <div key={m.amount} className={`absolute inset-0 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 transition-all duration-500 w-full ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                    <m.icon className="size-8 mb-3 text-blue-300" />
                    <h3 className="text-2xl font-bold">{m.amount}</h3>
                    <p className="font-semibold text-lg">{m.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div ref={mountainsRef} className="donation-mountains" aria-hidden="true">
        <svg viewBox="0 0 100 120" preserveAspectRatio="none">
          <path d="M0,30 L8,74 L16,82 L24,61 L33,73 L40,54 L49,67 L58,41 L68,58 L78,38 L86,50 L94,27 L100,60 L100,120 L0,120 Z" fill="rgba(8, 28, 54, 0.9)" />
          <path d="M0,30 L10,81 L18,90 L26,70 L35,83 L44,63 L53,76 L63,53 L73,70 L84,44 L92,55 L100,60 L100,120 L0,120 Z" fill="rgba(5, 20, 42, 0.95)" />
        </svg>
      </div>

      <div ref={trackRef} className="track-container" style={{ width: '200%' }}>
        <svg className="track-path" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 L8,82 C18,74 22,70 30,66 C40,60 44,56 52,50 C62,42 66,40 72,34 C80,26 84,22 90,16 L100,10 L100,100 Z" fill="#d9d9d9" />
        </svg>

        {MILESTONES.map((m) => (
          <div key={m.amount} className="milestone-marker" style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%` }}>
             <div className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full">{m.amount}</div>
             <div className="text-xs opacity-75">{m.label}</div>
          </div>
        ))}

        <div ref={busRef} className="bus-icon-wrapper">
          <Bus className="size-6" />
        </div>
      </div>
    </section>
  );
};

export default DonationHoriz;