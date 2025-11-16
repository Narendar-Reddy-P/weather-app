
import errorIcon from '../assets/images/icon-error.svg';
import retryIcon from '../assets/images/icon-retry.svg';

//status 404
let containers=[
   document.querySelector("#placeMenu"),
   document.querySelector("#statsMenu"),
   document.querySelector("#weekMenu"),
   document.querySelector("#hoursMenu"),
   document.querySelector("#searchMenu"),
]

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
noResult.classList.add("noResult");
noResult.classList.add("hidden");
document.body.appendChild(noResult);


function serverError401(){
   for(let i=0;i<5;i++){
      containers[i].classList.add("hidden");
   }
   noResult.classList.add("hidden");
   serverError.classList.remove("hidden");
}

function resultNotFound(){
   noResult.textContent="No search result found";
   for(let i=0;i<4;i++){
      containers[i].classList.add("hidden");
   }
   serverError.classList.add("hidden");
   noResult.classList.remove("hidden");
}
function enterValidName(){
   noResult.textContent="Enter any place name";
   for(let i=0;i<4;i++){
      containers[i].classList.add("hidden");
   }
   serverError.classList.add("hidden");
   noResult.classList.remove("hidden");
}
function restoreContainers(){
   for(let i=0;i<5;i++){
      containers[i].classList.remove("hidden");
   }
   serverError.classList.add("hidden");
   noResult.classList.add("hidden");
}

export{serverError401,resultNotFound,restoreContainers,enterValidName};