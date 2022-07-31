document.addEventListener('DOMContentLoaded', () => {
  $('.spinner-wrapper').fadeOut('slow');

  function spliting(element) {
    let text = element.textContent.split('');
    let result = '';
    text.forEach(function (char) {
      result +=
        char.trim() === ''
          ? '<span>&nbsp;</span>'
          : '<span>' + char + '</span>';
    });

    element.innerHTML = result;
  }

  const splitElements = document.querySelectorAll('.split');
  for (let i = 0; i < splitElements.length; i++) {
    spliting(splitElements[i]);
  }

  // iframe video from youtube start

  const tag = document.createElement('script');

  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '1080',
      width: '1920',
      controls: 0,
      videoId: 'hVN3cc4ZWpg',
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  }
  function pauseVideo() {
    player.pauseVideo();
    console.log('stoped');
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PAUSED) {
      $('.video-section__player').removeClass('active');
    }
  }

  function playVideo() {
    console.log('videoPlay');
    $('.video-section__player').addClass('active');
    player.playVideo();
  }

  $('.video-section__player').click(function () {
    playVideo();
  });
  // iframe video from youtube end

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

  ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
  ScrollTrigger.refresh();
});
