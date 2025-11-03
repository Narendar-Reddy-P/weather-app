import "./style.css";
import { serverError401,resultNotFound,restoreContainers } from "./errormessage";

const weatherKey=`FFFP9LKXSXPL28VA9KWPRE3NW`;

async function getWeather(location){
   try{
      let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${weatherKey}`);
      console.log(response);
      if(!(response.ok)){
         if(response.status==401){
            serverError401();
         }else{
            resultNotFound();
         }
      }else{
         restoreContainers();
      }
      let data = await response.json();
      console.log(data);
   }catch(error){
      console.log(`error: ${error}`)
   }
}

const searchInput=document.querySelector("#searchInput")
const searchButton=document.querySelector("#searchButton");

searchButton.addEventListener("click",(e)=>{
   e.preventDefault();
   let location = searchInput.value; 
   getWeather(location);
});

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


