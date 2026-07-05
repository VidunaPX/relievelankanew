import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let activeScrollTween = null;
let scrollAnimId = 0;

const restoreScrollBehavior = (previousValue, animId) => {
  if (animId === scrollAnimId) {
    document.documentElement.style.scrollBehavior = previousValue;
  }
};

export function smoothScrollToElement(
  element,
  { offset = 24, duration = 3 } = {},
) {
  if (!element) return Promise.resolve();

  ScrollTrigger.refresh();

  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(window, {
      scrollTo: { y: element, offsetY: offset, autoKill: true },
    });
    restoreScrollBehavior(previousScrollBehavior, ++scrollAnimId);
    ScrollTrigger.update();
    return Promise.resolve();
  }

  activeScrollTween?.kill();

  const animId = ++scrollAnimId;

  return new Promise((resolve) => {
    activeScrollTween = gsap.to(window, {
      scrollTo: {
        y: element,
        offsetY: offset,
        autoKill: true,
      },
      duration,
      ease: 'power3.inOut',
      overwrite: true,
      onUpdate: () => ScrollTrigger.update(),
      onComplete: () => {
        activeScrollTween = null;
        restoreScrollBehavior(previousScrollBehavior, animId);
        ScrollTrigger.update();
        resolve();
      },
      onKill: () => {
        activeScrollTween = null;
        restoreScrollBehavior(previousScrollBehavior, animId);
        resolve();
      },
    });
  });
}

export function smoothScrollToId(elementId, options = {}) {
  return smoothScrollToElement(document.getElementById(elementId), options);
}

export function cancelSmoothScroll() {
  activeScrollTween?.kill();
  activeScrollTween = null;
}
