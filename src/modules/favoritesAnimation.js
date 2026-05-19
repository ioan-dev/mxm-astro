import { gsap } from 'gsap';

function favoritesAnimation() {
  let section = document.querySelector('[data-animation="favorites"]');

  const items = document.querySelectorAll('.projects__card');

  // Проходим по каждому элементу
  items.forEach((item) => {
    // При наведении на элемент
    item.querySelector('.projects__overlay-wrapper').addEventListener('mouseover', () => {
      // Получаем значение data-case текущего элемента
      const caseValue = item.dataset.case;

      // Находим все элементы с таким же data-case
      const matchingItems = document.querySelectorAll(`.projects__card[data-case="${caseValue}"]`);

      // Добавляем класс favorites__item--active всем подходящим элементам
      matchingItems.forEach((matchingItem) => {
        matchingItem.classList.add('projects__card--active');
      });
    });

    // При уходе курсора с элемента
    item.addEventListener('mouseout', () => {
      // Получаем значение data-case текущего элемента
      const caseValue = item.dataset.case;

      // Находим все элементы с таким же data-case
      const matchingItems = document.querySelectorAll(`.projects__card[data-case="${caseValue}"]`);

      // Убираем класс favorites__item--active у всех подходящих элементов
      matchingItems.forEach((matchingItem) => {
        matchingItem.classList.remove('projects__card--active');
      });
    });
  });
}

export default favoritesAnimation;
