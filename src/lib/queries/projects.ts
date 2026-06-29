import { client, readItems } from '../directus.js';
import { categories } from './categories.js';

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
      fields: [
        'title',
        'slug',
        'sort',
        'date',
        'location_details',
        {
          areas: ['name'],
          location: ['name'],
          categories: [
            {
              categories_id: ['name', 'slug', 'id'], // ← Поля из коллекции categories
            },
          ],
          stage: ['name'],
          team: ['type', 'name', 'link'],
          blocks: [
            'collection',
            {
              item: {
                block_projects_hero: ['image', 'layout'],
                block_projects_intro: ['headline', 'editor_left', 'editor_right'],
                block_text: ['*', 'headline'],
                block_images: [
                  'size',
                  'align',
                  {
                    builder: [
                      {
                        item: ['image', 'inverse'],
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
      limit: 1,
    })
  )) as any[];

  return items[0] ?? null;
}

// Для каталога — список проектов с нужными полями
export async function getAllProjectsForCatalog() {
  return client.request(
    readItems('projects', {
      fields: [
        'title',
        'slug',
        'date',
        'location_details',
        {
          stage: ['name'],
          categories: [
            {
              categories_id: ['name'], // Поля из коллекции categories
            },
          ],
          areas: ['name'],
          location: ['name'],
          preview: ['directus_files_id.id', 'directus_files_id.width', 'directus_files_id.height'],
          preview_mobile: ['id', 'width', 'height'],
          blocks: [
            'collection',
            {
              item: {
                // Берём только hero, чтобы достать превью
                block_projects_hero: ['image', 'layout'],
              },
            },
          ],
        },
      ],
      limit: -1,
    })
  ) as Promise<any[]>;
}

export const projects = await client.request(
  readItems('projects', { fields: ['title', 'sort', 'slug'] })
);
