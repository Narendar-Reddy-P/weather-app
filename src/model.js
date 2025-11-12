import { serverError401,resultNotFound,restoreContainers } from "./errormessage";
import { updateCurrentConditions } from "./view";

const weatherKey=`FFFP9LKXSXPL28VA9KWPRE3NW`;


const months = [
  "Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

const weeks = [
   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
]

let data;
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
      await model();
      updateCurrentConditions();

   }catch(error){
      console.log(`error: ${error}`)
   }
}
//default weather location
async function findAddress(latitude,longitude){
      let response= await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      if(!(response.ok)){
         if(response.status==401){
            serverError401();
         }else{
            resultNotFound();
         }
      }else{
         console.log(response);
         let address= await response.json();
         return address["address"];
      }
}
let currentConditions;
async function model(){
   let current=data["currentConditions"];
   console.log(current);
   const address = await findAddress(data["latitude"],data["longitude"]);
   let todayConditions = data["days"];
   console.log(todayConditions);
   let location= data["address"];
   const now = new Date();
   console.log(now);
   console.log(now.getDay());
   console.log(now.getDate())
   console.log(now.getMonth());
   console.log(now.getFullYear());
   currentConditions={
      day: weeks[now.getDay()],
      date: now.getDate(),
      month: months[now.getMonth()],
      year: now.getFullYear(),
      place: location.charAt(0).toUpperCase()+location.slice(1),
      country: address["country"],
      state: address["state"],
      temperature: current["temp"],
      feelsLike: current["feelslike"],
      humidity: current["humidity"],
      wind: current["windspeed"],
      precipitation: current["precip"],
   }
   console.log(currentConditions);
}


export{getWeather};
export{currentConditions};