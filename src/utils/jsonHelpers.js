// src/utils/jsonHelpers.js

/**
 * Безопасно преобразует данные в строку JSON для вывода в <pre>
 * @param {*} data - любые данные из Directus или другого источника
 * @returns {string} - отформатированный JSON или сообщение об ошибке
 */
export function safeJsonDebug(data) {
  // 1. Проверяем, пришли ли данные вообще
  if (data === undefined || data === null) {
    return '⚠️ Данные отсутствуют (undefined или null)';
  }

  // 2. Пытаемся безопасно преобразовать в строку
  try {
    // null, 2 → делает отступы по 2 пробела для читаемости
    return JSON.stringify(data, null, 2);
  } catch (error) {
    // 3. Если данные содержат циклические ссылки, функции или символы,
    // JSON.stringify выбросит ошибку. Ловим её и выводим понятно.
    return `❌ Ошибка форматирования: ${error.message}`;
  }
}