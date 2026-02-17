# Acceptance Criteria — Sidney Carron

> Critères d'acceptation par page. Format : checklist + Given/When/Then pour les comportements interactifs.

---

## Globals (toutes les pages)

### Navigation

- [ ] Header sticky avec logo Sidney Carron (lien vers Home)
- [ ] Menu de navigation : Works, Series, Exhibitions, Press, About, Contact
- [ ] Sélecteur de langue FR/EN visible dans le header
- [ ] Le lien de la page active est visuellement distingué (souligné ou bold)
- [ ] Navigation responsive : hamburger menu sur mobile (< 768px)
- [ ] Footer avec : nom de l'artiste, copyright, liens légaux, réseaux sociaux

### SEO global

- [ ] Chaque page a un `<title>` unique et descriptif
- [ ] Chaque page a une `<meta name="description">` unique
- [ ] Balises Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- [ ] Balises `hreflang` FR + EN + x-default
- [ ] Canonical URL sur chaque page
- [ ] Sitemap XML avec toutes les routes FR/EN
- [ ] `robots.txt` autorisant le crawl

### Accessibilité

- [ ] Contraste minimum 4.5:1 (WCAG AA)
- [ ] Navigation au clavier complète (focus visible)
- [ ] `alt` sur toutes les images (descriptif pour les œuvres, vide pour les décoratives)
- [ ] Landmarks ARIA : `<header>`, `<nav>`, `<main>`, `<footer>`
- [ ] Skip-to-content link en haut de page
- [ ] `lang` attribut sur `<html>` correspond à la langue de la page

### Performance

- [ ] Lighthouse Performance ≥ 95
- [ ] Images en WebP/AVIF avec fallback
- [ ] Lazy loading sur toutes les images hors viewport
- [ ] Fonts optimisées (preload, font-display: swap)

---

## 1. Home (`/` | `/en/`)

### Description
Page d'accueil immersive de type "white museum". Premier contact avec l'univers de Sidney Carron. Mise en avant d'œuvres sélectionnées et d'un texte d'introduction.

### Éléments visibles

- [ ] Hero section : image ou vidéo plein écran avec le nom de l'artiste
- [ ] Texte d'introduction court (2-3 phrases)
- [ ] Sélection d'œuvres phares (grille de 4-6 œuvres avec image + titre)
- [ ] Lien "Voir toutes les œuvres" → `/works`
- [ ] Section expositions récentes (2-3 dernières)
- [ ] Section presse récente (2-3 derniers articles)

### Comportements

```gherkin
Given je suis sur la page d'accueil
When je clique sur une œuvre de la sélection
Then je suis redirigé vers la page de détail de cette œuvre

Given je suis sur la page d'accueil
When je scrolle
Then les sections apparaissent avec des animations subtiles (fade-in)
```

### SEO

- [ ] H1 : « Sidney Carron » (ou « Sidney Carron — Artiste sculpteur »)
- [ ] `<title>` : « Sidney Carron — Sculpteur »
- [ ] JSON-LD : `Person` (artiste) + `WebSite`

---

## 2. Works Index (`/works` | `/en/works`)

### Description
Galerie complète des œuvres de l'artiste. Grille d'images avec système de filtres.

### Éléments visibles

- [ ] Titre de la page (H1) : « Œuvres » / « Works »
- [ ] Filtres : par série, par année, par technique/matériau
- [ ] Grille d'images responsive (masonry ou grid régulière)
- [ ] Chaque carte : image, titre, année, technique
- [ ] Nombre total d'œuvres affichées
- [ ] État vide si aucun résultat de filtre : message « Aucune œuvre trouvée »

### Comportements

```gherkin
Given je suis sur la page Works
When je sélectionne un filtre (ex: série "Animaux")
Then la grille affiche uniquement les œuvres de cette série
And le filtre actif est visuellement mis en avant
And l'URL ne change pas (filtrage côté client)

Given je suis sur la page Works
When je clique sur une œuvre
Then je suis redirigé vers la page de détail de cette œuvre

Given je suis sur la page Works avec un filtre actif
When je clique sur "Tout afficher" / "Clear filters"
Then tous les filtres sont réinitialisés et toutes les œuvres sont visibles

Given je suis sur la page Works
When je survole une carte d'œuvre (desktop)
Then un effet de hover subtil est visible (zoom léger ou overlay)
```

### SEO

- [ ] H1 : « Œuvres » / « Works »
- [ ] `<title>` : « Œuvres — Sidney Carron » / « Works — Sidney Carron »
- [ ] JSON-LD : `CollectionPage` avec `hasPart` listant les œuvres

---

## 3. Work Detail (`/works/[slug]` | `/en/works/[slug]`)

### Description
Page de détail d'une œuvre individuelle. Grande image, informations détaillées, navigation vers les œuvres adjacentes.

### Éléments visibles

- [ ] Image principale de l'œuvre (grande, haute qualité)
- [ ] Galerie d'images supplémentaires si disponibles (thumbnails cliquables)
- [ ] Titre de l'œuvre (H1)
- [ ] Informations : année, technique, dimensions, matériaux
- [ ] Série d'appartenance (lien vers la série)
- [ ] Description/texte sur l'œuvre (si disponible)
- [ ] Navigation « Œuvre précédente / suivante »
- [ ] Bouton retour vers la grille Works

### Comportements

```gherkin
Given je suis sur la page de détail d'une œuvre
When je clique sur une image thumbnail
Then l'image principale change pour afficher le thumbnail sélectionné

Given je suis sur la page de détail d'une œuvre
When je clique sur l'image principale
Then une lightbox s'ouvre avec l'image en plein écran
And je peux naviguer entre les images avec les flèches
And je peux fermer la lightbox avec Échap ou un bouton ×

Given je suis sur la page de détail d'une œuvre
When je clique sur "Œuvre suivante"
Then je suis redirigé vers la prochaine œuvre (ordre chronologique ou de collection)

Given je suis sur la page de détail d'une œuvre
When je clique sur le nom de la série
Then je suis redirigé vers la page de détail de cette série
```

### SEO

- [ ] H1 : titre de l'œuvre
- [ ] `<title>` : « [Titre] — Sidney Carron »
- [ ] `og:image` : image principale de l'œuvre
- [ ] JSON-LD : `VisualArtwork` avec `name`, `dateCreated`, `artMedium`, `artworkSurface`, `image`, `creator`

---

## 4. Series Index (`/series` | `/en/series`)

### Description
Liste de toutes les séries de l'artiste. Chaque série est représentée par une image de couverture et un court descriptif.

### Éléments visibles

- [ ] Titre de la page (H1) : « Séries » / « Series »
- [ ] Grille de cartes : une par série
- [ ] Chaque carte : image de couverture, nom de la série, nombre d'œuvres, courte description
- [ ] Ordre : par pertinence artistique ou chronologie inversée

### Comportements

```gherkin
Given je suis sur la page Series
When je clique sur une carte de série
Then je suis redirigé vers la page de détail de cette série
```

### SEO

- [ ] H1 : « Séries » / « Series »
- [ ] `<title>` : « Séries — Sidney Carron » / « Series — Sidney Carron »
- [ ] JSON-LD : `CollectionPage`

---

## 5. Series Detail (`/series/[slug]` | `/en/series/[slug]`)

### Description
Page de détail d'une série. Texte de présentation de la série + toutes les œuvres de cette série.

### Éléments visibles

- [ ] Nom de la série (H1)
- [ ] Image de couverture / hero de la série
- [ ] Texte de présentation de la série
- [ ] Grille de toutes les œuvres appartenant à cette série
- [ ] Chaque carte œuvre : image, titre, année
- [ ] Navigation vers les autres séries (liens ou carrousel)

### Comportements

```gherkin
Given je suis sur la page de détail d'une série
When je clique sur une œuvre dans la grille
Then je suis redirigé vers la page de détail de cette œuvre

Given je suis sur la page de détail d'une série
When je clique sur une autre série dans la navigation inter-séries
Then je suis redirigé vers la page de détail de cette série
```

### SEO

- [ ] H1 : nom de la série
- [ ] `<title>` : « [Nom série] — Séries — Sidney Carron »
- [ ] `og:image` : image de couverture de la série
- [ ] JSON-LD : `CollectionPage` avec lien vers les `VisualArtwork`

---

## 6. Exhibitions Index (`/exhibitions` | `/en/exhibitions`)

### Description
Liste chronologique des expositions (passées et à venir). Séparées visuellement.

### Éléments visibles

- [ ] Titre de la page (H1) : « Expositions » / « Exhibitions »
- [ ] Section « À venir » (si expositions futures existent)
- [ ] Section « Passées » (chronologie inversée)
- [ ] Chaque entrée : titre de l'exposition, lieu, dates, image (optionnelle)
- [ ] Badge « En cours » pour les expositions actuellement en cours

### Comportements

```gherkin
Given je suis sur la page Exhibitions
When je clique sur une exposition
Then je suis redirigé vers la page de détail de cette exposition
```

### SEO

- [ ] H1 : « Expositions » / « Exhibitions »
- [ ] `<title>` : « Expositions — Sidney Carron » / « Exhibitions — Sidney Carron »
- [ ] JSON-LD : `CollectionPage` avec liste d'`ExhibitionEvent`

---

## 7. Exhibition Detail (`/exhibitions/[slug]` | `/en/exhibitions/[slug]`)

### Description
Page de détail d'une exposition. Informations complètes, galerie photo, œuvres présentées.

### Éléments visibles

- [ ] Titre de l'exposition (H1)
- [ ] Dates de début et fin
- [ ] Lieu (nom + adresse)
- [ ] Texte de présentation / communiqué
- [ ] Galerie photos de l'exposition (si disponible)
- [ ] Liste des œuvres présentées (liens vers les fiches œuvres)
- [ ] Lien externe vers le site du lieu/galerie (si disponible)

### Comportements

```gherkin
Given je suis sur la page de détail d'une exposition
When je clique sur une photo de la galerie
Then une lightbox s'ouvre

Given je suis sur la page de détail d'une exposition
When je clique sur une œuvre listée
Then je suis redirigé vers la page de détail de cette œuvre
```

### SEO

- [ ] H1 : titre de l'exposition
- [ ] `<title>` : « [Titre expo] — Expositions — Sidney Carron »
- [ ] JSON-LD : `ExhibitionEvent` avec `name`, `startDate`, `endDate`, `location`, `image`

---

## 8. Press (`/press` | `/en/press`)

### Description
Page regroupant les articles de presse, publications et mentions médiatiques.

### Éléments visibles

- [ ] Titre de la page (H1) : « Presse » / « Press »
- [ ] Liste d'articles ordonnés par date (plus récent en premier)
- [ ] Chaque entrée : titre de l'article, nom de la publication, date, extrait (optionnel)
- [ ] Image de couverture ou logo de la publication (optionnel)
- [ ] Lien externe vers l'article source (nouvelle fenêtre)
- [ ] Téléchargement PDF si disponible

### Comportements

```gherkin
Given je suis sur la page Press
When je clique sur un article avec lien externe
Then l'article s'ouvre dans un nouvel onglet (target="_blank" rel="noopener")

Given je suis sur la page Press
When je clique sur le PDF d'un article
Then le PDF se télécharge ou s'ouvre dans un nouvel onglet
```

### SEO

- [ ] H1 : « Presse » / « Press »
- [ ] `<title>` : « Presse — Sidney Carron » / « Press — Sidney Carron »
- [ ] JSON-LD : `CollectionPage` avec liste de `NewsArticle`

---

## 9. About (`/about` | `/en/about`)

### Description
Page biographique de l'artiste. Portrait, démarche artistique, parcours.

### Éléments visibles

- [ ] Titre de la page (H1) : « À propos » / « About »
- [ ] Portrait photo de l'artiste
- [ ] Biographie (texte long, structuré avec sous-titres H2/H3)
- [ ] Démarche artistique
- [ ] Parcours / CV artistique (formations, résidences)
- [ ] Lien vers la page Contact

### Comportements

Pas de comportement interactif spécifique. Page essentiellement textuelle.

### SEO

- [ ] H1 : « À propos de Sidney Carron » / « About Sidney Carron »
- [ ] `<title>` : « À propos — Sidney Carron » / « About — Sidney Carron »
- [ ] `og:image` : portrait de l'artiste
- [ ] JSON-LD : `Person` avec `name`, `description`, `image`, `sameAs` (liens réseaux sociaux)

---

## 10. Contact (`/contact` | `/en/contact`)

### Description
Formulaire de contact pour les galeries, collectionneurs, presse et visiteurs.

### Éléments visibles

- [ ] Titre de la page (H1) : « Contact » / « Contact »
- [ ] Formulaire avec champs : Nom, Email, Sujet (dropdown : Galerie, Collectionneur, Presse, Autre), Message
- [ ] Bouton d'envoi
- [ ] Texte d'introduction (« Pour toute demande... »)
- [ ] Informations de contact directes (email, réseaux sociaux) — optionnel selon souhait de l'artiste
- [ ] Mention RGPD / politique de confidentialité sous le formulaire

### Comportements

```gherkin
Given je suis sur la page Contact
When je soumets le formulaire avec des champs valides
Then un message de confirmation s'affiche
And le formulaire est réinitialisé

Given je suis sur la page Contact
When je soumets le formulaire avec un champ obligatoire vide
Then un message d'erreur s'affiche sous le champ concerné
And le formulaire n'est pas envoyé

Given je suis sur la page Contact
When je soumets le formulaire avec un email invalide
Then un message d'erreur s'affiche sous le champ email

Given je suis sur la page Contact
When le formulaire est en cours d'envoi
Then le bouton d'envoi affiche un état de chargement
And le bouton est désactivé pour éviter le double envoi
```

### SEO

- [ ] H1 : « Contact »
- [ ] `<title>` : « Contact — Sidney Carron »
- [ ] JSON-LD : `ContactPage`

---

## Page 404

### Description
Page d'erreur personnalisée, cohérente avec l'identité visuelle du site.

### Éléments visibles

- [ ] Message d'erreur clair (« Page non trouvée » / « Page not found »)
- [ ] Illustration ou image en accord avec l'univers de l'artiste
- [ ] Lien vers la page d'accueil
- [ ] Barre de navigation toujours accessible

### Détection de la langue

- Si l'URL commence par `/en/` → afficher la 404 en anglais
- Sinon → afficher la 404 en français
