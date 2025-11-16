import { serverError401, restoreContainers, resultNotFound } from "./errorMessage";
import { updateCurrentConditions, updateDailyForcast, populateHourDays } from "./view";

//images
import snow from "../assets/images/icon-snow.webp";
import strom from "../assets/images/icon-storm.webp";
import rain from "../assets/images/icon-rain.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import fog from "../assets/images/icon-fog.webp";
import sunny from "../assets/images/icon-sunny.webp";
import overcast from "../assets/images/icon-overcast.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";

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
   "clear-night":sunny,
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

const time = [
  "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM",
  "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
  "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];

//Helper Functions

//Main Fuction that calls API for data
async function getWeather(location){
   try{
      let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${weatherKey}`);
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
      dataSeparationCC();
      dataSeparationDF();
      dataSeparationHF();
      updateCurrentConditions();
      updateDailyForcast();
      populateHourDays();
   }catch(error){
      console.log(`error: ${error}`);
   }
}

//CurrentConditions
async function dataSeparationCC(){
   let current=data["currentConditions"];
   let location= data["address"];
   let now = new Date();
   currentConditions={
      day: weeks[now.getDay()],
      date: now.getDate(),
      month: months[now.getMonth()],
      year: now.getFullYear(),
      place: location.charAt(0).toUpperCase()+location.slice(1),
      temperature: current["temp"],
      feelsLike: current["feelslike"],
      humidity: current["humidity"],
      wind: current["windspeed"],
      precipitation: current["precip"],
      icon: weatherIconList[current["icon"]],
   }
}

//DailyForecast
function dataSeparationDF(){
   dailyForestData=[];
   for(let i=0;i<7;i++){
      let temp={
         day: weekShortCut[new Date(data["days"][i]["datetime"]).getDay()],
         icon: weatherIconList[data["days"][i]["icon"]],
         maxTemp: data["days"][i]["tempmax"],
         minTemp: data["days"][i]["tempmin"],
      }
      dailyForestData.push(temp);
   }
}

let hourlyForecastData={};
function dataSeparationHF(){
   for(let i=0;i<7;i++){
      let temp1=data["days"][i]["hours"];
      let hours={};
      for(let j=0;j<24;j++){
         let temp2={
            "icon":weatherIconList[temp1[j].icon],
            "temp":temp1[j].temp,
            "time":time[j],
         }
         hours[j]=temp2;
      }
      hourlyForecastData[i]=hours;
   }
}
export{getWeather};
export{currentConditions, dailyForestData, hourlyForecastData};
