import { currentConditions, dailyForestData, hourlyForecastData } from "./model";
import { tempBool, windSpeedBool, precipitationBool } from "./index";

//Helper Functions
function fahrenheitToCelcius(F){
   let C= (F-32)/1.8;
   return Number(C.toFixed(2));
}
function mphToKmh(mph){
   let kmh = mph * 1.60934;
   return Number(kmh.toFixed(2));
}
function mmToInch(mm){
   let inch = mm/25.4;
   return Number(inch.toFixed(3));
}
function updateTemperature(){
   statsMenuTemperature();
   weekMenuTemperature();
   hoursMenuTemperature();
}
//---> Main Update
let place=document.querySelector("#placeName");
let dayDate=document.querySelector("#dateDay");
let temperature = document.querySelector("#temperature");
let feelsLike = document.querySelector("#feelsLike");
let humidity =document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let precipitation = document.querySelector("#precipitation");
let tempIcon = document.querySelector("#tempIcon");
function updateCurrentConditions(){
   place.textContent=`${currentConditions["place"]}`;
   dayDate.textContent=`${currentConditions["day"]}, ${currentConditions["month"]} ${currentConditions["date"]}, ${currentConditions["year"]}`
   humidity.textContent=`${currentConditions["humidity"]}%`;
   updateWindSpeed();
   statsMenuTemperature();
   if(currentConditions["precipitation"]==null){
      currentConditions["precipitation"]=0;
   }
   updatePrecipitation();
   tempIcon.src = currentConditions["icon"];
}
function statsMenuTemperature(){
   if(tempBool){
      temperature.textContent=`${fahrenheitToCelcius(currentConditions["temperature"])}° C`;
      feelsLike.textContent=`${fahrenheitToCelcius(currentConditions["feelsLike"])}° C`;
   }else{
      temperature.textContent=`${currentConditions["temperature"]}° F`;
      feelsLike.textContent=`${currentConditions["feelsLike"]}° F`;
   }
}
function updateWindSpeed(){
   if(windSpeedBool){
      windSpeed.textContent=`${mphToKmh(currentConditions["wind"])} km/h`;
   }else{
      windSpeed.textContent=`${currentConditions["wind"]} mph`;
   }
}
function updatePrecipitation(){
   if(precipitationBool){
      precipitation.textContent=`${currentConditions["precipitation"]} mm`;
   }else{
      precipitation.textContent=`${mmToInch(currentConditions["precipitation"])} inch`;
   }
}

//--->WeekMenu
let dailyCard=[]
let expandWeek={
   "Sun":"Sunday", "Mon":"Monday", "Tue":"Tuesday", "Wed":"Wednesday", "Thu":"Thursday", "Fri":"Friday", "Sat":"Saturday", 
}
const weekDay=[];
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
      weekDay.push(expandWeek[data.day]);
      console.log(expandWeek[data.day]);
      slot.day.textContent = data.day;
      slot.icon.src = data.icon;
      if(tempBool){
         slot.max.textContent = `${Math.round(fahrenheitToCelcius(data.maxTemp))}°`;
         slot.min.textContent = `${Math.round(fahrenheitToCelcius(data.minTemp))}°`;
      }else{
         slot.max.textContent = `${Math.round(data.maxTemp)}°`;
         slot.min.textContent =`${Math.round(data.minTemp)}°`;
      }
     
   }
}
function weekMenuTemperature(){
   if(tempBool){
      for(let i=0;i<7;i++){
         const data = dailyForestData[i];
         const slot = dailyCard[i];
         slot.max.textContent = `${Math.round(fahrenheitToCelcius(data.maxTemp))}°`;
         slot.min.textContent =`${Math.round(fahrenheitToCelcius(data.minTemp))}°`;
      }
   }else{
      for(let i=0;i<7;i++){
         const data = dailyForestData[i];
         const slot = dailyCard[i];
         slot.max.textContent = `${Math.round(data.maxTemp)}°`;
         slot.min.textContent =`${Math.round(data.minTemp)}°`;
      }
   }
}

//---->HoursMenu
const hourDays = [];
const hoursIcon=[];
const hoursTime=[];
const hoursTemperature=[];
function populateHourDays() {
   for(let i=0; i<24;i++){
      hoursIcon.push(document.querySelector(`#hourIcon${i}`));
      hoursTime.push(document.querySelector(`#hourTime${i}`));
      hoursTemperature.push(document.querySelector(`#hourTemp${i}`))
   }
   console.log(hoursIcon);
   console.log(hoursTime);
   console.log(hoursTemperature);
   for(let i=0; i<7; i++){
      const temp = document.querySelector(`#hourDay${i}`);
      if(temp) {
         temp.textContent = weekDay[i];
         hourDays.push(temp);
      }
   }
   if(hourDays.length > 0) {
      const hourDay = document.querySelector("#hourDay");
      hourDay.textContent = hourDays[0].textContent;
      hourDays[0].classList.add("choosen");
      loadHours(0);
      for(let i=0; i<7; i++){
         let temp = hourDays[i];
         temp.addEventListener("click",()=>{
            hourDay.textContent = temp.textContent;
            temp.classList.add("choosen");
            for(let j=0; j<7; j++){
               if(temp.id !== hourDays[j].id){
                  hourDays[j].classList.remove("choosen");
               }
            }
            loadHours(i);
         });
      }
   }
}

function loadHours(index){
   for(let i=0;i<24;i++){
      console.log(hourlyForecastData[index][i]["icon"])
      hoursIcon[i].src=hourlyForecastData[index][i]["icon"];
      if(tempBool){
         hoursTemperature[i].textContent=`${Math.round(fahrenheitToCelcius(hourlyForecastData[index][i]["temp"]))}°`;
      }else{
         hoursTemperature[i].textContent=`${Math.round(hourlyForecastData[index][i]["temp"])}°`;
      }
      hoursTime[i].textContent=hourlyForecastData[index][i]["time"];
   }
}
function hoursMenuTemperature(){
   if(tempBool){
      for(let index=0;index<7;index++){
         for(let i=0;i<24;i++){
            hoursTemperature[i].textContent=`${Math.round(fahrenheitToCelcius(hourlyForecastData[index][i]["temp"]))}°`;
         }
      }
   }else{
      for(let index=0;index<7;index++){
         for(let i=0;i<24;i++){
            hoursTemperature[i].textContent=`${Math.round(hourlyForecastData[index][i]["temp"])}°`;
         }
      }
   }
}

export {updateCurrentConditions,updateTemperature, updateWindSpeed, updatePrecipitation, updateDailyForcast, populateHourDays};
