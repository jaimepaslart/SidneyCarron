# Design Tokens — Sidney Carron

> Theme : **Blanc Musée** — Un espace blanc, neutre et lumineux qui met l'oeuvre au premier plan.

---

## Palette de couleurs

| Token | Hex | CSS Class | Usage |
|---|---|---|---|
| `museum-white` | `#ffffff` | `bg-museum-white` | Fond principal, zones de contenu |
| `museum-surface` | `#f7f7f5` | `bg-museum-surface` | Surfaces secondaires, bandes alternées, footer |
| `museum-text` | `#111111` | `text-museum-text` | Texte principal, titres |
| `museum-caption` | `#6b6b6b` | `text-museum-caption` | Légendes, métadonnées, texte secondaire |
| `museum-accent` | `#1a1a2e` | `text-museum-accent` | Liens actifs, focus, éléments interactifs |
| `museum-accent-hover` | `#2d2d4a` | `text-museum-accent-hover` | Hover sur accent |
| `museum-warm` | `#8b7355` | `text-museum-warm` | Accent secondaire chaud (usage rare) |
| `museum-warm-hover` | `#a08868` | `text-museum-warm-hover` | Hover sur accent chaud |
| `museum-border` | `#e5e5e3` | `border-museum-border` | Séparateurs, bordures légères |

### Principes couleur
- **Pas de gradients** — surfaces plates uniquement
- **Pas d'ombres lourdes** — au maximum `shadow-sm` pour les éléments flottants (header sticky)
- L'accent est réservé aux éléments interactifs : liens, focus, boutons primaires
- L'accent chaud (`warm`) est une alternative pour des touches ponctuelles

---

## Typographie

### Familles

| Token | Police | Fallback | Usage |
|---|---|---|---|
| `font-serif` | Cormorant Garamond | Georgia, serif | Titres, citations, éléments éditoriaux |
| `font-sans` | Inter | system-ui, sans-serif | Corps de texte, UI, légendes, boutons |

### Graisses chargées
- **Cormorant Garamond** : 400 (regular), 500 (medium), 600 (semibold) + italiques 400, 500
- **Inter** : 400 (regular), 500 (medium)

### Échelle typographique

| Token | Taille | Line-height | Letter-spacing | Weight | Usage |
|---|---|---|---|---|---|
| `text-hero` | clamp(3rem, 6vw, 5rem) | 1.05 | -0.02em | 600 | Titre principal de page héro |
| `text-h1` | clamp(2.25rem, 4vw, 3.5rem) | 1.1 | -0.015em | 600 | Titres de section principaux |
| `text-h2` | clamp(1.75rem, 3vw, 2.5rem) | 1.15 | -0.01em | 500 | Sous-titres de section |
| `text-h3` | clamp(1.25rem, 2vw, 1.75rem) | 1.25 | -0.005em | 500 | Titres de carte, petits titres |
| `text-body` | 1rem (16px) | 1.65 | normal | 400 | Texte courant |
| `text-caption` | 0.875rem (14px) | 1.5 | normal | 400 | Légendes d'oeuvres, métadonnées |
| `text-small` | 0.75rem (12px) | 1.5 | normal | 400 | Notes de bas de page, copyright |

### Principes typographiques
- Les titres (`h1`–`h3`) utilisent **toujours** `font-serif`
- Le texte courant et l'UI utilisent **toujours** `font-sans`
- `text-wrap: balance` est appliqué automatiquement sur tous les headings
- Les tailles sont fluides (clamp) pour une adaptation continue entre mobile et desktop

---

## Spacing

### Sections

| Token | Mobile | Tablet | Desktop | CSS Class |
|---|---|---|---|---|
| `section-sm` | 40px | — | — | `py-section-sm` |
| `section-md` | — | 64px | — | `py-section-md` |
| `section-lg` | — | — | 96px | `py-section-lg` |

Usage combiné responsive : `py-section-sm md:py-section-md lg:py-section-lg`
Ou directement : `.museum-section`

### Gutters (gouttières)

| Token | Valeur | Breakpoint | CSS Class |
|---|---|---|---|
| `gutter-sm` | 16px | Mobile | `px-gutter-sm` |
| `gutter-md` | 24px | Tablet (md) | `px-gutter-md` |
| `gutter-lg` | 32px | Desktop (lg) | `px-gutter-lg` |

### Container

| Propriété | Valeur |
|---|---|
| Max-width | 1280px |
| CSS Class | `max-w-container` |
| Shortcut | `.museum-container` |

---

## Grille

| Breakpoint | Colonnes | Template | CSS Class |
|---|---|---|---|
| Mobile (< 768px) | 2 | `grid-cols-layout-sm` | `grid-cols-layout-sm` |
| Tablet (768px+) | 6 | `grid-cols-layout-md` | `md:grid-cols-layout-md` |
| Desktop (1024px+) | 12 | `grid-cols-layout` | `lg:grid-cols-layout` |

Shortcut complet : `.museum-grid`

---

## Transitions & Interactions

### Durées

| Token | Valeur | Usage |
|---|---|---|
| `duration-fast` | 150ms | Micro-interactions (focus, toggle) |
| `duration-base` | 200ms | Hover, apparition de texte |
| `duration-slow` | 300ms | Ouverture modale, slide-in |

### Easing

| Token | Valeur | Usage |
|---|---|---|
| `ease-museum` | cubic-bezier(0.25, 0.1, 0.25, 1) | Transition standard |
| `ease-museum-out` | cubic-bezier(0, 0, 0.25, 1) | Sortie, fermeture |

### Hover standard
- Opacité cible : `0.85` (`opacity-hover`)
- Durée : `200ms`
- Easing : `ease-museum`
- CSS : `transition-opacity duration-base ease-museum hover:opacity-hover`

### Images au hover
- Overlay léger (15% noir) avec `museum-hover-overlay`
- Apparition d'un texte (titre/légende) avec translation Y + fade-in

---

## Breakpoints

| Token | Valeur | Usage |
|---|---|---|
| `sm` | 640px | Petit mobile paysage |
| `md` | 768px | Tablette portrait |
| `lg` | 1024px | Tablette paysage / petit desktop |
| `xl` | 1280px | Desktop (max container) |

---

## Do's and Don'ts

### DO
- Utiliser `museum-white` comme fond par défaut
- Alterner `museum-white` et `museum-surface` entre les sections
- Réserver `museum-accent` aux éléments cliquables
- Toujours afficher les images dans leur ratio original
- Garder les légendes (`museum-caption`) discrètes et bien alignées
- Utiliser les transitions `ease-museum` partout

### DON'T
- Ne jamais utiliser de gradients
- Ne jamais ajouter d'ombres lourdes (box-shadow > sm)
- Ne pas utiliser plus de 2 familles de polices
- Ne pas utiliser l'accent sur de grandes surfaces
- Ne jamais mettre des animations flashy ou rebondissantes
- Ne pas réduire les images en les déformant (toujours `object-fit: cover/contain`)
