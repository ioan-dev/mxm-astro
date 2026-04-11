// assets/js/components/FadeBox.js
import { Piece } from 'piecesjs';
import { gsap } from 'gsap';

class FadeBox extends Piece {
  constructor() {
    super('FadeBox', {
      stylesheets: [() => import('../../css/components/fade-box.css')],
    });
  }

  mount() {
    // GSAP контекст — для правильной очистки при unmount
    this.ctx = gsap.context(() => {
      gsap.from(this, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, this); // this = корневой элемент компонента

    // Событие на клик
    this.on('click', this, this.onClick);
  }

  onClick() {
    gsap.to(this, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    });
  }

  unmount() {
    // Очищаем GSAP
    this.ctx.revert();

    // Снимаем событие
    this.off('click', this, this.onClick);
  }
}

customElements.define('c-fade-box', FadeBox);