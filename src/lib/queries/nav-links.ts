import { client, readItems } from '../directus.js';

const result = await client.request(readItems('nav_links', { fields: ['name', 'slug'] }));

export const links = Array.isArray(result)
  ? result
  : Array.isArray(result?.data)
    ? result.data
    : [];
