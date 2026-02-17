# UI Kit — Sidney Carron

> Spécifications des composants du site portfolio. Chaque composant respecte les tokens définis dans `DESIGN_TOKENS.md`.

---

## 1. Header

### Structure
```
┌──────────────────────────────────────────────┐
│  SIDNEY CARRON          Oeuvres  Expos  Contact  FR/EN  │
└──────────────────────────────────────────────┘
```

### Spécifications
| Propriété | Valeur |
|---|---|
| Position | `sticky top-0 z-50` |
| Hauteur | `h-16` (64px) mobile, `h-20` (80px) desktop |
| Fond initial | `transparent` |
| Fond au scroll | `bg-museum-white/95 backdrop-blur-sm shadow-sm` |
| Transition fond | `duration-slow ease-museum` |
| Container | `.museum-container` |
| Layout | `flex items-center justify-between` |

### Logo / Nom
- Texte : "SIDNEY CARRON" en `font-serif text-h3 font-semibold tracking-wide uppercase`
- Couleur : `text-museum-text`
- Lien vers la page d'accueil

### Navigation
- Items : `font-sans text-caption font-medium uppercase tracking-wider`
- Couleur : `text-museum-caption` → hover `text-museum-text`
- Item actif : `text-museum-text` avec underline offset `border-b-2 border-museum-accent`
- Transition : `duration-base ease-museum`
- Espacement entre items : `gap-8` desktop, `gap-6` tablette

### Language Toggle
- Position : après la navigation
- Style : `text-small font-sans font-medium uppercase`
- FR actif : `text-museum-text` / EN inactif : `text-museum-caption`
- Séparateur : `/` en `text-museum-border`

### Menu Mobile
- Icône hamburger : 2 lignes, `w-6`, `text-museum-text`
- Panneau : fullscreen `bg-museum-white`, slide from right `duration-slow`
- Items centrés, `text-h2 font-serif`, espacement `gap-8`
- Bouton fermer : `X` en haut à droite

---

## 2. Footer

### Structure
```
┌──────────────────────────────────────────────┐
│  SIDNEY CARRON                                         │
│  Artiste sculpteur                                     │
│                                                        │
│  Navigation        Contact           Réseaux           │
│  Oeuvres           email@...         Instagram         │
│  Expositions       +33 ...                             │
│  Contact                                               │
│                                                        │
│  ─────────────────────────────────────────────         │
│  © 2026 Sidney Carron. Tous droits réservés.           │
└──────────────────────────────────────────────┘
```

### Spécifications
| Propriété | Valeur |
|---|---|
| Fond | `bg-museum-surface` |
| Padding | `.museum-section` |
| Border top | `border-t border-museum-border` |
| Container | `.museum-container` |

### Contenu
- Titre : `font-serif text-h3 text-museum-text`
- Sous-titre : `text-caption text-museum-caption`
- Colonnes : 3 colonnes desktop (`grid-cols-3`), stack mobile
- Titres de colonnes : `font-sans text-small uppercase tracking-wider text-museum-caption font-medium mb-4`
- Liens : `text-body text-museum-text hover:text-museum-accent duration-base`
- Copyright : `text-small text-museum-caption` séparé par `border-t border-museum-border mt-12 pt-6`

---

## 3. WorkCard (Carte d'oeuvre)

### Structure
```
┌─────────────────────┐
│                     │
│     [Image]         │
│                     │
│                     │
├─────────────────────┤
│  Titre de l'oeuvre  │
│  Matériau, 2024     │
└─────────────────────┘
```

### Spécifications
| Propriété | Valeur |
|---|---|
| Aspect ratio image | `aspect-[4/5]` portrait (défaut), `aspect-square` ou `aspect-[3/4]` selon l'oeuvre |
| Image fit | `object-cover` |
| Border radius | `rounded-none` (angles vifs, esprit galerie) |
| Hover sur image | Overlay 15% noir + légère scale `scale-[1.02]` en `duration-slow ease-museum` |
| Curseur | `cursor-pointer` |

### Texte sous l'image
- Titre : `font-serif text-body font-medium text-museum-text mt-3`
- Métadonnées : `text-caption text-museum-caption mt-1`
- Pas d'underline au hover, le titre change en `text-museum-accent`

### Hover complet (overlay)
```
┌─────────────────────┐
│                     │
│    Titre oeuvre      │  ← apparaît au hover
│    Voir →           │  ← apparaît au hover
│                     │
└─────────────────────┘
```
- Overlay : `bg-museum-text/10`
- Texte centré : `font-serif text-h3 text-museum-white`
- Animation : `translate-y-2 → translate-y-0` + `opacity-0 → opacity-100`, `duration-base ease-museum`

---

## 4. WorkViewer / Lightbox

### Ouverture
- Déclenchée par clic sur WorkCard
- Animation : fade-in `duration-slow` sur l'overlay, scale-up léger de l'image

### Structure
```
┌──────────────────────────────────────────────┐
│  ← Précédent                     Fermer ✕    │
│                                              │
│           ┌──────────────────┐               │
│           │                  │               │
│           │     [Image]      │               │
│           │                  │               │
│           │                  │               │
│           └──────────────────┘               │
│                                              │
│  Titre de l'oeuvre                           │
│  Bronze, 45 × 30 × 20 cm, 2024              │
│                                    Suivant → │
└──────────────────────────────────────────────┘
```

### Spécifications
| Propriété | Valeur |
|---|---|
| Fond | `bg-museum-white` fullscreen |
| Z-index | `z-[100]` |
| Image | `object-contain max-h-[75vh]` centrée |
| Navigation | Flèches gauche/droite + clavier (← →) |
| Fermeture | Bouton ✕ + touche Escape + clic hors image |
| Transition image | `duration-slow ease-museum-out` |

### Infos de l'oeuvre
- Position : sous l'image, centrées
- Titre : `font-serif text-h3 text-museum-text mt-6`
- Détails : `text-caption text-museum-caption mt-1`
- Matériau, dimensions, année, technique

### Boutons navigation
- Style : `font-sans text-caption text-museum-caption hover:text-museum-text`
- Icônes : flèches simples, trait fin
- Transition : `duration-fast ease-museum`

---

## 5. FilterBar (Barre de filtres)

### Structure
```
Tous   Sculptures   Dessins   Peintures   Installations
 ●
```

### Spécifications
| Propriété | Valeur |
|---|---|
| Layout | `flex flex-wrap gap-2 md:gap-3` |
| Container | `.museum-container` |
| Margin | `mb-12 md:mb-16` |

### Chip (filtre individuel)
| État | Style |
|---|---|
| Inactif | `font-sans text-caption px-4 py-2 text-museum-caption bg-transparent border border-museum-border rounded-full` |
| Hover | `text-museum-text border-museum-caption duration-fast` |
| Actif | `text-museum-white bg-museum-accent border-museum-accent` |
| Transition | `duration-fast ease-museum` sur couleur et fond |

### Comportement
- Un seul filtre actif à la fois (ou "Tous" par défaut)
- Changement de filtre : les oeuvres s'animent en fade-out/fade-in `duration-base`
- Pas de rechargement de page (filtrage côté client)

---

## 6. ExhibitionList (Liste d'expositions)

### Structure page
```
EXPOSITIONS

── En cours & À venir ──────────────────

┌──────────────────────────────────────┐
│  [Image expo]  │  Titre exposition   │
│                │  Galerie / Lieu     │
│                │  15 mars – 30 avril │
│                │  2026               │
│                │  [En savoir plus →] │
└──────────────────────────────────────┘

── Archives ─────────────────────────────

2025
  Titre exposition — Lieu — Dates
  Titre exposition — Lieu — Dates

2024
  Titre exposition — Lieu — Dates
```

### Section "En cours & À venir"
| Propriété | Valeur |
|---|---|
| Layout | `grid grid-cols-1 md:grid-cols-2 gap-gutter-lg` |
| Image | `aspect-[3/2] object-cover` |
| Titre | `font-serif text-h2 text-museum-text` |
| Lieu | `font-sans text-body text-museum-caption` |
| Dates | `font-sans text-caption text-museum-caption` |
| Lien | `font-sans text-caption text-museum-accent hover:opacity-hover` avec flèche → |
| Badge "En cours" | `text-small uppercase tracking-wider text-museum-warm font-medium` |

### Section "Archives"
| Propriété | Valeur |
|---|---|
| Titre année | `font-serif text-h3 text-museum-text mb-4 mt-12 first:mt-0` |
| Item | `py-3 border-b border-museum-border` |
| Titre expo | `font-sans text-body text-museum-text font-medium` |
| Lieu | `text-caption text-museum-caption` |
| Dates | `text-caption text-museum-caption` |
| Layout item | `flex justify-between items-baseline flex-wrap gap-2` |
| Hover item | `bg-museum-surface/50 -mx-4 px-4 rounded duration-fast` |

---

## 7. Boutons

### Variantes

#### Primaire
```css
font-sans text-caption font-medium uppercase tracking-wider
px-6 py-3
bg-museum-accent text-museum-white
hover:bg-museum-accent-hover
transition-colors duration-base ease-museum
```

#### Secondaire
```css
font-sans text-caption font-medium uppercase tracking-wider
px-6 py-3
bg-transparent text-museum-text
border border-museum-text
hover:bg-museum-text hover:text-museum-white
transition-colors duration-base ease-museum
```

#### Ghost
```css
font-sans text-caption font-medium
px-0 py-0
text-museum-accent
hover:opacity-hover
transition-opacity duration-base ease-museum
```
Souvent accompagné d'une flèche → qui translate de `2px` au hover.

### Tailles
| Taille | Padding | Font |
|---|---|---|
| Default | `px-6 py-3` | `text-caption` |
| Small | `px-4 py-2` | `text-small` |
| Large | `px-8 py-4` | `text-body` |

### États
- **Disabled** : `opacity-50 cursor-not-allowed pointer-events-none`
- **Loading** : spinner SVG minimal remplace le texte, même dimensions
- **Focus** : outline accent via `:focus-visible`

---

## 8. Inputs (Formulaire de contact)

### Text Input
```css
font-sans text-body
w-full px-0 py-3
bg-transparent
border-b border-museum-border
text-museum-text placeholder:text-museum-caption
focus:border-museum-accent focus:outline-none
transition-colors duration-base ease-museum
```
- Pas de border sur les côtés ni en haut — uniquement en bas (style minimaliste)
- Label au-dessus : `text-small font-sans uppercase tracking-wider text-museum-caption mb-2`

### Textarea
- Même style que text input
- `min-h-[120px] resize-y`
- Border-bottom uniquement

### Select
- Même base que text input
- Flèche custom SVG en `text-museum-caption`

### États de validation
| État | Style |
|---|---|
| Erreur | `border-red-500 text-red-600` — message sous le champ en `text-small` |
| Succès | `border-green-600` (discret, pas de texte vert) |
| Focus | `border-museum-accent` |

---

## Principes transversaux

### Images
- Toujours respecter le ratio original
- `object-cover` dans les grilles, `object-contain` dans le viewer
- Format : WebP avec fallback JPEG
- Lazy loading : `loading="lazy"` sur toutes les images hors viewport initial
- Tailles : fournir `srcset` avec 3 tailles minimum (640, 1024, 1920)

### Accessibilité
- Tout élément interactif doit avoir un `:focus-visible` visible
- Les images d'oeuvres doivent avoir un `alt` descriptif
- Navigation au clavier complète (Tab, Enter, Escape)
- Contrastes WCAG AA minimum (4.5:1 texte, 3:1 éléments UI)
- `aria-label` sur les boutons icon-only (fermer, navigation)
- Skip-to-content link en haut du DOM

### Responsive
- Mobile-first
- Breakpoints : `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px
- Touch targets minimum : 44x44px sur mobile
- Pas de scroll horizontal

### Performance
- Images optimisées en WebP, `srcset` multi-tailles
- Fonts : `display=swap` pour éviter le FOIT
- CSS : Tailwind purge les classes inutilisées en production
- Lazy loading systématique hors above-the-fold
