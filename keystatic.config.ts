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
        slug: fields.slug({ name: { label: 'Slug FR' } }),
        slug_en: fields.text({ label: 'Slug EN' }),
        title_fr: fields.text({ label: 'Titre FR' }),
        title_en: fields.text({ label: 'Titre EN' }),
        year: fields.integer({ label: 'Année' }),
        medium_fr: fields.text({ label: 'Technique FR' }),
        medium_en: fields.text({ label: 'Technique EN' }),
        dimensions: fields.text({ label: 'Dimensions' }),
        series: fields.text({ label: 'Série (slug)' }),
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
        featured: fields.checkbox({ label: 'Mise en avant', defaultValue: false }),
        order: fields.integer({ label: 'Ordre', defaultValue: 0 }),
        images: fields.array(
          fields.object({
            src: fields.text({ label: 'Image (chemin)', description: 'Ex: /images/works/mon-image.jpg' }),
            alt_fr: fields.text({ label: 'Alt FR' }),
            alt_en: fields.text({ label: 'Alt EN' }),
          }),
          { label: 'Images', itemLabel: props => props.fields.alt_fr.value || 'Image' }
        ),
        description_fr: fields.text({ label: 'Description FR', multiline: true }),
        description_en: fields.text({ label: 'Description EN', multiline: true }),
      },
    }),

    series: collection({
      label: 'Séries',
      slugField: 'slug',
      path: 'src/content/series/*',
      format: { data: 'yaml' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug FR' } }),
        slug_en: fields.text({ label: 'Slug EN' }),
        title_fr: fields.text({ label: 'Titre FR' }),
        title_en: fields.text({ label: 'Titre EN' }),
        cover: fields.object({
          src: fields.text({ label: 'Image (chemin)', description: 'Ex: /images/series/ma-couverture.jpg' }),
          alt_fr: fields.text({ label: 'Alt FR' }),
          alt_en: fields.text({ label: 'Alt EN' }),
        }, { label: 'Image de couverture' }),
        description_fr: fields.text({ label: 'Description FR', multiline: true }),
        description_en: fields.text({ label: 'Description EN', multiline: true }),
        curatorial_fr: fields.text({ label: 'Texte curatorial FR', multiline: true }),
        curatorial_en: fields.text({ label: 'Texte curatorial EN', multiline: true }),
        order: fields.integer({ label: 'Ordre', defaultValue: 0 }),
      },
    }),

    exhibitions: collection({
      label: 'Expositions',
      slugField: 'slug',
      path: 'src/content/exhibitions/*',
      format: { data: 'yaml' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug FR' } }),
        slug_en: fields.text({ label: 'Slug EN' }),
        title_fr: fields.text({ label: 'Titre FR' }),
        title_en: fields.text({ label: 'Titre EN' }),
        venue_fr: fields.text({ label: 'Lieu FR' }),
        venue_en: fields.text({ label: 'Lieu EN' }),
        city: fields.text({ label: 'Ville' }),
        start_date: fields.text({ label: 'Date début', description: 'Format: YYYY-MM-DD' }),
        end_date: fields.text({ label: 'Date fin', description: 'Format: YYYY-MM-DD' }),
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
          src: fields.text({ label: 'Image (chemin)', description: 'Ex: /images/exhibitions/mon-image.jpg' }),
          alt_fr: fields.text({ label: 'Alt FR' }),
          alt_en: fields.text({ label: 'Alt EN' }),
        }, { label: 'Image' }),
        description_fr: fields.text({ label: 'Description FR', multiline: true }),
        description_en: fields.text({ label: 'Description EN', multiline: true }),
        venue_url: fields.text({ label: 'URL du lieu', description: 'URL complète (ex: https://galerie.fr)' }),
        works_slugs: fields.array(
          fields.text({ label: 'Slug oeuvre' }),
          { label: 'Oeuvres liées', itemLabel: props => props.value || 'Oeuvre' }
        ),
      },
    }),

    press: collection({
      label: 'Presse',
      slugField: 'title_fr',
      path: 'src/content/press/*',
      format: { data: 'yaml' },
      schema: {
        title_fr: fields.slug({ name: { label: 'Titre FR' } }),
        title_en: fields.text({ label: 'Titre EN' }),
        publication: fields.text({ label: 'Publication' }),
        date: fields.text({ label: 'Date', description: 'Format: YYYY-MM-DD' }),
        excerpt_fr: fields.text({ label: 'Extrait FR', multiline: true }),
        excerpt_en: fields.text({ label: 'Extrait EN', multiline: true }),
        url: fields.text({ label: 'URL article', description: 'URL complète' }),
        pdf: fields.text({ label: 'Chemin PDF' }),
        image: fields.text({ label: 'Image (chemin)', description: 'Ex: /images/press/mon-image.jpg' }),
      },
    }),
  },

  singletons: {
    home: singleton({
      label: "Page d'accueil",
      path: 'src/data/home',
      format: { data: 'yaml' },
      schema: {
        hero_statement_fr: fields.text({ label: 'Citation FR' }),
        hero_statement_en: fields.text({ label: 'Citation EN' }),
        hero_subtitle_fr: fields.text({ label: 'Sous-titre FR' }),
        hero_subtitle_en: fields.text({ label: 'Sous-titre EN' }),
        featured_works: fields.array(
          fields.text({ label: 'Slug oeuvre' }),
          { label: 'Oeuvres mises en avant', itemLabel: props => props.value || 'Oeuvre' }
        ),
      },
    }),

    about: singleton({
      label: 'À propos',
      path: 'src/data/about',
      format: { data: 'yaml' },
      schema: {
        portrait: fields.text({ label: 'Portrait (chemin)', description: 'Ex: /images/portrait.jpg' }),
        intro_fr: fields.text({ label: 'Introduction FR', multiline: true }),
        intro_en: fields.text({ label: 'Introduction EN', multiline: true }),
        bio_fr: fields.text({ label: 'Biographie FR', multiline: true }),
        bio_en: fields.text({ label: 'Biographie EN', multiline: true }),
        statement_fr: fields.text({ label: 'Démarche FR', multiline: true }),
        statement_en: fields.text({ label: 'Démarche EN', multiline: true }),
        cv: fields.array(
          fields.object({
            year: fields.text({ label: 'Année / Période' }),
            text_fr: fields.text({ label: 'Description FR' }),
            text_en: fields.text({ label: 'Description EN' }),
          }),
          { label: 'CV / Parcours', itemLabel: props => `${props.fields.year.value} — ${props.fields.text_fr.value}` }
        ),
      },
    }),

    settings: singleton({
      label: 'Paramètres',
      path: 'src/data/settings',
      format: { data: 'yaml' },
      schema: {
        artistName: fields.text({ label: "Nom de l'artiste" }),
        email: fields.text({ label: 'Email' }),
        socials: fields.object({
          instagram: fields.text({ label: 'Instagram', description: 'URL complète' }),
          facebook: fields.text({ label: 'Facebook', description: 'URL complète' }),
          linkedin: fields.text({ label: 'LinkedIn', description: 'URL complète' }),
          youtube: fields.text({ label: 'YouTube', description: 'URL complète' }),
        }, { label: 'Réseaux sociaux' }),
        defaultSeo: fields.object({
          title_fr: fields.text({ label: 'Titre SEO FR' }),
          title_en: fields.text({ label: 'Titre SEO EN' }),
          description_fr: fields.text({ label: 'Description SEO FR', multiline: true }),
          description_en: fields.text({ label: 'Description SEO EN', multiline: true }),
          ogImage: fields.text({ label: 'Image OG (chemin)', description: 'Ex: /images/og-default.jpg' }),
        }, { label: 'SEO par défaut' }),
      },
    }),
  },
});
