const date_picker_element = document.querySelector(".container");
const selected_date_element = document.querySelector(
  ".container .selected-date"
);
const dates_element = document.querySelector(".container .calender");

const mth_element = document.querySelector(".mth");
const next_mth_element = document.querySelector(".next-mth");
const prev_mth_element = document.querySelector(".prev-mth");

const days_element = document.querySelector(".container .calender .days");

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

let date = new Date(); //return full date, contain everything
let day = date.getDate(); //return number of current date
let month = date.getMonth(); //return number of current month, but it need to plus by 1 so it will correct
let year = date.getFullYear();

//selected when clicked
let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + " " + year; //in the middle of screen, show month and year at first.

selected_date_element.textContent = formatDate(date); //

date_picker_element.addEventListener("click", toggleDatePicker);
next_mth_element.addEventListener("click", goToNextMonth);
prev_mth_element.addEventListener("click", goToPrevMonth);

populatesDates();

function toggleDatePicker(e) {
  //if class contains dates(we want them not to hide) it will return true, but with '!' it will become false so it will not execute, but if other class, it will execute because it will become true
  if (!checkEventPathForClass(e.composedPath(), "dates")) {
    dates_element.classList.toggle("active");
  }
}

//In e.composedPath() contains everything,  parent, child element so we loop all,
function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true; //if the path contains 'dates' classlist , True
    }
  }
  return false; //return false if it doesn't contains 'dates' (etc. selected-date)
}
//arrow button go to next month
function goToNextMonth() {
  month++; //increse month by 1 each click
  if (month > 11) {
    //if month exceeds than december
    month = 0; //month will be back to janurary
    year++; //year increase
  }
  mth_element.textContent = months[month] + " " + year; //show in middle of screen to be like this

  populatesDates(); //call it so it each click, it will show new date
}

//arrow button go to previous month
function goToPrevMonth() {
  month--; //decrease month by 1 each click
  if (month < 0) {
    //if month lower than janurary
    month = 11; //month will be back to december
    year--; //year decrease
  }
  mth_element.textContent = months[month] + " " + year; //show in middle of screen to be like this

  populatesDates(); //call it so it each click, it will show new date
}

//display dates
function populatesDates() {
  days_element.innerHTML = ""; //every times we run, clear the days_element and rerender it
  let amount_days = 31;

  if (month == 1) {
    amount_days = 28;
  }

  for (let i = 0; i < amount_days; i++) {
    const day_element = document.createElement("div");
    day_element.classList.add("day");
    day_element.textContent = i + 1; // 'i' start with 0, so plus it so it gonna be 1,2,3,4,5

    //add selected date on current date at first
    if (
      selectedDay == i + 1 &&
      selectedMonth == month &&
      selectedYear == year
    ) {
      day_element.classList.add("selected");
    }

    //when click at date it will
    day_element.addEventListener("click", () => {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;
      //update the date we click on the selected_date_element with right format
      selected_date_element.textContent = formatDate(selectedDate);
      selected_date_element.dataset.value = selectedDate; //change their dataset value to its date
      populatesDates(); //rerender this page
    });

    days_element.appendChild(day_element); //append it to its container
  }
}

//format date if days less than 10, like 9, show 09
function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  return day + " / " + months[month] + " / " + year; //show month and years in the middle screen
}
