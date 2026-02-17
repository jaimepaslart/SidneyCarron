# Design V2 — Changelog

## Vue d'ensemble

Refonte complète du design system et de toutes les pages du site Sidney Carron vers le thème « Blanc Musée » v2, inspiré des sites de galeries d'art contemporain (Gagosian, Pace, David Zwirner, Hauser & Wirth).

---

## 1. Design System (tailwind.config.mjs + global.css)

- **Fonts** : Elizeth (serif titres, weight 300/400/500), Relative (sans corps/UI), RelativeMono (données techniques)
- **Palette museum** : white, surface (#FAFAF8), text (#111), caption (#6b6b6b), label (#888), accent (#1a1a2e), warm (#8b7355), border (#e5e5e3)
- **Tailles typographiques** : hero (clamp 3–5rem), h1, h2, h3, body, caption, small — tous avec line-height et letter-spacing optimisés
- **Spacing** : section-sm/md/lg, gutter-sm/md/lg
- **Grille** : 12 colonnes (layout), 6 (md), 2 (sm)
- **Composants CSS** : `.museum-container`, `.museum-section`, `.museum-grid`, `.museum-caption`, `.museum-label` (ALLCAPS gris tracking), `.museum-mono`
- **Transitions** : fast/base/slow/page + easing museum (cubic-bezier)
- **Hover image overlay** : `.museum-hover-overlay`
- **Links** : animated underline from left to right (background-image technique)
- **Focus visible** : accent ring accessible

## 2. Header

- Logo : Relative uppercase tracking-museum
- Nav desktop : Relative small, uppercase, tracking-widest, active = underline offset
- Contact : style pill (border + rounded-full)
- Mobile : fullscreen overlay avec X SVG, lignes hamburger animées
- Scroll : transparent → bg-white + shadow
- LanguageToggle intégré

## 3. Footer

- 3 colonnes : identité (Elizeth h3), navigation (Relative small uppercase), contact (mono email + sans Instagram)
- Separator + copyright en museum-mono
- Bg #F5F5F3

## 4. HomePage

- Hero : min-h-90vh, centré, museum-label subtitle, text-hero statement, CTA border pill
- Featured Works : grille 1/2/3 colonnes, WorkCard
- Current Exhibition : grille 2 colonnes, image + infos, museum-mono dates
- Press : border-b separator, museum-label publication, museum-mono date, italic title
- CTA Contact : italic Elizeth h2

## 5. WorksPage

- H1 font-light
- FilterBar avec dropdowns
- Grille 1/2/3 colonnes avec `.reveal-card` + IntersectionObserver stagger

## 6. WorkDetailPage

- Split layout 40/60 : info sticky (fadeInUp 600ms) + images scrollables
- Metadata en dl/dt/dd avec museum-label + museum-mono
- Mobile : horizontal scroll carousel snap
- Desktop : stacked figures avec `.reveal-image`
- Prev/Next navigation
- Related works

## 7. SeriesIndexPage (v2)

- H1 font-light Elizeth
- Grille 3 colonnes desktop, 2 tablet, 1 mobile
- Cartes : image cover aspect-video (16/9) bg-placeholder, titre Elizeth, description Relative, count museum-mono
- Fade-in stagger au scroll avec `.animate-on-scroll`
- `prefers-reduced-motion` respecté

## 8. SeriesDetailPage (v2)

- Hero : image cover pleine largeur aspect-21/9, titre hero overlaid en blanc avec drop-shadow
- Texte curatorial en 2 colonnes desktop (line-height 1.7)
- Grille d'œuvres 1/2/3 colonnes avec WorkCard + fade-in stagger
- Section « Autres séries » avec thumbnails 96x96
- Animations `.animate-on-scroll` partout

## 9. ExhibitionsPage + ExhibitionList (v2)

- H1 font-light
- Section « En cours & à venir » clairement séparée de « Archives »
- Dates format musée : DD.MM — DD.MM.YYYY (museum-mono)
- Lieu en Relative, ville en museum-label ALLCAPS
- Labels UPCOMING / CURRENT / PAST en museum-label
- Archives groupées par année (museum-mono h3)
- Fade-in au scroll

## 10. ExhibitionDetailPage (v2)

- H1 font-light
- Labels status en museum-label (UPCOMING/CURRENT/PAST)
- Dates museum-mono format DD.MM — DD.MM.YYYY
- Venue + city en museum-label ALLCAPS
- Description line-height 1.7
- Œuvres présentées en grille avec fade-in stagger

## 11. PressPage (v2)

- H1 font-light Elizeth
- Source en museum-label ALLCAPS
- Date en museum-mono format DD.MM.YYYY
- Titre article en Elizeth italic
- Extrait en Relative
- Liens « Lire l'article → » avec underline animé (global CSS)
- Séparateurs fins #E8E6E0
- Fade-in au scroll

## 12. AboutPage (v2)

- Portrait : aspect-ratio 3/4 avec bg-placeholder
- H1 « À propos de Sidney Carron » en Elizeth font-light
- Bio en Relative, line-height 1.7
- Statement en Elizeth italic h3, avec guillemets français « »
- CV/Parcours : années en museum-mono, descriptions en Relative, border-b separators
- CTA « Contactez-moi » : style pill (border + rounded-full) comme dans la nav
- Fade-in progressif des sections

## 13. ContactPage (v2)

- H1 font-light
- Labels formulaire en museum-label (ALLCAPS gris tracking)
- Inputs : style underline (border-bottom uniquement), font-family Relative
- Email contact en museum-mono
- Réseaux en Relative
- Bouton submit : style pill rounded-full
- Message de succès redesigné (museum-surface bg, serif title, sans body)
- Section coordonnées avec museum-label heading
- Fade-in au scroll

## 14. Page 404 (v2)

- 404 en font-serif text-hero
- H1 font-light
- Bouton retour : style pill rounded-full
- Fonts cohérentes Elizeth/Relative

## 15. Animations globales

- Pattern `.animate-on-scroll` : opacity 0→1, translateY 20px→0, 500ms ease-out
- IntersectionObserver avec stagger (80ms delay entre éléments)
- `prefers-reduced-motion: reduce` : désactive toutes les animations (opacity 1, transform none)
- Appliqué sur : Series, Exhibitions, Press, About, Contact

---

## Build

- `pnpm build` : 51 pages générées, 0 erreur, ~850ms
- Warnings fonts : fichiers .woff2 non encore fournis (expected, placeholder TODOs)
