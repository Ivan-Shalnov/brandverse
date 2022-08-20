const REFS = {
  scroller: document.querySelector('.scroller'),
};
// ViewPort REAL Height
{
  const vh = document.documentElement.clientHeight / 100;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
// // number of loaded images for preloader progress
// var loadedCount = 0; //current number of images loaded
// var imagesToLoad = $('img').length; //number of slides with .bcg container
// var loadingProgress = 0; //timeline progress - starts at 0

// $('img')
//   .imagesLoaded({
//     background: false,
//   })
//   .progress(function (instance, image) {
//     loadProgress();
//   });

// function loadProgress(imgLoad, image) {
//   //one more image has been loaded
//   loadedCount++;

//   loadingProgress = loadedCount / imagesToLoad;

//   //console.log(loadingProgress);

//   // GSAP timeline for our progress bar
//   TweenLite.to(progressTl, 0.7, {
//     progress: loadingProgress,
//     ease: Linear.easeNone,
//   });
// }

// //progress animation instance. the instance's time is irrelevant, can be anything but 0 to void  immediate render
// var progressTl = new TimelineMax({
//   paused: true,
//   onUpdate: progressUpdate,
//   // onComplete: loadComplete,
// });

// progressTl
//   //tween the progress bar width
//   .to($('.loading__bg-bottom'), 1, { height: '100%', ease: Linear.easeNone });

// //as the progress bar witdh updates and grows we put the precentage loaded in the screen
// function progressUpdate() {
//   //the percentage loaded based on the tween's progress
//   loadingProgress = Math.round(progressTl.progress() * 100);
//   //we put the percentage in the screen
//   $('.loading__percentage').text(loadingProgress + '%');
// }

// function loadComplete() {
//   // preloader out
//   $('.loading').fadeOut(400);
//   document.body.classList.remove('no-scroll');
//   // var preloaderOutTl = new TimelineMax();

//   // // preloaderOutTl
//   // //   .to($('.progress'), 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn })
//   // //   .to($('.txt-perc'), 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn }, 0.1)
//   // //   .set($('body'), { className: '-=is-loading' })
//   // //   .set($('#intro'), { className: '+=is-loaded' })
//   // //   .to($('#preloader'), 0.7, { yPercent: 100, ease: Power4.easeInOut })
//   // //   .set($('#preloader'), { className: '+=is-hidden' })
//   // //   .from(
//   // //     $('#intro .title'),
//   // //     1,
//   // //     { autoAlpha: 0, ease: Power1.easeOut },
//   // //     '-=0.2',
//   // //   )
//   // //   .from($('#intro p'), 0.7, { autoAlpha: 0, ease: Power1.easeOut }, '+=0.2')
//   // //   .from(
//   // //     $('.scroll-hint'),
//   // //     0.3,
//   // //     { y: -20, autoAlpha: 0, ease: Power1.easeOut },
//   // //     '+=0.1',
//   // //   );

//   // return preloaderOutTl;
// }
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
  console.log(
    'document.addEventListener ~ bottomLettersRefs',
    bottomLettersRefs,
  );
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
    console.log('play');
    buttonTl.play();
  });
  button.addEventListener('mouseleave', function () {
    console.log('reverse');
    buttonTl.reverse();
  });
}
document.addEventListener('DOMContentLoaded', function (event) {
  // wait until window is loaded - all images, styles-sheets, fonts, links, and other media assets
  // you could also use addEventListener() instead

  // const progressbar = $('#preloader');

  // const tween = new TweenLite(progressbar, 5, {
  //   onUpdate: countPercent,
  //   onComplete: function () {
  //     progressbar.addClass('hide');
  //   },
  // });

  // function countPercent() {
  //   newPercent = (tween.progress() * 100).toFixed();

  //   $('#percent').text(newPercent + '%');
  // }

  window.onload = function () {
    // TICKER
{gsap.registerEffect({
  name: "ticker",
  effect(targets, config) {
    buildTickers({
      targets: targets,
      clone: config.clone || (el => {
        let clone = el.children[0].cloneNode(true);
        el.insertBefore(clone, el.children[0]);
        return clone;
      })
    });
    function buildTickers(config, originals) {
      let tickers;
      if (originals && originals.clones) { // on window resizes, we should delete the old clones and reset the widths
        originals.clones.forEach(el => el && el.parentNode && el.parentNode.removeChild(el));
        originals.forEach((el, i) => originals.inlineWidths[i] ? (el.style.width = originals.inlineWidths[i]) : el.style.removeProperty("width"));
        tickers = originals;
      } else {
        tickers = config.targets;
      }
      const clones = tickers.clones = [],
        inlineWidths = tickers.inlineWidths = [];
      tickers.forEach((el, index) => {
        inlineWidths[index] = el.style.width;
        el.style.width = "10000px"; // to let the children grow as much as necessary (otherwise it'll often be cropped to the viewport width)
        el.style.display = "flex";
        let width = el.children[0].offsetWidth,
          cloneCount = Math.ceil(window.innerWidth / width),
          right = el.dataset.direction === "right",
          i;
          el.style.gap=`${el.dataset.gap||0}px`;
        el.style.width = width * (cloneCount + 1) + "px";
        for (i = 0; i < cloneCount; i++) {
          clones.push(config.clone(el));
        }
        gsap.fromTo(el, {
          x: right ? -width : 0
        }, {
          x: right ? 0 : -width,
          duration: width / 100 / parseFloat(el.dataset.speed || 1),
          repeat: -1,
          overwrite: "auto",
          ease: "none"
        });
      });
      // rerun on window resizes, otherwise there could be gaps if the user makes the window bigger.
      originals || window.addEventListener("resize", () => buildTickers(config, tickers));
    }
  }
});
const tickerRefs=document.querySelectorAll('[data-ticker]')
gsap.effects.ticker(tickerRefs);}

    

    const splitElements = document.querySelectorAll('.split');
    for (let i = 0; i < splitElements.length; i++) {
      spliting(splitElements[i]);
    }


    window.requestAnimationFrame(function () {
      //BUTTON HOVER START
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
        const topLettersRefs = button.querySelectorAll(
          '.button__split-top span',
        );
        const bottomLettersRefs = button.querySelectorAll(
          '.button__split-bottom span',
        );
        const leftLineRef = button.querySelector('.button__left-line');
        const rightLineRef = button.querySelector('.button__right-line');
        console.log(
          'document.addEventListener ~ bottomLettersRefs',
          bottomLettersRefs,
        );
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
          console.log('play');
          buttonTl.play();
        });
        button.addEventListener('mouseleave', function () {
          console.log('reverse');
          buttonTl.reverse();
        });
      });
      // BUTTON HOVER END

      // START INIT SCROLL
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
      ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    // ScrollTrigger.addEventListener('refresh', loadComplete);
      // START INIT SCROLL
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
      // START CHANGE BG COLOR
      const scrollColorElems = document.querySelectorAll('[data-bgcolor]');
      scrollColorElems.forEach((colorSection, i) => {
        const prevBg = i === 0 ? '' : scrollColorElems[i - 1].dataset.bgcolor;
        const accentColor=scrollColorElems[i].dataset?.accentcolor||'currentColor';
        const prevText =
          i === 0 ? '' : scrollColorElems[i - 1].dataset.textcolor;

        ScrollTrigger.create({
          trigger: colorSection,
          scroller: REFS.scroller,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleClass: 'active',
          onEnter: () =>{
            gsap.to(REFS.scroller, {
              backgroundColor: colorSection.dataset.bgcolor,
              color: colorSection.dataset.textcolor,
              '--accentColor': accentColor,
              overwrite: 'auto',
            })
          },
          onEnterBack: () =>{
            gsap.to(REFS.scroller, {
              backgroundColor: colorSection.dataset.bgcolor,
              color: colorSection.dataset.textcolor,
              '--accentColor': accentColor,
              overwrite: 'auto',
            })
          },
          onLeaveBack: () =>
            gsap.to(REFS.scroller, {
              backgroundColor: prevBg,
              color: prevText,
              overwrite: 'auto',
            }),
        });
      });
      // END CHANGE BG COLOR

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
        .addLabel('startLink')
        .from(
          '.promo__link svg',
          0.4,
          { xPercent: 100, yPercent:100, ease: Power2.easeInOut },
          'start',
        );
      // promo animation end
            // BUTTON FOLLOWING
    ScrollTrigger.matchMedia({
      '(min-width:1200px)':()=>{
        const refs={
          playerContainer: document.querySelector('.video-section__player'),
         button: document.querySelector('.video-section__player .play-btn'),
        }
        let active=false;
        const timeout=50;
        const containerCenterPos={x:0,y:0}
        const containerSize={
          width: refs.playerContainer.clientWidth,
          height: refs.playerContainer.clientHeight
        };
        const buttonSize={
          width:refs.button.clientWidth, 
          height:refs.button.clientHeight
        };
        const COORDS_RANGE={
          x:{
            min: (-containerSize.width/2)+buttonSize.width/2,
            max: containerSize.width/2-buttonSize.width/2,
          },
          y:{
            min: (-containerSize.height/2)+buttonSize.height/2,
            max: (containerSize.height/2)-buttonSize.height/2,
          }
        }
        const mousePos={x:0,y:0};
        const currentPos={x:0, y:0};
        let lastTime=0;
        const pos = { x: 0, y: 0 };
        const speed = 0.35;

        ScrollTrigger.create({
          scroller: REFS.scroller,
          trigger: playerContainer,
          onUpdate: debounce(updateCenterCoords,timeout),
            // markers: true,
        })
        refs.playerContainer.addEventListener('mouseenter',startFollowing)
        refs.playerContainer.addEventListener('mouseleave',stopFollowing) 
        function startFollowing(){
          refs.playerContainer.addEventListener('mousemove',updateMoveCoords)
          active=true;
        }
        function stopFollowing(){
          refs.playerContainer.removeEventListener('mousemove',updateMoveCoords),
          active=false;
          currentPos.x=0;
          currentPos.y=0;
        }
        function updateCenterCoords(){
          if(!active)return;
          const xPos=refs.playerContainer.getBoundingClientRect().x;
          const yPos=refs.playerContainer.getBoundingClientRect().y;
          const width=containerSize.width;
          const height=containerSize.height;

          containerCenterPos.x=xPos+width/2;
          containerCenterPos.y=yPos+height/2;

        }
        function updateMoveCoords(mouseEvent)
  { 
    if(Date.now()-lastTime<timeout) return
    lastTime=Date.now();
    if(mousePos.x===mouseEvent.clientX&&mousePos.y===mouseEvent.clientY) return
    mousePos.x=mouseEvent.clientX;
    mousePos.y=mouseEvent.clientY;
    let xPos = mousePos.x-containerCenterPos.x;
    let yPos= mousePos.y -containerCenterPos.y;
    currentPos.x=xPos;
    currentPos.y=yPos;
  }
  gsap.set(refs.button, {xPercent: -50, yPercent: -50});
  const xSet = gsap.utils.pipe(
    gsap.utils.clamp(COORDS_RANGE.x.min,COORDS_RANGE.x.max),
    gsap.quickSetter(refs.button, "x", "px")
  );
  const ySet = gsap.utils.pipe(
    gsap.utils.clamp(COORDS_RANGE.y.min,COORDS_RANGE.y.max),
    gsap.quickSetter(refs.button, "y", "px")
  );
  gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
    pos.x += (currentPos.x - pos.x) * dt;
    pos.y += (currentPos.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  });
      }
    })

      // discover animation start
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
      let watchesBtnRef=document.querySelector(".watches-fact__play-btn");
      {
          ScrollTrigger.matchMedia({
            '(min-width: 1200px)': ()=>{
              VanillaTilt.init(watchesBtnRef,{scale:1.05,max:                    40,perspective: 500, transition: true,easing:                 "cubic-bezier(.03,.98,.52,.99)"});
              
            }
          })
          
        }

      // BUTTON 3D HOVER
      ScrollTrigger.matchMedia({
        '(min-width: 1200px)': function () {
          ScrollTrigger.create({
            scroller: REFS.scroller,
            trigger: '.ambassador__sticky-block',
            endTrigger: '.ambassador__perks-container',
            pin: true,
            start: 'center center',
            end: 'bottom 85.5%',
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
          '.contacts-section__subtitle div span',
          1.2,
          { y: '100%', ease: Power2.easeInOut, yoyo: true },
          0.1,
          'start',
        )
        .from('.contacts-section__name', 0.8, { opacity: 0 }, 'start');

      // contacs animation end

    ScrollTrigger.refresh();
    });
  };
});

// iframe video from youtube start

var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';

var firstScriptTag = document.getElementsByTagName('script')[0];
var playerContainer = document.getElementById('player-container');
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
let playerWatches;
let iframe;
const watchesContainer=document.querySelector('.watches-fact')
const watchesPlayer=document.querySelector('.watches-fact__video')

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1920',
    width: '1080',
    videoId: 'hVN3cc4ZWpg',
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerWatches=new YT.Player('watches-fact__video', {
    height: '320',
    width: '320',
    videoId: '0BgE91oLEN8',
    events: {
      // onStateChange: onPlayWatches,
      'onReady': onPlayerReady,
      onStateChange: onPauseWatch,

    },
  });
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PAUSED) {
    playerContainer.classList.toggle('active');
  }
}
let watchesBtnRef=document.querySelector(".watches-fact__play-btn");

watchesBtnRef.addEventListener('click',playFullscreen)
          function playFullscreen (){
            iframe.classList.add('fullscreen');

            playerWatches.playVideo();
          }
          function onPlayerReady(event) {
            iframe = document.querySelector('#watches-fact__video');
          }
          function onPauseWatch(event){
            if (event.data == YT.PlayerState.PAUSED || event.data==YT.PlayerState.ENDED) {
              iframe.classList.remove('fullscreen');
              playerWatches.pauseVideo();
            }
          }
playerContainer.addEventListener('click', function () {
  player.playVideo();
  playerContainer.classList.toggle('active');
});
// iframe video from youtube end

// link hover start
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
    .to(svgRef, 0.4, { x: '100%', y: '100%', ease: Power1.easeInOut }, 'start')
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
function debounce (callback, wait)  {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}