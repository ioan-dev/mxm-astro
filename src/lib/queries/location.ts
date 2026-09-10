import { client, readItems } from '../directus.js';

export async function getLocations() {
  return client.request(readItems('locations', { fields: ['name'] }));
}
