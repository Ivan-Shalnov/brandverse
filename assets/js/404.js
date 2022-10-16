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
// {
//   let windowWidthSaved = window.innerWidth;
//   window.addEventListener(
//     'resize',
//     debounce(function () {
//       window.innerWidth !== windowWidthSaved && location.reload(false);
//     }, 100),
//   );
// }
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

    // text.words;
    ScrollTrigger.refresh();
  };
});
