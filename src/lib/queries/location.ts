import { client, readItems } from '../directus.js';

export const location = await client.request(readItems('categories', { fields: ['name'] }));
