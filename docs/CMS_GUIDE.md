# Guide d'utilisation du CMS — Sidney Carron

Ce guide explique comment gérer le contenu du site via l'interface d'administration Decap CMS.

---

## 1. Configuration initiale (une seule fois)

### Activer Netlify Identity

1. Connectez-vous à [app.netlify.com](https://app.netlify.com)
2. Sélectionnez le site **Sidney Carron**
3. Allez dans **Site settings → Identity**
4. Cliquez sur **Enable Identity**
5. Dans **Registration preferences**, sélectionnez **Invite only** (recommandé pour un site d'artiste)

### Activer Git Gateway

1. Toujours dans **Site settings → Identity**
2. Descendez jusqu'à la section **Services → Git Gateway**
3. Cliquez sur **Enable Git Gateway**
4. Aucune autre configuration n'est nécessaire

### Inviter le premier administrateur

1. Allez dans **Identity** (menu latéral du site Netlify)
2. Cliquez sur **Invite users**
3. Entrez votre adresse email
4. Vous recevrez un email d'invitation — cliquez sur le lien pour créer votre mot de passe

---

## 2. Se connecter à l'administration

1. Ouvrez votre navigateur et allez à : **https://sidneycarron.com/admin/**
2. Cliquez sur **Login with Netlify Identity**
3. Entrez votre email et mot de passe
4. Vous arrivez sur le tableau de bord du CMS

---

## 3. Gérer les œuvres

### Créer une nouvelle œuvre

1. Dans le menu de gauche, cliquez sur **Œuvres**
2. Cliquez sur **Nouvelle Œuvre**
3. Remplissez les champs :
   - **Slug FR** : identifiant URL en français (ex : `sculpture-equilibre`). Utilisez uniquement des minuscules, chiffres et tirets.
   - **Slug EN** : identifiant URL en anglais (ex : `sculpture-equilibrium`)
   - **Titre FR/EN** : le titre de l'œuvre dans les deux langues
   - **Année** : année de création
   - **Technique FR/EN** : technique utilisée (ex : « Bronze patiné » / « Patinated bronze »)
   - **Dimensions** : format libre (ex : « 65 × 30 × 25 cm »)
   - **Série** : sélectionnez la série à laquelle appartient l'œuvre
   - **Mise en avant** : cochez si l'œuvre doit apparaître sur la page d'accueil
   - **Ordre d'affichage** : nombre pour trier (0 = premier affiché)
   - **Images** : ajoutez au moins une image avec ses textes alternatifs FR et EN
   - **Description FR/EN** : texte descriptif (optionnel)
4. Cliquez sur **Publier** (ou **Enregistrer** pour sauvegarder un brouillon)

### Modifier une œuvre existante

1. Cliquez sur **Œuvres** dans le menu
2. Cliquez sur l'œuvre à modifier
3. Faites vos modifications
4. Cliquez sur **Publier**

### Supprimer une œuvre

1. Ouvrez l'œuvre à supprimer
2. Cliquez sur **Supprimer** (bouton en haut à droite)
3. Confirmez la suppression

---

## 4. Gérer les séries

1. Cliquez sur **Séries** dans le menu
2. Même principe que pour les œuvres
3. Champs spécifiques :
   - **Image de couverture** : l'image principale de la série
   - **Description FR/EN** : présentation de la série
   - **Texte curatorial FR/EN** : texte d'exposition plus détaillé (optionnel)
   - **Ordre d'affichage** : pour trier les séries entre elles

---

## 5. Gérer les expositions

1. Cliquez sur **Expositions** dans le menu
2. Champs spécifiques :
   - **Lieu FR/EN** : nom du lieu d'exposition
   - **Ville** : ville de l'exposition
   - **Dates** : format AAAA-MM-JJ (ex : 2026-03-15)
   - **Type** : exposition personnelle ou collective
   - **Statut** : à venir, en cours, ou passée — **pensez à mettre à jour le statut** quand une expo démarre ou se termine
   - **Œuvres exposées** : sélectionnez les œuvres présentées dans cette exposition
   - **Site web du lieu** : lien vers le site de la galerie/musée (optionnel)

---

## 6. Gérer la presse

1. Cliquez sur **Presse** dans le menu
2. Champs spécifiques :
   - **Publication** : nom du média (ex : Le Monde, Art Press)
   - **Date** : date de publication au format AAAA-MM-JJ
   - **Extrait FR/EN** : citation ou résumé de l'article (optionnel)
   - **Lien** : URL de l'article en ligne (optionnel)
   - **PDF** : téléchargez le PDF de l'article (optionnel)
   - **Image** : photo ou visuel accompagnant l'article (optionnel)

---

## 7. Modifier la page À propos

1. Cliquez sur **Page À propos** dans le menu
2. Vous pouvez modifier :
   - Le portrait
   - L'introduction et la biographie (FR et EN)
   - La démarche artistique (FR et EN)
   - Le parcours (liste chronologique)

---

## 8. Modifier la page d'accueil

1. Cliquez sur **Page d'accueil** dans le menu
2. Vous pouvez modifier :
   - L'accroche principale (phrase affichée en grand)
   - Le sous-titre
   - La sélection d'œuvres mises en avant

---

## 9. Paramètres du site

1. Cliquez sur **Paramètres du site** dans le menu
2. Vous pouvez modifier :
   - Le nom de l'artiste
   - L'email de contact
   - Les liens vers les réseaux sociaux
   - Les paramètres SEO par défaut (titre, description, image de partage)

---

## 10. Upload d'images

### Depuis un champ image

1. Cliquez sur le champ image dans le formulaire
2. Vous pouvez :
   - **Télécharger** une nouvelle image depuis votre ordinateur
   - **Choisir** une image déjà uploadée dans la médiathèque

### Recommandations pour les images

- **Œuvres** : images de haute qualité, idéalement 2000px de large minimum
- **Format** : JPEG pour les photos, PNG si transparence nécessaire
- **Poids** : les images seront optimisées automatiquement, mais essayez de rester sous 5 Mo par image
- **Nommage** : utilisez des noms descriptifs (ex : `equilibre-i-face.jpg` plutôt que `IMG_4523.jpg`)
- Les images uploadées via le CMS sont stockées dans le dossier `/uploads/`

---

## 11. Délai de publication

Après chaque modification publiée :

1. Le CMS enregistre vos changements dans le dépôt Git
2. Netlify détecte le changement et lance un **build automatique**
3. Le nouveau site est en ligne après **1 à 3 minutes** environ

Vous pouvez suivre l'avancement du build dans le tableau de bord Netlify (**Deploys**).

---

## En cas de problème

- **Impossible de se connecter** : vérifiez que Netlify Identity est activé et que vous avez bien accepté l'invitation par email
- **Les modifications n'apparaissent pas** : attendez quelques minutes que le build se termine. Vérifiez l'onglet **Deploys** sur Netlify
- **Erreur lors de la publication** : vérifiez que tous les champs obligatoires sont remplis (les champs marqués d'un astérisque)
- **Image qui ne s'affiche pas** : vérifiez que l'image a bien été uploadée et que le chemin est correct

Pour toute autre question, contactez l'administrateur du site.
