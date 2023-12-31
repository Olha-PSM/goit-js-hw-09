import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonStart = document.querySelector('button[data-start]');
const timeInput = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('.timer [data-days]');
const dataHours = document.querySelector('.timer [data-hours]');
const dataMinutes = document.querySelector('.timer [data-minutes]');
const dataSeconds = document.querySelector('.timer [data-seconds]');

buttonStart.setAttribute('disabled', 'disabled');

let intervalId = null;
let selectedTime;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedTime = selectedDates[0];

    if (selectedDates[0] <= options.defaultDate) {
      return Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.removeAttribute('disabled');
    }
  },
};

flatpickr(timeInput, options);

buttonStart.addEventListener('click', start);

function start() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    buttonStart.setAttribute('disabled', 'disabled');
    timeInput.setAttribute('disabled', 'disabled');
    const deltaTime = selectedTime - currentTime;
    const time = convertMs(deltaTime);

    updateClockface(time);
    stop(deltaTime);
  }, 1000);
}

function updateClockface({ days, hours, minutes, seconds } = time) {
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}
function stop(deltaTime) {
  if (deltaTime <= 1000) {
    clearInterval(intervalId);
    timeInput.removeAttribute('disabled');
  }
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
