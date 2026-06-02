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
      fields: [
        'title',
        'slug',
        'sort',
        'date',
        {
          areas: ['name'],
          location: ['name'],
          categories: ['name'],
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
        {
          stage: ['name'],
          categories: ['name'],
          areas: ['name'],
          location: ['name'],
          preview: ['directus_files_id'],
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
