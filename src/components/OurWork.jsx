import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styleCompants/Impact.css';
import { DEFAULT_PHASE_DATA } from '../config/phaseData';

const IMAGE_TRANSITION = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };
const CONTENT_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] };

const imageVariants = {
  initial: { opacity: 0, x: -24, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 24, scale: 0.98 },
};

const contentVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const OurWork = ({
  phases = DEFAULT_PHASE_DATA,
  sectionId = 'impact',
}) => {
  const [activePhase, setActivePhase] = useState(0);
  const safePhases = phases?.length ? phases : DEFAULT_PHASE_DATA;
  const currentPhase = safePhases[activePhase] ?? safePhases[0];

  return (
    <section
      id={sectionId}
      className="our-work"
      aria-labelledby={`${sectionId}-heading`}
      style={{ backgroundColor: '#c4c4cc' }}
    >
      <div className="our-work__inner">
        <div className="phase-section">
          <figure className="image-column">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPhase.id ?? activePhase}
                src={currentPhase.image}
                alt={currentPhase.imageAlt ?? currentPhase.title ?? 'Project evidence'}
                className="phase-image"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={IMAGE_TRANSITION}
              />
            </AnimatePresence>
          </figure>

          <div className="content-column">
            <nav className="phase-buttons" role="tablist" aria-label="Project phases">
              {safePhases.map((phase, index) => {
                const isActive = activePhase === index;

                return (
                  <button
                    key={phase.id ?? index}
                    type="button"
                    role="tab"
                    id={`${sectionId}-tab-${index}`}
                    aria-selected={isActive}
                    aria-controls={`${sectionId}-panel-${index}`}
                    className={`phase-button${isActive ? ' phase-button--active' : ''}`}
                    onClick={() => setActivePhase(index)}
                  >
                    {phase.label ?? `Phase ${index + 1}`}
                  </button>
                );
              })}
            </nav>

            <AnimatePresence mode="wait">
              <motion.article
                key={currentPhase.id ?? activePhase}
                id={`${sectionId}-panel-${activePhase}`}
                role="tabpanel"
                aria-labelledby={`${sectionId}-tab-${activePhase}`}
                className="text-area"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={CONTENT_TRANSITION}
              >
                <h2 id={`${sectionId}-heading`} className="text-area__title">
                  {currentPhase.title}
                </h2>
                <p className="text-area__desc">{currentPhase.desc}</p>
              </motion.article>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentPhase.id ?? activePhase}-cards`}
                className="social-cards"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={contentVariants}
                transition={CONTENT_TRANSITION}
              >
                {(currentPhase.socialPosts ?? []).map((post, index) => (
                  <motion.a
                    key={post.id ?? index}
                    href={post.href ?? '#'}
                    className="social-card"
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ ...CONTENT_TRANSITION, delay: index * 0.08 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="social-card__platform">{post.platform}</span>
                    <span className="social-card__label">{post.label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
