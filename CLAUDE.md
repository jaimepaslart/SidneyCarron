# Sidney Carron — Site Artiste

## Projet
Site web pour l'artiste Sidney Carron. Framework : Astro (à installer).

## Conventions
- Langue du code : anglais (variables, composants, commentaires techniques)
- Langue du contenu : français
- Package manager : pnpm
- Formattage : Prettier + ESLint
- CSS : Tailwind CSS
- Commits : en français, conventionnels (feat:, fix:, chore:, style:, refactor:)

## Structure prévue
```
src/
  components/   # Composants réutilisables
  layouts/      # Layouts de pages
  pages/        # Pages du site
  styles/       # Styles globaux
  content/      # Contenu (collections Astro)
  assets/       # Images, fonts, etc.
public/         # Fichiers statiques
```

## Commandes
- `pnpm dev` — serveur de dev
- `pnpm build` — build de production
- `pnpm preview` — prévisualiser le build

## Notes
- Optimisation des images : priorité absolue (site d'artiste = beaucoup d'images)
- Performance : viser 95+ sur Lighthouse
- Accessibilité : respecter WCAG 2.1 AA minimum
- SEO : meta tags, Open Graph, données structurées
