const timeout = 350;
const membersRefs = document.querySelectorAll(
  '.team__members-list>.team__member-card',
);
const currentMemberContRef = document.querySelector('.team__current-member');
const currentPositionRef = document.querySelector('.team__current-position');
const currentNameRef = document.querySelector('.team__current-name');
const currentMailRef = document.querySelector('.team__current-mail');
const currentBioRef = document.querySelector('.team__current-bio');
currentMemberContRef.style.transition = `ease-in-out ${timeout}ms`;
function showInfo() {
  const name = this.querySelector('.team__member-name')?.textContent || '';
  const lastName =
    this.querySelector('.team__member-lastname')?.textContent || '';
  const position =
    this.querySelector('.team__member-position')?.textContent || '';
  const mail = this.querySelector('.team__member-mail')?.textContent || '';
  const bio = this.querySelector('.team__member-bio')?.textContent || '';
  currentMemberContRef.style.opacity = 0;
  membersRefs.forEach(card => card.classList.remove('active'));
  this.classList.add('active');
  const changeText = () => {
    currentPositionRef.textContent = position;
    currentNameRef.textContent = `${name} ${lastName}`;
    currentMailRef.textContent = mail;
    currentBioRef.textContent = bio;
    currentMemberContRef.style.opacity = 1;
  };
  setTimeout(changeText, timeout);
}
membersRefs.forEach(item => item.addEventListener('click', showInfo));
showInfo.call(membersRefs[0]);
