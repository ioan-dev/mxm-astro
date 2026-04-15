// Этот файл содержит всю логику запроса для главной страницы.
// Выполняется только на сервере — никогда в браузере.

import { client, readSingleton } from "../directus.js";

// Описываем, какие поля нужны для каждого типа блока
const blockFields = {
  block_homepage_hero: [
    "headline",
    {
      images_wrapper: [
        { item: { block_image_and_inverse: ["*"] } },
      ],
      images_wrapper_2: [
        { item: { block_image_and_inverse: ["*"] } },
      ],
      images_wrapper_3: [
        { item: { block_image_and_inverse: ["*"] } },
      ],
    },
  ],
  block_homepage_team: ["headline"],
};

// Полная схема полей для singleton page_home
const fields = [
  {
    blocks: [
      "*",
      {
        item: blockFields,
      },
    ],
  },
];

// Экспортируем функцию — она вызывается из index.astro
export async function getHomePage() {
  const page = await client.request(
    readSingleton("page_home", { fields })
  );
  return page;
}