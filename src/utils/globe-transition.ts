/**
 * globe-transition.ts
 *
 * Immersive navigation transition when clicking a globe location.
 *
 * Sequence:
 *   1. Other polaroid pins fade out
 *   2. Globe spring-rotates to center the location AND zooms in (Three.js camera)
 *   3. Dark cyanotype overlay fades in over the zoomed globe
 *   4. Location name appears
 *   5. Astro navigates to the destination page
 *   6. On the gallery page, the overlay fades out revealing the photos
 */

import { navigate } from 'astro:transitions/client';

let isTransitioning = false;

document.addEventListener('astro:page-load', () => {
  isTransitioning = false;
});

export function triggerZoomTransition(options: {
  originX: number;
  originY: number;
  locationName: string;
  href: string;
  slug?: string;
  focusLat?: number;
  focusLng?: number;
}) {
  if (isTransitioning) return;
  isTransitioning = true;

  const { locationName, href, slug, focusLat, focusLng } = options;

  // Reduced motion: skip animation entirely
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navigate(href);
    return;
  }

  // Spring-rotate globe to center on location
  if (focusLat !== undefined && focusLng !== undefined) {
    (window as any).__cobeGlobeFocus?.(focusLat, focusLng);
  }

  // Called when the Three.js zoom animation completes
  const afterZoom = () => {
    const overlay = document.createElement('div');
    overlay.id = 'globe-zoom-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:10000',
      'background:#000d1f', 'opacity:0',
      'transition:opacity 300ms ease',
      'display:flex', 'align-items:center', 'justify-content:center',
      'pointer-events:none',
    ].join(';');

    const label = document.createElement('span');
    label.className = 'globe-zoom__label';
    label.textContent = locationName.toUpperCase();
    label.style.cssText = 'opacity:0;transition:opacity 300ms ease 80ms';

    overlay.appendChild(label);
    document.body.appendChild(overlay);

    // Double rAF: ensures transition fires after first paint
    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      label.style.opacity = '1';
    }));

    // Persist overlay across Astro DOM swap so GalleryPage can fade it out
    document.addEventListener('astro:before-swap', (e: any) => {
      const existing = document.getElementById('globe-zoom-overlay');
      if (existing) e.newDocument.body.appendChild(existing.cloneNode(true));
    }, { once: true });

    setTimeout(() => { navigate(href); }, 500);
  };

  // Trigger Three.js zoom + pin fade-out, then call afterZoom
  if ((window as any).__cobeGlobeZoomIn) {
    (window as any).__cobeGlobeZoomIn(650, afterZoom, slug);
  } else {
    // Fallback when no globe is on screen (shouldn't happen in normal flow)
    setTimeout(afterZoom, 300);
  }
}
