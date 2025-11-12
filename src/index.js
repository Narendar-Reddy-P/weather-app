import "./style.css";
import { getWeather } from "./model";

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
   }
});
fahrenheit.addEventListener("click",()=>{
   if(!(fahrenheit.classList.contains("selected"))){
      fahrenheit.classList.add("selected");
      celsius.classList.remove("selected");
   }
});

const kiloMeter=document.querySelector("#kiloMeter");
kiloMeter.classList.add("selected");
const mile=document.querySelector("#mile");
kiloMeter.addEventListener("click",()=>{
   if(!(kiloMeter.classList.contains("selected"))){
      kiloMeter.classList.add("selected");
      mile.classList.remove("selected")
   }
});
mile.addEventListener("click",()=>{
   if(!(mile.classList.contains("selected"))){
      mile.classList.add("selected");
      kiloMeter.classList.remove("selected");
   }
});

const milliMeters=document.querySelector("#millimeters");
milliMeters.classList.add("selected");
const inches=document.querySelector("#inches");
milliMeters.addEventListener("click",()=>{
   if(!(milliMeters.classList.contains("selected"))){
      milliMeters.classList.add("selected");
      inches.classList.remove("selected");
   }
});
inches.addEventListener("click",()=>{
   if(!(inches.classList.contains("selected"))){
      inches.classList.add("selected");
      milliMeters.classList.remove("selected");
   }
});

const now = new Date();
console.log(now.toString());            // Local time as string
console.log(now.toISOString());         // UTC ISO formatks
console.log(now.getFullYear());         // 2025
console.log(now.getMonth() + 1);        // 11 (months are 0-based)
console.log(now.getHours());   


