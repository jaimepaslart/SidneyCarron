import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: 'jaimepaslart/SidneyCarron',
      },

  ui: {
    brand: { name: 'Sidney Carron — Backoffice' },
    navigation: {
      '📷 Mes créations': ['locations', 'exhibitions', 'press'],
      '📄 Pages du site': ['home', 'about', 'contact'],
      '⚙️ Réglages': ['settings'],
    },
  },

  collections: {
    locations: collection({
      label: '🌍 Lieux de création',
      slugField: 'slug',
      path: 'src/data/locations/*',
      format: { data: 'yaml' },
      entryLayout: 'content',
      columns: ['name_fr', 'country_fr', 'type', 'photoCount'],
      schema: {
        slug: fields.slug({
          name: {
            label: 'Identifiant URL',
            description: 'Apparaîtra dans l\'adresse du site : sidneycarron.com/works/identifiant — utilisez des minuscules sans accents',
          },
        }),
        name_fr: fields.text({
          label: 'Nom du lieu',
          description: 'Affiché sur le site en français (ex : Dakar, Alpes, Saint-Tropez)',
        }),
        name_en: fields.text({
          label: 'Nom du lieu (anglais)',
          description: 'Version anglaise du nom, affichée sur le site en anglais',
        }),
        country_fr: fields.text({
          label: 'Pays',
          description: 'Nom du pays en français (ex : Sénégal, France)',
        }),
        country_en: fields.text({
          label: 'Pays (anglais)',
          description: 'Nom du pays en anglais (ex : Senegal, France)',
        }),
        type: fields.select({
          label: 'Type de lieu',
          description: 'Détermine la catégorie affichée sur la carte interactive',
          options: [
            { label: '✈️ Voyage', value: 'travel' },
            { label: '🖼️ Exposition', value: 'exhibition' },
            { label: '🎪 Événement', value: 'event' },
          ],
          defaultValue: 'travel',
        }),
        photoCount: fields.integer({
          label: 'Nombre de photos',
          description: 'Affiché sur la carte — se met à jour automatiquement si vous gérez les photos via la galerie ci-dessous',
        }),
        lat: fields.number({
          label: 'Latitude',
          description: '↓ Utilisez la carte interactive ci-dessous pour choisir les coordonnées automatiquement',
          step: 0.0001,
        }),
        lng: fields.number({
          label: 'Longitude',
          description: '↓ Cliquez sur la carte pour placer l\'épingle à l\'endroit exact',
          step: 0.0001,
        }),
        cover: fields.image({
          label: '📷 Photo principale',
          description: 'Apparaît en aperçu sur la carte interactive et dans les listes — choisissez votre meilleure photo',
          directory: 'public/images/galleries',
          publicPath: '/images/galleries/',
        }),
        images: fields.array(
          fields.object({
            src: fields.image({
              label: 'Photo',
              directory: 'public/images/galleries',
              publicPath: '/images/galleries/',
            }),
            width: fields.integer({ label: 'Largeur (px)', defaultValue: 1200 }),
            height: fields.integer({ label: 'Hauteur (px)', defaultValue: 1600 }),
            section: fields.text({ label: 'Section (optionnel)', description: 'Titre de section pour regrouper les photos (laisser vide si inutile)' }),
          }),
          {
            label: '🖼️ Galerie complète',
            description: 'Toutes les photos de ce lieu, dans l\'ordre d\'affichage souhaité',
            itemLabel: props => {
              const v = props.fields.src.value as any;
              return v?.filename || v?.split?.('/')?.pop() || 'Photo';
            },
          }
        ),
        description_fr: fields.text({
          label: '💬 Description courte',
          description: '✨ Ce texte apparaît dans les résultats de recherche Google quand quelqu\'un cherche vos photos de ce lieu. Rédigez 1 à 2 phrases naturelles (120 à 160 caractères idéalement). Exemple : "Empreintes solaires réalisées à Dakar — corps et lumière au cœur de l\'Afrique de l\'Ouest"',
          multiline: true,
        }),
        description_en: fields.text({
          label: '💬 Description courte (version anglaise)',
          description: 'Même description traduite en anglais — pour les visiteurs internationaux et les résultats Google en anglais',
          multiline: true,
        }),
        video: fields.file({
          label: '🎬 Vidéo (fichier)',
          description: 'Téléverser une vidéo directement (formats : mp4, webm)',
          directory: 'public/videos',
          publicPath: '/videos/',
        }),
        video_url: fields.text({
          label: '🔗 Vidéo (lien externe)',
          description: 'Coller un lien YouTube ou Vimeo — prioritaire sur le fichier vidéo ci-dessus',
        }),
      },
    }),

    exhibitions: collection({
      label: '🖼️ Expositions',
      slugField: 'slug',
      path: 'src/content/exhibitions/*',
      format: { data: 'yaml' },
      entryLayout: 'content',
      columns: ['title_fr', 'city', 'start_date', 'status'],
      schema: {
        slug: fields.slug({
          name: {
            label: 'Identifiant URL',
            description: 'Identifiant unique pour l\'URL de l\'exposition (ex : galerie-sakana-2025)',
          },
        }),
        title_fr: fields.text({
          label: 'Titre de l\'exposition',
          description: 'Titre affiché sur le site en français',
        }),
        title_en: fields.text({
          label: 'Titre de l\'exposition (anglais)',
          description: 'Titre pour la version anglaise du site — peut être identique si international',
        }),
        venue_fr: fields.text({
          label: 'Lieu',
          description: 'Nom de la galerie, du théâtre ou de l\'espace d\'exposition',
        }),
        venue_en: fields.text({
          label: 'Lieu (anglais)',
          description: 'Nom de la galerie en anglais — souvent identique si c\'est un nom propre',
        }),
        city: fields.text({
          label: 'Ville',
          description: 'Ville où se déroule l\'exposition',
        }),
        start_date: fields.date({
          label: 'Date de début',
          description: 'Jour d\'ouverture de l\'exposition',
        }),
        end_date: fields.date({
          label: 'Date de fin',
          description: 'Dernier jour de l\'exposition',
        }),
        type: fields.select({
          label: 'Type',
          description: 'Solo = vous seul · Collective = avec d\'autres artistes',
          options: [
            { label: 'Solo', value: 'solo' },
            { label: 'Collective', value: 'group' },
          ],
          defaultValue: 'solo',
        }),
        status: fields.select({
          label: 'Statut',
          description: 'Détermine l\'affichage dans la timeline des expositions',
          options: [
            { label: '⏳ À venir', value: 'upcoming' },
            { label: '🟢 En cours', value: 'current' },
            { label: '✅ Passée', value: 'past' },
          ],
          defaultValue: 'upcoming',
        }),
        description_fr: fields.text({
          label: 'Description',
          description: '💡 Présentation de l\'exposition en français — quelques lignes qui donnent envie de venir. Apparaît sur la page de l\'exposition et dans les résultats Google.',
          multiline: true,
        }),
        description_en: fields.text({
          label: 'Description (version anglaise)',
          description: 'Présentation de l\'exposition en anglais — pour les visiteurs et journalistes internationaux',
          multiline: true,
        }),
        image: fields.object({
          src: fields.image({
            label: 'Photo',
            description: 'Photo principale de l\'exposition — visuel carré ou paysage conseillé',
            directory: 'public/images/exhibitions',
            publicPath: '/images/exhibitions/',
          }),
          alt_fr: fields.text({
            label: '♿ Description de l\'image',
            description: '💡 Décrit l\'image en quelques mots — utilisé pour les personnes malvoyantes ET pour le référencement Google Images (ex : "Vue de l\'exposition à la Galerie Sakana, Paris")',
          }),
          alt_en: fields.text({
            label: '♿ Description de l\'image (anglais)',
            description: 'Même description en anglais pour la version internationale du site',
          }),
        }, { label: '📷 Photo' }),
        video: fields.file({
          label: '🎬 Vidéo (fichier)',
          description: 'Téléverser une vidéo de l\'exposition (mp4, webm)',
          directory: 'public/videos/exhibitions',
          publicPath: '/videos/exhibitions/',
        }),
        video_url: fields.text({
          label: '🔗 Vidéo (lien YouTube / Vimeo)',
          description: 'Coller l\'URL de la vidéo sur YouTube ou Vimeo',
        }),
        venue_url: fields.text({
          label: '🔗 Site web du lieu',
          description: 'URL du site officiel de la galerie ou du lieu d\'exposition',
        }),
        works_slugs: fields.array(
          fields.text({ label: 'Identifiant' }),
          {
            label: 'Œuvres liées',
            description: 'Identifiants des œuvres associées à cette exposition (optionnel)',
            itemLabel: props => props.value || 'Œuvre',
          }
        ),
        slug_en: fields.text({
          label: 'Identifiant URL (anglais)',
          description: 'Laissez vide si identique à l\'identifiant français',
        }),
      },
    }),

    press: collection({
      label: '📰 Presse',
      slugField: 'title_fr',
      path: 'src/content/press/*',
      format: { data: 'yaml' },
      entryLayout: 'content',
      columns: ['publication', 'date'],
      schema: {
        title_fr: fields.slug({
          name: {
            label: 'Titre de l\'article',
            description: 'Titre de l\'article ou du reportage en français',
          },
        }),
        title_en: fields.text({
          label: 'Titre de l\'article (anglais)',
          description: 'Titre en anglais si disponible (laisser vide sinon)',
        }),
        publication: fields.text({
          label: 'Publication',
          description: 'Nom du journal, magazine ou site (ex : Le Monde, Madame Figaro)',
        }),
        date: fields.date({
          label: 'Date de parution',
          description: 'Date à laquelle l\'article a été publié',
        }),
        url: fields.text({
          label: '🔗 Lien vers l\'article',
          description: 'URL complète de l\'article en ligne (laisser vide si non disponible)',
        }),
        excerpt_fr: fields.text({
          label: 'Extrait',
          description: 'Citation ou extrait de l\'article à afficher sur le site',
          multiline: true,
        }),
        excerpt_en: fields.text({
          label: 'Extrait (version anglaise)',
          description: 'Citation ou extrait traduit en anglais si disponible',
          multiline: true,
        }),
        image: fields.image({
          label: '📷 Image',
          description: 'Photo associée à l\'article (couverture du magazine, portrait…)',
          directory: 'public/images/press',
          publicPath: '/images/press/',
        }),
        pdf: fields.file({
          label: '📄 Fichier PDF',
          description: 'Version PDF de l\'article si disponible',
          directory: 'public/files/press',
          publicPath: '/files/press/',
        }),
      },
    }),
  },

  singletons: {
    home: singleton({
      label: '🏠 Page d\'accueil',
      path: 'src/data/home',
      format: { data: 'yaml' },
      schema: {
        hero_statement_fr: fields.text({
          label: '✍️ Citation principale',
          description: 'Grande citation affichée en haut de la page d\'accueil (ex : J\'écris avec la lumière)',
        }),
        hero_statement_en: fields.text({
          label: '✍️ Citation principale (anglais)',
          description: 'Version anglaise de la citation pour les visiteurs internationaux',
        }),
        hero_subtitle_fr: fields.text({
          label: 'Sous-titre',
          description: 'Courte description sous la citation (ex : Artiste photographe)',
        }),
        hero_subtitle_en: fields.text({
          label: 'Sous-titre (anglais)',
          description: 'Version anglaise du sous-titre (ex : Visual artist & photographer)',
        }),
        featured_locations: fields.array(
          fields.text({ label: 'Identifiant du lieu' }),
          {
            label: '🌍 Lieux mis en avant',
            description: 'Lieux qui apparaissent en premier sur la page d\'accueil — entrez les identifiants URL (ex : dakar, bresil, saint-tropez)',
            itemLabel: props => props.value || 'Lieu',
          }
        ),
        expo_media_type: fields.select({
          label: '🎬 Type de média (section Expositions)',
          description: 'Choisissez si vous souhaitez afficher une vidéo ou une photo dans la section Expositions de la page d\'accueil',
          options: [
            { label: '🎬 Vidéo', value: 'video' },
            { label: '📷 Photo', value: 'image' },
          ],
          defaultValue: 'video',
        }),
        expo_video: fields.file({
          label: '🎬 Vidéo (section Expositions)',
          description: 'Format recommandé : portrait 9:16 · Dimensions : 480×854px minimum · Formats acceptés : mp4, webm · Poids max conseillé : 10 Mo',
          directory: 'public/videos',
          publicPath: '/videos/',
        }),
        expo_image: fields.image({
          label: '📷 Photo (section Expositions)',
          description: 'Format recommandé : portrait 4:5 · Dimensions : 800×1000px minimum, idéal 1200×1500px · Formats acceptés : jpg, webp, png',
          directory: 'public/images',
          publicPath: '/images/',
        }),
      },
    }),

    about: singleton({
      label: '👤 À propos',
      path: 'src/data/about',
      format: { data: 'yaml' },
      schema: {
        portrait: fields.image({
          label: '📷 Photo portrait',
          description: 'Votre portrait — apparaît sur la page À propos · Format portrait (3:4) recommandé',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        intro_fr: fields.text({
          label: 'Introduction',
          description: 'Court texte d\'accroche — 1 à 2 phrases · Affiché en évidence sur la page',
          multiline: true,
        }),
        intro_en: fields.text({
          label: 'Introduction (version anglaise)',
          description: 'Version anglaise du texte d\'accroche — 1 à 2 phrases',
          multiline: true,
        }),
        bio_fr: fields.text({
          label: 'Biographie',
          description: 'Texte biographique complet en français',
          multiline: true,
        }),
        bio_en: fields.text({
          label: 'Biographie (version anglaise)',
          description: 'Version anglaise de la biographie complète',
          multiline: true,
        }),
        statement_fr: fields.text({
          label: 'Démarche artistique',
          description: 'Votre démarche artistique en français — texte libre, personnel',
          multiline: true,
        }),
        statement_en: fields.text({
          label: 'Démarche artistique (version anglaise)',
          description: 'Version anglaise de votre démarche artistique',
          multiline: true,
        }),
        cv: fields.array(
          fields.object({
            year: fields.text({ label: 'Année / Période', description: 'Ex : 2023, 2019-2021, École du Louvre' }),
            text_fr: fields.text({ label: 'Description', description: 'Événement, résidence, prix, formation…' }),
            text_en: fields.text({ label: 'Description (version anglaise)', description: 'Même information en anglais' }),
          }),
          {
            label: '📋 Parcours / CV',
            description: 'Votre parcours artistique et professionnel — du plus récent au plus ancien',
            itemLabel: props => `${props.fields.year.value} — ${props.fields.text_fr.value}`,
          }
        ),
        pdf_bio: fields.file({
          label: '📄 PDF Biographie',
          description: 'Version PDF de votre biographie à télécharger',
          directory: 'public/files',
          publicPath: '/files/',
        }),
        pdf_exhibitions: fields.file({
          label: '📄 PDF Expositions',
          description: 'Liste complète de vos expositions en PDF',
          directory: 'public/files',
          publicPath: '/files/',
        }),
        pdf_poem: fields.file({
          label: '📄 PDF Poème',
          description: 'Poème ou texte artistique en PDF',
          directory: 'public/files',
          publicPath: '/files/',
        }),
      },
    }),

    settings: singleton({
      label: '⚙️ Paramètres du site',
      path: 'src/data/settings',
      format: { data: 'yaml' },
      schema: {
        artistName: fields.text({
          label: 'Nom de l\'artiste',
          description: 'Votre nom complet — affiché dans le titre du site et les mentions légales',
        }),
        email: fields.text({
          label: '📧 Email de contact',
          description: 'Adresse email affichée sur la page Contact — c\'est l\'email que recevront vos visiteurs',
        }),
        heroImage: fields.image({
          label: '🖼️ Grande image d\'accueil',
          description: 'Grande image affichée en bas du nom sur la page d\'accueil — format paysage 16:9 recommandé (min. 1920×1080px)',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        logo: fields.image({
          label: '✒️ Logo du site',
          description: 'Logo ou monogramme — format SVG ou PNG transparent recommandé',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        socials: fields.object({
          instagram: fields.text({ label: '📸 Instagram', description: 'URL complète de votre profil Instagram (ex : https://instagram.com/sidneycarron)' }),
          facebook: fields.text({ label: '👥 Facebook', description: 'URL complète de votre page Facebook (laisser vide si inutilisé)' }),
          linkedin: fields.text({ label: '💼 LinkedIn', description: 'URL complète de votre profil LinkedIn (laisser vide si inutilisé)' }),
          youtube: fields.text({ label: '▶️ YouTube', description: 'URL complète de votre chaîne YouTube (laisser vide si inutilisée)' }),
        }, {
          label: '📱 Réseaux sociaux',
          description: 'Laissez vide les réseaux que vous ne souhaitez pas afficher sur le site',
        }),
        defaultSeo: fields.object({
          title_fr: fields.text({
            label: '🏷️ Titre du site (onglet navigateur)',
            description: 'C\'est le texte affiché dans l\'onglet du navigateur ET sur Google quand quelqu\'un vous cherche. Exemple : "Sidney Carron — Artiste photographe". Max. 60 caractères.',
          }),
          title_en: fields.text({
            label: '🏷️ Titre du site (version anglaise)',
            description: 'Même titre pour les visiteurs anglophones. Exemple : "Sidney Carron — Visual Artist & Photographer"',
          }),
          description_fr: fields.text({
            label: '📝 Description Google',
            description: '💡 C\'est la petite phrase qui apparaît sous votre nom dans les résultats de recherche Google. Rédigez un texte naturel qui donne envie de cliquer ! Entre 120 et 160 caractères. Exemple : "Site officiel de Sidney Carron, artiste photographe. Empreintes solaires, corps et lumière."',
            multiline: true,
          }),
          description_en: fields.text({
            label: '📝 Description Google (version anglaise)',
            description: 'Même description traduite en anglais pour les résultats de recherche internationaux. Entre 120 et 160 caractères recommandés.',
            multiline: true,
          }),
          ogImage: fields.image({
            label: '🖼️ Image de partage (WhatsApp / Facebook / iMessage…)',
            description: '💡 Quand quelqu\'un partage votre site par message ou sur les réseaux sociaux, c\'est cette image qui s\'affiche en aperçu. Choisissez une belle photo représentative. Format idéal : 1200×630px (paysage).',
            directory: 'public/images',
            publicPath: '/images/',
          }),
        }, { label: '🔍 Référencement Google + Partage sur les réseaux' }),
      },
    }),

    contact: singleton({
      label: '✉️ Page Contact',
      path: 'src/data/contact',
      format: { data: 'yaml' },
      schema: {
        intro_fr: fields.text({
          label: 'Texte d\'introduction',
          description: 'Paragraphe affiché en haut de la page Contact en français',
          multiline: true,
        }),
        intro_en: fields.text({
          label: 'Texte d\'introduction (version anglaise)',
          description: 'Même paragraphe traduit en anglais pour les visiteurs internationaux',
          multiline: true,
        }),
        subjects: fields.array(
          fields.object({
            label_fr: fields.text({
              label: 'Option (français)',
              description: 'Ex : Œuvre / Tirage, Exposition, Collaboration…',
            }),
            label_en: fields.text({
              label: 'Option (anglais)',
              description: 'Traduction de l\'option en anglais (ex : Artwork / Print, Exhibition…)',
            }),
          }),
          {
            label: '📋 Options du champ Sujet',
            description: 'Propositions dans le menu déroulant Sujet — laissez vide pour un champ texte libre',
            itemLabel: props => props.fields.label_fr.value || 'Option',
          }
        ),
        success_fr: fields.text({
          label: '✅ Message de confirmation',
          description: 'Affiché après l\'envoi du formulaire en français — remerciez votre visiteur !',
          multiline: true,
        }),
        success_en: fields.text({
          label: '✅ Message de confirmation (version anglaise)',
          description: 'Même message de confirmation traduit en anglais',
          multiline: true,
        }),
      },
    }),
  },
});
