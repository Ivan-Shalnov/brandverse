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

const tl = TweenMax.staggerFrom(
  '.promo__title div span',
  0.8,
  { y: '100%', ease: Power2.easeInOut, yoyo: true },
  0.05,
);

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
  $('html,body').animate(
    {
      scrollTop: $('.video-section__player').offset().top + 2,
    },
    'slow',
  );
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

// switch section colors start

const colors = [
  '',
  'grey',
  'grey',
  'black',
  'white',
  'grey',
  'grey',
  'grey',
  'grey',
  'black',
];

const sections = [...document.getElementsByTagName('section')];

window.addEventListener('scroll', function () {
  const scrollFromTop = window.pageYOffset * 1.2;

  for (let i = 0; sections.length > i; i++) {
    if (scrollFromTop <= sections[i].offsetTop) {
      document.body.className = colors[i];
      break;
    }
  }
});

// switch section colors end
