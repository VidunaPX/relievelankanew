import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, GraduationCap, School, Bus, Library, TrendingUp } from "lucide-react";
import '../styleCompants/DonationHoriz.css';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { x: 0.08, y: 0.82, amount: "$0", label: "Start", title: "Laying the Groundwork", desc: "Confirming a local partner, meeting the communities, and getting an honest, itemized understanding of what's actually needed — so every dollar raised after this has a clear, verified purpose.", icon: Bus, context: "Initial Phase" },
  { x: 0.3, y: 0.66, amount: "$2,500", label: "1st Goal", title: "Essential Supplies", desc: "Uniforms, shoes, notebooks, and basic school supplies for the ~100 kids identified across the four villages — covering the fundamentals needed just to attend and participate.", icon: GraduationCap, context: "Phase 1" },
  { x: 0.52, y: 0.5, amount: "$5,000", label: "2nd Goal", title: "Repairing Schools", desc: "Addressing structural issues — roofing, walls, electrical — so the building itself is safe, dry, and durable through monsoon season. (Exact scope depends on an on-site assessment.)", icon: School, context: "Phase 2" },
  { x: 0.72, y: 0.34, amount: "$7,500", label: "3rd Goal", title: "Better Equipment & Resources", desc: "Proper desks, chairs, blackboards, and a small library of books — turning the classroom into a space built for real, sustained learning.", icon: BookOpen, context: "Phase 3" },
  { x: 0.9, y: 0.16, amount: "$10,000", label: "4th Goal", title: "Review & Expand", desc: "Once the first three tiers are complete, this funds an honest assessment of what worked and what didn't — then puts that model to work in a new community facing the same challenges, restarting the cycle where it's needed most.", icon: Library, context: "Phase 4" },
];

const DonationHoriz = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const busRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const getMetrics = () => ({
        distance: Math.max(trackRef.current.scrollWidth - window.innerWidth, 1),
        trackW: trackRef.current.scrollWidth,
        vh: window.innerHeight
      });

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
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="donation-section" style={{ backgroundColor: 'var(--dark-blue)', color: '#f8fbff' }}>
      <div className="donation-heading-panel absolute top-8 right-8 z-20 text-right">
        <h2 className="font-serif text-4xl font-bold text-white">Goals & Objectives</h2>
      </div>

      {/* TOP LEFT WIDE CONTEXT CARD */}
      <div className="donation-context-panel absolute top-8 left-8 z-40 w-[1000px] h-[800px]">
        {MILESTONES.map((m, idx) => (
          <div key={m.context} className={`donation-context-card p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 transition-opacity duration-500 ${idx === activeIdx ? "opacity-100 donation-card-active" : "opacity-0 pointer-events-none"}`}>
            <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-xs mb-1">
              <TrendingUp size={14} /> {m.context}
            </div>
            <p className="text-sm italic opacity-80">"{m.desc}"</p>
          </div>
        ))}
      </div>

      {/* BOTTOM RIGHT DETAIL CARDS — grid-stacked, so the box auto-sizes to the tallest card's content instead of a fixed height, and stays stable across phase changes */}
      <div className="donation-detail-panel z-40">
        {MILESTONES.map((m, idx) => {
          const isActive = idx === activeIdx || (activeIdx === MILESTONES.length - 1 && idx === MILESTONES.length - 1);
          return (
            <div key={m.amount} className={`donation-detail-card p-6 backdrop-blur-md rounded-xl border transition-all duration-500 ${isActive ? "opacity-100 translate-y-0 donation-card-active" : "opacity-0 translate-y-4 pointer-events-none"}`}>
              <m.icon className="size-8 mb-3 text-blue-300" />
              <h3 className="text-2xl font-bold">{m.amount}</h3>
              <p className="font-semibold text-lg">{m.title}</p>
            </div>
          );
        })}
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