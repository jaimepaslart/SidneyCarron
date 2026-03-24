export const fr = {
  // Navigation
  'nav.works': 'Œuvres',
  'nav.carte': 'Carte',
  'nav.exhibitions': 'Expositions',
  'nav.press': 'Presse',
  'nav.about': 'À propos',
  'nav.contact': 'Contact',

  // Navigation — locations (short labels for header/menu)
  'nav.location.bresil': 'Brésil',
  'nav.location.dakar': 'Dakar',
  'nav.location.saint-tropez': 'Saint-Tropez',
  'nav.location.reunion': 'La Réunion',
  'nav.location.sri-lanka': 'Sri Lanka',
  'nav.location.costa-rica': 'Costa Rica',
  'nav.location.guadeloupe': 'Guadeloupe',
  'nav.location.paris': 'Paris',
  'nav.location.alpes': 'Coupe des Alpes',

  // Scroll nav (fixed pills on scroll)
  'nav.scroll.works': 'Œuvres',
  'nav.scroll.about': 'À propos',

  // Home
  'home.title': 'Sidney Carron — Artiste photographe',
  'home.description': 'Site officiel de Sidney Carron, artiste photographe. Empreintes solaires, corps et lumière. Découvrez ses œuvres, séries, expositions et actualités.',
  'home.hero.statement': "J'écris avec la lumière",
  'home.hero.subtitle': 'Artiste photographe',
  'home.featured.label': 'Lieux de création',
  'home.featured.cta': 'Voir la carte',
  'home.exhibitions.cta': 'Voir les expositions',
  'home.exhibitions.title': 'Expositions',
  'home.exhibitions.circle_cta': 'Sidney Carron',

  // Map
  'map.title': 'Créations à travers le monde',
  'map.subtitle': 'Sidney Carron crée ses empreintes solaires en voyageant à travers le monde',
  'map.works_count': '{count} photos',
  'map.discover': 'Découvrir',
  'map.see_photos': 'voir les photos',

  // Gallery
  'gallery.photos_count': '{count} photos',
  'gallery.back': 'Retour à la carte',
  'gallery.section': 'Section',

  // Works (kept for gallery pages)
  'works.title': 'Œuvres',
  'works.description': 'Découvrez l\'ensemble des œuvres de Sidney Carron : empreintes solaires, photographies, installations lumineuses.',

  // Exhibitions
  'exhibitions.title': 'Expositions',
  'exhibitions.description': 'Expositions passées et à venir de Sidney Carron.',
  'exhibitions.upcoming': 'En cours & à venir',
  'exhibitions.past': 'Archives',
  'exhibitions.current_badge': 'En cours',
  'exhibitions.upcoming_badge': 'À venir',
  'exhibitions.past_badge': 'Passé',
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
  'about.downloads': 'Documents',
  'about.download_bio': 'Biographie',
  'about.download_exhibitions': 'Expositions',
  'about.download_poem': 'Poème',

  // Contact
  'contact.title': 'Contact',
  'contact.description': 'Contactez Sidney Carron pour toute demande concernant ses empreintes solaires, expositions ou collaborations.',
  'contact.intro': 'Pour toute demande concernant mes œuvres, une exposition ou une collaboration, n\'hésitez pas à m\'écrire.',
  'contact.direct': 'Ou directement par email :',
  'contact.form.name': 'Nom',
  'contact.form.email': 'Email',
  'contact.form.subject': 'Sujet',
  'contact.form.message': 'Message',
  'contact.form.submit': 'Envoyer',
  'contact.form.sending': 'Envoi…',
  'contact.form.success.title': 'Message envoyé',
  'contact.form.success.text': 'Merci pour votre message. Je vous répondrai dans les meilleurs délais.',
  'contact.form.error': 'Une erreur est survenue. Merci de réessayer ou d\'écrire directement à l\'adresse ci-dessous.',

  // Footer
  'footer.legal': 'Mentions légales',
  'footer.copyright': '© {year} Sidney Carron. Tous droits réservés.',

  // Legal
  'legal.title': 'Mentions légales',
  'legal.description': 'Mentions légales du site Sidney Carron — artiste photographe.',
  'legal.editor_title': 'Éditeur du site',
  'legal.editor_text': 'Sidney Carron, artiste photographe.\nContact : contact@sidneycarron.com',
  'legal.hosting_title': 'Hébergement',
  'legal.hosting_text': 'Ce site est hébergé par Netlify, Inc.\n2325 3rd Street, Suite 296, San Francisco, California 94107, États-Unis.\nSite web : www.netlify.com',
  'legal.ip_title': 'Propriété intellectuelle',
  'legal.ip_text': 'L\'ensemble du contenu de ce site (textes, photographies, œuvres, images, graphismes, logo) est la propriété exclusive de Sidney Carron, sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est interdite sans autorisation écrite préalable.',
  'legal.data_title': 'Données personnelles',
  'legal.data_text': 'Les données collectées via le formulaire de contact (nom, adresse email, message) sont utilisées uniquement pour répondre à vos demandes. Elles ne sont ni transmises à des tiers ni utilisées à des fins commerciales. Ce site n\'utilise pas de cookies de suivi ou de publicité.',
  'legal.design_title': 'Conception',
  'legal.design_text': 'Site conçu et développé pour Sidney Carron.',

  // 404
  '404.title': 'Page non trouvée',
  '404.message': 'La page que vous recherchez n\'existe pas ou a été déplacée.',
  '404.back_home': 'Retour à l\'accueil',

  // Accessibility
  'a11y.skip': 'Aller au contenu principal',
  'a11y.menu_open': 'Ouvrir le menu',
  'a11y.main_nav': 'Navigation principale',
  'a11y.menu_close': 'Fermer le menu',
} as const;

export type TranslationKey = keyof typeof fr;
