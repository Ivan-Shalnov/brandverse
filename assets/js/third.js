gsap.registerPlugin(SplitText);
const ANIMATION_PARAMS = {
  textStaggerY100: [
    0.8,
    { y: '100%', ease: Power2.easeInOut, yoyo: true },
    0.05,
  ],
  opacity: [0.4, { opacity: 0, ease: Power2.easeInOut }],
};
// DISABLE SCROLL POSITION RECOVERY
{
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
}
// RELOAD ON RESIZE
{
  let windowWidthSaved = window.innerWidth;
  window.addEventListener(
    'resize',
    debounce(function () {
      window.innerWidth !== windowWidthSaved && location.reload(false);
    }, 100),
  );
}
const REFS = {
  scroller: document.querySelector('.scroller'),
  skipColorsChange: [],
};
// ViewPort REAL Height
{
  const vh = document.documentElement.clientHeight / 100;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
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
}

document.addEventListener('DOMContentLoaded', () => {
  window.onload = function () {
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
    // SOCIAL LIST
    {
      const linksRef = document.querySelectorAll('.social-list__link');
      ScrollTrigger.matchMedia({
        '(max-width: 1199px)': () => linksRef.forEach(btnHover),
      });
    }
    // SOCIAL LIST

    // MENU
    {
      const refs = {
        openBtn: document.querySelector('.header__menu-btn'),
        closeBtn: document.querySelector('.menu__close-btn'),
        menu: document.querySelector('.menu'),
        title: document.querySelectorAll('.menu__nav > li > a'),
        scroller: REFS.scroller,
      };
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

    // MENU PIN
    const menuBtnRef = document.querySelector('.header__menu-btn');
    const menuAnim = gsap.to(menuBtnRef, {
      opacity: 0,
      xPercent: 100,
      paused: true,
    });
    ScrollTrigger.matchMedia({
      '(min-width:1200px)': () => {
        ScrollTrigger.create({
          scroller: REFS.scroller,
          trigger: menuBtnRef,
          pin: true,
          pinSpacing: false,
          start: 'top 5%',
          end: '+=9999999',
        });
      },
    });
    // MENU PIN

    // promo animation start

    const promoTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.promo-third',
        scroller: REFS.scroller,
        start: 'top 100%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      },
    });

    promoTl
      .addLabel('start')
      .from('.promo-third__subtitle p', 0.4, {
        y: '100%',
        ease: Power2.easeInOut,
        yoyo: true,
      })

      .staggerFrom(
        '.promo-third__title span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .from(
        '.promo-third__line',
        0.4,
        {
          width: 0,
          ease: Power2.easeInOut,
        },
        '+=0.1',
      );

    // promo animation end

    // benefits animation start
    const benefitsTitleRef = new SplitText('.benefits__title .line', {
      type: 'chars',
      charsClass: 'char',
    });
    const benefitsCardsTitles = new SplitText('.benefit-card__title', {
      type: 'lines',
    });
    new SplitText('.benefit-card__title', {
      type: 'lines',
      linesClass: 'line',
    });
    const benefitsTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.benefits',
        scroller: REFS.scroller,
        start: 'top 50%',
        end: 'bottom 50%',
        toggleActions: 'play none none reverse',
      },
    });

    benefitsTl.staggerFrom(
      benefitsTitleRef.chars,
      0.8,
      { y: '100%', ease: Power2.easeInOut, yoyo: true },
      0.05,
      'start',
    );

    const benefitsListTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.benefits__list',
        scroller: REFS.scroller,
        start: 'top 50%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      },
    });

    benefitsListTl
      .addLabel('start')
      .staggerFrom(
        '.benefit-card__line-wrap',
        0.8,
        { width: 0, ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .staggerFrom(
        '.benefit-card__title .line div',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .staggerFrom(
        '.benefit-card__number',
        0.8,
        { opacity: 0, ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .from(
        '.benefit-card__text',
        0.8,
        { opacity: 0, ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      );

    // benefits animation end

    // hwd animation start

    const hwdtTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-hwdt__inner',
        scroller: REFS.scroller,
        start: 'top 80%',
        end: 'bottom 50%',
        toggleActions: 'play none none reverse',
      },
    });

    hwdtTl
      .staggerFrom(
        '.section-hwdt__text li p',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
      )
      .from(
        '.section-hwdt__name',
        0.8,
        { x: '-5%', opacity: 0, ease: Power2.easeInOut, yoyo: true },
        0.05,
      );
    // hwd animation end

    // text section animation start
    const text = SplitText.create('.section-text__title', {
      types: 'words, chars',
    });

    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-text',
        scroller: REFS.scroller,
        start: 'top 30%',
        end: 'bottom bottom',
        scrub: true,
        toggleActions: 'play none none reverse',
      },
    });

    textTl.staggerFrom(
      text.chars,
      0.8,
      {
        opacity: 0.2,
        ease: Linear.easeNone,
      },
      0.05,
    );
    // text section animation end

    // discuss section animation start

    const discuss = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-discuss',
        scroller: REFS.scroller,
        start: 'top 50%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      },
    });

    discuss
      .staggerFrom(
        '.section-discuss__title .split span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
      )
      .from(
        '.section-discuss__subtitle div',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        '-=0.8',
      );
    // text section animation end

    // HORIZONTAL SECTION ANIM
    {
      // TEXT SPLIT
      // AMBASADOR FRAME 1
      const ambaFrame1TitleRef = new SplitText('.amba-frame1__title', {
        type: 'lines, chars',
        charsClass: 'char',
        linesClass: 'line',
      });
      const ambaFrame1SubtitleRef = new SplitText('.amba-frame1__subtitle', {
        type: 'lines, words',
        charsClass: 'char',
        linesClass: 'line',
        wordsClass: 'word',
      });

      // AMBASADOR FRAME 2
      const ambaFrame2TitleRef = new SplitText('.amba-frame2__title', {
        type: 'lines, words',
        charsClass: 'char',
        linesClass: 'line',
        wordsClass: 'word',
      });
      // Z3NA FRAME 1
      const z3naFrame1TitleRef = new SplitText('.z3na-frame1__title', {
        type: 'lines,chars',
        charsClass: 'char',
        linesClass: 'line',
        wordsClass: 'word',
      });
      const z3naFrame1SubtitleRef = new SplitText('.z3na-frame1__subtitle', {
        type: 'lines, words',
        charsClass: 'char',
        linesClass: 'line',
        wordsClass: 'word',
      });
      // Z3NA FRAME 2
      const z3naFrame2TitleRef = new SplitText('.z3na-frame2__title', {
        type: 'lines,words',
        charsClass: 'char',
        linesClass: 'line',
        wordsClass: 'word',
      });

      const ambaFrame1Anim = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            ambaFrame1TitleRef.chars,
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .from(
            ambaFrame1SubtitleRef.words,
            ...ANIMATION_PARAMS.textStaggerY100,
            '<',
          );
      };
      const ambaFrame1AnimMob = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            ambaFrame1TitleRef.chars,
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .staggerFrom(
            ambaFrame1SubtitleRef.words,
            ...ANIMATION_PARAMS.textStaggerY100,
            '<',
          );
      };

      const ambaFrame2Anim = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            ambaFrame2TitleRef.words,
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .staggerFrom(
            '.amba-frame2 .horizontal__col-text div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
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
            ambaFrame2TitleRef.words,
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
            z3naFrame1TitleRef.chars,
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .staggerFrom(
            z3naFrame1SubtitleRef.words,
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          );
      };
      const z3naFrame1AnimMob = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            z3naFrame1TitleRef.chars,
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .from(
            z3naFrame1SubtitleRef.words,
            ...ANIMATION_PARAMS.textStaggerY100,
            '<',
          );
      };
      const z3naFrame2Anim = function (tl) {
        tl.addLabel('start')
          .staggerFrom(
            z3naFrame2TitleRef.words,
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
          )
          .staggerFrom(
            '.z3na-frame2 .horizontal__col-text div p',
            ...ANIMATION_PARAMS.textStaggerY100,
            'start',
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
            z3naFrame2TitleRef.words,
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
        '(max-width: 1199px': function () {
          // AMBA FRAMES ANIM
          {
            // AMBA FRAME 1
            {
              const ambaFrame1Tl = gsap.timeline({
                scrollTrigger: {
                  trigger: '.amba-frame1',
                  scroller: REFS.scroller,
                  start: 'top bottom',

                  toggleActions: 'play none none reverse',
                },
              });
              ambaFrame1AnimMob(ambaFrame1Tl);
            }
            // AMBA FRAME 2
            {
              const ambaFrame2Tl = gsap.timeline({
                scrollTrigger: {
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
          const colletionsSectRef = document.querySelector('.collections');
          let frameRefs = [...document.querySelectorAll('.horizontal .frame')];
          REFS.skipColorsChange = [
            ...REFS.skipColorsChange,
            ...frameRefs,
            colletionsSectRef,
          ];
          ScrollTrigger.create({
            trigger: colletionsSectRef,
            scroller: REFS.scroller,
            start: 'top center',
            end: 'bottom center',
            toggleClass: 'active',
            // markers: true,
            onEnter: () => setColors({ bg: '#000', color: '#fff' }),
            onEnterBack: () => setColors({ bg: '#000', color: '#fff' }),
          });
          const section = document.querySelector('.horizontal');
          let pinWrap = document.querySelector('.horizontal__wrap');
          frameRefs.forEach((frame) =>
            frame.setAttribute('horizontal', 'true'),
          );
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
                //
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
          // Hide menu
          ScrollTrigger.create({
            scroller: REFS.scroller,
            trigger: '.horizontal__wrap',
            start: 'top 5%',
            // markers: true,
            end: () => '+=' + (horizontalScrollLengthFn() + window.innerHeight),
            onEnter: () => menuAnim.play(),
            onEnterBack: () => menuAnim.play(),
            onLeaveBack: () => menuAnim.reverse(),
            onLeave: () => menuAnim.reverse(),
          });
          // Hide Menu
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
                toggleClass: 'active',
                start: 'left center',
                end: 'right center',
                toggleActions: 'play none none reverse',
                //
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
            //
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
                //
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
                //
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
    {
      const scrollColorElems = document.querySelectorAll('[data-bgcolor]');
      for (let i = 0; i < scrollColorElems.length; i += 1) {
        const colorSection = scrollColorElems[i];
        if (REFS.skipColorsChange.includes(colorSection)) continue;
        ScrollTrigger.create({
          trigger: colorSection,
          scroller: REFS.scroller,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleClass: 'active',
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
    const dist = document.getElementById('slider').offsetHeight;
    gsap
      .timeline({ repeat: -1 })
      .to(
        '.section-hwdt__slider',
        { y: -dist / 5, duration: 0.4, ease: Linear.none },
        0.5,
      )
      .to(
        '.section-hwdt__slider',
        { y: -dist / 2.5, duration: 0.4, ease: Linear.none },
        1.5,
      );

    // text.words;
    ScrollTrigger.refresh();
  };
});

// link hover start
{
  const linkRefs = document.querySelectorAll('.link');
  linkRefs.forEach((link) => {
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
      linkTl.play();
    });
    link.addEventListener('mouseleave', function () {
      linkTl.reverse();
    });
  });
}
// link hover end

const buttonsRefs = document.querySelectorAll('.button');
buttonsRefs.forEach(btnHover);
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
// BUTTON HOVER END

// FORM START
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
// FORM END

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

// SPLITTING
// SPLIT TEXT
const splitElements = document.querySelectorAll('.split');
for (let i = 0; i < splitElements.length; i++) {
  spliting(splitElements[i]);
}
// SPLIT TEXT
function spliting(element) {
  let text = element.textContent.split('');
  let result = '';
  text.forEach(function (char) {
    result +=
      char.trim() === '' ? '<span>&nbsp;</span>' : '<span>' + char + '</span>';
  });

  element.innerHTML = result;
}
// SET COLORS
function setColors({ bg, color }) {
  gsap.to(REFS.scroller, {
    backgroundColor: bg,
    color: color,
    overwrite: 'auto',
  });
}
// SET COLORS

// IS SAFARI
function IsSafari() {
  var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
  return is_safari;
}
