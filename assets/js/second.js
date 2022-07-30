function spliting(element) {
  let text = element.textContent.split('');
  let result = '';
  text.forEach(function (char) {
    result +=
      char.trim() === '' ? '<span>&nbsp;</span>' : '<span>' + char + '</span>';
  });

  element.innerHTML = result;
}

const splitElements = document.querySelectorAll('.split');
for (let i = 0; i < splitElements.length; i++) {
  spliting(splitElements[i]);
}
gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('.scroller'),
  smooth: true,
});
locoScroll.on('scroll', ScrollTrigger.update);
ScrollTrigger.scrollerProxy('.scroller', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector('.scroller').style.transform
    ? 'transform'
    : 'fixed',
});

// CHANGE COLORS FOR SLIDE SECTION
window.addEventListener('load', function () {
  let pinBoxes = document.querySelectorAll('.slide__wrap > div');
  let pinWrap = document.querySelector('.slide__wrap');
  let pinWrapWidth = pinWrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;

  // Pinning and horizontal scrolling

  const slideScrollAnim = gsap.to('.slide__wrap', {
    scrollTrigger: {
      scroller: '.scroller',
      scrub: true,
      trigger: '.slide',
      pin: true,
      start: 'top top',
      end: pinWrapWidth,
    },
    x: -horizontalScrollLength,
    ease: 'none',
  });
  pinBoxes.forEach((colorSection, i) => {
    const prevBg = i === 0 ? '' : pinBoxes[i - 1].dataset.slidebgcolor;
    const prevText = i === 0 ? '' : pinBoxes[i - 1].dataset.slidecolor;

    ScrollTrigger.create({
      containerAnimation: slideScrollAnim,
      horizontal: true,
      trigger: colorSection,
      start: 'left center',
      end: 'right center',
      onEnter: () => {
        gsap.to('body', {
          backgroundColor: colorSection.dataset.slidebgcolor,
          color: colorSection.dataset.slidecolor,
          overwrite: 'auto',
        });
        const slideLineRef = colorSection.querySelector('.slide__line');
        if (slideLineRef) {
          gsap.to(slideLineRef, 0.4, { width: '5.5%', ease: Power2.easeInOut });
        }
      },
      onLeaveBack: () =>
        gsap.to('body', {
          backgroundColor: prevBg,
          color: prevText,
          overwrite: 'auto',
        }),
    });
  });
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update()); //locomotive-scroll
  ScrollTrigger.refresh();
});

////////////////////

// SECOND PROMO ANIMATION START

const promoSecondTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.promo-second',
    scroller: '.scroller',
    start: 'top 100%',
    end: 'bottom bottom',
    toggleActions: 'play none none reset',
  },
});

promoSecondTl
  .addLabel('start', '+=1')
  .staggerFrom(
    '.promo-second__top-title .split span',
    0.8,
    { y: '100%', ease: Power2.easeInOut, yoyo: true },
    0.05,
  )
  .staggerFrom(
    '.promo-second__bottom-title .split span',
    0.8,
    { y: '100%', ease: Power2.easeInOut, yoyo: true },
    0.05,
    'start',
  )
  .from(
    '.promo-second__text',
    0.4,
    { opacity: 0, ease: Power2.easeInOut },
    '>',
  );

//METAVERSE ANIM START
const metaVerseTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.metaverse',
    scroller: '.scroller',
    start: 'top 10%',
    end: 'bottom bottom',
    toggleActions: 'play none none reset',
  },
});

metaVerseTl
  .addLabel('start', '+=1')
  .staggerFrom(
    '.metaverse__worth-text .split span',
    0.8,
    { y: '100%', ease: Power2.easeInOut, yoyo: true },
    0.05,
  )
  .staggerFrom(
    '.metaverse__report-text .split span',
    0.8,
    { y: '100%', ease: Power2.easeInOut, yoyo: true },
    0.05,
    'start',
  )
  .from(
    '.metaverse__img-text',
    0.4,
    { opacity: 0, ease: Power2.easeInOut },
    '>',
  );
const metaVerseTextTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.metaverse__text-cont',
    scroller: '.scroller',
    start: 'top 90%',
    end: 'bottom bottom',
    toggleActions: 'play none none reset',
  },
});
metaVerseTextTl
  .addLabel('start', '+=1')
  .staggerFrom(
    '.metaverse__acccent-text .split span',
    0.8,
    { y: '100%', ease: Power2.easeInOut, yoyo: true },
    0.05,
  )
  .from('.metaverse__text', 0.4, { opacity: 0, ease: Power2.easeInOut }, '>');
//METAVERSE ANIM END

//WHATS WRONG WITH META ANIM

const wrngMetaTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.wrng-meta',
    scroller: '.scroller',
    start: 'top 50%',
    end: 'bottom bottom',
    toggleActions: 'play none none reset',
  },
});
wrngMetaTl
  .addLabel('start', '+=1')
  .staggerFrom(
    '.wrng-meta__top-title .split span',
    0.8,
    { y: '100%', ease: Power2.easeInOut, yoyo: true },
    0.05,
  )
  .from('.wrng-meta__icon-b', 0.4, { opacity: 0, ease: Power2.easeInOut }, '>')
  .staggerFrom(
    '.wrng-meta__bottom-title .split span',
    0.8,
    { y: '100%', ease: Power2.easeInOut, yoyo: true },
    0.05,
    '>',
  );
// WHATS WRONG WITH META ANIM

//BG COLOR CHANGE
window.addEventListener('load', function () {
  const scrollColorElems = document.querySelectorAll('[data-bgcolor]');
  scrollColorElems.forEach((colorSection, i) => {
    const prevBg = i === 0 ? '' : scrollColorElems[i - 1].dataset.bgcolor;
    const prevText = i === 0 ? '' : scrollColorElems[i - 1].dataset.textcolor;

    ScrollTrigger.create({
      trigger: colorSection,
      scroller: '.scroller',
      start: 'top 50%',
      toggleClass: 'active',
      onEnter: () =>
        gsap.to('body', {
          backgroundColor: colorSection.dataset.bgcolor,
          color: colorSection.dataset.textcolor,
          overwrite: 'auto',
        }),
      onLeaveBack: () =>
        gsap.to('body', {
          backgroundColor: prevBg,
          color: prevText,
          overwrite: 'auto',
        }),
    });
  });
});

//RUNNING TEXT
$('.marquee').marquee({
  //speed in milliseconds of the marquee
  duration: 10000,
  //gap in pixels between the tickers
  gap: 20,
  //time in milliseconds before the marquee will start animating
  delayBeforeStart: 0,
  //'left' or 'right'
  direction: 'left',
  //true or false - should the marquee be duplicated to show an effect of continues flow
  duplicated: true,
});
