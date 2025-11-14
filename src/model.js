import { serverError401, restoreContainers, resultNotFound } from "./errorMessage";
import { updateCurrentConditions } from "./view";

//images
import snow from "../assets/images/icon-snow.webp";
import strom from "../assets/images/icon-storm.webp";
import rain from "../assets/images/icon-rain.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import fog from "../assets/images/icon-fog.webp";
import sunny from "../assets/images/icon-sunny.webp";
import overcast from "../assets/images/icon-overcast.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import moon from "../assets/images/moon.svg";

//API KEY
const weatherKey=`FFFP9LKXSXPL28VA9KWPRE3NW`;

//Variables Used to fetch data
let data;//-->MainData
let currentConditions;//--->Variable to store CurrentConditions
let  dailyForestData=[];//---> DataType to Store daily forest data

//Helper DataTypes
let weatherIconList={
   "snow": snow,
   "snow-showers-day": snow,
   "snow-showers-night": snow,
   "thunder-rain": strom,
   "thunder-showers-day": strom,
   "thunder-showers-night": strom,
   "rain": rain,
   "showers-day": drizzle,
   "showers-night": drizzle,
   "fog": fog,
   "wind": sunny, 
   "cloudy":overcast,
   "mostly-cloudy-day":overcast,
   "mostly-cloudy-night":overcast,
   "partly-cloudy-day":partlyCloudy,
   "partly-cloudy-night":partlyCloudy,
   "clear-day":sunny,
   "clear-night":moon,
}
const months = [
  "Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];
const weeks = [
   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
]
const weekShortCut = [
   "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
]
//Helper Functions
//1.Function to find Country of a place using latitude and longitude
async function findCountry(latitude,longitude){
      let response= await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      if(!(response.ok)){
         if(response.status==401){
            serverError401();
         }else{
            resultNotFound();
         }
      }else{
         let address= await response.json();
         return {
            country: address["address"]["country"]
         }
      }
}

//Main Fuction that calls API for data
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
      data = await response.json();
      console.log(data);
      await dataSeparationCC();
      dataSeparationDF();
      updateCurrentConditions();
   }catch(error){
      console.log(`error: ${error}`)
   }
}

//CurrentConditions
async function dataSeparationCC(){
   let current=data["currentConditions"];
   const address = await findCountry(data["latitude"],data["longitude"]);
   let location= data["address"];
   let now = new Date();
   currentConditions={
      day: weeks[now.getDay()],
      date: now.getDate(),
      month: months[now.getMonth()],
      year: now.getFullYear(),
      place: location.charAt(0).toUpperCase()+location.slice(1),
      country: address["country"],
      temperature: current["temp"],
      feelsLike: current["feelslike"],
      humidity: current["humidity"],
      wind: current["windspeed"],
      precipitation: current["precip"],
      isCountry: location.toUpperCase()===address["country"].toUpperCase(),
      icon: weatherIconList[current["icon"]],
   }
   console.log(currentConditions);
}

//DailyForecast
function dataSeparationDF(){
   for(let i=0;i<7;i++){
      let temp={
         day: weekShortCut[new Date(data["days"][i]["datetime"]).getDay()],
         icon: data["days"][i]["icon"],
         maxTemp: data["days"][i]["tempmax"],
         minTemp: data["days"][i]["tempmin"],
      }
      dailyForestData.push(temp);
   }
   console.log(dailyForestData);
}

export{getWeather};
export{currentConditions, dailyForestData};