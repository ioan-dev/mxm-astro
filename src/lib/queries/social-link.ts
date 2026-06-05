import { client, readItems } from '../directus.js';

export const links = await client.request(
  readItems('social_link', { fields: ['name', 'link', 'type_link'] })
);
