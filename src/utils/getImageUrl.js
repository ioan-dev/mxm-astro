// Пример базового URL вашего Directus
const DIRECTUS_URL = 'https://cms.max-mikhailov.com';

// Функция для получения полного пути к картинке
export function getImageUrl(imageId) {
  return `${DIRECTUS_URL}/assets/${imageId}`;
}