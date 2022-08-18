export default function horizontalSection(){
  const ambaFrame1Anim = function (tl) {
    tl.addLabel('start')
      .staggerFrom(
        '.amba-frame1__title div span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .from(
        '.amba-frame1 .horizontal__subtitle p',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        '<',
      );
  };
  const ambaFrame1AnimMob = function (tl) {
    tl.addLabel('start')
      .staggerFrom(
        '.amba-frame1__title div span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .staggerFrom(
        '.amba-frame1 .horizontal__subtitle p',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        '<',
      );
  };

  const ambaFrame2Anim = function (tl) {
    tl.addLabel('start')
      .staggerFrom(
        '.amba-frame2 .horizontal__small-title > span > span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .staggerFrom(
        '.amba-frame2 .horizontal__col-text div p',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
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
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        '>',
      );
  };
  const ambaFrame2AnimMob = function (tl) {
    tl.addLabel('start')
      .staggerFrom(
        '.amba-frame2 .horizontal__small-title > span > span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .staggerFrom(
        '.amba-frame2 .horizontal__col-text div p',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
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
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        '>',
      );
  };
  const z3naFrame1Anim = function (tl) {
    tl.addLabel('start')
      .staggerFrom(
        '.z3na-frame1__title > div span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .staggerFrom(
        '.z3na-frame1 .horizontal__subtitle p',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        '+=0.4',
      );
  };
  const z3naFrame1AnimMob = function (tl) {
    tl.addLabel('start')
      .staggerFrom(
        '.z3na-frame1__title > div span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .from(
        '.z3na-frame1 .horizontal__subtitle p',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        '<',
      );
  };
  const z3naFrame2Anim = function (tl) {
    tl.addLabel('start')
      .staggerFrom(
        '.z3na-frame2 .horizontal__small-title > span span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .staggerFrom(
        '.z3na-frame2 .horizontal__col-text div p',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
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
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        '>',
      );
  };
  const z3naFrame2AnimMob = function (tl) {
    tl.addLabel('start')
      .staggerFrom(
        '.z3na-frame2 .horizontal__small-title > span span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      )
      .staggerFrom(
        '.z3na-frame2 .horizontal__col-text div p',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
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
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
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
              scroller: '.scroller',
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
              scroller: '.scroller',
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
            scroller: '.scroller',
            start: 'top 60%',
            //markers: true,
            toggleActions: 'play none none reverse',
          },
        });
        z3naFrame1AnimMob(z3naFrame1Tl);

        const z3naFrame2Tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.z3na-frame2',
            scroller: '.scroller',
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
      frameRefs.forEach((frame) =>
        frame.setAttribute('horizontal', 'true'),
      );
      frameRefs[0].setAttribute('horizontal', 'first');
      frameRefs[frameRefs.length - 1].setAttribute('horizontal', 'last');
      let pinWrapWidth = pinWrap.offsetWidth;
      let horizontalScrollLength = pinWrapWidth - window.innerWidth;
      //AMBA FRAME 1
      {
        const ambaFrame1Tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.amba-frame1',
            scroller: '.scroller',
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
          scroller: '.scroller',
          scrub: true,
          trigger: '.horizontal',
          pin: true,
          start: 'center center ',
          end: '+=' + pinWrapWidth,
          onEnterBack: () =>
            gsap.to('.scroller', {
              backgroundColor: '#fff',
              color: '#000',
              overwrite: 'auto',
            }),
        },
        x: -horizontalScrollLength,
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
          gsap.to('.scroller', {
            backgroundColor: '#000',
            color: '#fff',
            overwrite: 'auto',
          }),
        onEnter: () => {
          gsap.to('.scroller', {
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
          gsap.to('.scroller', {
            backgroundColor: '#fff',
            color: '#000',
            overwrite: 'auto',
          }),
        onEnter: () => {
          gsap.to('.scroller', {
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
            scroller: '.scroller',
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
            scroller: '.scroller',
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