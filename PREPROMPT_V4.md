# PREPROMPT — Refonte complète du site Sidney Carron v4

## Contexte

Tu travailles sur le site de l'artiste **Sidney Carron** (`/Users/paulbihr/Sites/SidneyCarron`). Le site existe déjà (Astro 5.7 + Tailwind 3.4 + Keystatic + Netlify) mais le design actuel est basique. L'objectif est une **refonte totale du frontend** en s'inspirant fortement du site de l'artiste Alessandro Rinaldi (`https://alessandrorinaldi.com/en/home/`).

**Ce qui NE change PAS** : le CMS Keystatic (config, collections, singletons), la structure des données (`src/content/`, `src/data/`), le déploiement Netlify, les routes API Keystatic.

---

## Mode opératoire — OBLIGATOIRE

### 1. Plan Mode
- **Commence par activer le Plan Mode** (`EnterPlanMode`)
- Explore le codebase existant, analyse les fichiers actuels, identifie ce qui doit être refait vs gardé
- Rédige un plan d'implémentation détaillé phase par phase
- Attends l'approbation avant de coder

### 2. Team Mode
- **Crée une équipe** (`TeamCreate`) pour paralléliser le travail
- **Le lead ne code JAMAIS** — il coordonne, crée les tâches, assigne, synthétise
- Tout le code est écrit par les coéquipiers (teammates)
- Découpe le projet en tâches indépendantes assignables

### 3. Recherche & Documentation — MCP obligatoires
- **Context7** : consulte TOUJOURS la doc avant de coder. IDs :
  - Astro → `/withastro/docs`
  - Tailwind CSS → `/websites/v3_tailwindcss`
  - Motion → `/websites/motion_dev`
- **Exa Search** (`web_search_advanced_exa`) : pour toute question technique, pattern de design, ou quand tu es bloqué. Cherche des exemples réels, des bonnes pratiques, des solutions éprouvées.
- **Ne te fie JAMAIS uniquement à ta mémoire** — vérifie systématiquement

### 4. Tests continus
- **Build test** après chaque composant/page : `cd /Users/paulbihr/Sites/SidneyCarron && /opt/homebrew/bin/npx --yes pnpm build`
- **Dev server** pour tests visuels : `cd /Users/paulbihr/Sites/SidneyCarron && /opt/homebrew/bin/npx --yes pnpm dev`
- **Ne jamais accumuler du code sans builder** — tester incrémentalement

### 5. Qualité du code
- **Clean** : pas de code mort, pas de commentaires inutiles, pas de console.log
- **Light** : le moins de JS possible, privilégier CSS natif. Zéro dépendance superflue
- **DRY** : composants réutilisables, pas de duplication
- **Type-safe** : TypeScript strict, interfaces pour les props
- **Accessibilité** : `aria-*`, `alt`, `role`, focus visible, `prefers-reduced-motion`
- **Performance** : `transform` + `opacity` uniquement pour les animations (pas de reflows), lazy loading, font-display swap

### 6. QA finale — Chrome MCP
- **À la fin du projet**, utilise les outils Chrome (`mcp__claude-in-chrome__*`) pour :
  - Naviguer sur chaque page du site en dev (`http://127.0.0.1:4321/`)
  - Prendre des screenshots de chaque page (desktop + mobile via `resize_window`)
  - Vérifier visuellement le rendu, les animations, la navigation
  - Tester les interactions (hover, clic, scroll, menu mobile)
  - Vérifier la version anglaise (`/en/`)
  - Identifier les bugs visuels ou fonctionnels
  - Corriger tout ce qui ne va pas avant de livrer

---

## Stack technique

| Élément | Technologie |
|---|---|
| Framework | **Astro 5.7** (SSG, islands) |
| CSS | **Tailwind CSS 3.4** |
| CMS | **Keystatic** (existant, NE PAS modifier `keystatic.config.ts`) |
| Animations scroll | **Intersection Observer** (natif, 0 KB) |
| Animations motion | **Motion** (~3 KB) — à installer |
| Text splitting | **Splitting.js** (~2 KB) — à installer |
| Smooth scroll | **CSS `scroll-behavior: smooth`** (natif, 0 KB) |
| Déploiement | **Netlify** (adapter déjà configuré) |
| Bilingue | **FR / EN** (structure existante avec `/en/`) |

**Ne PAS utiliser** : GSAP, ScrollTrigger, ScrollSmoother, SplitType, jQuery. On vise ~5 KB d'animations au lieu de ~103 KB.

---

## Design global (inspiré de Rinaldi)

**Esthétique** : galerie d'art contemporain minimaliste. Fond blanc, typographie noire, pas de couleurs vives. Le contenu (les œuvres) EST la couleur.

**Palette** :
- Fond : `#FFFFFF`
- Texte principal : `#1A1A1A`
- Texte secondaire : `#666666`
- Lignes/séparateurs : `#E5E5E5`
- Hover/accent subtil : `#333333`

**Typographie** :
- Titres / navigation : serif élégant (ex: `Playfair Display` ou `Cormorant Garamond`)
- Corps de texte : sans-serif fin (ex: `Inter` ou `DM Sans`)
- Tailles généreuses pour les titres, beaucoup d'espace blanc

**Curseur personnalisé** : petit cercle qui s'agrandit au survol des éléments interactifs (composant `CustomCursor` existant — à adapter). `mix-blend-mode: difference`, hidden sur mobile/touch.

---

## Navigation (inspirée de Rinaldi)

**Header fixe transparent** avec trois zones :

| Gauche | Centre | Droite |
|---|---|---|
| Catégories d'œuvres par lieu : `Brésil`, `Dakar`, `Saint-Tropez`, `La Réunion`, `Sri Lanka`, `Costa Rica` | Logo/Monogramme **SC** (lien vers accueil) | Pages : `Séries`, `Expositions`, `Presse`, `À propos`, `Contact` + toggle `FR/EN` |

- Sur mobile : hamburger menu plein écran avec animation d'apparition
- La nav devient semi-transparente avec backdrop-blur au scroll
- Les liens de nav ont un underline animé au hover

**Footer minimaliste** :
- Nom de l'artiste, email, réseaux sociaux (icônes)
- Copyright + mentions légales
- Pas de footer massif, juste une ligne élégante

---

## Pages — Spécifications détaillées

### 1. Accueil (`/` et `/en/`)

**Hero plein écran** :
- Hauteur : 100vh
- Logo/monogramme SC centré en grand format, semi-transparent en fond
- Titre "Sidney Carron" en grand, typographie serif animée (lettres qui apparaissent une par une via Splitting.js)
- Sous-titre/citation depuis `home.yaml` → `hero_statement_fr/en`
- Flèche subtile "scroll" en bas

**Section Œuvres mises en avant** :
- Galerie en colonnes décalées (masonry-like) — 2 colonnes sur desktop, 1 sur mobile
- Les images apparaissent en fondu au scroll (Intersection Observer + opacity transition CSS)
- Au hover : légère réduction d'opacité + affichage titre/année en overlay
- Lien vers la page de détail de chaque œuvre
- Données depuis `home.yaml` → `featured_works`

**Section Exposition en cours / à venir** :
- Bandeau horizontal avec la prochaine exposition
- Design timeline minimaliste : bullet point, dates, lieu, titre
- Lien vers la page expositions

**Section Citation/Statement** :
- Texte curatorial en grand, typographie serif italique
- Fond légèrement teinté ou avec une œuvre en arrière-plan très atténuée

### 2. Pages Œuvres par lieu (`/works/bresil/`, `/works/dakar/`, etc.)

**En-tête** :
- Nom du lieu en grand titre
- Compteur d'œuvres ("12 œuvres")

**Galerie masonry** :
- Grille 3 colonnes desktop, 2 tablette, 1 mobile
- Images en hauteurs variables (masonry CSS columns ou grid)
- Animation : images apparaissent en fondu décalé au scroll (stagger effect via Intersection Observer)
- Au hover : scale très léger (1.02), overlay sombre semi-transparent avec titre + année + technique
- Clic → page de détail de l'œuvre

### 3. Page détail œuvre (`/works/[slug]/`)

**Layout split** :
- Gauche (60%) : image principale grande, carousel si plusieurs images (navigation par flèches ou swipe)
- Droite (40%) : titre, année, technique, dimensions, série, lieu, description
- Si vidéo : player YouTube/Vimeo intégré sous l'image
- Navigation prev/next vers les autres œuvres du même lieu

**Animations** :
- Image qui apparaît avec un léger slide depuis la gauche
- Texte qui apparaît avec un léger slide depuis la droite
- Transition douce entre les images du carousel

### 4. Page Séries (`/series/`)

**Grille de séries** :
- Grandes cartes avec image de couverture
- Titre de la série en overlay au hover
- Layout 2 colonnes desktop, 1 mobile

### 5. Page détail série (`/series/[slug]/`)

- Image de couverture pleine largeur en hero
- Titre + description
- Texte curatorial en section dédiée (typographie différenciée)
- Galerie des œuvres de cette série en dessous

### 6. Expositions (`/exhibitions/`)

**Timeline verticale** :
- Ligne verticale au centre de la page
- Alternance gauche/droite pour chaque exposition
- Chaque entrée : date, titre, lieu, type (solo/collective), statut (badge coloré)
- Image optionnelle à côté
- Regroupement par année
- Les entrées apparaissent au scroll avec animation de slide

### 7. Presse (`/press/`)

**Liste épurée** :
- Chaque article : titre, publication, date, extrait
- Image miniature à gauche si disponible
- Lien vers article ou PDF en téléchargement
- Design sobre type liste éditoriale

### 8. À propos (`/about/`)

**Layout en sections** :
- Portrait photo + introduction (layout split : photo gauche, texte droite)
- Biographie en texte long, une seule colonne, typographie soignée
- Démarche artistique : section dédiée avec typographie serif italique
- CV/Parcours : timeline simple verticale (année + description)

### 9. Contact (`/contact/`)

**Layout minimaliste** :
- Texte d'invitation sobre
- Email cliquable (mailto:)
- Réseaux sociaux (icônes avec hover)
- Pas de formulaire complexe — juste les infos essentielles
- Grande œuvre en arrière-plan très atténuée

### 10. Mentions légales (`/legal/`)
- Page simple, texte, pas de redesign nécessaire

---

## Animations — Charte

| Effet | Technologie | Utilisation |
|---|---|---|
| Fade-in au scroll | Intersection Observer + CSS `opacity/transform` | Toutes les sections, images, textes |
| Stagger (apparition décalée) | Intersection Observer + CSS `transition-delay` | Galeries, grilles, listes |
| Text reveal lettre par lettre | Splitting.js + CSS animations | Titres hero, titres de pages |
| Hover scale/opacity | CSS `transition` | Cartes, images de galerie |
| Smooth scroll | CSS `scroll-behavior: smooth` | Global |
| Page transitions | Astro `ViewTransitions` | Transitions entre pages |
| Cursor personnalisé | CSS + JS vanilla | Global |
| Carousel/slider images | Motion (React island) | Page détail œuvre |

**Règles d'animation** :
- `duration` : 0.6s — 0.8s pour les entrées, 0.3s pour les hovers
- `easing` : `cubic-bezier(0.25, 0.1, 0.25, 1)` (ease-out doux)
- `prefers-reduced-motion` : toujours respecter, désactiver les animations si activé
- Pas d'animation bloquante au-dessus du fold (le hero se charge immédiatement)
- Uniquement `transform` + `opacity` (pas de reflows)

---

## Structure des fichiers à créer/modifier

```
src/
  layouts/
    BaseLayout.astro        # Refonte : meta, fonts, cursor, ViewTransitions
    PageLayout.astro         # Refonte : header + footer + slot
  components/
    Header.astro             # Refonte complète : nav split 3 zones
    Footer.astro             # Refonte : minimaliste
    LanguageToggle.astro     # Adapter au nouveau header
    CustomCursor.astro       # Adapter : cercle agrandi au hover
    ScrollReveal.astro       # NOUVEAU : wrapper Intersection Observer
    TextReveal.astro         # NOUVEAU : titre animé avec Splitting.js
    MasonryGallery.astro     # NOUVEAU : grille masonry
    WorkCard.astro           # Refonte : hover avec overlay
    ExhibitionTimeline.astro # NOUVEAU : timeline verticale
    ImageCarousel.tsx        # NOUVEAU : React island avec Motion
    HeroSection.astro        # NOUVEAU : hero animé
    SeriesCard.astro         # NOUVEAU : carte série
    PressItem.astro          # NOUVEAU : item presse
    MobileMenu.astro         # NOUVEAU : menu hamburger plein écran
  pages/
    index.astro              # Refonte
    about.astro              # Refonte
    contact.astro            # Refonte
    press.astro              # Refonte
    legal.astro              # Minimal
    exhibitions/
      index.astro            # Refonte
      [slug].astro           # Refonte
    series/
      index.astro            # Refonte
      [slug].astro           # Refonte
    works/
      [slug].astro           # Refonte (détail œuvre)
      [location].astro       # NOUVEAU : page par lieu (bresil, dakar, etc.)
    en/                      # Miroir FR avec lang='en'
      (toutes les pages)
  styles/
    global.css               # Refonte : reset, fonts, variables, animations
```

---

## Données existantes (NE PAS modifier)

- `src/content/works/` — Oeuvres (YAML)
- `src/content/series/` — Séries (YAML)
- `src/content/exhibitions/` — Expositions (YAML)
- `src/content/press/` — Presse (YAML)
- `src/data/home.yaml` — Données accueil
- `src/data/about.yaml` — Données à propos
- `src/data/settings.yaml` — Paramètres site
- `keystatic.config.ts` — Config CMS (**NE PAS TOUCHER**)

---

## Contraintes

1. **Performance** : Lighthouse 95+ (lazy loading images, fonts optimisées, pas de JS inutile)
2. **Accessibilité** : WCAG 2.1 AA (alt text, focus visible, contrast ratio, aria labels)
3. **SEO** : meta tags, Open Graph, données structurées Schema.org (ArtGallery, VisualArtwork)
4. **Images** : utiliser `<Image>` d'Astro pour l'optimisation automatique (WebP, srcset)
5. **Mobile first** : responsive, touch-friendly, pas de hover-only interactions
6. **Bilingue** : FR par défaut, EN sous `/en/`. Utiliser les champs `*_fr` et `*_en` des collections
7. **Commits** : en français, conventionnels (`feat:`, `fix:`, `style:`, `refactor:`)
8. **Code** : en anglais (variables, composants, commentaires)
9. **Package manager** : pnpm (`npx --yes pnpm`)
10. **Consulter Context7** avant de coder (Astro, Tailwind, Motion)
11. **Utiliser Exa Search** quand bloqué ou pour trouver des patterns

---

## Ordre d'implémentation suggéré

### Phase 1 — Fondations
1. Installer Motion + Splitting.js, configurer les fonts Google
2. `global.css` (reset, fonts, variables CSS, classes d'animation)
3. `BaseLayout.astro` (meta, fonts, ViewTransitions, cursor)
4. `ScrollReveal.astro` + `TextReveal.astro` (composants d'animation réutilisables)
5. **→ BUILD TEST**

### Phase 2 — Navigation
6. `Header.astro` (nav split 3 zones, scroll effect)
7. `MobileMenu.astro` (hamburger plein écran)
8. `Footer.astro` (minimaliste)
9. `LanguageToggle.astro` (adaptation)
10. `CustomCursor.astro` (adaptation)
11. `PageLayout.astro` (assemblage header + footer + slot)
12. **→ BUILD TEST**

### Phase 3 — Accueil
13. `HeroSection.astro` (hero plein écran avec text reveal)
14. `WorkCard.astro` (refonte avec overlay hover)
15. `MasonryGallery.astro` (grille masonry)
16. `HomePage` (assemblage : hero + featured + expo + citation)
17. **→ BUILD TEST + TEST VISUEL CHROME**

### Phase 4 — Œuvres
18. Page works par lieu (`[location].astro`)
19. `ImageCarousel.tsx` (React island avec Motion)
20. Page détail œuvre (`[slug].astro`)
21. **→ BUILD TEST**

### Phase 5 — Séries & Expositions
22. `SeriesCard.astro`
23. Pages séries (index + détail)
24. `ExhibitionTimeline.astro`
25. Pages expositions (index + détail)
26. **→ BUILD TEST**

### Phase 6 — Pages secondaires
27. Page presse + `PressItem.astro`
28. Page à propos
29. Page contact
30. **→ BUILD TEST**

### Phase 7 — Pages EN
31. Dupliquer/adapter toutes les pages pour `/en/`
32. **→ BUILD TEST**

### Phase 8 — QA finale avec Chrome
33. Ouvrir le dev server dans Chrome MCP
34. Naviguer sur CHAQUE page (FR + EN)
35. Screenshots desktop (1440px) + mobile (375px) de chaque page
36. Tester toutes les interactions (nav, hover, scroll, carousel, menu mobile)
37. Vérifier les animations, les transitions entre pages
38. Lister et corriger tous les bugs visuels/fonctionnels
39. Build final + commit
