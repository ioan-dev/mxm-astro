// src/lib/queries/about.ts
import { client, readItems, readSingleton } from '../directus.js';

export async function getAboutPage() {
  return await client.request(
    readSingleton('page_about', {
      fields: [
        {
          blocks: [
            'collection',
            {
              item: {
                block_aboutpage_team: [
                  {
                    intro_text: ['layout', 'headline', 'editor_top', 'editor_left', 'editor_right'],
                  },
                  {
                    about_team: ['name', 'photo'],
                  },
                ],
                block_text: ['layout', 'headline', 'editor_top', 'editor_left', 'editor_right'],
                section_form: ['headline'],
              },
            },
          ],
        },
      ],
    })
  );
}
