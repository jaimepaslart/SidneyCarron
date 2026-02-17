# User Journeys — Sidney Carron

> Parcours utilisateur clés pour le site portfolio de Sidney Carron.
> Chaque parcours décrit le chemin, les actions, et les résultats attendus.

---

## 1. Parcours Découverte

**Persona** : Visiteur curieux découvrant l'artiste pour la première fois.
**Objectif** : Découvrir l'univers de Sidney Carron et entrer en contact.

```
Page d'accueil (/)
│
├─ Scroll → Découvre la sélection d'œuvres phares
│
├─ Clic sur une œuvre → Page de détail (/works/[slug])
│   │
│   ├─ Consulte l'image haute qualité + informations
│   ├─ Ouvre la lightbox pour zoomer
│   ├─ Clique sur le nom de la série → Page série (/series/[slug])
│   │   └─ Explore les autres œuvres de la série
│   │
│   └─ Clic « Œuvre suivante » → Navigue dans les œuvres
│
├─ Retour grille → Page Works (/works)
│   └─ Utilise les filtres pour affiner
│
└─ Clic « Contact » → Page Contact (/contact)
    └─ Remplit et envoie le formulaire
```

### Étapes détaillées

| # | Page | Action | Résultat attendu |
|---|---|---|---|
| 1 | Home `/` | Arrive sur le site | Hero immersif, nom de l'artiste visible |
| 2 | Home `/` | Scrolle | Sections apparaissent (fade-in) : œuvres, expos, presse |
| 3 | Home `/` | Clique sur une œuvre phare | Navigation vers `/works/sculpture-bronze` |
| 4 | Work detail | Regarde l'image | Image grande, nette, temps de chargement < 2s |
| 5 | Work detail | Clique sur l'image | Lightbox plein écran avec navigation |
| 6 | Work detail | Ferme la lightbox (Échap) | Retour à la page de détail |
| 7 | Work detail | Clique « Toutes les œuvres » | Navigation vers `/works` |
| 8 | Works `/works` | Parcourt la grille | Toutes les œuvres visibles, scroll fluide |
| 9 | Works `/works` | Clique « Contact » dans le menu | Navigation vers `/contact` |
| 10 | Contact `/contact` | Remplit Nom, Email, Message | Champs validés en temps réel |
| 11 | Contact `/contact` | Clique « Envoyer » | Message de confirmation affiché |

---

## 2. Exploration par série

**Persona** : Amateur d'art cherchant à comprendre la démarche par séries.
**Objectif** : Explorer les séries thématiques et les œuvres associées.

```
Page d'accueil (/)
│
└─ Menu → Séries (/series)
    │
    ├─ Voit la liste des séries avec images de couverture
    │
    └─ Clic sur une série → Page série (/series/[slug])
        │
        ├─ Lit le texte de présentation de la série
        │
        ├─ Parcourt la grille des œuvres de cette série
        │
        ├─ Clic sur une œuvre → Page détail (/works/[slug])
        │   └─ Consulte les informations de l'œuvre
        │
        └─ Navigation inter-séries → Autre série (/series/[autre-slug])
```

### Étapes détaillées

| # | Page | Action | Résultat attendu |
|---|---|---|---|
| 1 | Home `/` | Clique « Séries » dans le menu | Navigation vers `/series` |
| 2 | Series `/series` | Parcourt les cartes de séries | Cartes visibles : image, nom, description, nombre d'œuvres |
| 3 | Series `/series` | Clique sur « Animaux » | Navigation vers `/series/animaux` |
| 4 | Series detail | Lit la présentation | Texte riche avec introduction de la série |
| 5 | Series detail | Parcourt les œuvres | Grille des œuvres de cette série uniquement |
| 6 | Series detail | Clique sur une œuvre | Navigation vers `/works/[slug]` |
| 7 | Work detail | Clique sur le lien de la série | Retour vers `/series/animaux` |
| 8 | Series detail | Clique sur « Série suivante » | Navigation vers une autre série |

---

## 3. Consultation des expositions

**Persona** : Galeriste ou curateur cherchant l'historique des expositions.
**Objectif** : Consulter les expositions passées et à venir.

```
Menu → Expositions (/exhibitions)
│
├─ Section « À venir » (si applicable)
│   └─ Voit les prochaines expositions avec dates et lieux
│
├─ Section « Passées »
│   └─ Liste chronologique inversée
│
└─ Clic sur une exposition → Page détail (/exhibitions/[slug])
    │
    ├─ Consulte les dates, lieu, texte de présentation
    ├─ Parcourt la galerie photo
    ├─ Voit les œuvres présentées
    │   └─ Clic sur une œuvre → Page détail (/works/[slug])
    │
    └─ Clic lien externe → Site du lieu (nouvel onglet)
```

### Étapes détaillées

| # | Page | Action | Résultat attendu |
|---|---|---|---|
| 1 | N'importe quelle page | Clique « Expositions » dans le menu | Navigation vers `/exhibitions` |
| 2 | Exhibitions | Voit les sections | Séparation claire « À venir » / « Passées » |
| 3 | Exhibitions | Repère un badge « En cours » | L'exposition actuelle est identifiable |
| 4 | Exhibitions | Clique sur une exposition | Navigation vers `/exhibitions/[slug]` |
| 5 | Exhibition detail | Lit les informations | Titre, dates, lieu, description visibles |
| 6 | Exhibition detail | Clique sur une photo | Lightbox s'ouvre |
| 7 | Exhibition detail | Clique sur une œuvre listée | Navigation vers `/works/[slug]` |
| 8 | Exhibition detail | Clique sur le lien du lieu | Ouverture dans un nouvel onglet |

---

## 4. Lecture presse

**Persona** : Journaliste ou critique d'art recherchant des publications.
**Objectif** : Trouver et lire les articles de presse sur l'artiste.

```
Menu → Presse (/press)
│
├─ Parcourt la liste des articles (chronologie inversée)
│
├─ Clic lien externe → Article source (nouvel onglet)
│
└─ Clic PDF → Téléchargement du fichier
```

### Étapes détaillées

| # | Page | Action | Résultat attendu |
|---|---|---|---|
| 1 | N'importe quelle page | Clique « Presse » dans le menu | Navigation vers `/press` |
| 2 | Press `/press` | Parcourt les articles | Liste ordonnée, titre + publication + date visibles |
| 3 | Press `/press` | Clique sur un article avec lien | Ouverture dans un nouvel onglet (`target="_blank"`) |
| 4 | Press `/press` | Clique sur un PDF | Le PDF se télécharge ou s'ouvre |
| 5 | Press `/press` | Veut plus d'informations | Clique « About » ou « Contact » |

---

## 5. Changement de langue

**Persona** : Visiteur international (anglophone).
**Objectif** : Naviguer sur le site en anglais.

```
Page quelconque en FR (ex: /works)
│
└─ Clic sélecteur de langue "EN" dans le header
    │
    └─ Redirection vers la version EN de la même page (/en/works)
        │
        ├─ Tout le contenu UI est en anglais
        ├─ Le contenu éditorial est en anglais
        ├─ Le sélecteur de langue affiche "FR" pour revenir
        │
        └─ Navigation EN → toutes les pages restent en EN
            │
            └─ Clic "FR" → Retour à la version FR de la page courante
```

### Étapes détaillées

| # | Page | Action | Résultat attendu |
|---|---|---|---|
| 1 | Works `/works` | Clique « EN » dans le header | Navigation vers `/en/works` |
| 2 | Works EN `/en/works` | Vérifie le contenu | Tous les textes UI en anglais |
| 3 | Works EN `/en/works` | Clique sur une œuvre | Navigation vers `/en/works/[slug]` (reste en EN) |
| 4 | Work detail EN | Vérifie le contenu | Titre, description, infos en anglais |
| 5 | Work detail EN | Clique « FR » dans le header | Navigation vers `/works/[slug]` (même œuvre, en FR) |
| 6 | Work detail FR | Vérifie le contenu | Retour en français confirmé |

### Cas limites

- Si un contenu n'a pas de traduction EN, afficher le contenu FR avec un indicateur « (FR) »
- Le sélecteur de langue conserve la page courante (pas de retour à l'accueil)
- Les slugs peuvent différer entre FR et EN (ex: `/works/animaux-bronze` vs `/en/works/bronze-animals`)

---

## 6. Utilisation des filtres sur Works

**Persona** : Collectionneur cherchant une œuvre spécifique.
**Objectif** : Filtrer les œuvres par critères pour trouver ce qui l'intéresse.

```
Page Works (/works)
│
├─ État initial : toutes les œuvres affichées
│
├─ Filtre par série → Clic "Animaux"
│   └─ Grille mise à jour : seules les œuvres de la série "Animaux"
│   └─ Filtre "Animaux" visuellement actif
│
├─ Ajout filtre année → Clic "2020-2024"
│   └─ Grille mise à jour : œuvres "Animaux" de 2020 à 2024
│
├─ Suppression du filtre série → Clic sur ×
│   └─ Grille mise à jour : toutes les œuvres de 2020-2024
│
└─ Clic "Tout afficher" / Clear
    └─ Retour à l'état initial, tous les filtres réinitialisés
```

### Étapes détaillées

| # | Page | Action | Résultat attendu |
|---|---|---|---|
| 1 | Works `/works` | Arrive sur la page | Toutes les œuvres visibles, compteur affiché |
| 2 | Works `/works` | Clique filtre « Série : Animaux » | Grille filtrée, compteur mis à jour |
| 3 | Works `/works` | Observe | Animation de transition sur la grille (items qui entrent/sortent) |
| 4 | Works `/works` | Ajoute filtre « Année : 2020-2024 » | Résultats affinés avec les deux filtres combinés |
| 5 | Works `/works` | Retire le filtre série (×) | Seul le filtre année reste actif |
| 6 | Works `/works` | Clique « Tout afficher » | Tous les filtres retirés, grille complète |
| 7 | Works `/works` | Applique un filtre avec 0 résultats | Message « Aucune œuvre trouvée » + suggestion de modifier les filtres |

### Spécifications techniques des filtres

- Le filtrage est côté client (pas de rechargement de page)
- Les filtres sont combinatoires (AND entre catégories)
- L'URL ne change pas lors du filtrage (pas de query params)
- Animation de transition sur la grille lors du filtrage (GSAP ou CSS transitions)
- Le compteur de résultats se met à jour en temps réel

---

## 7. Soumission du formulaire de contact

**Persona** : Galeriste souhaitant proposer une exposition.
**Objectif** : Envoyer un message à l'artiste via le formulaire.

```
Page Contact (/contact)
│
├─ Remplit le formulaire
│   ├─ Nom : "Marie Dupont"
│   ├─ Email : "marie@galerie.com"
│   ├─ Sujet : "Galerie" (dropdown)
│   └─ Message : "Bonjour, je souhaiterais..."
│
├─ Validation en temps réel
│   ├─ ✓ Nom valide (≥ 2 caractères)
│   ├─ ✓ Email valide (format email)
│   ├─ ✓ Sujet sélectionné
│   └─ ✓ Message valide (≥ 10 caractères)
│
├─ Clic « Envoyer »
│   ├─ Bouton en état "loading"
│   ├─ Requête envoyée (Netlify Forms ou service tiers)
│   │
│   ├─ Succès :
│   │   ├─ Message de confirmation vert
│   │   ├─ Formulaire réinitialisé
│   │   └─ Optionnel : animation de succès
│   │
│   └─ Échec :
│       ├─ Message d'erreur rouge
│       ├─ Données du formulaire conservées
│       └─ Suggestion de réessayer ou d'envoyer un email directement
│
└─ Cas d'erreur de validation
    ├─ Champ vide : « Ce champ est requis »
    ├─ Email invalide : « Veuillez entrer une adresse email valide »
    └─ Message trop court : « Le message doit contenir au moins 10 caractères »
```

### Étapes détaillées

| # | Page | Action | Résultat attendu |
|---|---|---|---|
| 1 | Contact `/contact` | Arrive sur la page | Formulaire visible avec tous les champs vides |
| 2 | Contact `/contact` | Remplit le nom | Validation OK (pas d'erreur affichée) |
| 3 | Contact `/contact` | Tape un email invalide et quitte le champ | Message d'erreur sous le champ email |
| 4 | Contact `/contact` | Corrige l'email | Le message d'erreur disparaît |
| 5 | Contact `/contact` | Sélectionne un sujet dans le dropdown | Option sélectionnée visible |
| 6 | Contact `/contact` | Écrit un message court (< 10 car.) et quitte | Message d'erreur : « au moins 10 caractères » |
| 7 | Contact `/contact` | Complète le message | Erreur disparaît |
| 8 | Contact `/contact` | Clique « Envoyer » | Bouton → état loading, désactivé |
| 9 | Contact `/contact` | Envoi réussi | Message de confirmation, formulaire vidé |
| 10 | Contact `/contact` | Tente un double-clic sur Envoyer | Seul le premier envoi est pris en compte |

### Cas d'erreur réseau

| # | Situation | Résultat attendu |
|---|---|---|
| 1 | Timeout réseau | Message « Erreur de connexion, veuillez réessayer » |
| 2 | Erreur serveur (5xx) | Message « Une erreur est survenue, veuillez réessayer plus tard » |
| 3 | Honeypot rempli (bot) | Soumission silencieusement ignorée |

---

## Parcours transversal : Navigation mobile

**Persona** : Tout utilisateur sur smartphone.
**Objectif** : Naviguer confortablement sur mobile.

```
Page quelconque (mobile)
│
├─ Hamburger menu visible (≤ 768px)
│
├─ Tap hamburger → Menu overlay plein écran
│   ├─ Liens : Works, Series, Exhibitions, Press, About, Contact
│   ├─ Sélecteur de langue FR/EN
│   └─ Tap sur un lien → Navigation + fermeture du menu
│
├─ Tap hors du menu → Le menu se ferme
│
└─ Scroll → Le header reste sticky
```

### Points d'attention mobile

- [ ] Touch targets ≥ 44×44px
- [ ] Pas de hover-only interactions (tout accessible au tap)
- [ ] Grilles d'images adaptées (1-2 colonnes sur mobile)
- [ ] Lightbox : swipe gauche/droite pour naviguer entre images
- [ ] Formulaire de contact : clavier adapté (type="email" pour le champ email)
- [ ] Pas de scroll horizontal involontaire
