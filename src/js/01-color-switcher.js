const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
startBtn.addEventListener('click', getStart);
stopBtn.addEventListener('click', getStop);

let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function getStart() {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');

  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
}
function getStop() {
  stopBtn.setAttribute('disabled', 'true');
  startBtn.removeAttribute('disabled');

  clearInterval(timerId);
}
