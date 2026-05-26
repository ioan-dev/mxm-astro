import { client, readItems } from '../directus.js';

// Только slug — для getStaticPaths
export async function getAllProjects() {
  return client.request(
    readItems('projects', {
      fields: ['slug'],
      limit: -1,
    })
  ) as Promise<{ slug: string }[]>;
}

// Пока только title — будем добавлять поля по мере необходимости
export async function getProjectBySlug(slug: string) {
  const items = (await client.request(
    readItems('projects', {
      filter: {
        slug: { _eq: slug },
      },
      fields: ['title', 'slug'],
      limit: 1,
    })
  )) as any[];

  return items[0] ?? null;
}
