let now = new Date();

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
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
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day}, ${month} ${date},  ${year}`;
h3.innerHTML = `${hours}:${minutes}`;

function showTemp(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city-input").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let iconElement = document.querySelector("#emoji");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "ed1d03d83986af8d64630bead0e0f624";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML =
    Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

function yourCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-enter").value;
  search(city);
}
let form = document.querySelector("#city-place");
form.addEventListener("submit", yourCity);

let fahLink = document.querySelector("#fah-link");
fahLink.addEventListener("click", displayFahrenheitTemperature);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", displayCelsiusTemperature);

search("Vancouver");
