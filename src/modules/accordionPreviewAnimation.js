import gsap from 'gsap';

export function accordionPreviewAnimation() {
  const mm = gsap.matchMedia();

  mm.add({ isLarge: '(min-width: 1024px)' }, (context) => {
    const { isLarge } = context.conditions || {};

    if (!isLarge) return;

    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach((accordion) => {
      const preview = accordion.querySelector('.accordion__all-preview');
      if (!preview) return;

      gsap.set(preview, { xPercent: 10, yPercent: 12 });

      const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });

      const previews = preview.querySelectorAll('.accordion_preview');
      gsap.set(previews, { clipPath: 'inset(100% 0% 0% 0%)' });

      accordion.addEventListener('mousemove', (e) => {
        const rect = accordion.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      });

      const items = accordion.querySelectorAll('[data-accordion-item]');

      items.forEach((item, index) => {
        const targetPreview = previews[index];
        if (!targetPreview) return;

        item.addEventListener('mouseenter', () => {
          gsap.to(targetPreview, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.4,
            ease: 'power.out',
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(targetPreview, {
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 0.4,
            ease: 'power.in',
          });
        });
      });
    });
  });
}
