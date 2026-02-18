export const fr = {
  // Navigation
  'nav.works': 'Œuvres',
  'nav.series': 'Séries',
  'nav.exhibitions': 'Expositions',
  'nav.press': 'Presse',
  'nav.about': 'À propos',
  'nav.contact': 'Contact',

  // Language toggle
  'lang.current': 'FR',
  'lang.switch': 'EN',
  'lang.label': 'Changer de langue',

  // Home
  'home.title': 'Sidney Carron — Artiste photographe',
  'home.description': 'Site officiel de Sidney Carron, artiste photographe. Empreintes solaires, corps et lumière. Découvrez ses œuvres, séries, expositions et actualités.',
  'home.hero.statement': "J'écris avec la lumière",
  'home.hero.subtitle': 'Artiste photographe',
  'home.featured.title': 'Œuvres sélectionnées',
  'home.featured.label': 'Sélection',
  'home.featured.cta': 'Voir toutes les œuvres',
  'home.exhibitions.title': 'Expositions',
  'home.exhibitions.label': 'Exposition en cours',
  'home.exhibitions.current': 'En cours & à venir',
  'home.exhibitions.cta': 'Voir les expositions',
  'home.press.title': 'Presse',
  'home.press.label': 'Dans la presse',
  'home.press.cta': 'Toute la presse',
  'home.contact.intro': 'Pour toute demande',
  'home.contact.cta': 'Contactez-moi',

  // Works
  'works.title': 'Œuvres',
  'works.description': 'Découvrez l\'ensemble des œuvres de Sidney Carron : empreintes solaires, photographies, installations lumineuses.',
  'works.filter.all': 'Tout',
  'works.filter.clear': 'Réinitialiser',
  'works.empty': 'Aucune œuvre trouvée pour ces critères.',
  'works.count': '{count} œuvre(s)',
  'works.back': 'Toutes les œuvres',
  'works.prev': 'Œuvre précédente',
  'works.next': 'Œuvre suivante',
  'works.related': 'De la même série',
  'works.year': 'Année',
  'works.medium': 'Procédé',
  'works.dimensions': 'Dimensions',
  'works.series': 'Série',

  // Series
  'series.title': 'Séries',
  'series.description': 'Explorez les séries thématiques de Sidney Carron.',
  'series.works_count': '{count} œuvre(s)',
  'series.back': 'Retour aux séries',
  'series.other': 'Autres séries',

  // Exhibitions
  'exhibitions.title': 'Expositions',
  'exhibitions.description': 'Expositions passées et à venir de Sidney Carron.',
  'exhibitions.upcoming': 'En cours & à venir',
  'exhibitions.past': 'Archives',
  'exhibitions.current_badge': 'En cours',
  'exhibitions.upcoming_badge': 'À venir',
  'exhibitions.learn_more': 'En savoir plus',
  'exhibitions.back': 'Retour aux expositions',
  'exhibitions.venue': 'Lieu',
  'exhibitions.dates': 'Dates',
  'exhibitions.works_shown': 'Œuvres présentées',
  'exhibitions.visit_venue': 'Visiter le site du lieu',

  // Press
  'press.title': 'Presse',
  'press.description': 'Articles de presse, publications et mentions médiatiques sur Sidney Carron.',
  'press.read_article': 'Lire l\'article',
  'press.download_pdf': 'Télécharger le PDF',

  // About
  'about.title': 'À propos',
  'about.description': 'Biographie et démarche artistique de Sidney Carron — photographe, empreintes solaires.',
  'about.bio_title': 'Biographie',
  'about.statement_title': 'Démarche artistique',
  'about.cv_title': 'Parcours',
  'about.contact_cta': 'Contactez-moi',

  // Contact
  'contact.title': 'Contact',
  'contact.description': 'Contactez Sidney Carron pour toute demande concernant ses empreintes solaires, expositions ou collaborations.',
  'contact.intro': 'Pour toute demande concernant mes œuvres, une exposition ou une collaboration, n\'hésitez pas à me contacter.',
  'contact.name': 'Nom',
  'contact.name_placeholder': 'Votre nom',
  'contact.email': 'Email',
  'contact.email_placeholder': 'votre@email.com',
  'contact.subject': 'Sujet',
  'contact.subject_placeholder': 'Choisissez un sujet',
  'contact.subject_gallery': 'Galerie',
  'contact.subject_collector': 'Collectionneur',
  'contact.subject_press': 'Presse',
  'contact.subject_other': 'Autre',
  'contact.message': 'Message',
  'contact.message_placeholder': 'Votre message...',
  'contact.submit': 'Envoyer',
  'contact.sending': 'Envoi en cours...',
  'contact.success': 'Votre message a bien été envoyé. Je vous répondrai dans les meilleurs délais.',
  'contact.error': 'Une erreur est survenue. Veuillez réessayer ou m\'écrire directement.',
  'contact.privacy': 'Vos données sont traitées uniquement pour répondre à votre demande.',

  // Footer
  'footer.artist_title': 'Artiste photographe',
  'footer.navigation': 'Navigation',
  'footer.contact_title': 'Contact',
  'footer.social': 'Réseaux',
  'footer.legal': 'Mentions légales',
  'footer.copyright': '© {year} Sidney Carron. Tous droits réservés.',

  // Lightbox
  'lightbox.close': 'Fermer',
  'lightbox.prev': 'Image précédente',
  'lightbox.next': 'Image suivante',

  // 404
  '404.title': 'Page non trouvée',
  '404.message': 'La page que vous recherchez n\'existe pas ou a été déplacée.',
  '404.back_home': 'Retour à l\'accueil',

  // Accessibility
  'a11y.skip': 'Aller au contenu principal',
  'a11y.menu_open': 'Ouvrir le menu',
  'a11y.menu_close': 'Fermer le menu',
} as const;

export type TranslationKey = keyof typeof fr;
