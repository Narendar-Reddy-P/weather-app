import "./style.css";
import { getWeather } from "./model";
import {
  updateTemperature,
  updateWindSpeed,
  updatePrecipitation,
} from "./view";
import { enterValidName } from "./errorMessage";

//default search
let location = "hyderabad";
getWeather(location);

//search event listeners
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  location = searchInput.value;
  if (location == "") {
    enterValidName();
  } else {
    getWeather(location);
  }
});

let tempBool = true;
let windSpeedBool = true;
let precipitationBool = true;
const celsius = document.querySelector("#celsius");
celsius.classList.add("selected");
const fahrenheit = document.querySelector("#fahrenheit");
celsius.addEventListener("click", () => {
  if (!celsius.classList.contains("selected")) {
    celsius.classList.add("selected");
    fahrenheit.classList.remove("selected");
    tempBool = true;
    updateTemperature();
  }
});
fahrenheit.addEventListener("click", () => {
  if (!fahrenheit.classList.contains("selected")) {
    fahrenheit.classList.add("selected");
    celsius.classList.remove("selected");
    tempBool = false;
    updateTemperature();
  }
});
const kiloMeter = document.querySelector("#kiloMeter");
kiloMeter.classList.add("selected");
const mile = document.querySelector("#mile");
kiloMeter.addEventListener("click", () => {
  if (!kiloMeter.classList.contains("selected")) {
    kiloMeter.classList.add("selected");
    mile.classList.remove("selected");
    windSpeedBool = true;
    updateWindSpeed();
  }
});
mile.addEventListener("click", () => {
  if (!mile.classList.contains("selected")) {
    mile.classList.add("selected");
    kiloMeter.classList.remove("selected");
    windSpeedBool = false;
    updateWindSpeed();
  }
});
const milliMeters = document.querySelector("#millimeters");
milliMeters.classList.add("selected");
const inches = document.querySelector("#inches");
milliMeters.addEventListener("click", () => {
  if (!milliMeters.classList.contains("selected")) {
    milliMeters.classList.add("selected");
    inches.classList.remove("selected");
    precipitationBool = true;
    updatePrecipitation();
  }
});
inches.addEventListener("click", () => {
  if (!inches.classList.contains("selected")) {
    inches.classList.add("selected");
    milliMeters.classList.remove("selected");
    precipitationBool = false;
    updatePrecipitation();
  }
});

export { tempBool, windSpeedBool, precipitationBool };
