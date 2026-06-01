import { client, readItems } from '../directus.js';

export const categories = await client.request(readItems('categories', { fields: ['name'] }));
