import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, GraduationCap, School, Bus } from "lucide-react";
import '../styleCompants/DonationHoriz.css';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { x: 0.08, y: 0.82, amount: "$0", label: "The journey begins" },
  { x: 0.3, y: 0.66, amount: "$2,500", label: "School supplies", icon: GraduationCap },
  { x: 0.52, y: 0.5, amount: "$5,000", label: "Rebuilt classroom", icon: School },
  { x: 0.72, y: 0.34, amount: "$7,500", label: "Teacher support", icon: BookOpen },
  { x: 0.9, y: 0.16, amount: "$10,000", label: "Community Library", icon: BookOpen },
];

const DonationHoriz = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const busRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const getMetrics = () => ({
        distance: Math.max(trackRef.current.scrollWidth - window.innerWidth, 1),
        trackW: trackRef.current.scrollWidth,
        vh: window.innerHeight
      });

      const update = (p) => {
        const { distance, trackW, vh } = getMetrics();
        gsap.set(trackRef.current, { x: -distance * p });
        
        const seg = p * (MILESTONES.length - 1);
        const i = Math.min(Math.floor(seg), MILESTONES.length - 2);
        const t = seg - i;
        const a = MILESTONES[i], b = MILESTONES[i + 1];
        
        const x = (a.x + (b.x - a.x) * t) * trackW;
        const y = (a.y + (b.y - a.y) * t) * vh;
        const angle = Math.atan2((b.y - a.y) * vh, (b.x - a.x) * trackW) * (180 / Math.PI);
        
        gsap.set(busRef.current, { x, y: y - 20, rotation: angle });
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getMetrics().distance}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => update(self.progress)
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="donation-section"
      style={{ backgroundColor: 'var(--dark-blue)', color: '#f8fbff' }}
    >
      {/* Header Overlay */}
      <div className="absolute inset-x-0 top-0 z-20 p-8">
        <h2 className="font-serif text-4xl font-bold text-white">Goals & Objectives</h2>
      </div>
      
      <div ref={trackRef} className="track-container">
        <svg className="track-path" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,100 L8,82 C18,74 22,70 30,66 C40,60 44,56 52,50 C62,42 66,40 72,34 C80,26 84,22 90,16 L100,10 L100,100 Z"
            fill="#d9d9d9"
          />
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