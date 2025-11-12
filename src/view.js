import { currentConditions } from "./model";

function updateCurrentConditions(){
   let place=document.querySelector("#placeName");
   let dayDate=document.querySelector("#dateDay");
   let temperature = document.querySelector("#temperature");
   let feelsLike = document.querySelector("#feelsLike");
   let humidity =document.querySelector("#humidity");
   let windSpeed = document.querySelector("#windSpeed");
   let precipitation = document.querySelector("#precipitation");

   dayDate.textContent=`${currentConditions["day"]}, ${currentConditions["month"]} ${currentConditions["date"]}, ${currentConditions["year"]}`
   place.textContent=`${currentConditions["place"]}, ${currentConditions["country"]}`;
   temperature.textContent=`${currentConditions["temperature"]}°`;
   feelsLike.textContent=`${currentConditions["feelsLike"]}°`;
   humidity.textContent=`${currentConditions["humidity"]}`;
   windSpeed.textContent=`${currentConditions["wind"]} mph`;
   if(currentConditions["precipitation"]==null){
      currentConditions["precipitation"]="0 mm"
   }
   precipitation.textContent=`${currentConditions["precipitation"]}`;

}

export {updateCurrentConditions};