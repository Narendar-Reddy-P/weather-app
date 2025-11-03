
import errorIcon from '../assets/images/icon-error.svg';
import retryIcon from '../assets/images/icon-retry.svg';

//status 404
const placeMenu =document.querySelector("#placeMenu");
const statsMenu = document.querySelector("#statsMenu");
const weekMenu = document.querySelector("#weekMenu");
const hoursMenu=document.querySelector("#hoursMenu");
const searchMenu=document.querySelector("#searchMenu");

const serverError=document.createElement("div");
serverError.classList.add("errorContainer");
const muteImg=document.createElement("img");
muteImg.classList.add("muteImg");
const errorMessage=document.createElement("div");
errorMessage.classList.add("errorMessage");
const errorHeader=document.createElement("h1");
errorHeader.classList.add("errorHeader");
const retryContainer=document.createElement("div");
retryContainer.classList.add("retryContainer");
const retryImg=document.createElement("img");
retryImg.classList.add("toolIcons");
const retryTxt=document.createElement("div");
retryContainer.appendChild(retryImg);
retryContainer.appendChild(retryTxt);
muteImg.src = errorIcon;
errorHeader.textContent= "Something went wrong";
errorMessage.textContent="We couldn't connect to the server (API error). Please try again in a few moments.";
retryTxt.textContent="Retry";
retryImg.src = retryIcon;
serverError.appendChild(muteImg);
serverError.appendChild(errorHeader);
serverError.appendChild(errorMessage);
serverError.appendChild(retryContainer);
serverError.classList.add("hidden");
document.body.appendChild(serverError);

const noResult=document.createElement("div");
noResult.textContent="No search result found";
noResult.classList.add("noResult");
noResult.classList.add("hidden");
document.body.appendChild(noResult);

function serverError401(){
   placeMenu.classList.add("hidden");
   statsMenu.classList.add("hidden");
   weekMenu.classList.add("hidden");
   hoursMenu.classList.add("hidden");
   searchMenu.classList.add("hidden");
   noResult.classList.add("hidden");
   serverError.classList.remove("hidden");
}

function resultNotFound(){
   placeMenu.classList.add("hidden");
   statsMenu.classList.add("hidden");
   weekMenu.classList.add("hidden");
   hoursMenu.classList.add("hidden");
   serverError.classList.add("hidden");
   noResult.classList.remove("hidden");
}
function restoreContainers(){
   placeMenu.classList.remove("hidden");
   statsMenu.classList.remove("hidden");
   weekMenu.classList.remove("hidden");
   hoursMenu.classList.remove("hidden");
   searchMenu.classList.remove("hidden");
   serverError.classList.add("hidden");
   noResult.classList.add("hidden");
}

export{serverError401,resultNotFound,restoreContainers};