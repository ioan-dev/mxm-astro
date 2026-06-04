import { client, readItems, readSingleton } from '../directus.js';

export const aboutPage = await client.request(
  readSingleton('page_about', {
    fields: [
      {
        blocks: [
          '*',
          {
            item: [
              '*',
              {
                intro_text: ['layout', 'headline', 'editor_top', 'editor_left', 'editor_right'],
                about_team: ['name', 'photo'],
              },
            ],
          },
        ],
      },
    ],
  })
);
