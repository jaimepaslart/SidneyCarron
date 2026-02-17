# Sidney Carron — Portfolio

Site portfolio de l'artiste sculpteur **Sidney Carron**. Design "blanc musee" minimaliste, bilingue francais/anglais, avec back-office CMS pour gestion autonome du contenu.

## Stack technique

- **[Astro](https://astro.build/)** v5 — Static Site Generator (SSG)
- **[Tailwind CSS](https://tailwindcss.com/)** v3 — Utility-first CSS
- **[Decap CMS](https://decapcms.org/)** (ex Netlify CMS) — Back-office Git-based
- **[Netlify](https://www.netlify.com/)** — Hebergement, Identity, Git Gateway, Forms
- **TypeScript** — Typage statique

## Installation

```bash
# Cloner le depot
git clone git@github.com:jaimepaslart/SidneyCarron.git
cd SidneyCarron

# Installer les dependances
pnpm install

# Lancer le serveur de developpement
pnpm dev

# Builder pour la production
pnpm build

# Previsualiser le build
pnpm preview
```

**Pre-requis** : Node.js 20+, pnpm 10+

## Structure du projet

```
src/
  components/         # Composants reutilisables (Header, Footer, WorkCard...)
    pages/            # Composants de pages (HomePage, WorksPage, ContactPage...)
  layouts/            # BaseLayout + PageLayout
  pages/              # Routes FR (racine) + EN (/en/)
    en/               # Pages anglaises
  content/            # Content Collections Astro (works, series, exhibitions, press)
  styles/             # global.css (theme "blanc musee")
  i18n/               # Traductions FR/EN + helpers
  data/               # Donnees YAML (about, home, settings)
public/
  admin/              # Decap CMS (config.yml + index.html)
  images/             # Images statiques
  uploads/            # Images uploadees via le CMS
docs/                 # Documentation technique
```

## Contenu

Le contenu est gere via les **Content Collections** Astro :

| Collection | Dossier | Description |
|---|---|---|
| `works` | `src/content/works/` | Oeuvres (sculptures) |
| `series` | `src/content/series/` | Series d'oeuvres (Animaux, Fragments urbains, Figures) |
| `exhibitions` | `src/content/exhibitions/` | Expositions (a venir, en cours, passees) |
| `press` | `src/content/press/` | Articles de presse |

Chaque entree est un fichier Markdown avec frontmatter bilingue (champs `_fr` / `_en`).

### Ajouter du contenu

**Via le CMS** (recommande) : se connecter sur `/admin/` et utiliser l'interface graphique.

**Via les fichiers** : creer un fichier `.md` dans le dossier de la collection correspondante avec les champs requis.

## CMS (Back-office)

L'interface d'administration est accessible a l'adresse `/admin/`.
Elle utilise Decap CMS avec Netlify Identity pour l'authentification et Git Gateway pour l'ecriture dans le depot.

Pour un guide complet d'utilisation, voir **[docs/CMS_GUIDE.md](docs/CMS_GUIDE.md)**.

## Deploiement Netlify

### Premier deploiement

1. Connecter le repository GitHub a Netlify
2. **Build command** : `pnpm build`
3. **Publish directory** : `dist`
4. La configuration est deja dans `netlify.toml`

### Activer le CMS

1. **Site settings > Identity** : cliquer sur "Enable Identity"
2. **Registration** : selectionner "Invite only"
3. **Services > Git Gateway** : cliquer sur "Enable Git Gateway"
4. **Identity** : inviter l'artiste par email

### Apres deploiement

- Le build se declenche automatiquement a chaque push sur `main`
- Les modifications via le CMS creent un commit et declenchent un rebuild (~1-3 min)

## i18n (Internationalisation)

| Langue | Prefixe | Exemple |
|---|---|---|
| Francais (defaut) | _(aucun)_ | `/works`, `/about` |
| Anglais | `/en/` | `/en/works`, `/en/about` |

- 21 pages FR + 21 pages EN + 1 page 404 = **51 pages** generees
- Le contenu des collections est bilingue dans un seul fichier (champs `_fr` / `_en`)
- Les traductions UI sont dans `src/i18n/fr.ts` et `src/i18n/en.ts`
- Balises `hreflang` et sitemap multilingue generes automatiquement

## Design

Theme **"blanc musee"** avec design tokens :

- **Fond** : `#ffffff` (white) / `#f7f7f5` (surface)
- **Texte** : `#111111` (principal) / `#6b6b6b` (secondaire)
- **Accent** : `#1a1a2e` (bleu-nuit)
- **Typographie** : Cormorant Garamond (titres) + Inter (corps)

Voir **[docs/DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md)** et **[docs/UI_KIT.md](docs/UI_KIT.md)**.

## Documentation

| Document | Description |
|---|---|
| [ROUTES.md](docs/ROUTES.md) | Toutes les routes FR/EN |
| [DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md) | Couleurs, typographie, espacements |
| [UI_KIT.md](docs/UI_KIT.md) | Composants et patterns UI |
| [CMS_GUIDE.md](docs/CMS_GUIDE.md) | Guide d'utilisation du CMS |
| [SEO_CHECKLIST.md](docs/SEO_CHECKLIST.md) | Checklist SEO |
| [QA_CHECKLIST.md](docs/QA_CHECKLIST.md) | Checklist QA (responsive, a11y, perf, securite) |
| [USER_JOURNEYS.md](docs/USER_JOURNEYS.md) | Parcours utilisateur |
| [ACCEPTANCE_CRITERIA.md](docs/ACCEPTANCE_CRITERIA.md) | Criteres d'acceptation |

## TODO

- [ ] Remplacer les images placeholder par les vraies oeuvres de Sidney Carron
- [ ] Creer l'image Open Graph par defaut (`public/images/og-default.jpg`, 1200x630px)
- [ ] Configurer le domaine personnalise sur Netlify
- [ ] Activer Netlify Identity + Git Gateway
- [ ] Inviter l'artiste comme administrateur du CMS
- [ ] Tester le formulaire de contact en production (Netlify Forms)
- [ ] Verifier les performances Lighthouse en production
- [ ] Configurer les notifications de formulaire (email)

## Licence

Tous droits reserves. Le code source est prive. Les oeuvres et contenus artistiques sont la propriete de Sidney Carron.
