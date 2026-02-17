# SEO & Performance — Checklist

> Audit SEO/Performance du site Sidney Carron
> Date : 2026-02-17
> 51 pages (FR + EN), Astro SSG, Tailwind CSS

---

## 1. Sitemap XML

| Point | Statut | Notes |
|---|---|---|
| @astrojs/sitemap configuré | ✅ | `astro.config.mjs` — i18n avec `fr-FR` / `en-US` |
| Routes FR dans le sitemap | ✅ | Toutes les pages FR sont listées |
| Routes EN dans le sitemap | ✅ | Toutes les pages EN sont listées |
| hreflang dans le sitemap | ⚠️ | Présent pour les pages avec slugs identiques FR/EN. Les pages avec slugs différents (ex: `cerf-au-repos` / `resting-stag`) n'ont pas de paire hreflang dans le sitemap — c'est une limitation connue de `@astrojs/sitemap`. Les hreflang sont correctement présents dans le HTML `<head>` (priorité pour Google). |
| `sitemap-index.xml` généré | ✅ | |

## 2. robots.txt

| Point | Statut | Notes |
|---|---|---|
| Fichier `public/robots.txt` | ✅ | |
| `User-agent: *` + `Allow: /` | ✅ | Tous les crawlers autorisés |
| Référence au sitemap | ✅ | `Sitemap: https://sidneycarron.com/sitemap-index.xml` |

## 3. OpenGraph + Twitter Cards

| Point | Statut | Notes |
|---|---|---|
| `og:title` | ✅ | Dynamique, bilingue |
| `og:description` | ✅ | Dynamique, bilingue |
| `og:image` | ✅ | Image spécifique par page, fallback `/images/og-default.jpg` |
| `og:url` | ✅ | URL canonique absolue |
| `og:type` | ✅ | `website` par défaut, configurable par page |
| `og:locale` | ✅ | `fr_FR` ou `en_US` selon la langue |
| `og:locale:alternate` | ✅ | Ajouté — pointe vers la locale alternative |
| `og:site_name` | ✅ | "Sidney Carron" |
| `twitter:card` | ✅ | `summary_large_image` |
| `twitter:title` | ✅ | Dynamique, bilingue |
| `twitter:description` | ✅ | Dynamique, bilingue |
| `twitter:image` | ✅ | Même que og:image |
| Image OG par défaut | ⚠️ | `/images/og-default.jpg` référencé mais le fichier n'existe pas encore. **Action requise** : créer une image 1200x630px avec le nom de l'artiste. |

## 4. JSON-LD (Données structurées)

| Page | Type(s) | Statut | Notes |
|---|---|---|---|
| Home | WebSite + Person | ✅ | `@graph` avec Person enrichi (jobTitle, image, sameAs) |
| Works (index) | CollectionPage | ✅ | Liste les VisualArtwork en `hasPart` |
| Work (detail) | VisualArtwork + BreadcrumbList | ✅ | Enrichi : name, description, dateCreated, artMedium, image, url, creator |
| Series (index) | CollectionPage | ✅ | |
| Series (detail) | CollectionPage + BreadcrumbList | ✅ | |
| Exhibitions (index) | CollectionPage | ✅ | |
| Exhibition (detail) | ExhibitionEvent + BreadcrumbList | ✅ | Enrichi : description, location (PostalAddress), organizer, url |
| About | Person + BreadcrumbList | ✅ | Enrichi : jobTitle, birthDate, nationality, workLocation, alumniOf, email, sameAs |
| Press | CollectionPage | ✅ | |
| Contact | ContactPage | ✅ | |
| 404 | — | ✅ | Pas de JSON-LD (normal) |

## 5. hreflang + Canonical

| Point | Statut | Notes |
|---|---|---|
| `<link rel="canonical">` | ✅ | URL absolue, présent sur toutes les pages |
| `hreflang="fr"` | ✅ | Pointe vers la version FR avec le slug FR |
| `hreflang="en"` | ✅ | Pointe vers la version EN avec le slug EN (corrigé pour les slugs différents) |
| `hreflang="x-default"` | ✅ | Pointe vers la version FR (langue par défaut) |
| URLs absolues | ✅ | Toutes avec `https://sidneycarron.com` |
| Slugs FR/EN corrects | ✅ | Prop `enCanonicalPath` ajouté pour les pages avec slugs localisés |

## 6. Structure sémantique HTML

| Point | Statut | Notes |
|---|---|---|
| H1 unique par page | ✅ | Vérifié sur toutes les pages |
| Hiérarchie H2/H3 logique | ✅ | Pas de sauts de niveaux |
| `<header>` avec `<nav>` | ✅ | `aria-label="Navigation principale"` |
| `<main id="main-content">` | ✅ | Présent sur toutes les pages |
| `<footer>` | ✅ | Avec sections Navigation, Contact, Réseaux |
| Skip-to-content | ✅ | `<a href="#main-content">` avec sr-only |
| ARIA labels | ✅ | Menu mobile, lightbox, navigation entre oeuvres |
| `lang` sur `<html>` | ✅ | `fr` ou `en` selon la page |
| Breadcrumbs visuels | ❌ | Liens "retour" présents mais pas de breadcrumbs visuels. Les BreadcrumbList JSON-LD sont en place pour le SEO. |

## 7. Meta tags

| Point | Statut | Notes |
|---|---|---|
| `<title>` unique par page | ✅ | Format : "Page — Sidney Carron" |
| `<meta name="description">` | ✅ | Unique et bilingue par page |
| `<meta name="author">` | ✅ | "Sidney Carron" |
| `<meta name="theme-color">` | ✅ | `#ffffff` (blanc musée) |
| `<meta name="viewport">` | ✅ | `width=device-width, initial-scale=1.0` |
| `<meta name="generator">` | ✅ | Astro (auto) |

## 8. Performance

| Point | Statut | Notes |
|---|---|---|
| Images width/height explicites | ✅ | Sur toutes les `<img>` |
| Hero images `loading="eager"` | ✅ | Sur les images principales de chaque page |
| Autres images `loading="lazy"` | ✅ | WorkCard, grilles, thumbnails |
| Preconnect Google Fonts | ✅ | `fonts.googleapis.com` + `fonts.gstatic.com` |
| Preload fonts CSS | ✅ | `<link rel="preload" as="style">` ajouté |
| Fonts via `display=swap` | ✅ | Paramètre dans l'URL Google Fonts |
| CSS @import supprimé | ✅ | Déplacé du CSS vers des `<link>` HTML (non render-blocking) |
| Netlify Identity defer | ✅ | `<script defer>` ajouté |
| Tailwind CSS purgé | ✅ | Configuré via `content` dans `tailwind.config.mjs` |
| JS minimal | ✅ | Seuls scripts : header scroll/menu, FilterBar, WorkViewer, contact form |
| Cache headers Netlify | ✅ | `/assets/*`, `/uploads/*`, `/images/*`, `*.woff2`, `*.woff` — 1 an immutable |
| Headers de sécurité | ✅ | X-Frame-Options, X-Content-Type-Options, Referrer-Policy |
| Astro SSG output | ✅ | Build statique, 51 pages en ~750ms |

## 9. Points d'attention / Recommandations

### Action requise
- **Image OG par défaut** : Créer `/public/images/og-default.jpg` (1200x630px) avec le nom de l'artiste et une oeuvre représentative.

### Améliorations futures (non critiques)
- **LanguageToggle** : Le composant calcule l'URL alternative en enlevant `/en` du pathname, ce qui ne fonctionne pas pour les pages avec des slugs localisés différents (ex: `/works/cerf-au-repos` → `/en/works/cerf-au-repos` au lieu de `/en/works/resting-stag`). Les hreflang dans le `<head>` sont corrects, seul le lien de changement de langue dans le header/footer est impacté.
- **Sitemap hreflang** : Les paires de pages avec slugs différents n'ont pas de `xhtml:link` hreflang dans le sitemap XML. Les hreflang HTML (`<link rel="alternate">`) couvrent ce besoin pour les moteurs de recherche.
- **WebP/AVIF** : Quand les vraies images seront ajoutées, utiliser `<picture>` avec des formats modernes pour un gain de performance significatif.

## 10. Objectifs Lighthouse (estimés)

| Catégorie | Objectif | Estimation |
|---|---|---|
| Performance | 95+ | ✅ SSG, lazy loading, fonts optimisées, CSS purgé |
| SEO | 95+ | ✅ Meta tags, hreflang, canonical, JSON-LD, sémantique |
| Accessibility | 90+ | ✅ Skip-to-content, ARIA, landmarks, focus visible |
| Best Practices | 95+ | ✅ HTTPS, headers de sécurité, pas de JS inutile |

> Note : scores finaux dépendront du poids réel des images et du temps de réponse du CDN Netlify.
