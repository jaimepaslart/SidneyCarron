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

## Context7 — Documentation automatique
Quand tu codes ou réponds à une question technique, consulte TOUJOURS la doc à jour via le MCP Context7 (`query-docs`) avant de répondre. Ne te fie pas uniquement à ta mémoire.

| Librairie | Library ID Context7 |
|---|---|
| Astro | `/withastro/docs` |
| Tailwind CSS | `/websites/v3_tailwindcss` |
| GSAP | `/llmstxt/gsap_llms_txt` |
| Motion | `/websites/motion_dev` |

## Agent Teams
- En mode équipe, le chef (lead) ne code JAMAIS. Il coordonne uniquement : il crée les tâches, assigne le travail, synthétise les résultats et communique avec l'utilisateur.
- Tout le code est écrit par les coéquipiers (teammates).
- Le chef doit activer le mode délégation (Maj+Tab) dès la création de l'équipe.

## Notes
- Optimisation des images : priorité absolue (site d'artiste = beaucoup d'images)
- Performance : viser 95+ sur Lighthouse
- Accessibilité : respecter WCAG 2.1 AA minimum
- SEO : meta tags, Open Graph, données structurées
