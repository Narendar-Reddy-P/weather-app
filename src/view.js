import { currentConditions, dailyForestData } from "./model";


let place=document.querySelector("#placeName");
let dayDate=document.querySelector("#dateDay");
let temperature = document.querySelector("#temperature");
let feelsLike = document.querySelector("#feelsLike");
let humidity =document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let precipitation = document.querySelector("#precipitation");
let tempIcon=document.querySelector("#tempIcon");


function updateCurrentConditions(){
   if(currentConditions["isCountry"]){
      place.textContent=`${currentConditions["place"]}`;
   }else{
      place.textContent=`${currentConditions["place"]}, ${currentConditions["country"]}`;
   }
   dayDate.textContent=`${currentConditions["day"]}, ${currentConditions["month"]} ${currentConditions["date"]}, ${currentConditions["year"]}`
   humidity.textContent=`${currentConditions["humidity"]}`;
   updateWindSpeed(true);
   updateTemperature(true);
   if(currentConditions["precipitation"]==null){
      currentConditions["precipitation"]=0;
   }
   updateMmToInch(true);
   tempIcon.src=currentConditions["icon"];
}

function fahrenheitToCelcius(F){
   let C= (F-32)/1.8;
   return Number(C.toFixed(2));
}

function updateTemperature(bool){
   if(bool){
      temperature.textContent=`${fahrenheitToCelcius(currentConditions["temperature"])}° C`;
      feelsLike.textContent=`${fahrenheitToCelcius(currentConditions["feelsLike"])}° C`;
   }else{
      temperature.textContent=`${currentConditions["temperature"]}° F`;
      feelsLike.textContent=`${currentConditions["feelsLike"]}° F`;
   }
}

function mphToKmh(mph){
   let kmh = mph * 1.60934;
   return Number(kmh.toFixed(2));
}

function updateWindSpeed(bool){
   if(bool){
      windSpeed.textContent=`${mphToKmh(currentConditions["wind"])} km/h`;
   }else{
      windSpeed.textContent=`${currentConditions["wind"]} mph`;
   }
}

function mmToInch(mm){
   let inch = mm/25.4;
   return Number(inch.toFixed(3));
}

function updateMmToInch(bool){
   if(bool){
      precipitation.textContent=`${currentConditions["precipitation"]} mm`;
   }else{
      precipitation.textContent=`${mmToInch(currentConditions["precipitation"])} inch`;
   }
}

let dailyCard={
   title:[],
   icon:[],
   maxTemp:[],
   minTemp:[],
}

for(i=0;i<7;i++){
   dailyCard.title.push(document.querySelector(`#cardTitle${i}`));
   dailyCard.icon.push(document.querySelector(`#weekIcon${i}`));
   dailyCard.maxTemp.push(document.querySelector(`#maxTemp${i}`));
   dailyCard.minTemp.push(document.querySelector(`#minTemp${i}`));
}




export {updateCurrentConditions,updateTemperature, updateWindSpeed, updateMmToInch};