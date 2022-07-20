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
