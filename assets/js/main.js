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
};
let locoScroll;
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
  // onComplete: loadComplete,
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
  document.getElementById('preloader').classList.add('hide');
  document.body.classList.remove('no-scroll');
}

document.addEventListener('DOMContentLoaded', function (event) {
  window.onload = function () {
    window.requestAnimationFrame(function () {
      // START INIT SCROLL
      gsap.registerPlugin(ScrollTrigger);

      locoScroll = new LocomotiveScroll({
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
      ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
      ScrollTrigger.addEventListener('refresh', loadComplete);
      // START INIT SCROLL

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
          trigger: '.promo',
          scroller: REFS.scroller,
          start: 'top 100%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      promoTl
        .addLabel('start', '+=1')
        .staggerFrom(
          '.promo__title .split span',
          0.8,
          { y: '100%', ease: Power2.easeInOut, yoyo: true },
          0.05,
        )
        .from(
          '.promo__content-text',
          0.4,
          { opacity: 0, ease: Power2.easeInOut },
          'start',
        )
        .from(
          '.promo__content-line',
          0.4,
          { width: 0, ease: Power2.easeInOut },
          'start',
        )
        .staggerFrom(
          '.promo__content-title div p',
          0.8,
          { y: '100%', ease: Power2.easeInOut, yoyo: true },
          0.05,
          'start',
        )
        .addLabel('startLink');
      // .from(
      //   '.promo__link svg',
      //   0.4,
      //   { xPercent: -100, yPercent: -100, ease: Power2.easeInOut },
      //   'start',
      // );
      // promo animation end
      // BUTTON FOLLOWING
      ScrollTrigger.matchMedia({
        '(min-width:1200px)': () => {
          const refs = {
            playerContainer: document.querySelector('.video-section__player'),
            button: document.querySelector('.video-section__player .play-btn'),
          };
          let active = false;
          const timeout = 50;
          const containerCenterPos = { x: 0, y: 0 };
          const containerSize = {
            width: refs.playerContainer.clientWidth,
            height: refs.playerContainer.clientHeight,
          };
          const buttonSize = {
            width: refs.button.clientWidth,
            height: refs.button.clientHeight,
          };
          const COORDS_RANGE = {
            x: {
              min: -containerSize.width / 2 + buttonSize.width / 2,
              max: containerSize.width / 2 - buttonSize.width / 2,
            },
            y: {
              min: -containerSize.height / 2 + buttonSize.height / 2,
              max: containerSize.height / 2 - buttonSize.height / 2,
            },
          };
          const mousePos = { x: 0, y: 0 };
          const currentPos = { x: 0, y: 0 };
          let lastTime = 0;
          const pos = { x: 0, y: 0 };
          const speed = 0.35;

          ScrollTrigger.create({
            scroller: REFS.scroller,
            trigger: playerContainer,
            onUpdate: debounce(updateCenterCoords, timeout),
            // markers: true,
          });
          refs.playerContainer.addEventListener('mouseenter', startFollowing);
          refs.playerContainer.addEventListener('mouseleave', stopFollowing);
          function startFollowing() {
            refs.playerContainer.addEventListener(
              'mousemove',
              updateMoveCoords,
            );
            active = true;
          }
          function stopFollowing() {
            refs.playerContainer.removeEventListener(
              'mousemove',
              updateMoveCoords,
            ),
              (active = false);
            currentPos.x = 0;
            currentPos.y = 0;
          }
          function updateCenterCoords() {
            if (!active) return;
            const xPos = refs.playerContainer.getBoundingClientRect().x;
            const yPos = refs.playerContainer.getBoundingClientRect().y;
            const width = containerSize.width;
            const height = containerSize.height;

            containerCenterPos.x = xPos + width / 2;
            containerCenterPos.y = yPos + height / 2;
          }
          function updateMoveCoords(mouseEvent) {
            if (Date.now() - lastTime < timeout) return;
            lastTime = Date.now();
            if (
              mousePos.x === mouseEvent.clientX &&
              mousePos.y === mouseEvent.clientY
            )
              return;
            mousePos.x = mouseEvent.clientX;
            mousePos.y = mouseEvent.clientY;
            let xPos = mousePos.x - containerCenterPos.x;
            let yPos = mousePos.y - containerCenterPos.y;
            currentPos.x = xPos;
            currentPos.y = yPos;
          }
          gsap.set(refs.button, { xPercent: -50, yPercent: -50 });
          const xSet = gsap.utils.pipe(
            gsap.utils.clamp(COORDS_RANGE.x.min, COORDS_RANGE.x.max),
            gsap.quickSetter(refs.button, 'x', 'px'),
          );
          const ySet = gsap.utils.pipe(
            gsap.utils.clamp(COORDS_RANGE.y.min, COORDS_RANGE.y.max),
            gsap.quickSetter(refs.button, 'y', 'px'),
          );
          gsap.ticker.add(() => {
            const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
            pos.x += (currentPos.x - pos.x) * dt;
            pos.y += (currentPos.y - pos.y) * dt;
            xSet(pos.x);
            ySet(pos.y);
          });
        },
      });

      // discover animation start
      // Adjust bg video
      let videoBg = '#E0E3E7';
      {
        ScrollTrigger.matchMedia({
          '(min-width: 1200px)': () => {
            const videoRef = document.querySelector('.discover__video');
            videoBg = getVideoBg(videoRef);
          },
        });
        function getVideoBg(video) {
          const canvas = document.createElement('canvas');
          canvas.width = 1;
          canvas.height = 1;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, 1, 1, 0, 0, 1, 1);
          const pixel = ctx.getImageData(0, 0, 1, 1).data;
          return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]}`;
        }
        ScrollTrigger.create({
          trigger: '.discover__video',
          scroller: REFS.scroller,
          start: 'top bottom',
          end: 'bottom top',
          toggleClass: 'active',
          // markers: true,
          onEnter: () => {
            gsap.set(REFS.scroller, {
              backgroundColor: videoBg,
              color: '#000',
              overwrite: 'auto',
            });
          },
          onLeaveBack: () => {
            gsap.set(REFS.scroller, {
              backgroundColor: '#E0E3E7',
              color: '#000',
              overwrite: 'auto',
            });
          },
        });
      }
      const discoverTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.discover',
          scroller: REFS.scroller,
          start: 'top 100%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      discoverTl
        .staggerFrom(
          '.discover__title .split span',
          0.8,
          { y: '100%', ease: Power2.easeInOut, yoyo: true },
          0.05,
        )
        .addLabel('start', '-=1.4')
        .from(
          '.discover__top-line',
          0.4,
          { width: 0, ease: Power2.easeInOut },
          'start',
        )
        .from(
          '.discover__subtitle',
          0.4,
          { opacity: 0, ease: Power2.easeInOut },
          'start',
        )
        .from(
          '.discover__line',
          0.4,
          { width: 0, ease: Power2.easeInOut },
          'start',
        )
        .addLabel('footer', '-=0.6')
        .staggerFrom(
          '.discover__text div p',
          0.8,
          { y: '100%', ease: Power2.easeInOut, yoyo: true },
          0.05,
          'start',
        )
        .from(
          '.discover__bottom-text',
          0.4,
          {
            y: 10,
            opacity: 0,
            ease: Power2.easeInOut,
          },
          'footer',
        )
        .from(
          '.discover__footer',
          0.4,
          { opacity: 0, ease: Power2.easeInOut },
          'footer',
        );
      // discover animation end

      // hwd animation start
      ScrollTrigger.create({
        trigger: '.hwd',
        scroller: REFS.scroller,
        start: 'top 20%',
        end: 'bottom center',
        toggleClass: 'active',
        // markers: true,
        onEnter: () => {
          gsap.to(REFS.scroller, {
            backgroundColor: '#000',
            color: '#fff',
            overwrite: 'auto',
          });
        },
        onEnterBack: () => {
          gsap.to(REFS.scroller, {
            backgroundColor: '#000',
            color: '#fff',
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          gsap.to(REFS.scroller, {
            backgroundColor: videoBg,
            color: '#000',
            overwrite: 'auto',
          });
        },
      });
      const hwdTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hwd__title',
          scroller: REFS.scroller,
          start: 'top 80%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      hwdTl.staggerFrom(
        '.hwd__title h2 span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
      );

      const hwdContentTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hwd__block',
          scroller: REFS.scroller,
          start: 'top 80%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      hwdContentTl
        .addLabel('start')
        .from('.hwd__box', 0.4, { width: 0, ease: Power2.easeInOut }, 'start')
        .staggerFrom(
          '.hwd__subtitle div p',
          0.8,
          { y: '100%', ease: Power2.easeInOut, yoyo: true },
          0.05,
          'start',
        )
        .from(
          '.hwd__block-line',
          0.4,
          { width: 0, ease: Power2.easeInOut },
          'start',
        )
        .staggerFrom(
          '.hwd__text div p',
          0.4,
          { y: 10, opacity: 0, ease: Power2.easeInOut },
          0.05,
        );

      // hwd animation end

      // knw more animation start
      const knwMoretTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.knw-more',
          scroller: REFS.scroller,
          start: 'top 70%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      knwMoretTl.staggerFrom(
        '.knw-more__title .split span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.01,
      );
      // knw more animation end

      // ambasador animation start

      // BUTTON 3D HOVER
      let watchesBtnRef = document.querySelector('.watches-fact__play-btn');
      {
        ScrollTrigger.matchMedia({
          '(min-width: 1200px)': () => {
            VanillaTilt.init(watchesBtnRef, {
              scale: 1.05,
              max: 40,
              perspective: 500,
              transition: true,
              easing: 'cubic-bezier(.03,.98,.52,.99)',
            });
          },
        });
      }
      // BUTTON 3D HOVER END
      // STAY UPDATED START
      {
        const stayUpdatedSection = gsap.timeline({
          scrollTrigger: {
            trigger: '.stay-updated',
            scroller: REFS.scroller,
            start: 'top center',
            end: 'bottom bottom',
            toggleActions: 'play none none reverse',
          },
        });
        stayUpdatedSection
          .staggerFrom(
            '.stay-updated__title .split span',
            0.8,
            { y: '100%', ease: Power2.easeInOut, yoyo: true },
            0.05,
          )
          .staggerFrom(
            '.stay-updated__subtitle > div > div',
            0.8,
            { y: '100%', ease: Power2.easeInOut, yoyo: true },
            0.05,
            '<',
          );
      }
      // STAY UPDATED END

      ScrollTrigger.matchMedia({
        '(min-width: 1200px)': function () {
          ScrollTrigger.create({
            scroller: REFS.scroller,
            trigger: '.ambassador__sticky-block',
            endTrigger: '.ambassador__perks-container',
            pin: true,
            start: 'center center',
            end: 'bottom 97%',
          });
        },
      });
      const communityoretTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ambassador',
          scroller: REFS.scroller,
          start: 'top 70%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      communityoretTl.staggerFrom(
        '.ambassador__title .split span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
      );
      // ambasador animation end

      // subscribe animation start
      const subscribeTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.subscribe-section',
          scroller: REFS.scroller,
          start: 'top 100%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      subscribeTl.staggerFrom(
        '.subscribe-section__title .subscribe-section__title-row span',
        0.8,
        { y: '100%', ease: Power2.easeInOut, yoyo: true },
        0.05,
        'start',
      );

      // subscribe anumation end

      // contacs animation start
      const contactsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contacts-section',
          scroller: REFS.scroller,
          start: 'top 100%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      contactsTl
        .addLabel('start')
        .staggerFrom(
          '.contacts-section__title .split span',
          0.8,
          { y: '100%', ease: Power2.easeInOut, yoyo: true },
          0.05,
          'start',
        )
        .staggerFrom(
          '.contacts-section__subtitle * span',
          1.2,
          { y: '100%', ease: Power2.easeInOut, yoyo: true },
          0.1,
          'start',
        )
        .from('.contacts-section__name', 0.8, { opacity: 0 }, 'start');

      // contacs animation end

      // PARALLAX FOR MOBILE
      {
        ScrollTrigger.matchMedia({
          '(max-width: 1199px)': () => {
            const elements = document.querySelectorAll(
              '[data-scroll-speed-mob]',
            );
            console.log('elements', elements);
            elements.forEach((el) => {
              gsap.to(el, {
                yPercent: -10 * el.dataset.scrollSpeedMob,
                ease: Power2.easeInOut,
                scrollTrigger: {
                  trigger: el.parentNode,
                  scroller: REFS.scroller,
                  scrub: true,
                },
              });
            });
          },
        });
      }
      // PARALLAX FOR MOBILE

      //BG COLOR CHANGE
      {
        const scrollColorElems = document.querySelectorAll('[data-bgcolor]');
        for (let i = 0; i < scrollColorElems.length; i += 1) {
          const colorSection = scrollColorElems[i];
          if (colorSection.hasAttribute('horizontal')) continue;
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
                '--accent-color': colorSection.dataset.accentcolor || '',
                overwrite: 'auto',
              }),
            onEnterBack: () =>
              gsap.to(REFS.scroller, {
                backgroundColor: colorSection.dataset.bgcolor,
                color: colorSection.dataset.textcolor,
                '--accent-color': colorSection.dataset.accentcolor || '',
                overwrite: 'auto',
              }),
          });
        }
      }
      // END CHANGE BG COLOR

      ScrollTrigger.refresh();
    });
  };
});

// iframe video from youtube start
{
  var tag = document.createElement('script');

  tag.src = 'https://www.youtube.com/iframe_api';

  var firstScriptTag = document.getElementsByTagName('script')[0];
  var playerContainer = document.getElementById('player-container');
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  REFS.scroller.insertAdjacentHTML(
    'beforebegin',
    `<div id="watches-fact__video-wrap" class="watches-fact__video-wrap is-hidden">
    <div class="watches-fact__video-close-btn"><span>Close</span><img class="icon" src="./img/close-4.svg"></img><span>Close</span></div>
    <div id="watches-fact__video" class="watches-fact__video"></div></div>`,
  );
  const videoWrapRef = document.querySelector('.watches-fact__video-wrap');
  const closeBtnRef = document.querySelector('.watches-fact__video-close-btn');
  closeBtnRef.addEventListener('click', onPlayerClose);

  var player;
  let playerWatches;
  let iframe;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '1920',
      width: '1080',
      videoId: 'hVN3cc4ZWpg',
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
    playerWatches = new YT.Player('watches-fact__video', {
      height: '320',
      width: '0',
      videoId: 'rCwt3jV5MYU',
      events: {
        onReady: onPlayerReady,
      },
    });
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PAUSED) {
      playerContainer.classList.toggle('active');
    }
  }
  let watchesBtnRef = document.querySelector('.watches-fact__play-btn');

  watchesBtnRef.addEventListener('click', playFullscreen);
  function playFullscreen() {
    videoWrapRef.classList.remove('is-hidden');
  }
  function onPlayerClose() {
    playerWatches.pauseVideo();
    videoWrapRef.classList.toggle('is-hidden');
  }
  function onPlayerReady(event) {
    iframe = document.querySelector('#watches-fact__video');
  }
  playerContainer.addEventListener('click', function () {
    locoScroll.scrollTo(playerContainer);
    player.playVideo();
    playerContainer.classList.toggle('active');
  });
}
// iframe video from youtube end

// SPLITTING
const splitElements = document.querySelectorAll('.split');
for (let i = 0; i < splitElements.length; i++) {
  spliting(splitElements[i]);
}
function spliting(element) {
  let text = element.textContent.split('');
  let result = '';
  text.forEach(function (char) {
    result +=
      char.trim() === '' ? '<span>&nbsp;</span>' : '<span>' + char + '</span>';
  });

  element.innerHTML = result;
}

// BUTTON HOVER START
{
  const buttonsRefs = document.querySelectorAll('.button');
  buttonsRefs.forEach((button) => {
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
  });

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
}
// BUTTON HOVER END

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

$('.subscribe-form').validate({
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
        $('.subscribe-form__success').fadeIn();
        setTimeout(function () {
          $('.subscribe-form__success').hide();
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
