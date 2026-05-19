export function teamGridAnimation() {
  const teamGrid = document.querySelector('.team__miniatures');

  if (!teamGrid) {
    console.log('DESKT NO');
    return;
  }

  const miniatures = document.querySelectorAll('.team__item');
  const showBlocks = document.querySelectorAll('.team__show');
  const mediaQuery = window.matchMedia('(min-width: 1024px)');

  // Сохраняем обработчик для возможности его удаления
  let handleMouseEnter = null;

  function enableAnimation() {
    handleMouseEnter = (e) => {
      const miniature = e.target.closest('.team__item');

      if (!miniature) return;

      const index = Array.from(miniatures).indexOf(miniature);

      miniatures.forEach((item) => item.classList.remove('team__item--active'));
      showBlocks.forEach((block) => block.classList.remove('team__show--active'));

      miniature.classList.add('team__item--active');
      if (showBlocks[index]) {
        showBlocks[index].classList.add('team__show--active');
      }
    };

    teamGrid.addEventListener('mouseenter', handleMouseEnter, true);
  }

  function disableAnimation() {
    if (handleMouseEnter) {
      teamGrid.removeEventListener('mouseenter', handleMouseEnter, true);
      handleMouseEnter = null;
    }

    // Убираем все активные классы
    miniatures.forEach((item) => item.classList.remove('team__item--active'));
    showBlocks.forEach((block) => block.classList.remove('team__show--active'));
  }

  function handleMediaChange(e) {
    if (e.matches) {
      enableAnimation();
    } else {
      disableAnimation();
    }
  }

  // Слушаем изменения media query
  mediaQuery.addEventListener('change', handleMediaChange);

  // Инициализируем сразу, если условие выполнено
  if (mediaQuery.matches) {
    enableAnimation();
  }
}
