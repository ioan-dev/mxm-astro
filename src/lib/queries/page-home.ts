// Этот файл содержит всю логику запроса для главной страницы.
// Выполняется только на сервере — никогда в браузере.

import { client, readSingleton, readItems } from '../directus.js';

// Описываем, какие поля нужны для каждого типа блока
const blockFields = {
  block_homepage_hero: [
    'headline',
    {
      images_wrapper: [
        {
          item: { block_images_item: ['*'] },
        },
      ],
      images_wrapper_2: [
        {
          item: { block_images_item: ['*'] },
        },
      ],
    },
  ],
  block_homepage_about: [
    'editor',
    {
      images: [
        {
          item: { block_images_item: ['*'] },
        },
      ],

      button_group: [
        'id',
        {
          buttons: ['label', 'type', { page: ['name', 'slug'] }],
        },
      ],
    },
  ],
  block_homepage_team: [
    'headline',
    {
      list: ['*'],
    },
  ],
  block_homepage_projects: [
    'id',
    'headline',
    {
      row: [
        {
          item: [
            {
              content: [
                {
                  item: [
                    'preview',
                    {
                      project: ['title', 'slug'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  block_homepage_services: [
    {
      contents_block: [
        {
          item: [
            'headline',
            {
              content_items: [
                {
                  item: ['*'],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  block_homepage_form: ['headline'],
};

// Полная схема полей для singleton page_home
const fields = [
  {
    blocks: [
      '*',
      {
        item: blockFields,
      },
    ],
  },
];

export async function getHomePage() {
  const [page, socialLinks] = await Promise.all([
    client.request(readSingleton('page_home', { fields })) as Promise<any>,
    client.request(readItems('social_link')),
  ]);

  return { ...(page as any), socialLinks };
}
