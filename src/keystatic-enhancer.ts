/**
 * Keystatic Enhancer — dev-only script injected into all /keystatic/* pages.
 *
 * Features:
 * 1. Interactive Leaflet map picker for lat/lng fields in the Locations form
 * 2. HMR auto-reload when YAML files change externally (git pull, text editor…)
 *    without triggering a reload when Keystatic itself saves
 */

declare global {
  interface Window {
    L: any;
    __ksEnhancerReady?: boolean;
  }
}

// ─── React input update helper ───────────────────────────────────────────────

function setReactInputValue(input: HTMLInputElement, value: string) {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value'
  )?.set;
  nativeSetter?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

// ─── Leaflet CDN loader ───────────────────────────────────────────────────────

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

let leafletLoadPromise: Promise<void> | null = null;

function loadLeaflet(): Promise<void> {
  if (window.L) return Promise.resolve();
  if (leafletLoadPromise) return leafletLoadPromise;

  leafletLoadPromise = new Promise<void>((resolve) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = LEAFLET_CSS;
    document.head.appendChild(css);

    const script = document.createElement('script');
    script.src = LEAFLET_JS;
    script.onload = () => resolve();
    script.onerror = () => {
      console.warn('[Keystatic Enhancer] Could not load Leaflet from CDN');
      resolve();
    };
    document.head.appendChild(script);
  });

  return leafletLoadPromise;
}

// ─── Map picker ───────────────────────────────────────────────────────────────

const MAP_CONTAINER_ID = 'ks-map-picker';
const DEFAULT_CENTER: [number, number] = [46.5, 2.3]; // France
const DEFAULT_ZOOM = 4;
const LAT_LABEL = 'Latitude';
const LNG_LABEL = 'Longitude';

let mapInstance: any = null;
let markerInstance: any = null;

function findInputByLabel(labelText: string): HTMLInputElement | null {
  const labels = Array.from(document.querySelectorAll('label'));
  const label = labels.find(
    l => l.textContent?.trim().toLowerCase().startsWith(labelText.toLowerCase())
  );
  if (!label) return null;

  // Try htmlFor first, then sibling/descendant input
  if (label.htmlFor) {
    return document.getElementById(label.htmlFor) as HTMLInputElement | null;
  }
  return (
    (label.querySelector('input') as HTMLInputElement | null) ||
    (label.nextElementSibling?.querySelector('input') as HTMLInputElement | null) ||
    (label.parentElement?.querySelector('input') as HTMLInputElement | null)
  );
}

function destroyMap() {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
    markerInstance = null;
  }
  document.getElementById(MAP_CONTAINER_ID)?.remove();
}

async function injectMap() {
  if (document.getElementById(MAP_CONTAINER_ID)) return;

  const latInput = findInputByLabel(LAT_LABEL);
  const lngInput = findInputByLabel(LNG_LABEL);
  if (!latInput || !lngInput) return;

  await loadLeaflet();
  if (!window.L) return;

  const lngGroup =
    lngInput.closest('[class*="field"]') ||
    lngInput.closest('[class*="Field"]') ||
    lngInput.parentElement?.parentElement ||
    lngInput.parentElement;

  if (!lngGroup) return;

  const container = document.createElement('div');
  container.id = MAP_CONTAINER_ID;
  container.innerHTML = `
    <div style="
      margin-top: 16px;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #e5e5e5;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    ">
      <div style="
        padding: 8px 12px;
        background: #f5f5f5;
        border-bottom: 1px solid #e5e5e5;
        font-size: 12px;
        color: #666;
        display: flex;
        align-items: center;
        gap: 6px;
      ">
        <span>📍</span>
        <span>Cliquez sur la carte pour placer l'épingle — les coordonnées se mettent à jour automatiquement</span>
      </div>
      <div id="${MAP_CONTAINER_ID}-leaflet" style="height: 320px; width: 100%;"></div>
    </div>
  `;

  lngGroup.insertAdjacentElement('afterend', container);

  const lat = parseFloat(latInput.value) || DEFAULT_CENTER[0];
  const lng = parseFloat(lngInput.value) || DEFAULT_CENTER[1];
  const zoom = (latInput.value && lngInput.value) ? 8 : DEFAULT_ZOOM;

  const L = window.L;

  mapInstance = L.map(`${MAP_CONTAINER_ID}-leaflet`, {
    center: [lat, lng],
    zoom,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(mapInstance);

  const pinIcon = L.divIcon({
    html: `<div style="
      width: 28px; height: 28px;
      background: #1a1a1a;
      border: 3px solid #fff;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    className: '',
  });

  if (latInput.value && lngInput.value) {
    markerInstance = L.marker([lat, lng], { icon: pinIcon, draggable: true }).addTo(mapInstance);

    markerInstance.on('dragend', () => {
      const pos = markerInstance.getLatLng();
      setReactInputValue(latInput, pos.lat.toFixed(4));
      setReactInputValue(lngInput, pos.lng.toFixed(4));
    });
  }

  mapInstance.on('click', (e: any) => {
    const { lat, lng } = e.latlng;

    if (markerInstance) {
      markerInstance.setLatLng([lat, lng]);
    } else {
      markerInstance = L.marker([lat, lng], { icon: pinIcon, draggable: true }).addTo(mapInstance);
      markerInstance.on('dragend', () => {
        const pos = markerInstance.getLatLng();
        setReactInputValue(latInput, pos.lat.toFixed(4));
        setReactInputValue(lngInput, pos.lng.toFixed(4));
      });
    }

    setReactInputValue(latInput, lat.toFixed(4));
    setReactInputValue(lngInput, lng.toFixed(4));
  });
}

// ─── SPA navigation watcher ───────────────────────────────────────────────────

const LOCATION_FORM_RE = /\/keystatic\/collection\/locations\/(item\/|create)/;

let lastPath = '';
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function isLocationFormPage(): boolean {
  return LOCATION_FORM_RE.test(window.location.pathname);
}

function handleRouteChange() {
  const currentPath = window.location.pathname;
  if (currentPath === lastPath) return;

  destroyMap();
  lastPath = currentPath;

  if (!isLocationFormPage()) return;

  // Debounce to let React render the form first
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => injectMap(), 600);
}

function startNavigationWatcher() {
  const observer = new MutationObserver(() => handleRouteChange());
  observer.observe(document.body, { childList: true, subtree: true });

  handleRouteChange();
}

// ─── HMR auto-reload (external YAML changes) ─────────────────────────────────

// After a Keystatic save, YAML changes within this window are self-triggered
const KEYSTATIC_SAVE_GRACE_MS = 2000;

if (import.meta.hot) {
  let lastSaveTs = 0;

  // Intercept saves so we don't reload on our own changes
  const origFetch = window.fetch;
  window.fetch = function (...args: Parameters<typeof fetch>) {
    const url = args[0];
    if (typeof url === 'string' && url.includes('/api/keystatic/update')) {
      lastSaveTs = Date.now();
    }
    return origFetch.apply(window, args);
  };

  import.meta.hot.on('keystatic:yaml-changed', () => {
    if (Date.now() - lastSaveTs < KEYSTATIC_SAVE_GRACE_MS) return;
    console.log('[Keystatic Enhancer] YAML changed externally — refreshing…');
    window.location.reload();
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

if (!window.__ksEnhancerReady) {
  window.__ksEnhancerReady = true;
  startNavigationWatcher();
  console.log('[Keystatic Enhancer] Active — map picker & auto-reload ready');
}
