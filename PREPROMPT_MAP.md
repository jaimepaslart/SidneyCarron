# PREPROMPT — Carte Interactive des Créations de Sidney Carron

## Contexte

Tu travailles sur le site de l'artiste **Sidney Carron** (`/Users/paulbihr/Sites/SidneyCarron`).
Le site existe déjà (Astro 5.7 + Tailwind 3.4 + Motion 12 + Keystatic + Netlify).

L'artiste crée ses œuvres en voyageant à travers le monde. Chaque lieu est une source d'inspiration unique. L'objectif est de créer une **carte interactive du monde** qui montre visuellement où Sidney Carron a créé ses œuvres, avec navigation vers les galeries correspondantes.

**Source de données exclusive** : le dossier `Data/` à la racine du projet (PAS le contenu existant dans `src/content/`). Ce dossier contient les médias bruts organisés par lieu.

---

## Mode opératoire — OBLIGATOIRE

### 1. Plan Mode
- **Commence par activer le Plan Mode** (`EnterPlanMode`)
- Explore le codebase existant pour comprendre l'architecture, les styles, les conventions
- Analyse le dossier `Data/` et son contenu
- Rédige un plan d'implémentation détaillé
- Attends l'approbation avant de coder

### 2. Team Mode
- **Crée une équipe** (`TeamCreate`) pour paralléliser le travail
- **Le lead ne code JAMAIS** — il coordonne, crée les tâches, assigne, synthétise
- Tout le code est écrit par les coéquipiers (teammates)
- **Modèle** : utilise exclusivement **Opus 4.6** pour tous les agents

### 3. Recherche & Documentation — MCP obligatoires
- **Context7** : consulte TOUJOURS la doc avant de coder. IDs :
  - Astro → `/withastro/docs`
  - Tailwind CSS → `/websites/v3_tailwindcss`
  - Motion → `/websites/motion_dev`
- **Exa Search** (`web_search_advanced_exa`) : pour patterns de cartes interactives SVG, exemples d'artistes avec maps, bonnes pratiques
- **Ne te fie JAMAIS uniquement à ta mémoire** — vérifie systématiquement

### 4. Tests continus
- **Build test** après chaque étape : `cd /Users/paulbihr/Sites/SidneyCarron && /opt/homebrew/bin/npx --yes pnpm build`
- **Dev server** pour tests visuels : `cd /Users/paulbihr/Sites/SidneyCarron && /opt/homebrew/bin/npx --yes pnpm dev`
- **Ne jamais accumuler du code sans builder** — tester incrémentalement

### 5. QA finale — Chrome MCP
- Utilise les outils Chrome (`mcp__claude-in-chrome__*`) pour vérifier visuellement le rendu final sur desktop et mobile

---

## Source de données : dossier `Data/`

### Lieux et médias disponibles

| Lieu | Dossier Data | Fichiers | Coordonnées GPS (approx.) |
|---|---|---|---|
| **Brésil** | `Data/Brésil/` | 17 photos | -14.235, -51.925 |
| **Sénégal — Dakar** | `Data/Sénégal Dakar/` | 58 photos | 14.716, -17.467 |
| **Saint-Tropez** | `Data/Saint Tropez/` | 24 photos | 43.272, 6.640 |
| **Costa Rica** | `Data/Costa Rica/` | 22 photos | 9.748, -83.753 |
| **La Réunion** | `Data/Ile de la reunion/` + `Data/Réunion /` | 26 photos (20+6) | -21.115, 55.536 |
| **Sri Lanka** | `Data/Sri Lanka/` | 12 photos | 7.873, 80.772 |
| **Guadeloupe** | `Data/Guadeloupe/` | 3 photos | 16.265, -61.551 |
| **Paris — JonOne / Basille Design Center** | `Data/Exposition Jonone Basille Design Center (. Paris) en 2023/` | 20 photos | 48.857, 2.352 |
| **Paris — Théâtre Antoine** | `Data/Exposition Théatre Antoine Paris /` | 2 photos | 48.870, 2.336 |
| **Coupe des Alpes — Art Car** | `Data/Coupe des Alpes 2023 avec Peugeot ( anniversaire 205 Gti)/` | 5 photos | 45.191, 5.727 |

**Vidéos** : `Data/videos/` — 2 fichiers MP4
**Documents** : Bio PDF, Expositions PDF, Poème PDF, Logo SVG, Photo de l'artiste

### Notes sur les données
- **Ile de la reunion** et **Réunion** sont le même lieu → fusionner en "La Réunion"
- **Paris** a deux sous-lieux (JonOne + Théâtre Antoine) → un seul point "Paris" sur la carte avec les deux regroupés
- Les noms de fichiers suivent le format `PHOTO-2026-02-11-HH-MM-SS*.jpg`
- Les images sont des JPG haute résolution → **optimiser avant d'intégrer** (WebP, srcset, lazy loading)

---

## Concept visuel — La carte

### Inspiration
Le concept s'inspire du moodboard physique de l'artiste : des clusters de photos disposés sur une surface blanche, reliés à des points géographiques. L'idée est de transposer ce geste analogique en une expérience digitale élégante.

### Principes de design
1. **Fond blanc** — cohérent avec l'esthétique galerie du site (pas de fond sombre type Google Maps)
2. **Carte SVG custom** — silhouettes minimalistes des continents, trait fin `#E5E5E5`, pas de labels pays
3. **Points actifs** — petits cercles `#1A1A1A` positionnés sur chaque lieu de création
4. **Nom du lieu** — label discret en `font-display` (Syne) à côté de chaque point
5. **Interaction** — au hover/tap sur un point : aperçu (1-3 images miniatures) + nombre d'œuvres + lien vers la galerie
6. **Mobile** — la carte se transforme en liste verticale élégante avec miniatures
7. **Pas de librairie cartographique lourde** — SVG pur, pas de Mapbox/Leaflet/Google Maps
8. **Animations subtiles** — les points apparaissent en stagger au scroll, pulse léger au hover

### Layout desktop (une seule page)

```
┌─────────────────────────────────────────────────────────────┐
│                      [HEADER existant]                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   "CRÉATIONS                                                │
│    À TRAVERS                                                │
│    LE MONDE"        (titre en Syne, grande taille,          │
│                      TextReveal animation)                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│         ·  Dakar                                            │
│           \                    · Sri Lanka                  │
│    · Brésil \      · Paris    /                             │
│              \    · Alpes    /                              │
│   · Costa Rica \  · St-Tropez                              │
│                 \                                           │
│  · Guadeloupe    \_________· La Réunion                    │
│                                                             │
│        [ CARTE SVG DU MONDE — minimaliste ]                │
│        [ Points positionnés sur les lieux ]                │
│        [ Hover → popup avec miniatures    ]                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                      [FOOTER existant]                       │
└─────────────────────────────────────────────────────────────┘
```

### Layout mobile (liste verticale)

```
┌──────────────────────┐
│    [HEADER]           │
├──────────────────────┤
│                       │
│  CRÉATIONS            │
│  À TRAVERS            │
│  LE MONDE             │
│                       │
├──────────────────────┤
│ ┌──────────────────┐ │
│ │ 📍 Dakar          │ │
│ │ 58 œuvres         │ │
│ │ [img] [img] [img] │ │
│ │ Voir la galerie → │ │
│ └──────────────────┘ │
│                       │
│ ┌──────────────────┐ │
│ │ 📍 Saint-Tropez   │ │
│ │ 24 œuvres         │ │
│ │ [img] [img] [img] │ │
│ │ Voir la galerie → │ │
│ └──────────────────┘ │
│                       │
│  ... (chaque lieu)    │
│                       │
├──────────────────────┤
│    [FOOTER]           │
└──────────────────────┘
```

---

## Spécifications techniques

### 1. Carte SVG (`WorldMap.astro`)

**Approche** : SVG inline avec les contours simplifiés des continents. Pas besoin de précision géographique — c'est un objet artistique, pas un atlas.

```
Composant Astro (pas React) avec :
- <svg viewBox="0 0 1200 600"> pour ratio 2:1
- Paths simplifiés pour les continents (trait fin #E5E5E5, fill transparent ou #FAFAFA)
- Cercles <circle> positionnés aux coordonnées de chaque lieu
- Labels <text> en Syne pour les noms de lieux
- Groupes <g> cliquables pour chaque lieu
- Animation d'entrée : les points apparaissent en stagger (opacity + scale)
- État hover : circle scale(1.5) + popup
```

**Coordonnées SVG** : convertir lat/long en x/y dans le viewBox 1200×600 avec une projection équirectangulaire simplifiée :
- `x = (longitude + 180) × (1200 / 360)`
- `y = (90 - latitude) × (600 / 180)`

### 2. Popup de lieu (`MapTooltip.astro`)

Au hover (desktop) ou tap (mobile) sur un point :
```
┌────────────────────────┐
│  DAKAR                 │
│  Sénégal               │
│  58 œuvres             │
│                        │
│  [img] [img] [img]     │  ← 3 miniatures (150×100px)
│                        │
│  Découvrir →           │  ← Lien vers /works/dakar/
└────────────────────────┘
```

- Position : au-dessus ou en-dessous du point selon l'espace disponible
- Fond blanc, ombre légère (`shadow-lg`)
- Apparition : fade + slight translateY
- Les miniatures sont des images optimisées depuis `Data/` (les 3 premières de chaque dossier)

### 3. Liste mobile (`MapMobileList.astro`)

Sur mobile (< 768px), la carte SVG est masquée et remplacée par une liste verticale :
- Chaque lieu est un bloc avec :
  - Nom du lieu + pays en Syne
  - Nombre d'œuvres
  - Bande horizontale scrollable de 3-5 miniatures
  - Lien "Voir la galerie →"
- Apparition en stagger au scroll (Intersection Observer)
- Ordre : par nombre d'œuvres décroissant (Dakar 58, Saint-Tropez 24, Costa Rica 22, ...)

### 4. Page de la carte (`/map/` et `/en/map/`)

Nouvelle page Astro avec :
- Utilise `PageLayout.astro` existant
- Titre animé "Créations à travers le monde" / "Creations around the world" (TextReveal)
- Sous-titre optionnel : "Sidney Carron puise son inspiration aux quatre coins du globe"
- Composant carte SVG (desktop) / liste (mobile)
- i18n : FR par défaut, EN sous `/en/map/`
- Meta tags + Open Graph pour le SEO

### 5. Intégration dans la navigation

- Ajouter "Carte" / "Map" dans le header (zone droite, avec les autres pages)
- Ajouter dans le menu mobile
- Optionnel : un CTA "Explorer la carte" sur la page d'accueil

### 6. Traitement des images

Les images du dossier `Data/` doivent être :
1. **Copiées** vers `public/images/map/` (organisées par lieu : `public/images/map/dakar/`, etc.)
2. **Optimisées** : redimensionnées à max 800px de large pour les galeries, 300px pour les miniatures
3. **Converties** en WebP si possible
4. **Nommées proprement** : `dakar-01.jpg`, `dakar-02.jpg`, etc. (au lieu des noms WhatsApp)

**Script d'optimisation** : créer un script `scripts/optimize-map-images.sh` qui :
- Copie les images depuis `Data/` vers `public/images/map/`
- Redimensionne avec `sips` (macOS natif)
- Renomme de manière séquentielle
- Génère un manifest JSON (`src/data/map-locations.json`) avec la liste des lieux et leurs images

### 7. Données structurées (`src/data/map-locations.json`)

```json
{
  "locations": [
    {
      "id": "dakar",
      "name_fr": "Dakar",
      "name_en": "Dakar",
      "country_fr": "Sénégal",
      "country_en": "Senegal",
      "latitude": 14.716,
      "longitude": -17.467,
      "works_count": 58,
      "slug": "dakar",
      "images": ["dakar-01.jpg", "dakar-02.jpg", "dakar-03.jpg"],
      "thumbnail": "dakar-01.jpg",
      "data_source": "Sénégal Dakar"
    },
    {
      "id": "saint-tropez",
      "name_fr": "Saint-Tropez",
      "name_en": "Saint-Tropez",
      "country_fr": "France",
      "country_en": "France",
      "latitude": 43.272,
      "longitude": 6.640,
      "works_count": 24,
      "slug": "saint-tropez",
      "images": ["saint-tropez-01.jpg", "saint-tropez-02.jpg", "saint-tropez-03.jpg"],
      "thumbnail": "saint-tropez-01.jpg",
      "data_source": "Saint Tropez"
    },
    {
      "id": "bresil",
      "name_fr": "Brésil",
      "name_en": "Brazil",
      "country_fr": "Brésil",
      "country_en": "Brazil",
      "latitude": -14.235,
      "longitude": -51.925,
      "works_count": 17,
      "slug": "bresil",
      "images": ["bresil-01.jpg", "bresil-02.jpg", "bresil-03.jpg"],
      "thumbnail": "bresil-01.jpg",
      "data_source": "Brésil"
    },
    {
      "id": "costa-rica",
      "name_fr": "Costa Rica",
      "name_en": "Costa Rica",
      "country_fr": "Costa Rica",
      "country_en": "Costa Rica",
      "latitude": 9.748,
      "longitude": -83.753,
      "works_count": 22,
      "slug": "costa-rica",
      "images": ["costa-rica-01.jpg", "costa-rica-02.jpg", "costa-rica-03.jpg"],
      "thumbnail": "costa-rica-01.jpg",
      "data_source": "Costa Rica"
    },
    {
      "id": "reunion",
      "name_fr": "La Réunion",
      "name_en": "Réunion Island",
      "country_fr": "France (Outre-mer)",
      "country_en": "France (Overseas)",
      "latitude": -21.115,
      "longitude": 55.536,
      "works_count": 26,
      "slug": "reunion",
      "images": ["reunion-01.jpg", "reunion-02.jpg", "reunion-03.jpg"],
      "thumbnail": "reunion-01.jpg",
      "data_source": "Ile de la reunion"
    },
    {
      "id": "sri-lanka",
      "name_fr": "Sri Lanka",
      "name_en": "Sri Lanka",
      "country_fr": "Sri Lanka",
      "country_en": "Sri Lanka",
      "latitude": 7.873,
      "longitude": 80.772,
      "works_count": 12,
      "slug": "sri-lanka",
      "images": ["sri-lanka-01.jpg", "sri-lanka-02.jpg", "sri-lanka-03.jpg"],
      "thumbnail": "sri-lanka-01.jpg",
      "data_source": "Sri Lanka"
    },
    {
      "id": "guadeloupe",
      "name_fr": "Guadeloupe",
      "name_en": "Guadeloupe",
      "country_fr": "France (Outre-mer)",
      "country_en": "France (Overseas)",
      "latitude": 16.265,
      "longitude": -61.551,
      "works_count": 3,
      "slug": "guadeloupe",
      "images": ["guadeloupe-01.jpg", "guadeloupe-02.jpg", "guadeloupe-03.jpg"],
      "thumbnail": "guadeloupe-01.jpg",
      "data_source": "Guadeloupe"
    },
    {
      "id": "paris",
      "name_fr": "Paris",
      "name_en": "Paris",
      "country_fr": "France",
      "country_en": "France",
      "latitude": 48.857,
      "longitude": 2.352,
      "works_count": 22,
      "slug": "paris",
      "images": ["paris-01.jpg", "paris-02.jpg", "paris-03.jpg"],
      "thumbnail": "paris-01.jpg",
      "data_source": "Exposition Jonone Basille Design Center (. Paris) en 2023",
      "sub_locations": [
        {
          "name_fr": "JonOne — Basille Design Center (2023)",
          "name_en": "JonOne — Basille Design Center (2023)",
          "files_count": 20,
          "data_source": "Exposition Jonone Basille Design Center (. Paris) en 2023"
        },
        {
          "name_fr": "Théâtre Antoine",
          "name_en": "Théâtre Antoine",
          "files_count": 2,
          "data_source": "Exposition Théatre Antoine Paris "
        }
      ]
    },
    {
      "id": "alpes",
      "name_fr": "Coupe des Alpes",
      "name_en": "Alps Cup",
      "country_fr": "France",
      "country_en": "France",
      "latitude": 45.191,
      "longitude": 5.727,
      "works_count": 5,
      "slug": "alpes",
      "images": ["alpes-01.jpg", "alpes-02.jpg", "alpes-03.jpg"],
      "thumbnail": "alpes-01.jpg",
      "data_source": "Coupe des Alpes 2023 avec Peugeot ( anniversaire 205 Gti)",
      "special_project": "Art Car — Peugeot 205 GTi (2023)"
    }
  ]
}
```

---

## Conventions du site existant — À RESPECTER

### Design tokens (tailwind.config.mjs)
```js
colors: {
  white: '#FFFFFF',
  text: '#1A1A1A',
  secondary: '#666666',
  muted: '#999999',
  border: '#E5E5E5',
  hover: '#333333',
  surface: '#F5F5F5',
}
fontFamily: {
  sans: ['"Inter"', 'system-ui', 'sans-serif'],    // corps de texte
  display: ['"Syne"', 'sans-serif'],                // titres, navigation
}
```

### Animations (Motion library + CSS)
- Valeurs Rinaldi : `y:80→0, skewY:5→0, opacity:0→1, 1.2s, cubic-bezier(0.16,1,0.3,1), stagger 0.2s`
- Uniquement `transform` + `opacity` (pas de reflows)
- Toujours respecter `prefers-reduced-motion`
- `scroll()` de Motion pour les animations liées au scroll

### Composants existants à réutiliser
- `TextReveal.astro` — animation de titre lettre par lettre
- `ScrollReveal.astro` — wrapper Intersection Observer (si existant)
- `Header.astro` / `MobileMenu.astro` — navigation (ajouter le lien "Carte")
- `PageLayout.astro` — layout de page standard
- `BaseLayout.astro` — layout de base avec meta, fonts, etc.

### i18n
- Système existant dans `src/i18n/` avec `fr.ts` et `en.ts`
- Fonction `getTranslation(lang)` pour accéder aux traductions
- Fonction `getLocalizedPath(lang, path)` pour les liens
- Ajouter les traductions nécessaires dans les deux fichiers

---

## Fichiers à créer

```
src/
  components/
    WorldMap.astro              # Carte SVG interactive (desktop)
    MapTooltip.astro            # Popup au hover d'un point
    MapMobileList.astro         # Liste verticale mobile
    MapLocationCard.astro       # Carte d'un lieu (mobile)
  pages/
    map.astro                   # Page carte FR
    en/
      map.astro                 # Page carte EN
  data/
    map-locations.json          # Données structurées des lieux
public/
  images/
    map/
      dakar/                    # Miniatures optimisées
      saint-tropez/
      bresil/
      costa-rica/
      reunion/
      sri-lanka/
      guadeloupe/
      paris/
      alpes/
scripts/
  optimize-map-images.sh        # Script d'optimisation des images
```

## Fichiers à modifier

```
src/i18n/fr.ts                  # Ajouter traductions carte
src/i18n/en.ts                  # Ajouter traductions carte
src/components/Header.astro     # Ajouter lien "Carte" dans la nav
src/components/MobileMenu.astro # Ajouter lien "Carte" dans le menu mobile
```

---

## Traductions à ajouter

### FR (`src/i18n/fr.ts`)
```ts
'nav.map': 'Carte',
'map.title': 'Créations à travers le monde',
'map.subtitle': 'Sidney Carron puise son inspiration aux quatre coins du globe',
'map.works_count': '{count} œuvres',
'map.discover': 'Découvrir',
'map.view_gallery': 'Voir la galerie',
'map.special_project': 'Projet spécial',
'nav.scroll.map': 'Carte',
```

### EN (`src/i18n/en.ts`)
```ts
'nav.map': 'Map',
'map.title': 'Creations around the world',
'map.subtitle': 'Sidney Carron draws inspiration from every corner of the globe',
'map.works_count': '{count} works',
'map.discover': 'Discover',
'map.view_gallery': 'View gallery',
'map.special_project': 'Special project',
'nav.scroll.map': 'Map',
```

---

## Qualité et contraintes

1. **Performance** : la carte SVG doit être légère (< 50 KB). Pas de librairie cartographique externe
2. **Accessibilité** : `aria-label` sur chaque point, navigation clavier (Tab entre les points), `role="img"` sur le SVG avec `<title>` et `<desc>`
3. **Responsive** : carte SVG visible uniquement au-dessus de 768px, liste en-dessous
4. **SEO** : meta tags spécifiques, données structurées `Place` pour chaque lieu
5. **Images** : toutes les miniatures en lazy loading, optimisées en WebP si possible
6. **Animations** : cohérentes avec le reste du site (Motion + Intersection Observer)
7. **Prefers-reduced-motion** : désactiver les animations si activé
8. **Commits** : en français, conventionnels (`feat:`, `fix:`, `style:`)

---

## Ordre d'implémentation suggéré

### Phase 1 — Données et images
1. Créer le script `optimize-map-images.sh`
2. Exécuter le script pour copier/optimiser les images de `Data/` vers `public/images/map/`
3. Créer `src/data/map-locations.json` avec toutes les données
4. **→ VÉRIFIER que les images sont bien copiées**

### Phase 2 — Composants
5. Créer `WorldMap.astro` — carte SVG avec les continents et les points
6. Créer `MapTooltip.astro` — popup de lieu
7. Créer `MapMobileList.astro` + `MapLocationCard.astro` — vue mobile
8. **→ BUILD TEST**

### Phase 3 — Page et navigation
9. Créer `src/pages/map.astro` (FR) et `src/pages/en/map.astro` (EN)
10. Ajouter les traductions dans `fr.ts` et `en.ts`
11. Ajouter le lien "Carte" dans `Header.astro` et `MobileMenu.astro`
12. **→ BUILD TEST**

### Phase 4 — Animations et polish
13. Ajouter les animations d'entrée (stagger sur les points, fade sur le titre)
14. Ajouter les interactions (hover/tap sur les points)
15. Affiner le responsive (tablette, grand écran)
16. **→ BUILD TEST + TEST VISUEL CHROME**

### Phase 5 — QA
17. Tester desktop (1440px) et mobile (375px) avec Chrome MCP
18. Vérifier l'accessibilité (navigation clavier, screen reader)
19. Vérifier les performances (Lighthouse)
20. Corriger les bugs
21. Commit final

---

## Équipe suggérée

| Agent | Rôle | Tâches |
|---|---|---|
| **lead** | Chef d'équipe (ne code pas) | Coordination, création des tâches, review, synthèse |
| **data-engineer** | Traitement des données et images | Script d'optimisation, JSON de données, copie/renommage des images |
| **map-builder** | Carte SVG et composants | WorldMap, MapTooltip, MapMobileList, MapLocationCard |
| **integrator** | Pages et navigation | Pages map.astro, traductions i18n, liens dans Header/MobileMenu |

**Modèle** : tous les agents en **Opus 4.6**

---

## SVG de la carte mondiale — Guide

La carte SVG doit être **artistique et minimaliste**, pas géographiquement précise. Voici les principes :

1. **Trait** : `stroke: #E5E5E5; stroke-width: 0.5; fill: none` (ou `fill: #FAFAFA` très léger)
2. **Simplification** : les continents sont des formes simplifiées, pas besoin de chaque petite île
3. **viewBox** : `0 0 1200 600` (ratio 2:1)
4. **Projection** : équirectangulaire simplifiée (la plus simple à implémenter)
5. **Points** : `<circle r="4" fill="#1A1A1A">` avec `r="6"` au hover
6. **Labels** : `<text font-family="Syne" font-size="11" fill="#1A1A1A">` positionnés intelligemment pour ne pas se chevaucher
7. **Connexions optionnelles** : fines lignes courbes reliant les points (comme des routes de voyage) en `stroke: #E5E5E5; stroke-dasharray: 4 4`

**Alternative SVG** : utiliser un SVG de carte mondiale existant (Natural Earth simplified) et le nettoyer pour ne garder que les contours des continents. Chercher sur le web avec Exa un SVG open-source adapté.

---

## Remplacement du contenu existant — CRITIQUE

**TOUT le contenu média existant du site doit être remplacé** par le contenu du dossier `Data/`, réorganisé selon la nouvelle structure par lieu.

**Les SEULS médias à conserver en place** (ne pas toucher, ne pas déplacer) :
1. **Image hero** : `/images/hero-sidney-carron-new.jpg` — utilisée dans `HeroSection.astro`
2. **Vidéo reel** : `/videos/sid-reel.mp4` — utilisée dans `HomeExhibitionsSection.astro`

Tout le reste (images dans `public/images/works/`, etc.) sera remplacé par les photos du dossier `Data/`, optimisées et renommées proprement.

Les galeries par lieu (`/works/dakar/`, `/works/bresil/`, etc.) doivent être alimentées par les images de `Data/` et non plus par les anciens contenus.

Les nouveaux lieux non présents dans le site actuel (Guadeloupe, Paris, Alpes) doivent avoir leurs pages créées.

---

## Notes importantes

- **Ne PAS modifier `keystatic.config.ts`**
- **Source exclusive** : le dossier `Data/` à la racine
- Les deux médias à conserver : hero image + vidéo reel (voir ci-dessus)
- Tout le reste du contenu est remplacé par `Data/`
