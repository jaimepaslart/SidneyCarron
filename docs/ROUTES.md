# Routes — Sidney Carron

> Site bilingue FR (défaut, sans préfixe) / EN (préfixe `/en`).
> Toutes les pages sont générées statiquement (SSG) par Astro.

## Convention

| Élément | FR (défaut) | EN |
|---|---|---|
| Préfixe de langue | _(aucun)_ | `/en` |
| Slug dynamique | `[slug]` généré depuis le champ `slug` de la collection | idem, slug EN dédié dans le frontmatter |

---

## Pages statiques

| Page | Route FR | Route EN | Méthode | Notes |
|---|---|---|---|---|
| Home | `/` | `/en/` | Statique | Page d'accueil, hero + sélection d'œuvres |
| Works index | `/works` | `/en/works` | Statique | Grille filtrables de toutes les œuvres |
| Series index | `/series` | `/en/series` | Statique | Liste de toutes les séries |
| Exhibitions | `/exhibitions` | `/en/exhibitions` | Statique | Liste chronologique des expositions |
| Press | `/press` | `/en/press` | Statique | Articles de presse et publications |
| About | `/about` | `/en/about` | Statique | Biographie, démarche, portrait |
| Contact | `/contact` | `/en/contact` | Statique | Formulaire de contact |

## Pages dynamiques

| Page | Route FR | Route EN | Paramètre | Source | Méthode |
|---|---|---|---|---|---|
| Work detail | `/works/[slug]` | `/en/works/[slug]` | `slug` | Collection `works` | `getStaticPaths()` |
| Series detail | `/series/[slug]` | `/en/series/[slug]` | `slug` | Collection `series` | `getStaticPaths()` |
| Exhibition detail | `/exhibitions/[slug]` | `/en/exhibitions/[slug]` | `slug` | Collection `exhibitions` | `getStaticPaths()` |

---

## Exemple de routes concrètes

### FR (défaut)

```
/
/works
/works/sculpture-bronze-1965
/series
/series/animaux
/exhibitions
/exhibitions/galerie-paris-2024
/press
/about
/contact
```

### EN

```
/en/
/en/works
/en/works/bronze-sculpture-1965
/en/series
/en/series/animals
/en/exhibitions
/en/exhibitions/paris-gallery-2024
/en/press
/en/about
/en/contact
```

---

## Redirections & Fallbacks

| Cas | Comportement |
|---|---|
| `/en` (sans trailing slash) | Redirige vers `/en/` |
| Route inconnue | Page 404 custom (bilingue, détection via le préfixe `/en`) |
| Ancien slug après renommage | Pas de redirection automatique — à gérer manuellement si besoin via `_redirects` |

---

## Implémentation i18n

### Stratégie : prefix-based routing

- **FR** : routes racine (pas de préfixe)
- **EN** : toutes les routes sous `/en/`
- La langue est détectée à partir du chemin (préfixe `/en` → anglais, sinon → français)
- Aucune détection automatique par le navigateur (pas de redirect basé sur `Accept-Language`)

### Fichiers de traduction

```
src/
  i18n/
    translations/
      fr.json       # Traductions UI français
      en.json       # Traductions UI anglais
    utils.ts        # Helpers : getLangFromUrl(), useTranslations()
```

### Structure des pages Astro

```
src/pages/
  index.astro                   # Home FR
  works/
    index.astro                 # Works index FR
    [slug].astro                # Work detail FR
  series/
    index.astro                 # Series index FR
    [slug].astro                # Series detail FR
  exhibitions/
    index.astro                 # Exhibitions index FR
    [slug].astro                # Exhibition detail FR
  press.astro                   # Press FR
  about.astro                   # About FR
  contact.astro                 # Contact FR
  en/
    index.astro                 # Home EN
    works/
      index.astro               # Works index EN
      [slug].astro              # Work detail EN
    series/
      index.astro               # Series index EN
      [slug].astro              # Series detail EN
    exhibitions/
      index.astro               # Exhibitions index EN
      [slug].astro              # Exhibition detail EN
    press.astro                 # Press EN
    about.astro                 # About EN
    contact.astro               # Contact EN
  404.astro                     # Page 404 custom
```

### Alternative : shared templates

Pour éviter la duplication, chaque page `en/*.astro` peut importer le même composant de contenu que la version FR, en lui passant `lang="en"`. Le layout détecte la langue et charge les bonnes traductions.

```astro
---
// src/pages/en/about.astro
import AboutPage from '../../components/pages/AboutPage.astro';
---
<AboutPage lang="en" />
```

---

## Sitemap

Le sitemap XML sera généré automatiquement via `@astrojs/sitemap` et inclura toutes les routes FR et EN avec les balises `<xhtml:link rel="alternate">` pour le lien entre versions linguistiques.

---

## Balises hreflang

Chaque page inclut dans son `<head>` :

```html
<link rel="alternate" hreflang="fr" href="https://sidneycarron.com/about" />
<link rel="alternate" hreflang="en" href="https://sidneycarron.com/en/about" />
<link rel="alternate" hreflang="x-default" href="https://sidneycarron.com/about" />
```
