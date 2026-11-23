import { projects as allProjects } from './projects';
import { products as allProducts } from './products';
import type { ProjectCategory } from './types';

export * from './site';
export * from './services';
export * from './people';
export * from './blog';
export type * from './types';

export const SHOW_DRAFTS = import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === 'true';
export const SHOW_PLACEHOLDERS = import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === 'true';

export const projects = allProjects.filter((p) => SHOW_DRAFTS || !p.draft);
export const products = allProducts.filter((p) => SHOW_DRAFTS || !p.draft);

export const CATEGORY_ORDER: ProjectCategory[] = [
  'Web Applications',
  'Software Systems',
  'E-commerce',
  'Education Platforms',
  'AI Solutions',
  'Mobile Applications',
];

/** Only categories that actually contain items — no empty filters. */
export function categoriesOf<T extends { category: ProjectCategory }>(items: T[]) {
  return CATEGORY_ORDER.filter((c) => items.some((i) => i.category === c));
}
