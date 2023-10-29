const container = document.querySelector(".container");
const selectedDateMain = document.querySelector(".selected-date");
const calender = document.querySelector(".calender");
const days = document.querySelector(".days");

const nextArrow = document.querySelector(".next-mth");
const prevArrow = document.querySelector(".prev-mth");
const monthEl = document.querySelector(".mth");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();

selectedDateMain.textContent = day + " / " + (month + 1) + " / " + year;

const toggleShowAndHide = () => {
  if (selectedDateMain) {
    calender.classList.toggle("active");
  }
  showDate();
};

const showDate = () => {
  days.innerHTML = ""; //rerender the calendar
  monthEl.textContent = months[month] + " " + year;

  let amountDays = 31;

  switch (month) {
    case 1:
      amountDays = 28;
      break;
    case 3:
      amountDays = 30;
      break;
    case 5:
      amountDays = 30;
      break;
    case 8:
      amountDays = 30;
      break;
    case 10:
      amountDays = 30;
      break;

    default:
      amountDays = 31;
  }
};

const toNextMonth = () => {
  month++;

  if (month == 11) {
    month = 0;
    year++;
  }
  showDate();
};

const toPrevMonth = () => {
  month--;

  if (month == 0) {
    month = 11;
    year--;
  }
  showDate();
};

//container click to show and hide, but doesn't affect others
selectedDateMain.addEventListener("click", toggleShowAndHide);
nextArrow.addEventListener("click", toNextMonth);
prevArrow.addEventListener("click", toPrevMonth);
