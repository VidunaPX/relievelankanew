import { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styleCompants/Timeline.css';
import {
  DONATION_MILESTONES,
  DEFAULT_JOURNEY_GOAL,
} from '../config/donationMilestones';

gsap.registerPlugin(ScrollTrigger);

const HILL_PATH =
  'M 110 430 C 210 410, 290 350, 370 290 S 530 160, 620 95 S 700 55, 760 45';

const VIEWBOX = { width: 900, height: 520 };

const formatAmount = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const svgPointToStage = (svg, pathPoint, stage) => {
  const point = svg.createSVGPoint();
  point.x = pathPoint.x;
  point.y = pathPoint.y;
  const matrix = svg.getScreenCTM();
  const stageRect = stage.getBoundingClientRect();

  if (!matrix) {
    return { x: 0, y: 0 };
  }

  const transformed = point.matrixTransform(matrix);
  return {
    x: transformed.x - stageRect.left,
    y: transformed.y - stageRect.top,
  };
};

const BusIcon = () => (
  <svg
    className="donation-journey__bus-svg"
    viewBox="0 0 64 40"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="4" y="12" width="52" height="20" rx="4" fill="#f4d03f" />
    <rect x="8" y="16" width="12" height="8" rx="1.5" fill="#dff6ff" />
    <rect x="24" y="16" width="12" height="8" rx="1.5" fill="#dff6ff" />
    <rect x="40" y="16" width="10" height="8" rx="1.5" fill="#dff6ff" />
    <circle cx="18" cy="32" r="5" fill="#1a1a1a" />
    <circle cx="46" cy="32" r="5" fill="#1a1a1a" />
    <rect x="52" y="18" width="6" height="6" rx="1" fill="#ffb347" />
  </svg>
);

const DonationJourney = ({
  milestones = DONATION_MILESTONES,
  sectionId = 'timeline',
  headerTitle = 'GOALS AND OBJECTIVES',
  goalAmount = DEFAULT_JOURNEY_GOAL,
  scrollDistance = 2800,
}) => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const busRef = useRef(null);
  const destinationRef = useRef(null);
  const amountRef = useRef(null);
  const progressFillRef = useRef(null);
  const milestoneRefs = useRef([]);
  const markerRefs = useRef([]);
  const scrollTriggerRef = useRef(null);

  const safeMilestones = milestones?.length ? milestones : DONATION_MILESTONES;

  const cardMilestones = useMemo(
    () => safeMilestones.filter((milestone) => !milestone.isDestination && milestone.progress > 0),
    [safeMilestones],
  );

  const destinationMilestone = useMemo(
    () =>
      safeMilestones.find((milestone) => milestone.isDestination) ??
      safeMilestones[safeMilestones.length - 1],
    [safeMilestones],
  );

  const cardMilestonesRef = useRef(cardMilestones);
  cardMilestonesRef.current = cardMilestones;

  const goalAmountRef = useRef(goalAmount);
  goalAmountRef.current = goalAmount;

  const applyBusPosition = (progress) => {
    const path = pathRef.current;
    const svg = svgRef.current;
    const stage = stageRef.current;
    const bus = busRef.current;

    if (!path || !svg || !stage || !bus) return;

    const clamped = Math.min(Math.max(progress, 0), 1);
    const totalLength = path.getTotalLength();
    const distance = totalLength * clamped;
    const point = path.getPointAtLength(distance);
    const lookAhead = path.getPointAtLength(Math.min(distance + 2, totalLength));
    const angle =
      Math.atan2(lookAhead.y - point.y, lookAhead.x - point.x) * (180 / Math.PI);
    const { x, y } = svgPointToStage(svg, point, stage);

    gsap.set(bus, { x, y, rotation: angle, xPercent: -50, yPercent: -50 });
  };

  const positionAnchoredElements = () => {
    const path = pathRef.current;
    const svg = svgRef.current;
    const stage = stageRef.current;
    const destination = destinationRef.current;

    if (!path || !svg || !stage) return;

    const totalLength = path.getTotalLength();

    cardMilestonesRef.current.forEach((milestone, index) => {
      const card = milestoneRefs.current[index];
      const marker = markerRefs.current[index];
      const point = path.getPointAtLength(totalLength * milestone.progress);
      const { x, y } = svgPointToStage(svg, point, stage);

      if (marker) {
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
      }

      if (card) {
        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
      }
    });

    if (destination) {
      const endPoint = path.getPointAtLength(totalLength);
      const { x, y } = svgPointToStage(svg, endPoint, stage);
      destination.style.left = `${x}px`;
      destination.style.top = `${y}px`;
    }
  };

  const updateProgressUi = (progress) => {
    const clamped = Math.min(Math.max(progress, 0), 1);

    if (amountRef.current) {
      amountRef.current.textContent = formatAmount(
        Math.round(clamped * goalAmountRef.current),
      );
    }

    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${clamped * 100}%`;
    }

    cardMilestonesRef.current.forEach((milestone, index) => {
      const card = milestoneRefs.current[index];
      const marker = markerRefs.current[index];
      const isReached = clamped >= milestone.progress - 0.01;
      const isActive =
        isReached &&
        (index === cardMilestonesRef.current.length - 1 ||
          clamped < cardMilestonesRef.current[index + 1].progress);

      card?.classList.toggle('milestone-card--revealed', isActive);
      card?.classList.toggle('milestone-card--active', isActive);
      marker?.classList.toggle('milestone-marker--reached', isReached);
      marker?.classList.toggle('milestone-marker--active', isActive);
    });

    destinationRef.current?.classList.toggle(
      'donation-journey__library--reached',
      clamped >= 0.98,
    );
  };

  const syncFrame = (progress) => {
    applyBusPosition(progress);
    updateProgressUi(progress);
  };

  useLayoutEffect(() => {
    positionAnchoredElements();
    syncFrame(0);
  }, [cardMilestones.length]);

  useEffect(() => {
    const section = sectionRef.current;
    const pinTarget = pinRef.current;
    const path = pathRef.current;

    if (!section || !pinTarget || !path) return;

    positionAnchoredElements();
    syncFrame(0);

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: pinTarget,
        pinSpacing: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => syncFrame(self.progress),
        onRefresh: (self) => syncFrame(self.progress),
      });
    }, section);

    const handleResize = () => {
      positionAnchoredElements();
      const progress = scrollTriggerRef.current?.progress ?? 0;
      syncFrame(progress);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [scrollDistance]);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="donation-journey"
      aria-labelledby={`${sectionId}-title`}
    >
      <div ref={pinRef} className="donation-journey__pin">
        <header className="donation-journey__header">
          <div className="donation-journey__header-copy">
            <p className="donation-journey__eyebrow">Timeline</p>
            <h2 id={`${sectionId}-title`} className="donation-journey__title">
              {headerTitle}
            </h2>
          </div>

          <div className="donation-journey__header-progress">
            <p className="donation-journey__subtitle">
              Climb from <strong>{formatAmount(0)}</strong> to{' '}
              <strong>{formatAmount(goalAmount)}</strong>
            </p>
            <div className="donation-journey__amount-track" aria-live="polite">
              <span ref={amountRef} className="donation-journey__amount">
                {formatAmount(0)}
              </span>
              <span className="donation-journey__amount-label">raised on this journey</span>
            </div>
            <div className="donation-journey__progress-rail" aria-hidden="true">
              <span ref={progressFillRef} className="donation-journey__progress-fill" />
            </div>
          </div>
        </header>

        <div ref={stageRef} className="donation-journey__stage">
          <svg
            ref={svgRef}
            className="donation-journey__svg"
            viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`${sectionId}-hillGradient`} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(52, 80, 135, 0.42)" />
                <stop offset="100%" stopColor="rgba(117, 170, 255, 0.2)" />
              </linearGradient>
              <linearGradient id={`${sectionId}-roadGradient`} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ded8a5" />
                <stop offset="100%" stopColor="#fbfacc" />
              </linearGradient>
            </defs>

            <path
              className="donation-journey__hill-fill"
              d={`${HILL_PATH} L 820 480 L 60 480 Z`}
              fill={`url(#${sectionId}-hillGradient)`}
            />
            <path
              ref={pathRef}
              id={`${sectionId}-path`}
              className="donation-journey__hill-path"
              d={HILL_PATH}
              stroke={`url(#${sectionId}-roadGradient)`}
            />
          </svg>

          <div className="donation-journey__start-label" aria-hidden="true">
            {formatAmount(0)}
          </div>

          <div
            ref={destinationRef}
            className="donation-journey__library"
            aria-label={`${formatAmount(destinationMilestone.amount)} goal: ${destinationMilestone.title}`}
          >
            <div className="donation-journey__library-icon">
              <i className="fa-solid fa-book-open" aria-hidden="true" />
            </div>
            <p className="donation-journey__library-amount">
              {formatAmount(destinationMilestone.amount)}
            </p>
            <p className="donation-journey__library-label">{destinationMilestone.title}</p>
          </div>

          <div ref={busRef} className="donation-journey__bus" aria-hidden="true">
            <BusIcon />
          </div>

          <div className="donation-journey__markers">
            {cardMilestones.map((milestone, index) => (
              <span
                key={`${milestone.id}-marker`}
                ref={(element) => {
                  markerRefs.current[index] = element;
                }}
                className="milestone-marker"
                aria-hidden="true"
              >
                {formatAmount(milestone.amount)}
              </span>
            ))}
          </div>

          <div className="donation-journey__cards">
            {cardMilestones.map((milestone, index) => (
              <article
                key={milestone.id}
                ref={(element) => {
                  milestoneRefs.current[index] = element;
                }}
                className={`milestone-card milestone-card--${milestone.side ?? 'right'}`}
                data-progress={milestone.progress}
                aria-hidden="true"
              >
                <p className="milestone-card__amount">{formatAmount(milestone.amount)}</p>
                <h3 className="milestone-card__title">{milestone.title}</h3>
                <p className="milestone-card__goal">
                  <span>Goal:</span> {milestone.goal}
                </p>
                <p className="milestone-card__fact">{milestone.fact}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationJourney;
