import { createDirectus, rest, readSingleton, readItems, readItem } from '@directus/sdk';

// Создаём клиент, указываем адрес твоего Directus
const client = createDirectus('https://cms.max-mikhailov.com').with(rest());

export { client, readSingleton, readItems, readItem };
