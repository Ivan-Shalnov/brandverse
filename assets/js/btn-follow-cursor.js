// const areaRef = document.querySelector('.video-section__player');
// const btnRef = areaRef.querySelector('.play-btn');
// function throttle(func, interval) {
//   var lastCall = 0;
//   return function () {
//     var now = Date.now();
//     if (lastCall + interval < now) {
//       lastCall = now;
//       return func.apply(this, arguments);
//     }
//   };
// }

// const box = btnRef.getBoundingClientRect();
// const boxX = box.left + window.pageXOffset + box.width;
// const boxY = box.top + window.pageYOffset + box.height;
// function moveBtn(event) {
//   const onX = event.pageX - boxX;
//   const onY = event.pageY - boxY;
//   if (onX !== 0 && onY !== 0) {
//     btnRef.style.transform = `translate(${onX}px, ${onY}px)`;
//   }
// }

// areaRef.addEventListener('mousemove', moveBtn);
