import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    slug: z.string(),
    slug_en: z.string(),
    title_fr: z.string(),
    title_en: z.string(),
    year: z.number(),
    medium_fr: z.string(),
    medium_en: z.string(),
    dimensions: z.string(),
    series: z.string(),
    featured: z.boolean().default(false),
    images: z.array(
      z.object({
        src: z.string(),
        alt_fr: z.string(),
        alt_en: z.string(),
      })
    ),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
    order: z.number().default(0),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: z.object({
    slug: z.string(),
    slug_en: z.string(),
    title_fr: z.string(),
    title_en: z.string(),
    cover: z.object({
      src: z.string(),
      alt_fr: z.string(),
      alt_en: z.string(),
    }),
    description_fr: z.string(),
    description_en: z.string(),
    curatorial_fr: z.string().optional(),
    curatorial_en: z.string().optional(),
    order: z.number().default(0),
  }),
});

const exhibitions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/exhibitions' }),
  schema: z.object({
    slug: z.string(),
    slug_en: z.string(),
    title_fr: z.string(),
    title_en: z.string(),
    venue_fr: z.string(),
    venue_en: z.string(),
    city: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    type: z.enum(['solo', 'group']),
    status: z.enum(['upcoming', 'current', 'past']),
    image: z
      .object({
        src: z.string(),
        alt_fr: z.string(),
        alt_en: z.string(),
      })
      .optional(),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
    venue_url: z.string().url().optional(),
    works_slugs: z.array(z.string()).default([]),
  }),
});

const press = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/press' }),
  schema: z.object({
    title_fr: z.string(),
    title_en: z.string(),
    publication: z.string(),
    date: z.string(),
    excerpt_fr: z.string().optional(),
    excerpt_en: z.string().optional(),
    url: z.string().url().optional(),
    pdf: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { works, series, exhibitions, press };
