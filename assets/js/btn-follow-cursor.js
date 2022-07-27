const areaRef = document.querySelector('.video-section__player');
const btnRef = areaRef.querySelector('.play-btn');
const cursorCords = { x: -1, y: -1 };
const checkPeriod = 50;
function setCursorCords(event) {
  cursorCords.x = event.pageX;
  cursorCords.y = event.pageY;
}
function moveBtn(event) {
  const block = areaRef.getBoundingClientRect();
  const blockX = block.left + window.pageXOffset;
  const blockY = block.top + window.pageYOffset;
  const onX = cursorCords.x - blockX;
  const onY = cursorCords.y - blockY;
  if (onX > block.width || onY > block.height || onX < 0 || onY < 0) {
    btnRef.style.top = '50%';
    btnRef.style.left = '50%';
    return;
  }
  btnRef.style.top = onY + 'px';
  btnRef.style.left = onX + 'px';
}
document.addEventListener('mousemove', setCursorCords);
setInterval(moveBtn, checkPeriod);
