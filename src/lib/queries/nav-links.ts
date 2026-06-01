import { client, readItems } from '../directus.js';

export const links = await client.request(readItems('nav_links', { fields: ['name', 'slug'] }));
