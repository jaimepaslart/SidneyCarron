Audite les performances du site.

1. Vérifie que le site est buildé (`pnpm build` si nécessaire)
2. Lance un audit Lighthouse via la CLI si disponible, sinon analyse manuellement :
   - Performance : taille des assets, images optimisées, lazy loading
   - Accessibilité : alt texts, contrastes, navigation clavier, ARIA
   - SEO : meta tags, sitemap, robots.txt, données structurées
   - Best practices : HTTPS, pas de console errors
3. Génère un rapport avec les scores estimés et les actions à mener

Objectif : 95+ sur tous les critères Lighthouse.
