/**
 * globe-transition.ts
 *
 * Immersive zoom transition when clicking a globe location pin or list item.
 * A cyanotype-blue circle expands from the click origin, the location name
 * fades in, then Astro navigates to the destination page.
 */

import { navigate } from 'astro:transitions/client';

let isTransitioning = false;

// Reset on every page load (module is only evaluated once due to module caching)
document.addEventListener('astro:page-load', () => {
  isTransitioning = false;
});

export function triggerZoomTransition(options: {
  originX: number;
  originY: number;
  locationName: string;
  href: string;
  focusLat?: number;
  focusLng?: number;
}) {
  if (isTransitioning) return;
  isTransitioning = true;

  const { originX, originY, locationName, href, focusLat, focusLng } = options;

  // Reduced motion: navigate directly
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navigate(href);
    return;
  }

  // Spring-rotate globe to center on the location
  if (focusLat !== undefined && focusLng !== undefined) {
    (window as any).__cobeGlobeFocus?.(focusLat, focusLng);
  }

  const cx = originX.toFixed(1);
  const cy = originY.toFixed(1);

  // Expanding dark cyanotype overlay
  const overlay = document.createElement('div');
  overlay.id = 'globe-zoom-overlay';
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:10000',
    'background:#000d1f',
    `clip-path:circle(0% at ${cx}px ${cy}px)`,
    'transition:clip-path 700ms cubic-bezier(0.65,0,0.35,1)',
    'display:flex', 'align-items:center', 'justify-content:center',
    'pointer-events:none',
  ].join(';');

  // Location name label
  const label = document.createElement('span');
  label.className = 'globe-zoom__label';
  label.textContent = locationName.toUpperCase();
  label.style.cssText = 'opacity:0;transition:opacity 400ms ease 200ms';

  overlay.appendChild(label);
  document.body.appendChild(overlay);

  // Double rAF ensures CSS transition fires after first paint
  requestAnimationFrame(() => requestAnimationFrame(() => {
    overlay.style.clipPath = `circle(150% at ${cx}px ${cy}px)`;
    label.style.opacity = '1';
  }));

  // Persist overlay across Astro's DOM swap so arrival page can fade it out
  document.addEventListener('astro:before-swap', (e: any) => {
    const existing = document.getElementById('globe-zoom-overlay');
    if (existing) {
      e.newDocument.body.appendChild(existing.cloneNode(true));
    }
  }, { once: true });

  // Navigate after circle animation completes
  setTimeout(() => { navigate(href); }, 850);
}
