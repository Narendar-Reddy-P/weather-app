import "./style.css";
import { getWeather } from "./model";
import { updateTemperature, updateWindSpeed, updateMmToInch} from "./view";

//default search
let location="veldanda";
getWeather(location);

//search event listeners
const searchInput=document.querySelector("#searchInput")
const searchButton=document.querySelector("#searchButton");
searchButton.addEventListener("click",(e)=>{
   e.preventDefault();
   location = searchInput.value; 
   getWeather(location);
});

//dropdowns
const unitsDropdown=document.querySelector("#unitsDropdown");
const units=document.querySelector("#units");

const celsius=document.querySelector("#celsius");
celsius.classList.add("selected");
const fahrenheit=document.querySelector("#fahrenheit");
celsius.addEventListener("click",()=>{
   if(!(celsius.classList.contains("selected"))){
      celsius.classList.add("selected");
      fahrenheit.classList.remove("selected");
      updateTemperature(true);
   }
});
fahrenheit.addEventListener("click",()=>{
   if(!(fahrenheit.classList.contains("selected"))){
      fahrenheit.classList.add("selected");
      celsius.classList.remove("selected");
      updateTemperature(false);
   }
});

const kiloMeter=document.querySelector("#kiloMeter");
kiloMeter.classList.add("selected");
const mile=document.querySelector("#mile");
kiloMeter.addEventListener("click",()=>{
   if(!(kiloMeter.classList.contains("selected"))){
      kiloMeter.classList.add("selected");
      mile.classList.remove("selected");
      updateWindSpeed(true);
   }
});
mile.addEventListener("click",()=>{
   if(!(mile.classList.contains("selected"))){
      mile.classList.add("selected");
      kiloMeter.classList.remove("selected");
      updateWindSpeed(false);
   }
});

const milliMeters=document.querySelector("#millimeters");
milliMeters.classList.add("selected");
const inches=document.querySelector("#inches");
milliMeters.addEventListener("click",()=>{
   if(!(milliMeters.classList.contains("selected"))){
      milliMeters.classList.add("selected");
      inches.classList.remove("selected");
      updateMmToInch(true);
   }
});
inches.addEventListener("click",()=>{
   if(!(inches.classList.contains("selected"))){
      inches.classList.add("selected");
      milliMeters.classList.remove("selected");
      updateMmToInch(false);
   }
});

const now = new Date();

console.log(now.getFullYear());   // 2025 (current year)
console.log(now.getMonth());      // 0-11 (month index, January = 0)
console.log(now.getDate());       // 1-31 (day of the month)
console.log(now.getDay()+4);        // 0-6 (day of the week, Sunday = 0)
console.log(now.getHours());      // 0-23 (hour of the day)
console.log(now.getMinutes());    // 0-59 (minutes)
console.log(now.getSeconds());    // 0-59 (seconds)
