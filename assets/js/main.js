document.addEventListener('DOMContentLoaded', () => {
  $('.spinner-wrapper').fadeOut('slow');
});
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

//BUTTON HOVER

//MAKE STRUCTURE
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

$('.marquee-right').marquee({
  //speed in milliseconds of the marquee
  duration: 10000,
  //gap in pixels between the tickers
  gap: 20,
  //time in milliseconds before the marquee will start animating
  delayBeforeStart: 0,
  //'left' or 'right'
  direction: 'right',
  //true or false - should the marquee be duplicated to show an effect of continues flow
  // duplicated: true,
});

gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('.scroller'),
  smooth: true,
  onLoad() {
    $('.spinner-wrapper').fadeOut(400);
  },
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
      gsap.to('.scroller', {
        backgroundColor: colorSection.dataset.bgcolor,
        color: colorSection.dataset.textcolor,
        overwrite: 'auto',
      }),
    onLeaveBack: () =>
      gsap.to('.scroller', {
        backgroundColor: prevBg,
        color: prevText,
        overwrite: 'auto',
      }),
  });
});

// promo animation start

const promoTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.promo',
    scroller: '.scroller',
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
  .from('.promo__link', 0.4, { scale: 0, ease: Power2.easeInOut }, 'start');

// promo animation end

// discover animation start
const discoverTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.discover',
    scroller: '.scroller',
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
  .from('.discover__line', 0.4, { width: 0, ease: Power2.easeInOut }, 'start')
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
    scroller: '.scroller',
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
    scroller: '.scroller',
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
  .from('.hwd__block-line', 0.4, { width: 0, ease: Power2.easeInOut }, 'start')
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
    scroller: '.scroller',
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
const communityoretTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.ambassador',
    scroller: '.scroller',
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
    scroller: '.scroller',
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
    scroller: '.scroller',
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

// iframe video from youtube start

var playerContainer = document.getElementById('player-container');
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1920',
    width: '1080',
    videoId: 'hVN3cc4ZWpg',
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PAUSED) {
    event.target.pauseVideo();
    playerContainer.classList.toggle('active');
  }
}

playerContainer.addEventListener('click', function () {
  player.playVideo();
  playerContainer.classList.toggle('active');
  locoScroll.scrollTo(playerContainer);
});
// iframe video from youtube end

ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
ScrollTrigger.refresh();
