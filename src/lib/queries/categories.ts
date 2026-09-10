// src/lib/queries/categories.ts
import { client, readItems } from '../directus.js';

export async function getCategories() {
  return await client.request(readItems('categories', { fields: ['name'] }));
}
