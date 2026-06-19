import { gsap } from 'gsap';

let mm = gsap.matchMedia();

mm.add({ isLarge: '(min-width: 1024px)', isSmall: '(max-width: 1023px)' }, (cotext) => {
  let { isLarge, isSmall } = context.conditions;

  if (isLarge) {
  }
});
