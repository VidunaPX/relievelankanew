import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export function scrollToElement(element, { offset = 24 } = {}) {
  if (!element) return;

  window.scrollTo(0, resolveScrollTarget(element, offset));
  ScrollTrigger.update();
}

export function scrollToId(elementId, options = {}) {
  scrollToElement(document.getElementById(elementId), options);
}

// Keep legacy name used by existing imports.
export const smoothScrollToId = scrollToId;
export const smoothScrollToElement = scrollToElement;
