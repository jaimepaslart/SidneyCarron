import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' as const }
    : {
        kind: 'github' as const,
        repo: 'jaimepaslart/SidneyCarron',
      },

  ui: {
    brand: { name: 'Sidney Carron — Admin' },
  },

  collections: {
    works: collection({
      label: 'Oeuvres',
      slugField: 'slug',
      path: 'src/content/works/*',
      format: { data: 'yaml' },
      schema: {
        slug: fields.slug({ name: { label: 'Identifiant' } }),
        title_fr: fields.text({ label: 'Titre' }),
        title_en: fields.text({ label: 'Title (English)' }),
        year: fields.integer({ label: 'Année' }),
        medium_fr: fields.text({ label: 'Technique' }),
        medium_en: fields.text({ label: 'Medium (English)' }),
        dimensions: fields.text({ label: 'Dimensions' }),
        series: fields.text({ label: 'Série (identifiant)' }),
        location: fields.select({
          label: 'Lieu de production',
          options: [
            { label: 'Brésil', value: 'bresil' },
            { label: 'Dakar', value: 'dakar' },
            { label: 'Saint-Tropez', value: 'saint-tropez' },
            { label: 'La Réunion', value: 'reunion' },
            { label: 'Sri Lanka', value: 'sri-lanka' },
            { label: 'Costa Rica', value: 'costa-rica' },
          ],
          defaultValue: 'bresil',
        }),
        featured: fields.checkbox({ label: 'Mettre en avant sur le site', defaultValue: false }),
        order: fields.integer({ label: 'Ordre d\'affichage', defaultValue: 0 }),
        images: fields.array(
          fields.object({
            src: fields.image({
              label: 'Image',
              directory: 'public/images/works',
              publicPath: '/images/works/',
            }),
            alt_fr: fields.text({ label: 'Description image (FR)' }),
            alt_en: fields.text({ label: 'Image description (EN)' }),
          }),
          { label: 'Photos', itemLabel: props => props.fields.alt_fr.value || 'Photo' }
        ),
        video: fields.file({
          label: 'Vidéo',
          directory: 'public/videos/works',
          publicPath: '/videos/works/',
        }),
        video_url: fields.text({ label: 'Lien vidéo YouTube ou Vimeo' }),
        description_fr: fields.text({ label: 'Description', multiline: true }),
        description_en: fields.text({ label: 'Description (English)', multiline: true }),
        slug_en: fields.text({ label: 'Identifiant anglais' }),
      },
    }),

    series: collection({
      label: 'Séries',
      slugField: 'slug',
      path: 'src/content/series/*',
      format: { data: 'yaml' },
      schema: {
        slug: fields.slug({ name: { label: 'Identifiant' } }),
        title_fr: fields.text({ label: 'Titre' }),
        title_en: fields.text({ label: 'Title (English)' }),
        cover: fields.object({
          src: fields.image({
            label: 'Image de couverture',
            directory: 'public/images/series',
            publicPath: '/images/series/',
          }),
          alt_fr: fields.text({ label: 'Description image (FR)' }),
          alt_en: fields.text({ label: 'Image description (EN)' }),
        }, { label: 'Image de couverture' }),
        description_fr: fields.text({ label: 'Description', multiline: true }),
        description_en: fields.text({ label: 'Description (English)', multiline: true }),
        curatorial_fr: fields.text({ label: 'Texte curatorial', multiline: true }),
        curatorial_en: fields.text({ label: 'Curatorial text (English)', multiline: true }),
        order: fields.integer({ label: 'Ordre d\'affichage', defaultValue: 0 }),
        slug_en: fields.text({ label: 'Identifiant anglais' }),
      },
    }),

    exhibitions: collection({
      label: 'Expositions',
      slugField: 'slug',
      path: 'src/content/exhibitions/*',
      format: { data: 'yaml' },
      schema: {
        slug: fields.slug({ name: { label: 'Identifiant' } }),
        title_fr: fields.text({ label: 'Titre' }),
        title_en: fields.text({ label: 'Title (English)' }),
        venue_fr: fields.text({ label: 'Lieu' }),
        venue_en: fields.text({ label: 'Venue (English)' }),
        city: fields.text({ label: 'Ville' }),
        start_date: fields.date({ label: 'Date de début' }),
        end_date: fields.date({ label: 'Date de fin' }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Solo', value: 'solo' },
            { label: 'Collective', value: 'group' },
          ],
          defaultValue: 'solo',
        }),
        status: fields.select({
          label: 'Statut',
          options: [
            { label: 'À venir', value: 'upcoming' },
            { label: 'En cours', value: 'current' },
            { label: 'Passée', value: 'past' },
          ],
          defaultValue: 'upcoming',
        }),
        image: fields.object({
          src: fields.image({
            label: 'Photo',
            directory: 'public/images/exhibitions',
            publicPath: '/images/exhibitions/',
          }),
          alt_fr: fields.text({ label: 'Description image (FR)' }),
          alt_en: fields.text({ label: 'Image description (EN)' }),
        }, { label: 'Photo' }),
        video: fields.file({
          label: 'Vidéo',
          directory: 'public/videos/exhibitions',
          publicPath: '/videos/exhibitions/',
        }),
        video_url: fields.text({ label: 'Lien vidéo YouTube ou Vimeo' }),
        description_fr: fields.text({ label: 'Description', multiline: true }),
        description_en: fields.text({ label: 'Description (English)', multiline: true }),
        venue_url: fields.text({ label: 'Site web du lieu' }),
        works_slugs: fields.array(
          fields.text({ label: 'Identifiant oeuvre' }),
          { label: 'Oeuvres liées', itemLabel: props => props.value || 'Oeuvre' }
        ),
        slug_en: fields.text({ label: 'Identifiant anglais' }),
      },
    }),

    press: collection({
      label: 'Presse',
      slugField: 'title_fr',
      path: 'src/content/press/*',
      format: { data: 'yaml' },
      schema: {
        title_fr: fields.slug({ name: { label: 'Titre' } }),
        title_en: fields.text({ label: 'Title (English)' }),
        publication: fields.text({ label: 'Nom de la publication' }),
        date: fields.date({ label: 'Date' }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/press',
          publicPath: '/images/press/',
        }),
        pdf: fields.file({
          label: 'Fichier PDF',
          directory: 'public/files/press',
          publicPath: '/files/press/',
        }),
        url: fields.text({ label: 'Lien vers l\'article' }),
        excerpt_fr: fields.text({ label: 'Extrait', multiline: true }),
        excerpt_en: fields.text({ label: 'Excerpt (English)', multiline: true }),
      },
    }),
  },

  singletons: {
    home: singleton({
      label: "Page d'accueil",
      path: 'src/data/home',
      format: { data: 'yaml' },
      schema: {
        hero_statement_fr: fields.text({ label: 'Citation' }),
        hero_statement_en: fields.text({ label: 'Quote (English)' }),
        hero_subtitle_fr: fields.text({ label: 'Sous-titre' }),
        hero_subtitle_en: fields.text({ label: 'Subtitle (English)' }),
        featured_works: fields.array(
          fields.text({ label: 'Identifiant oeuvre' }),
          { label: 'Oeuvres mises en avant', itemLabel: props => props.value || 'Oeuvre' }
        ),
      },
    }),

    about: singleton({
      label: 'À propos',
      path: 'src/data/about',
      format: { data: 'yaml' },
      schema: {
        portrait: fields.image({
          label: 'Photo portrait',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        intro_fr: fields.text({ label: 'Introduction', multiline: true }),
        intro_en: fields.text({ label: 'Introduction (English)', multiline: true }),
        bio_fr: fields.text({ label: 'Biographie', multiline: true }),
        bio_en: fields.text({ label: 'Biography (English)', multiline: true }),
        statement_fr: fields.text({ label: 'Démarche artistique', multiline: true }),
        statement_en: fields.text({ label: 'Artist statement (English)', multiline: true }),
        cv: fields.array(
          fields.object({
            year: fields.text({ label: 'Année / Période' }),
            text_fr: fields.text({ label: 'Description' }),
            text_en: fields.text({ label: 'Description (English)' }),
          }),
          { label: 'CV / Parcours', itemLabel: props => `${props.fields.year.value} — ${props.fields.text_fr.value}` }
        ),
      },
    }),

    settings: singleton({
      label: 'Paramètres du site',
      path: 'src/data/settings',
      format: { data: 'yaml' },
      schema: {
        artistName: fields.text({ label: "Nom de l'artiste" }),
        email: fields.text({ label: 'Email de contact' }),
        socials: fields.object({
          instagram: fields.text({ label: 'Instagram' }),
          facebook: fields.text({ label: 'Facebook' }),
          linkedin: fields.text({ label: 'LinkedIn' }),
          youtube: fields.text({ label: 'YouTube' }),
        }, { label: 'Réseaux sociaux' }),
        defaultSeo: fields.object({
          title_fr: fields.text({ label: 'Titre du site' }),
          title_en: fields.text({ label: 'Site title (English)' }),
          description_fr: fields.text({ label: 'Description du site', multiline: true }),
          description_en: fields.text({ label: 'Site description (English)', multiline: true }),
          ogImage: fields.image({
            label: 'Image de partage (réseaux sociaux)',
            directory: 'public/images',
            publicPath: '/images/',
          }),
        }, { label: 'Référencement (SEO)' }),
      },
    }),
  },
});
