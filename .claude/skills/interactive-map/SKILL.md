---
name: interactive-map
description: Skill for managing the interactive COBE globe map on Sidney Carron's artist portfolio. Use when adding/removing locations, adjusting pin positions, styling polaroid markers, tuning globe parameters, or debugging map interactions. Covers CobeGlobe.astro, locations.ts, gallery-loader.ts, MapPage.astro, and related components.
---

# Interactive Map — COBE Globe

Skill for building and maintaining the interactive 3D globe map on sidneycarron.com.

## Architecture

### Core Files

| File | Role |
|------|------|
| `src/components/CobeGlobe.astro` | 3D globe + polaroid pins (WebGL via COBE) |
| `src/components/GlobeLocationList.astro` | Desktop sidebar list (triggers globe focus on hover) |
| `src/components/LocationList.astro` | Mobile fallback list (no globe) |
| `src/components/LocationCard.astro` | Reusable location card with cover image |
| `src/components/pages/MapPage.astro` | Page orchestrator (2-column layout desktop, single mobile) |
| `src/data/locations.ts` | Location data: coords, names, photoCount, type |
| `src/data/gallery-loader.ts` | Loads gallery JSON files for thumbnails |
| `src/pages/carte.astro` | French route `/carte/` |
| `src/pages/en/map.astro` | English route `/en/map/` |

### Library: COBE

- **Package**: `cobe` v0.6.5 (~5 KB gzipped)
- **Renderer**: WebGL sphere, no Three.js dependency
- **Docs**: https://cobe.vercel.app/
- **Context7 ID**: `/shuding/cobe`

### Key Globe Parameters

```typescript
{
  scale: 1.25,         // Globe fills circular mask (0.4 * 1.25 = 0.5 of canvas)
  dark: 1,             // Full dark mode
  diffuse: 3,          // Light diffusion
  mapSamples: 30000,   // Land detail quality
  mapBrightness: 8,    // Land brightness
  baseColor: [0.05, 0.12, 0.28],   // Ocean color (dark blue)
  markerColor: [1, 0.95, 0.8],     // Marker glow (warm white)
  glowColor: [0.08, 0.2, 0.45],    // Atmosphere glow
}
```

### Pin System

Pins are HTML elements (polaroid cards) absolutely positioned over the WebGL canvas using JavaScript 3D projection.

**Projection pipeline:**
1. Geographic coords (lat/lng) → spherical → cartesian (y-up)
2. Rotate by Y-axis (phi = longitude rotation)
3. Rotate by X-axis (theta = tilt)
4. Project to 2D screen coords relative to globe center
5. Apply manual offsets for clustered locations
6. Multi-pass collision avoidance (3 passes, weighted by photoCount)
7. Entry animation (500ms ease-out cubic)

**Visibility:** Pins with z < 0.1 (back hemisphere) are hidden.

**Depth effects:**
- Scale: 0.35 + z * 0.65 (smaller at edges)
- Opacity: 0.15 + z * 0.85 (faded at edges)

### Interaction

- **Drag-to-rotate**: pointer events on canvas, phi/theta tracking
- **Momentum/inertia**: velocity captured during drag, friction 0.94 per frame
- **Auto-rotation**: 0.003 rad/frame, resumes 3s after interaction
- **List hover focus**: `window.__cobeGlobeFocus(lat, lng)` — smoothly rotates globe
- **Hover scale**: 1.45x on pin hover with CSS transition

## How-To Guide

### Add a New Location

1. **Add to `src/data/locations.ts`:**
```typescript
{
  slug: 'new-location',
  name_fr: 'Nom FR',
  name_en: 'Name EN',
  country_fr: 'Pays',
  country_en: 'Country',
  coords: { lat: 0.0, lng: 0.0 },  // decimal degrees
  photoCount: 0,
  type: 'travel',  // 'travel' | 'exhibition' | 'event'
}
```

2. **Create gallery JSON** in `src/data/galleries/new-location.json`:
```json
{
  "slug": "new-location",
  "images": [
    { "src": "/images/galleries/new-location/photo-1.jpg", "width": 1200, "height": 800 }
  ]
}
```

3. **Add pin rotation** in `CobeGlobe.astro` → `pinRotations` object:
```typescript
'new-location': 1.5,  // degrees, slight tilt for natural look
```

4. **Check for clustering**: If the new location is close to existing ones (< 5° lat/lng), add manual screen offsets in `pinScreenOffsets`:
```typescript
'new-location': { dx: 15, dy: -10 },
```

### Adjust Pin Positions

**Manual offsets** (for clustered locations like the French trio):
```typescript
// In CobeGlobe.astro → pinScreenOffsets
const pinScreenOffsets: Record<string, { dx: number; dy: number }> = {
  'paris': { dx: -22, dy: -18 },
  'saint-tropez': { dx: 18, dy: 14 },
  'alpes': { dx: 28, dy: -6 },
};
```
- Offsets are in screen pixels, scaled by depth (smaller near globe edges)
- Positive dx = push right, positive dy = push down

**Collision avoidance tuning:**
- `MIN_DIST`: minimum pixel distance between pins (currently 62)
- `passes`: iteration count (currently 3)
- `push factor`: 0.45 per overlap (lower = gentler spreading)

### Change Globe Appearance

**Colors** — modify `createGlobe()` call:
- `baseColor`: ocean/land base [R, G, B] (0-1 range)
- `markerColor`: location dot glow color
- `glowColor`: atmospheric halo

**Initial view** — set `phi` and `theta`:
- `phi = 1.85` → Atlantic-centered (~15°W), shows Americas + Europe + Africa
- `phi = 1.57` → Prime meridian centered
- `theta = 0.2` → slight downward tilt (~12°)
- Formula: `phi = -lng_degrees * (PI/180) + PI/2`

**Auto-rotation speed**: modify `targetPhi += 0.003` (radians per frame)

### Polaroid Pin Styling

CSS classes in `CobeGlobe.astro` `<style>`:
- `.cobe-globe__polaroid` — white card (width: 60px, XL: 72px)
- `.cobe-globe__polaroid-img` — image container (54x40px, XL: 64x48px)
- `.cobe-globe__polaroid-label` — location name (Syne, 6.5px, uppercase)
- `.cobe-globe__tack` — red pin dot (8px, radial gradient)

### Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `<md` (768px) | Mobile: LocationList only, no globe |
| `md+` | Desktop: 2-column grid, globe sticky left |
| `xl` (1280px) | Larger polaroids (72px) |

## Debugging Tips

- **Pins invisible?** Check `z > 0.1` threshold in `projectPoint()`, or verify `getGlobeDimensions()` returns correct center
- **Pins displaced?** Check `pinScreenOffsets` and collision `MIN_DIST`
- **Globe not rotating on list hover?** Verify `window.__cobeGlobeFocus` is set and list items have `data-lat`/`data-lng` attributes
- **Double init on HMR?** The `__cobeInitialized` flag prevents this
- **Performance?** Reduce `mapSamples` (currently 30000) or lower `dpr`

## Research Notes

### Why COBE over alternatives

| Criteria | COBE | MapLibre GL | Globe.gl |
|----------|------|-------------|----------|
| Bundle | **5 KB** | 290 KB | 500 KB+ |
| Visual quality | Excellent | Excellent | Excellent |
| Custom HTML markers | Manual (JS projection) | Native | Native |
| Astro integration | Perfect (vanilla JS) | Good | Needs React island |
| Best for | Decorative globe, < 20 locations | Zoomable flat map | Data-viz, 1000+ points |

For Sidney Carron's 9 locations, COBE is the optimal choice: minimal bundle, gallery-art aesthetic, already implemented with sophisticated pin system.

### Future enhancement options
- **MapLibre GL JS** as 2D map alternative for mobile or "explore detail" mode
- Free tiles: OpenFreeMap (`https://tiles.openfreemap.org/styles/bright`), MapTiler (100K/mo free)
- Could lazy-load MapLibre only when user requests flat map view
