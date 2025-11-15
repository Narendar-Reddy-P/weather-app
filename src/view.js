import { currentConditions, dailyForestData } from "./model";


let place=document.querySelector("#placeName");
let dayDate=document.querySelector("#dateDay");
let temperature = document.querySelector("#temperature");
let feelsLike = document.querySelector("#feelsLike");
let humidity =document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let precipitation = document.querySelector("#precipitation");

function updateCurrentConditions(){
   if(currentConditions["isCountry"]){
      place.textContent=`${currentConditions["place"]}`;
   }else{
      place.textContent=`${currentConditions["place"]}, ${currentConditions["country"]}`;
   }
   dayDate.textContent=`${currentConditions["day"]}, ${currentConditions["month"]} ${currentConditions["date"]}, ${currentConditions["year"]}`
   humidity.textContent=`${currentConditions["humidity"]}`;
   windSpeed.textContent=`${mphToKmh(currentConditions["wind"])} km/h`;
   temperature.textContent=`${fahrenheitToCelcius(currentConditions["temperature"])}° C`;
   feelsLike.textContent=`${fahrenheitToCelcius(currentConditions["feelsLike"])}° C`;
   if(currentConditions["precipitation"]==null){
      currentConditions["precipitation"]=0;
   }
   precipitation.textContent=`${currentConditions["precipitation"]} mm`;
}

function fahrenheitToCelcius(F){
   let C= (F-32)/1.8;
   return Number(C.toFixed(2));
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

let dailyCard=[]
function updateDailyForcast(){
   dailyCard = [];
   for(let i=0;i<7;i++){
      const day = document.querySelector(`#cardTitle${i}`);
      const icon = document.querySelector(`#weekIcon${i}`);
      const max = document.querySelector(`#maxTemp${i}`);
      const min = document.querySelector(`#minTemp${i}`);

      dailyCard.push({ day, icon, max, min });
   }
   for(let i=0;i<7;i++){
      const data = dailyForestData[i];
      if(!data) continue;
      const slot = dailyCard[i];
      slot.day.textContent = data.day;
      slot.icon.src = data.icon;
      slot.max.textContent = `${Math.round(fahrenheitToCelcius(data.maxTemp))}°`;
      slot.min.textContent = `${Math.round(fahrenheitToCelcius(data.minTemp))}°`;
   }
}

function updateTemperature(bool){
   if(bool){
      temperature.textContent=`${fahrenheitToCelcius(currentConditions["temperature"])}° C`;
      feelsLike.textContent=`${fahrenheitToCelcius(currentConditions["feelsLike"])}° C`;
      for(let i=0;i<7;i++){
         const data = dailyForestData[i];
         const slot = dailyCard[i];
         slot.max.textContent = `${Math.round(fahrenheitToCelcius(data.maxTemp))}°`;
         slot.min.textContent =`${Math.round(fahrenheitToCelcius(data.minTemp))}°`;
      }
   }else{
      temperature.textContent=`${currentConditions["temperature"]}° F`;
      feelsLike.textContent=`${currentConditions["feelsLike"]}° F`;
      for(let i=0;i<7;i++){
         const data = dailyForestData[i];
         const slot = dailyCard[i];
         slot.max.textContent = `${Math.round(data.maxTemp)}°`;
         slot.min.textContent =`${Math.round(data.minTemp)}°`;
      }
   }
}

export {updateCurrentConditions,updateTemperature, updateWindSpeed, updateMmToInch, updateDailyForcast};
