// DISABLE SCROLL POSITION RECOVERY
{
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
}
// RELOAD ON RESIZE
{
  window.addEventListener(
    'resize',
    debounce(() => location.reload(false), 100),
  );
}
const REFS = {
  scroller: document.querySelector('.scroller'),
};
const ANIMATION_PARAMS = {
  textStaggerY100: [
    0.8,
    { y: '100%', ease: Power2.easeInOut, yoyo: true },
    0.05,
  ],
  opacity: [0.4, { opacity: 0, ease: Power2.easeInOut }],
};
// number of loaded images for preloader progress
var loadedCount = 0; //current number of images loaded
var imagesToLoad = $('img').length; //number of slides with .bcg container
var loadingProgress = 0; //timeline progress - starts at 0

$('img')
  .imagesLoaded({
    background: false,
  })
  .progress(function (instance, image) {
    loadProgress();
  });

function loadProgress(imgLoad, image) {
  //one more image has been loaded
  loadedCount++;

  loadingProgress = loadedCount / imagesToLoad;

  //console.log(loadingProgress);

  // GSAP timeline for our progress bar
  TweenLite.to(progressTl, 0.7, {
    progress: loadingProgress,
    ease: Linear.easeNone,
  });
}

//progress animation instance. the instance's time is irrelevant, can be anything but 0 to void  immediate render
var progressTl = new TimelineMax({
  paused: true,
  onUpdate: progressUpdate,
});

progressTl
  //tween the progress bar width
  .to($('.loading__bg-bottom'), 1, { height: '100%', ease: Linear.easeNone });

//as the progress bar witdh updates and grows we put the precentage loaded in the screen
function progressUpdate() {
  //the percentage loaded based on the tween's progress
  loadingProgress = Math.round(progressTl.progress() * 100);
  //we put the percentage in the screen
  $('.loading__percentage').text(loadingProgress + '%');
}

function loadComplete() {
  // preloader out
  document.getElementById('preloader').classList.add('hide');
  document.body.classList.remove('no-scroll');
  // var preloaderOutTl = new TimelineMax();

  // // preloaderOutTl
  // //   .to($('.progress'), 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn })
  // //   .to($('.txt-perc'), 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn }, 0.1)
  // //   .set($('body'), { className: '-=is-loading' })
  // //   .set($('#intro'), { className: '+=is-loaded' })
  // //   .to($('#preloader'), 0.7, { yPercent: 100, ease: Power4.easeInOut })
  // //   .set($('#preloader'), { className: '+=is-hidden' })
  // //   .from(
  // //     $('#intro .title'),
  // //     1,
  // //     { autoAlpha: 0, ease: Power1.easeOut },
  // //     '-=0.2',
  // //   )
  // //   .from($('#intro p'), 0.7, { autoAlpha: 0, ease: Power1.easeOut }, '+=0.2')
  // //   .from(
  // //     $('.scroll-hint'),
  // //     0.3,
  // //     { y: -20, autoAlpha: 0, ease: Power1.easeOut },
  // //     '+=0.1',
  // //   );

  // return preloaderOutTl;
}

// SPLITTING
function spliting(element) {
  let text = element.textContent.split('');
  let result = '';
  text.forEach(function (char) {
    result +=
      char.trim() === '' ? '<span>&nbsp;</span>' : '<span>' + char + '</span>';
  });

  element.innerHTML = result;
}

// BUTTON HOVER
function btnHover(button) {
  let charsInSpan = button.textContent
    .split('')
    .reduce(
      (acc, char) =>
        char.trim() === ''
          ? acc + '<span>&nbsp;</span>'
          : acc + '<span>' + char + '</span>',
      '',
    );
  button.innerHTML = `<span class="button__split-top">${charsInSpan}</span><span  class="button__split-bottom">${charsInSpan}</span><div class="button__left-line"></div><div class="button__right-line"></div>`;

  const buttonTl = gsap.timeline({ paused: true });
  const topLettersRefs = button.querySelectorAll('.button__split-top span');
  const bottomLettersRefs = button.querySelectorAll(
    '.button__split-bottom span',
  );
  const leftLineRef = button.querySelector('.button__left-line');
  const rightLineRef = button.querySelector('.button__right-line');
  buttonTl
    .staggerTo(
      topLettersRefs,
      0.4,
      { y: '-100%', ease: Power1.easeInOut },
      0.03,
    )
    .staggerTo(
      bottomLettersRefs,
      0.4,
      {
        y: '-100%',
        ease: Power1.easeInOut,
      },
      0.03,
      0,
    )
    .to(rightLineRef, 0.3, { width: '0%', ease: Power1.easeInOut }, 0)
    .to(leftLineRef, 0.4, { width: '100%', ease: Power1.easeInOut }, 0);
  button.addEventListener('mouseenter', function () {
    buttonTl.play();
  });
  button.addEventListener('mouseleave', function () {
    buttonTl.reverse();
  });
}

// ViewPort REAL Height
{
  const vh = document.documentElement.clientHeight / 100;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// JSON ANIMATION
let percent;
{
  percent = bodymovin.loadAnimation({
    container: document.getElementById('metaverse-svg'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: 'img/35-percent-larger.json',
  });

  const cube = bodymovin.loadAnimation({
    container: document.getElementById('cube-svg'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'img/Cube.json',
  });
}

document.addEventListener('DOMContentLoaded', function (event) {
  window.onload = function () {
    // LOCOSCROLL

    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
      el: REFS.scroller,
      smooth: true,
    });
    locoScroll.on('scroll', ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(REFS.scroller, {
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
      pinType: REFS.scroller.style.transform ? 'transform' : 'fixed',
    });
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update()); //locomotive-scroll
    ScrollTrigger.addEventListener('refresh', loadComplete);
    ////////////////////

    // MENU
    {
      const refs = {
        openBtn: document.querySelector('.header__menu-btn'),
        closeBtn: document.querySelector('.menu__close-btn'),
        menu: document.querySelector('.menu'),
        title: document.querySelectorAll('.menu__nav > li > a'),
        scroller: REFS.scroller,
        menuLinks: document.querySelectorAll('.menu__social-link'),
      };
      ScrollTrigger.matchMedia({
        '(max-width: 1199px)': () => refs.menuLinks.forEach(btnHover),
      });
      const titleAnimation = gsap.from(refs.title, {
        y: '100%',
        stagger: { each: 0.05, ease: Power2.easeInOut },
        paused: true,
      });
      function handleMenuOpen() {
        locoScroll.stop();
        refs.menu.classList.toggle('show');
        titleAnimation.restart();
      }
      function handleMenuClose() {
        refs.menu.classList.toggle('show');
        titleAnimation.reverse();
        locoScroll.start();
      }
      refs.openBtn.addEventListener('click', handleMenuOpen);
      refs.closeBtn.addEventListener('click', handleMenuClose);
    }
    // SECOND PROMO ANIMATION START

    {
      const promoSecondTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.promo-second',
          scroller: REFS.scroller,
          start: 'top 100%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      promoSecondTl
        .addLabel('start', '+=1')
        .staggerFrom(
          '.promo-second__top-title .split span',
          ...ANIMATION_PARAMS.textStaggerY100,
        )
        .staggerFrom(
          '.promo-second__bottom-title .split span',
          ...ANIMATION_PARAMS.textStaggerY100,
          'start',
        )
        .from('.promo-second__text', ...ANIMATION_PARAMS.opacity, '>');
    }

    //METAVERSE ANIM START

    {
      //JSON ANIMATION TRIGGER
      ScrollTrigger.create({
        trigger: '#metaverse-svg',
        scroller: REFS.scroller,
        start: 'top center',
        end: 'bottom top',
        onEnter: () => percent.play(),
        onEnterBack: () => percent.play(),
        onLeaveBack: () => percent.pause(),
        onLeave: () => percent.pause(),
      });
      //JSON ANIMATION TRIGGER

      const worthTextAnim = function (tl) {
        tl.addLabel('start', '+=1')
          .staggerFrom(
            '.metaverse__worth-text .split span',
            ...ANIMATION_PARAMS.textStaggerY100,
          )
          .staggerFrom(
            '.metaverse__img-text > div > div span',
            ...ANIMATION_PARAMS.textStaggerY100,
            '<',
          )
          .from(
            '.metaverse__img-text-line',
            0.8,
            { width: 0, ease: Power2.easeInOut, yoyo: true },
            0.2,
            '<',
          );
      };
      const worthTextAnimMob = function (tl) {
        tl.addLabel('start', '+=1')
          .staggerFrom(
            '.metaverse__worth-text .split span',
            ...ANIMATION_PARAMS.textStaggerY100,
          )
          .staggerFrom(
            '.metaverse__img-text > div > div span',
            ...ANIMATION_PARAMS.textStaggerY100,
            '<30%',
          )
          .from(
            '.metaverse__img-text-line',
            0.8,
            { width: 0, ease: Power2.easeInOut, yoyo: true },
            0.2,
            '<',
          );
      };
      const textAnim = function (tl) {
        tl.addLabel('start', '+=1')
          .staggerFrom(
            '.metaverse__acccent-text .split span',
            ...ANIMATION_PARAMS.textStaggerY100,
          )
          .from('.metaverse__text', ...ANIMATION_PARAMS.opacity, '<30%');
      };
      const textAnimMob = function (tl) {
        tl.addLabel('start', '+=1')
          .staggerFrom(
            '.metaverse__acccent-text .split span',
            ...ANIMATION_PARAMS.textStaggerY100,
          )
          .from('.metaverse__text', ...ANIMATION_PARAMS.opacity, '<');
      };
      ScrollTrigger.matchMedia({
        // MOBILE
        '(max-width: 1199px)': () => {
          const metaVerseTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.metaverse__worth-text',
              scroller: REFS.scroller,
              start: 'top 90%',
              //markers: true,

              toggleActions: 'play none none reverse',
            },
          });
          worthTextAnimMob(metaVerseTl);
          const metaVerseTextTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.metaverse__text-cont',
              scroller: REFS.scroller,
              start: 'top 90%',
              end: 'bottom bottom',
              //markers: true,
              toggleActions: 'play none none reverse',
            },
          });
          textAnimMob(metaVerseTextTl);
        },
        // desktop
        '(min-width: 1200px)': function () {
          // TITLE
          {
            const titleWrapEl = document.querySelector(
              '.metaverse__title-wrap',
            );
            const containerEL = document.querySelector('.container');
            function headerScrollLengthFn() {
              const containerPadding =
                parseFloat(
                  window.getComputedStyle(containerEL)['padding-left'],
                ) * 2;
              const headerScrollLength =
                titleWrapEl.scrollWidth +
                containerPadding -
                document.body.clientWidth;
              return headerScrollLength;
            }
            gsap.to(titleWrapEl, {
              x: () => -headerScrollLengthFn(),
              startAt: { x: 0 },
              ease: 'none',
              scrollTrigger: {
                scroller: REFS.scroller,
                trigger: '.metaverse__header',
                start: 'top 5%',
                pin: true,
                scrub: 1,
                end: () => '+=' + headerScrollLengthFn(),
                invalidateOnRefresh: true,
              },
            });
          }
          // TEXT
          const metaVerseTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.metaverse__worth-text',
              scroller: REFS.scroller,
              start: 'top center',
              end: 'bottom bottom',
              toggleActions: 'play none none reverse',
              // markers: { startColor: 'green', endColor: 'red', fontSize: '12px' },
            },
          });

          worthTextAnim(metaVerseTl);

          const metaVerseTextTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.metaverse__text-cont',
              scroller: REFS.scroller,
              start: 'top 90%',
              end: 'bottom bottom',
              toggleActions: 'play none none reverse',
            },
          });
          textAnim(metaVerseTextTl);
        },
      });
    }
    //METAVERSE ANIM END

    //WHATS WRONG WITH META ANIM
    {
      const wrngMetaTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.wrng-meta',
          scroller: REFS.scroller,
          start: 'top 50%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });
      wrngMetaTl
        .addLabel('start', '+=0.5')
        .staggerFrom(
          '.wrng-meta__top-title .split span',
          ...ANIMATION_PARAMS.textStaggerY100,
          'start',
        )
        .staggerFrom(
          '.wrng-meta__bottom-title .split span',
          ...ANIMATION_PARAMS.textStaggerY100,
          '<30%',
        )
        .from('.wrng-meta__icon-b', ...ANIMATION_PARAMS.opacity, '>');
    }
    // WHATS WRONG WITH META ANIM

    // SLIDE SECTION ANIM
    {
      const solutionAnim = function (tl) {
        tl.addLabel('start', '+=1').staggerFrom(
          '.solution__title .split span',
          ...ANIMATION_PARAMS.textStaggerY100,
        );
      };
      const reduceAnim = function (tl) {
        tl.addLabel('start', '+=1').staggerFrom(
          '.reduce__title .split span',
          ...ANIMATION_PARAMS.textStaggerY100,
        );
      };
      const slideAnim = function (tl, slideSelector) {
        tl.addLabel('start', '+=1')
          .staggerFrom(
            slideSelector + ' .slide__title > span span',
            ...ANIMATION_PARAMS.textStaggerY100,
          )
          .from(
            slideSelector + ' .slide__text',
            0.8,
            { y: 10, opacity: 0, ease: Power2.easeInOut, yoyo: true },
            0.2,
            '>',
          )
          .from(
            slideSelector + ' .slide__line',
            0.8,
            { width: 0, ease: Power2.easeInOut, yoyo: true },
            0.2,
            '<',
          );
      };
      ScrollTrigger.matchMedia({
        // MOBILE
        '(max-width: 1199px)': () => {
          // SOLUTION
          {
            const solutionTl = gsap.timeline({
              scrollTrigger: {
                trigger: '.solution',
                scroller: REFS.scroller,
                start: 'top center',
                //markers: true,
                toggleActions: 'play none none reverse',
              },
            });
            solutionAnim(solutionTl);
          }
          // REDUCE ANIM
          {
            const reduceTl = gsap.timeline({
              scrollTrigger: {
                trigger: '.reduce',
                start: 'top center',
                toggleActions: 'play none none reverse',
                //markers: true,
              },
            });
            reduceAnim(reduceTl);
          }
          // SLIDE 1 ANIM
          {
            const slide1Tl = gsap.timeline({
              scrollTrigger: {
                trigger: '.slide-1',
                start: 'top center',
                // markers: true,
                toggleActions: 'play none none reverse',
                // markers: true,
              },
            });
            slideAnim(slide1Tl, '.slide-1');
          }
          // SLIDE 2 ANIM
          {
            const slide2Tl = gsap.timeline({
              scrollTrigger: {
                trigger: '.slide-2',
                start: 'top center',
                toggleActions: 'play none none reverse',
                //markers: true,
              },
            });
            slideAnim(slide2Tl, '.slide-2');
          }
          // SLIDE 3 ANIM
          {
            const slide3Tl = gsap.timeline({
              scrollTrigger: {
                trigger: '.slide-3',
                start: 'top center',
                toggleActions: 'play none none reverse',
                //markers: true,
              },
            });
            slideAnim(slide3Tl, '.slide-3');
          }
        },
        // DESKTOP
        '(min-width: 1200px)': () => {
          // SOLUTION ANIM
          {
            const solutionTl = gsap.timeline({
              scrollTrigger: {
                trigger: '.solution',
                scroller: REFS.scroller,
                start: 'top 40%',
                end: 'bottom center',
                toggleActions: 'play none none reverse',
              },
            });
            solutionAnim(solutionTl);
          }
          // Section PIN START
          let pinBoxes = document.querySelectorAll('.slide__wrap > div');
          let pinWrap = document.querySelector('.slide__wrap');
          pinBoxes.forEach(frame => frame.setAttribute('horizontal', 'true'));
          function horizontalScrollLengthFn() {
            let pinWrapWidth = pinWrap.offsetWidth;
            let horizontalScrollLength =
              pinWrapWidth - document.body.clientWidth;
            return horizontalScrollLength;
          }

          // Pinning and horizontal scrolling

          const slideScrollAnim = gsap.to('.slide__wrap', {
            scrollTrigger: {
              scroller: REFS.scroller,
              scrub: true,
              trigger: '.slide',
              pin: true,
              start: 'top top',
              invalidateOnRefresh: true,
              end: () => '+=' + horizontalScrollLengthFn(),
              onEnter: () => {
                gsap.to(REFS.scroller, {
                  backgroundColor: '#fff',
                  color: '#000',
                  overwrite: 'auto',
                });
              },
              onEnterBack: () => {
                gsap.to(REFS.scroller, {
                  backgroundColor: '#000',
                  color: '#C5FD64',
                  overwrite: 'auto',
                });
              },
            },
            x: () => -horizontalScrollLengthFn(),
            startAt: { x: 0 },
            ease: 'none',
          });
          // COLORS CHANGE
          pinBoxes.forEach((colorSection, i) => {
            const prevBg = i === 0 ? '' : pinBoxes[i - 1].dataset.bgcolor;
            const prevText = i === 0 ? '' : pinBoxes[i - 1].dataset.textcolor;

            ScrollTrigger.create({
              containerAnimation: slideScrollAnim,
              horizontal: true,
              trigger: colorSection,
              start: 'left center',
              end: 'right center',
              onEnter: () => {
                gsap.to(REFS.scroller, {
                  backgroundColor: colorSection.dataset.bgcolor,
                  color: colorSection.dataset.textcolor,
                  overwrite: 'auto',
                });
              },
              onEnterBack: () => {
                gsap.to(REFS.scroller, {
                  backgroundColor: colorSection.dataset.bgcolor,
                  color: colorSection.dataset.textcolor,
                  overwrite: 'auto',
                });
              },
            });
          });
          // SECTION PIN END

          // REDUCE ANIM
          {
            const reduceTl = gsap.timeline({
              scrollTrigger: {
                containerAnimation: slideScrollAnim,
                trigger: '.reduce',
                horizontal: true,
                start: 'left center',
                end: 'right center',
                toggleActions: 'play none none reverse',
                // markers: true,
              },
            });
            reduceAnim(reduceTl);
          }
          // SLIDE 1 ANIM
          {
            const slide1Tl = gsap.timeline({
              scrollTrigger: {
                containerAnimation: slideScrollAnim,
                trigger: '.slide-1',
                horizontal: true,
                start: 'left center',
                end: 'right center',
                toggleActions: 'play none none reverse',
                // markers: true,
              },
            });
            slideAnim(slide1Tl, '.slide-1');
          }
          // SLIDE 2 ANIM
          {
            const slide2Tl = gsap.timeline({
              scrollTrigger: {
                containerAnimation: slideScrollAnim,
                trigger: '.slide-2',
                horizontal: true,
                start: 'left center',
                end: 'right center',
                toggleActions: 'play none none reverse',
                // markers: true,
              },
            });
            slideAnim(slide2Tl, '.slide-2');
          }
          // SLIDE 3 ANIM
          {
            const slide3Tl = gsap.timeline({
              scrollTrigger: {
                containerAnimation: slideScrollAnim,
                trigger: '.slide-3',
                horizontal: true,
                start: 'left center',
                end: 'right center',
                toggleActions: 'play none none reverse',
                // markers: true,
              },
            });
            slideAnim(slide3Tl, '.slide-3');
          }
        },
      });
    }
    // SLIDE SECTION ANIM

    //KILLER FEATRUE ANIM
    {
      const wrngMetaTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.killer-feature',
          scroller: REFS.scroller,
          start: 'top 50%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });
      wrngMetaTl
        .addLabel('start', '+=1')
        .staggerFrom(
          '.killer-feature__title .split span',
          ...ANIMATION_PARAMS.textStaggerY100,
        )
        .staggerFrom(
          '.killer-feature__text p',
          0.8,
          { y: 10, opacity: 0, ease: Power2.easeInOut, yoyo: true },
          0.2,
          '>',
        );
    }
    // KILLER FEATRUE ANIM

    // HORIZONTAL SECTION ANIM
    {
      const ambaFrame1Anim = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            '.amba-frame1__title div span',
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .from(
            '.amba-frame1 .horizontal__subtitle p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '<',
          );
      };
      const ambaFrame1AnimMob = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            '.amba-frame1__title div span',
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .staggerFrom(
            '.amba-frame1 .horizontal__subtitle p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '<',
          );
      };

      const ambaFrame2Anim = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            '.amba-frame2 .horizontal__small-title > span > span',
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .staggerFrom(
            '.amba-frame2 .horizontal__col-text div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '+=0.4',
          )
          .from(
            '.amba-frame2 .horizontal__col-line',
            0.4,
            { width: 0, ease: Power2.easeInOut },
            '<',
          )
          .staggerFrom(
            '.amba-frame2 .horizontal__col-subtitle div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '>',
          );
      };
      const ambaFrame2AnimMob = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            '.amba-frame2 .horizontal__small-title > span > span',
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .staggerFrom(
            '.amba-frame2 .horizontal__col-text div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '<',
          )
          .from(
            '.amba-frame2 .horizontal__col-line',
            0.4,
            { width: 0, ease: Power2.easeInOut },
            '<',
          )
          .staggerFrom(
            '.amba-frame2 .horizontal__col-subtitle div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '>',
          );
      };
      const z3naFrame1Anim = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            '.z3na-frame1__title > div span',
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .staggerFrom(
            '.z3na-frame1 .horizontal__subtitle p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '+=0.4',
          );
      };
      const z3naFrame1AnimMob = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            '.z3na-frame1__title > div span',
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .from(
            '.z3na-frame1 .horizontal__subtitle p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '<',
          );
      };
      const z3naFrame2Anim = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            '.z3na-frame2 .horizontal__small-title > span span',
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .staggerFrom(
            '.z3na-frame2 .horizontal__col-text div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '+=0.4',
          )
          .from(
            '.z3na-frame2 .horizontal__col-line',
            0.4,
            { width: 0, ease: Power2.easeInOut },
            '<',
          )
          .staggerFrom(
            '.z3na-frame2 .horizontal__col-subtitle div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '>',
          );
      };
      const z3naFrame2AnimMob = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            '.z3na-frame2 .horizontal__small-title > span span',
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .staggerFrom(
            '.z3na-frame2 .horizontal__col-text div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '<',
          )
          .from(
            '.z3na-frame2 .horizontal__col-line',
            0.4,
            { width: 0, ease: Power2.easeInOut },
            '<',
          )
          .staggerFrom(
            '.z3na-frame2 .horizontal__col-subtitle div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '>',
          );
      };
      ScrollTrigger.matchMedia({
        // before desktop
        '(max-width: 1199px)': function () {
          // AMBA FRAMES ANIM
          {
            // AMBA FRAME 1
            {
              const ambaFrame1Tl = gsap.timeline({
                scrollTrigger: {
                  trigger: '.amba-frame1',
                  scroller: REFS.scroller,
                  start: 'top bottom',
                  //markers: true,
                  toggleActions: 'play none none reverse',
                },
              });
              ambaFrame1AnimMob(ambaFrame1Tl);
            }
            // AMBA FRAME 2
            {
              const ambaFrame2Tl = gsap.timeline({
                scrollTrigger: {
                  // markers: true,
                  trigger: '.amba-frame2',
                  scroller: REFS.scroller,
                  start: 'top center',
                  toggleActions: 'play none none reverse',
                },
              });
              ambaFrame2AnimMob(ambaFrame2Tl);
            }
          }
          // Z3NA FRAMES ANIM
          {
            const z3naFrame1Tl = gsap.timeline({
              scrollTrigger: {
                trigger: '.z3na-frame1',
                scroller: REFS.scroller,
                start: 'top 60%',
                //markers: true,
                toggleActions: 'play none none reverse',
              },
            });
            z3naFrame1AnimMob(z3naFrame1Tl);

            const z3naFrame2Tl = gsap.timeline({
              scrollTrigger: {
                trigger: '.z3na-frame2',
                scroller: REFS.scroller,
                start: 'top center',
                toggleActions: 'play none none reverse',
              },
            });
            z3naFrame2AnimMob(z3naFrame2Tl);
          }
        },
        // desktop
        '(min-width: 1200px)': function () {
          const section = document.querySelector('.horizontal');
          let pinWrap = document.querySelector('.horizontal__wrap');
          let frameRefs = pinWrap.querySelectorAll('.frame');
          frameRefs.forEach(frame => frame.setAttribute('horizontal', 'true'));
          frameRefs[0].setAttribute('horizontal', 'first');
          frameRefs[frameRefs.length - 1].setAttribute('horizontal', 'last');
          function horizontalScrollLengthFn() {
            let pinWrapWidth = pinWrap.offsetWidth;
            let horizontalScrollLength =
              pinWrapWidth - document.body.clientWidth;
            return horizontalScrollLength;
          }
          //AMBA FRAME 1
          {
            const ambaFrame1Tl = gsap.timeline({
              scrollTrigger: {
                trigger: '.amba-frame1',
                scroller: REFS.scroller,
                start: 'top center',
                end: 'bottom 50%',
                toggleActions: 'play none none reverse',
                // markers: true,
              },
            });
            ambaFrame1Anim(ambaFrame1Tl);
          }

          // Pinning and horizontal scrolling

          const slideScrollAnim = gsap.to('.horizontal__wrap', {
            scrollTrigger: {
              scroller: REFS.scroller,
              scrub: true,
              trigger: '.horizontal',
              pin: true,
              start: 'center center ',
              end: () => '+=' + horizontalScrollLengthFn(),
              invalidateOnRefresh: true,
              onEnterBack: () =>
                gsap.to(REFS.scroller, {
                  backgroundColor: '#fff',
                  color: '#000',
                  overwrite: 'auto',
                }),
            },
            x: () => -horizontalScrollLengthFn(),
            startAt: { x: 0 },
            ease: 'none',
          });

          // AMBA COLLOR TRIGGER
          ScrollTrigger.create({
            containerAnimation: slideScrollAnim,
            trigger: '.amba-frame1',
            // pinnedContainer: '.horizontal',
            horizontal: true,
            start: 'left left',
            endTrigger: '.amba-frame2',
            end: 'right center',
            onEnterBack: () =>
              gsap.to(REFS.scroller, {
                backgroundColor: '#000',
                color: '#fff',
                overwrite: 'auto',
              }),
            onEnter: () => {
              gsap.to(REFS.scroller, {
                backgroundColor: '#000',
                color: '#fff',
                overwrite: 'auto',
                duration: 0.25,
              });
            },
          });

          // AMBA FRAME 2 ANIMATION
          {
            const ambaFrame2Tl = gsap.timeline({
              scrollTrigger: {
                containerAnimation: slideScrollAnim,
                trigger: '.amba-frame2',
                horizontal: true,
                start: 'left center',
                end: 'right center',
                toggleActions: 'play none none reverse',
                // markers: true,
              },
            });
            ambaFrame2Anim(ambaFrame2Tl);
          }
          // AMBA BG SCALE
          gsap.to('.amba-frame-bg', {
            scrollTrigger: {
              containerAnimation: slideScrollAnim,
              scrub: true,
              trigger: '.amba-frame2',
              start: 'center center',
              end: 'right center',
            },
            scale: 0,
            opacity: 0,
            ease: 'none',
          });

          // Z3NA COLOR TRIGGER
          ScrollTrigger.create({
            containerAnimation: slideScrollAnim,
            trigger: '.z3na-frame1',
            horizontal: true,
            start: 'left center',
            endTrigger: '.z3na-frame2',
            end: 'right right',
            // markers: true,
            onEnterBack: () =>
              gsap.to(REFS.scroller, {
                backgroundColor: '#fff',
                color: '#000',
                overwrite: 'auto',
              }),
            onEnter: () => {
              gsap.to(REFS.scroller, {
                backgroundColor: '#fff',
                color: '#000',
                overwrite: 'auto',
                duration: 0.25,
              });
            },
          });
          // Z3NA FRAME 1 ANIMATION
          {
            const z3naFrame1Tl = gsap.timeline({
              scrollTrigger: {
                containerAnimation: slideScrollAnim,
                trigger: '.z3na-frame1',
                horizontal: true,
                scroller: REFS.scroller,
                start: 'left center',
                end: 'right center',
                toggleActions: 'play none none reverse',
                // markers: true,
              },
            });
            z3naFrame1Anim(z3naFrame1Tl);
          }
          // Z3NA FRAME 2 ANIM
          {
            const z3naFrame2Tl = gsap.timeline({
              scrollTrigger: {
                containerAnimation: slideScrollAnim,
                trigger: '.z3na-frame2',
                horizontal: true,
                scroller: REFS.scroller,
                start: 'left center',
                end: 'right center',
                toggleActions: 'play none none reverse',
                // markers: true,
              },
            });
            z3naFrame2Anim(z3naFrame2Tl);
          }

          // Z3NA BG SCALE

          gsap.to('.z3na-frame-bg', {
            scrollTrigger: {
              containerAnimation: slideScrollAnim,
              scrub: true,
              trigger: '.z3na-frame1',
              start: 'left center',
              end: 'center center',
            },
            scale: 1,
            opacity: 1,
            overwrite: 'auto',
            ease: 'none',
          });
        },
      });
    }

    // HORIZONTAL SECTION ANIM

    // ENTER
    {
      const enterAnim = function (tl) {
        tl.staggerFrom(
          '.section-enter__title .split span',
          ...ANIMATION_PARAMS.textStaggerY100,
        )
          .staggerFrom(
            '.section-enter__block-text div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '<70%',
          )
          .staggerFrom(
            '.section-enter__block-title',
            ...ANIMATION_PARAMS.opacity,
            '<',
          );
      };
      const enterAnimMob = function (tl) {
        tl.staggerFrom(
          '.section-enter__title .split span',
          ...ANIMATION_PARAMS.textStaggerY100,
        )
          .staggerFrom(
            '.section-enter__block-text div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            '<30%',
          )
          .staggerFrom(
            '.section-enter__block-title',
            ...ANIMATION_PARAMS.opacity,
            '<',
          );
      };
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-enter',
          scroller: REFS.scroller,
          start: 'top center',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
          // markers: true,
        },
      });
      ScrollTrigger.matchMedia({
        '(max-width: 1199px)': () => {
          enterAnimMob(enterTl);
        },
        '(min-width: 1200px)': () => {
          enterAnim(enterTl);
        },
      });
    }
    // ENTER

    // VALUES
    {
      //TITLE ANIMATION
      const valuesTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-values',
          scroller: REFS.scroller,
          start: 'top center',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
          // markers: true,
        },
      });
      valuesTl.staggerFrom(
        '.section-values__title span',
        ...ANIMATION_PARAMS.textStaggerY100,
      );

      // ScrollTrigger.matchMedia({
      //   '(min-width: 1199px)': () => {
      //     // PARALLAX
      //     gsap.to('.section-values__cards', {
      //       yPercent: -50,
      //       ease: Power2.easeInOut,
      //       scrollTrigger: {
      //         trigger: '.section-values',
      //         scroller: REFS.scroller,
      //         scrub: true,
      //       },
      //     });
      //   },
      // });
    }
    //VALUES

    // ROADMAP ANIM
    {
      //TITLE ANIMATION
      const roadMapTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.roadmap',
          scroller: REFS.scroller,
          start: 'top center',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
          // markers: true,
        },
      });
      roadMapTl.staggerFrom(
        '.roadmap__title .split span',
        ...ANIMATION_PARAMS.textStaggerY100,
      );
      ScrollTrigger.matchMedia({
        // MOBILE
        '(max-width: 1199px)': () => {
          ScrollTrigger.create({
            trigger: '.roadmap',
            scroller: REFS.scroller,
            start: 'top 50%',
            end: 'bottom center',
            toggleClass: 'active',
            // refreshPriority: -1,
            // markers: true,
            onEnter: () =>
              gsap.to(REFS.scroller, {
                backgroundColor: '#C5FD64',
                color: '#000',
                overwrite: 'auto',
              }),
            onEnterBack: () =>
              gsap.to(REFS.scroller, {
                backgroundColor: '#C5FD64',
                color: '#000',
                overwrite: 'auto',
              }),
          });
        },
        // DESKTOP
        '(min-width: 1200px)': () => {
          const wrapEl = document.querySelector('.roadmap__list-wrap');
          const listEl = document.querySelector('.roadmap__list');
          const containerEL = document.querySelector('.container');
          function scrollLengthFn() {
            const containerPadding =
              parseFloat(window.getComputedStyle(containerEL)['padding-left']) *
              2;
            const offset = parseFloat(window.getComputedStyle(listEl)['left']);
            const scrollLength =
              wrapEl.scrollWidth +
              offset -
              document.body.clientWidth +
              containerPadding;
            return scrollLength;
          }
          const animCont = gsap.to(wrapEl, {
            x: () => -scrollLengthFn(),
            startAt: { x: 0 },
            ease: 'none',
            scrollTrigger: {
              scroller: REFS.scroller,
              trigger: '.roadmap',
              start: 'center center',
              pin: true,
              scrub: 1,
              end: () => '+=' + scrollLengthFn(),
              invalidateOnRefresh: true,
            },
          });
          // BG CHANGE
          ScrollTrigger.create({
            trigger: '.roadmap',
            scroller: REFS.scroller,
            start: 'top 50%',
            end: () => 'bottom+=' + scrollLengthFn() + ' center',
            toggleClass: 'active',
            // refreshPriority: -1,
            // markers: true,
            onEnter: () =>
              gsap.to(REFS.scroller, {
                backgroundColor: '#C5FD64',
                color: '#000',
                overwrite: 'auto',
              }),
            onEnterBack: () =>
              gsap.to(REFS.scroller, {
                backgroundColor: '#C5FD64',
                color: '#000',
                overwrite: 'auto',
              }),
          });
          //ACTIVE STATE FOR ITEM
          const itemsRefs = document.querySelectorAll('.roadmap__item');
          const itemOverlap = () =>
            +parseFloat(window.getComputedStyle(itemsRefs[0])['margin-right']);

          itemsRefs.forEach(item => {
            ScrollTrigger.create({
              containerAnimation: animCont,
              trigger: item,
              start: () => `left-=${itemOverlap()}px center`,
              end: () => `right+=${itemOverlap()}px center`,
              toggleClass: 'active',
            });
          });
        },
      });
    }

    // CNT SECTION
    {
      //TITLE ANIMATION
      const cntSectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.cnt-section',
          scroller: REFS.scroller,
          start: 'top center',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
          // markers: true,
        },
      });
      cntSectionTl.staggerFrom(
        '.cnt-section__title .split span',
        ...ANIMATION_PARAMS.textStaggerY100,
      );
    }
    // CNT SECTION

    //BG COLOR CHANGE
    {
      const scrollColorElems = document.querySelectorAll('[data-bgcolor]');
      for (let i = 0; i < scrollColorElems.length; i += 1) {
        const colorSection = scrollColorElems[i];
        if (colorSection.hasAttribute('horizontal')) continue;
        // const prevBg = i === 0 ? '' : scrollColorElems[i - 1].dataset.bgcolor;
        // const prevText =
        //   i === 0 ? '' : scrollColorElems[i - 1].dataset.textcolor;
        if (colorSection.classList.contains('slide'))
          obj = { pinnedContainer: '.slide' };
        ScrollTrigger.create({
          trigger: colorSection,
          scroller: REFS.scroller,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleClass: 'active',
          // refreshPriority: -1,
          // markers: true,
          onEnter: () =>
            gsap.to(REFS.scroller, {
              backgroundColor: colorSection.dataset.bgcolor,
              color: colorSection.dataset.textcolor,
              overwrite: 'auto',
            }),
          onEnterBack: () =>
            gsap.to(REFS.scroller, {
              backgroundColor: colorSection.dataset.bgcolor,
              color: colorSection.dataset.textcolor,
              overwrite: 'auto',
            }),
        });
      }
    }

    ScrollTrigger.refresh();
  };
});

//SPLITTING

{
  const splitElements = document.querySelectorAll('.split');
  splitElements.forEach(el => spliting(el));
}

// link hover start
{
  const linkRefs = document.querySelectorAll('.link');
  linkRefs.forEach(link => {
    let charsInSpan = link.textContent
      .split('')
      .reduce(
        (acc, char) =>
          char.trim() === ''
            ? acc + '<span>&nbsp;</span>'
            : acc + '<span>' + char + '</span>',
        '',
      );
    link.innerHTML = `<span class="link__split-top">${charsInSpan}</span><span  class="link__split-bottom">${charsInSpan}</span> <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M43.1015 44.7985L2 3.57352L3.5356 2L44.7961 43.3845V13.3871H46.9946V46.5621H46.5588V46.997H13.3837V44.7985H43.1015ZM43.6466 44.7985H44.7961V43.6205L43.6466 44.7985Z" fill="#C5FD64"/><path d="M2 3.57352L1.05216 2.64853L0.139751 3.58347L1.06211 4.5086L2 3.57352ZM43.1015 44.7985V46.1229H46.2921L44.0394 43.8634L43.1015 44.7985ZM3.5356 2L4.47349 1.06492L3.52552 0.114098L2.58777 1.075L3.5356 2ZM44.7961 43.3845L43.8582 44.3196L46.1205 46.5886V43.3845H44.7961ZM44.7961 13.3871V12.0627H43.4717V13.3871H44.7961ZM46.9946 13.3871H48.319V12.0627H46.9946V13.3871ZM46.9946 46.5621V47.8865H48.319V46.5621H46.9946ZM46.5588 46.5621V45.2377H45.2344V46.5621H46.5588ZM46.5588 46.997V48.3214H47.8832V46.997H46.5588ZM13.3837 46.997H12.0593V48.3214H13.3837V46.997ZM13.3837 44.7985V43.4741H12.0593V44.7985H13.3837ZM43.6466 44.7985L42.6987 43.8735L40.5035 46.1229H43.6466V44.7985ZM44.7961 44.7985V46.1229H46.1205V44.7985H44.7961ZM44.7961 43.6205H46.1205V40.3672L43.8483 42.6955L44.7961 43.6205ZM1.06211 4.5086L42.1636 45.7336L44.0394 43.8634L2.93789 2.63844L1.06211 4.5086ZM2.58777 1.075L1.05216 2.64853L2.94784 4.49852L4.48344 2.925L2.58777 1.075ZM45.734 42.4494L4.47349 1.06492L2.59772 2.93508L43.8582 44.3196L45.734 42.4494ZM43.4717 13.3871V43.3845H46.1205V13.3871H43.4717ZM46.9946 12.0627H44.7961V14.7114H46.9946V12.0627ZM48.319 46.5621V13.3871H45.6702V46.5621H48.319ZM46.5588 47.8865H46.9946V45.2377H46.5588V47.8865ZM45.2344 46.5621V46.997H47.8832V46.5621H45.2344ZM46.5588 45.6726H13.3837V48.3214H46.5588V45.6726ZM14.7081 46.997V44.7985H12.0593V46.997H14.7081ZM13.3837 46.1229H43.1015V43.4741H13.3837V46.1229ZM43.6466 46.1229H44.7961V43.4741H43.6466V46.1229ZM43.4717 43.6205V44.7985H46.1205V43.6205H43.4717ZM44.5944 45.7235L45.744 44.5455L43.8483 42.6955L42.6987 43.8735L44.5944 45.7235Z"/></svg><div class="link__left-line"></div><div class="link__right-line"></div>`;

    const linkTl = gsap.timeline({ paused: true });
    const topLettersRefs = link.querySelectorAll('.link__split-top span');
    const bottomLettersRefs = link.querySelectorAll('.link__split-bottom span');
    const leftLineRef = link.querySelector('.link__left-line');
    const rightLineRef = link.querySelector('.link__right-line');
    const svgRef = link.querySelector('.link svg');
    console.log(
      'document.addEventListener ~ bottomLettersRefs',
      bottomLettersRefs,
    );
    linkTl
      .addLabel('start')
      .staggerTo(
        topLettersRefs,
        0.4,
        { y: '-100%', ease: Power1.easeInOut },
        0.03,
      )
      .staggerTo(
        bottomLettersRefs,
        0.4,
        {
          y: '-100%',
          ease: Power1.easeInOut,
        },
        0.03,
        0,
      )
      .to(
        svgRef,
        0.4,
        { x: '100%', y: '100%', ease: Power1.easeInOut },
        'start',
      )
      .to(rightLineRef, 0.3, { width: '0%', ease: Power1.easeInOut }, 0)
      .to(leftLineRef, 0.4, { width: '100%', ease: Power1.easeInOut }, 0);
    link.addEventListener('mouseenter', function () {
      console.log('play');
      linkTl.play();
    });
    link.addEventListener('mouseleave', function () {
      console.log('reverse');
      linkTl.reverse();
    });
  });
}
// link hover end

//BUTTON HOVER START
{
  const buttonsRefs = document.querySelectorAll('.button');
  buttonsRefs.forEach(btnHover);
}

// BUTTON HOVER END

$('.form').validate({
  rules: {
    email: {
      email: true,
      required: true,
    },
  },
  messages: {
    email: {
      email: '',
      required: '',
    },
  },
  submitHandler: function (form) {
    $.ajax({
      type: 'POST',
      url: '../mail.php',
      data: $(form).serialize(),
      success: function () {
        $(form).trigger('reset');
        $('.form__sucess').fadeIn();
        setTimeout(function () {
          $('.form__sucess').hide();
        }, 1500);
      },
    });
    return false; // required to block normal submit since you used ajax
  },
});

// DEBOUNCE
function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
// DEBOUNCE
