import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let activeScrollTween = null;
let scrollAnimId = 0;

const isTouchDevice = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const restoreScrollBehavior = (previousValue, animId) => {
  if (animId === scrollAnimId) {
    document.documentElement.style.scrollBehavior = previousValue;
  }
};

const resolveScrollTarget = (element, offset = 24) => {
  ScrollTrigger.refresh(true);

  const pinnedTrigger = ScrollTrigger.getAll().find(
    (st) => st.trigger === element,
  );

  if (pinnedTrigger) {
    return Math.max(pinnedTrigger.start - offset, 0);
  }

  const rect = element.getBoundingClientRect();
  return Math.max(rect.top + window.scrollY - offset, 0);
};

const lockScrollInteraction = () => {
  if (!isTouchDevice()) return;

  document.documentElement.style.touchAction = 'none';
  document.body.style.touchAction = 'none';
};

const unlockScrollInteraction = () => {
  document.documentElement.style.touchAction = '';
  document.body.style.touchAction = '';
};

export function smoothScrollToElement(
  element,
  { offset = 24, duration = 3 } = {},
) {
  if (!element) return Promise.resolve();

  const targetY = resolveScrollTarget(element, offset);
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetY);
    restoreScrollBehavior(previousScrollBehavior, ++scrollAnimId);
    ScrollTrigger.update();
    return Promise.resolve();
  }

  activeScrollTween?.kill();
  lockScrollInteraction();

  const animId = ++scrollAnimId;

  return new Promise((resolve) => {
    const finish = () => {
      unlockScrollInteraction();
      activeScrollTween = null;
      restoreScrollBehavior(previousScrollBehavior, animId);
      ScrollTrigger.refresh();
      ScrollTrigger.update();
      resolve();
    };

    activeScrollTween = gsap.to(window, {
      scrollTo: {
        y: targetY,
        autoKill: false,
      },
      duration,
      ease: 'power3.inOut',
      overwrite: true,
      onUpdate: () => ScrollTrigger.update(),
      onComplete: finish,
      onKill: finish,
    });
  });
}

export function smoothScrollToId(elementId, options = {}) {
  return smoothScrollToElement(document.getElementById(elementId), options);
}

export function cancelSmoothScroll() {
  activeScrollTween?.kill();
  activeScrollTween = null;
  unlockScrollInteraction();
}
