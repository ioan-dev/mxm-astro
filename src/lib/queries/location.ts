import { client, readItems } from '../directus.js';

export const locations = await client.request(readItems('locations', { fields: ['name'] }));
