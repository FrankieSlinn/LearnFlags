import { flags } from "./flags.js";
console.log("flags", flags);
import { displayPopup, hidePopup } from "./displayHidePopups.js";
import {
  murmurHash3,
  generateRandomNumber,
} from "./randomNumberFromSeed.js";
import{clipboard} from "./clipboard.js";

let flagsCopy = [...flags];
let buttonClasses = [".First", ".Second", ".Third", ".Fourth", ".Fifth"];
let countryButtonClasses = [
  ".firstLabel",
  ".secondLabel",
  ".thirdLabel",
  ".fourthLabel",
  ".fifthLabel",
];
let buttonClicked = 0;
let countryMatchingPredText = [];
let lowerCasePredText = "";
let turns = 0;
let flagsDisplayedInRound = [];
let flag = "";
let flagLow = "";
let correctAnswer = "Congratulations, That Was Correct";
let incorrectAnswer = "Unlucky, That Was Not Correct";
let resetButton = document.querySelector(".reset");
let statistics = document.querySelector(".stats");
let description = document.querySelector(".description");
let starArray = ["star1", "star2", "star3", "star4", "star5"];
let countrySelectedLow = "";
let dailyMode = true;
let arrayDailyFlags = [];
let rightFlag="";
let getTime = document.querySelector(
  ".labelTimer"
).innerHTML = `FLAGL Will Restart in <strong>
  ${23 - new Date().getHours()}</strong> Hours<strong> ${
  60 - new Date().getMinutes()
}
  </strong> Minutes <strong>${60 - new Date().getSeconds()}</strong> Seconds`;
const container = document.querySelector(".container");
const showFlag = document.querySelector(".showFlag");
const countryOptionButtons = document.querySelector(".countryOptionButtons");
const intro = document.querySelector(".intro");
const answer = document.querySelector(".answer");
const feedback = document.querySelector(".feedback");
const practice = document.querySelectorAll(".practice");
const practiceAtResults=document.querySelector(".practiceAtResults")
const labelTimer = document.querySelector(".labelTimer");
const message = document.querySelector(".message");
const flagName = document.querySelector(".flagName");
const instruction = document.querySelector(".instruction");
const finishGameMessage = document.querySelector(".finishGameMessage");
const shareResults = document.querySelector(".shareResults");
const modeButton = document.querySelector(".mode-button");
const dailyGameButton = document.querySelector(".dailyGameButton");
const statsText=document.querySelector(".statsText");
const stars = document.querySelectorAll(".star");
let flagImage = "../Images/flagImageBackground.png";
let crossImage = "../Images/crossImageBackground.png";
let resultsGallery = document.querySelector(".resultsGallery");

console.log("flag, cross images", flagImage, crossImage);


//Changes
/*
-double refresh - Done
-first letter big- Done
-score updates - Done
-Share Result - Done
-Share Result 2 buttons - Done
-advert
-checklayout
-After finish game resets before it's meant to - Done
Sort out same flags not being shown if played before - Possbly Done
-check if using shareResults button changes flag display
*/


//logic
function scrollToTop() {
  window.scrollTo(0, 0);
}
predictiveText();


//Set to default to dailyMode is true
document.addEventListener("DOMContentLoaded", function () {
  console.log("event listenr for load running")
  if(!JSON.parse(localStorage.getItem("gameComplete"))==true && !JSON.parse(localStorage.getItem("arrayDailyFlags"))){
    console.log("after load running event listenr conditions met to populate flag array");
   if(!JSON.parse(localStorage.getItem("turns"))){
    console.log("turns set to zero as they were indicated as null");
    localStorage.setItem("turns", JSON.stringify(0));
    console.log("turns after reset", JSON.parse(localStorage.getItem("turns")));
   };
    populateArrayDailyFlags();



    }
    localStorage.setItem("dailyMode", "true");
    dailyModeChanges();
  
});

//Practice
function practiceModeAfterClick(){
  hidePopup("helpContent");
  localStorage.setItem("dailyMode", JSON.stringify(false));
  console.log("daily mode after switch", JSON.parse(localStorage.getItem("dailyMode")))
   document.body.classList.add("practiceMode");
statistics.innerHTML = `You are in Practice Mode. To play the Daily FLAGL Game with statistics select the button below`;
dailyGameButton.style["display"] = "inline-block";
shareResults.style["display"] = "none";
stars.forEach((star)=>star.style["display"] = "none");
container.style["margin-top"] = "-2rem";
statsText.style["margin-bottom"]="-0.25rem";

handlePracticeMode();
clearAnswer();
 scrollToTop();
}

//switch to practice mode

practice.forEach((button)=>button.addEventListener("click", ()=> {
  practiceModeAfterClick()
}
));


//switch to daily game mode
document.querySelector(".dailyGameButton").addEventListener("click", () => {
  console.log("dailyG game mode button clicked");
dailyModeChanges();
 
  
})

function dailyModeChanges(){
  console.log("Arraydaioyflags", JSON.parse(localStorage.getItem("arrayDailyFlags")))
  let dailyFlagArrayDisplay = JSON.parse(localStorage.getItem("arrayDailyFlags"));
  dailyFlagArrayDisplay.forEach(flag => console.log(flags[flag]));
  localStorage.setItem("dailyMode", JSON.stringify(true));
  let turnsDaily= JSON.parse(localStorage.getItem("turns"));
  localStorage.setItem("flag", JSON.stringify(flags[JSON.parse(localStorage.getItem("arrayDailyFlags"))[turnsDaily]]));
  //console.log("flag", JSON.parse(localStorage.getItem("flag")));
  formatFlagNameToCompare();
  displayFlag();

  console.log("dailyMode after daily game clicked", JSON.parse(localStorage.getItem("dailyMode")))
  clearAnswer();
  hidePopup("statsContent");
  document.body.classList.remove("practiceMode");
 gameStatsDisplay();
  dailyGameButton.style["display"]="none";
  modeButton.style["display"]="inline-block";
  shareResults.style["display"]="inline-block";
  answer.style["display"]="inline-block";
 feedback.style["display"]="none";
 flagName.style["display"]="none";
 hideShareButtons();

  stars.forEach((star)=>star.style["display"]="inline-block");
  stars.forEach((star)=>star.style["margin-top"]="2rem");
  handleNextScreenBasedOnTurn();


}

//Score Variables
let score = 0;
let gameScore = 0;
let countGames = 0;
let averageScore = 0;
let gamesPlayed = numGamesCalc();
let allGameScores = [];

function numGamesCalc() {
  return JSON.parse(localStorage.getItem("allGameScores")) != null
    ? JSON.parse(localStorage.getItem("allGameScores")).length
    : 0;
}

function calcAverageScoreMultiValues() {
  console.log("calcaverage running")
  if (JSON.parse(localStorage.getItem("allGameScores")).length === 1) {
    console.log("length allGameScores is one");
    return JSON.parse(localStorage.getItem("allGameScores"))[0];
  } else if (JSON.parse(localStorage.getItem("allGameScores")).length >= 1)
  {
    console.log("length allgames more than 1");
    let allScores = JSON.parse(localStorage.getItem("allGameScores"));
    return (allScores
      .reduce(
        //add all scores to get tota
        (numa, numb) => numa + numb
      )/allScores.length)
      .toFixed(0);}
}

//Define average score
if (JSON.parse(localStorage.getItem("allGameScores"))) {
  averageScore = calcAverageScoreMultiValues();
} else {
  averageScore = 0;
}

function calculateGameScore() {
  return JSON.parse(localStorage.getItem("score")) * 2;
}

gameScore = JSON.parse(localStorage.getItem("allGameScores"))
  ? //get last score
    JSON.parse(localStorage.getItem("allGameScores"))[
      JSON.parse(localStorage.getItem("allGameScores")).length - 1
    ]
  : 0;

//Populate stats message at beginning of game
gameStatsDisplay();

//called on fifth turn after country selected as wrapup game activity
function updateGameStats() {
  //score when a game is completed expressed as percentage
  console.log("updateGameStats running and scores updated", JSON.parse(localStorage.getItem("scoresUpdated")));
  //below: ensure scores not updated for samegame more than once
  if(JSON.parse(localStorage.getItem("scoresUpdated"))===false||JSON.parse(localStorage.getItem("scoresUpdated"))===null){
    console.log("scores not updated so will concatenate");
  gameScore = Number(JSON.parse(localStorage.getItem("score")) * 2 * 10);
  window.localStorage.setItem("gameScore", JSON.stringify(gameScore));
  defineAndSaveLongGameScore(gameScore);
  averageScore = calcAverageScoreMultiValues();
  window.localStorage.setItem("averageScore", JSON.stringify(averageScore));
  gamesPlayed = numGamesCalc();
  //update statistics in popup
  gameStatsDisplay();
  window.localStorage.setItem("scoresUpdated", JSON.stringify(true));
 
  
}
}
function gameStatsDisplay() {
  if(JSON.parse(localStorage.getItem("dailyMode"))===true){statistics.innerHTML = `Last FLAGL Score: <strong>${gameScore}</strong><br><br>Games: <strong>${gamesPlayed}</strong><br><br>Average Score: <strong>${averageScore}</strong>`}
}
function defineAndSaveLongGameScore(gameScore) {
  console.log("defineAndSaveLongGameScore running")
  allGameScores = JSON.parse(localStorage.getItem("allGameScores"))
    ? JSON.parse(localStorage.getItem("allGameScores")).concat(gameScore)
    : [JSON.parse(localStorage.getItem("gameScore"))];
  window.localStorage.setItem("allGameScores", JSON.stringify(allGameScores));
  console.log("allGameScores", JSON.parse(localStorage.getItem("allGameScores")))
}

//generates 5 random numbers for each day based on UK Julien Date
let fullDate = new Date();

//Today's date split into three values
let year = String(fullDate.getFullYear());
let month = String(fullDate.getMonth() + 1);
let day = String(fullDate.getDate());
//number based on current date which is used as dateInputForSeed
let dateNumberSeed = day + month + year;


console.log("dateNumberSeed now", dateNumberSeed);
let generate_seed = murmurHash3(dateNumberSeed);
let random_number = generateRandomNumber(generate_seed(), generate_seed());
localStorage.setItem("random_number", JSON.stringify(random_number()));//may not be needed?
//console.log(String(dateNumberSeed));

//if new day for English Time handle new game
function automaticNewGame(){
  console.log("automaticNewGame running");
if (
  JSON.parse(localStorage.getItem("dailyMode")) === true &&
  ((String(dateNumberSeed) !==
   String(JSON.parse(localStorage.getItem("dateNumberSeed"))) )
   &&JSON.parse(localStorage.getItem("dateNumberSeed"))!=null
   )||
   JSON.parse(localStorage.getItem("dateNumberSeed"))===null||
    (fullDate.getHours() == 0 &&
      fullDate.getMinutes() == 0 &&
      fullDate.getSeconds() == 0) )
 {
  console.log("Strings for dates are not the same", String(JSON.parse(localStorage.getItem("dateNumberSeed"))) )
  localStorage.setItem("gameComplete", JSON.stringify(false));
  localStorage.setItem("scoresUpdated", JSON.stringify(false));
  localStorage.setItem("dateNumberSeed", dateNumberSeed);
  setNewGameParameters();
  populateArrayDailyFlags();
  startNewGame();
}
}

automaticNewGame();

function handlePracticeMode(){

  console.log("daily mode false")
  newGameDisplayChanges();
  practiceQuizItem();

}
function randomNumberPractice(){
  return Math.abs(Math.floor(Math.random() * (flags.length)-1));
}

//adds flags to the array of 5 flags for that day via random number and set to local storage
function populateArrayDailyFlags() {
  arrayDailyFlags = [];
  console.log("arrayDailyFlags", arrayDailyFlags);
 while (arrayDailyFlags.length<5){
    //random_number needs to be a function to generate number
    let newFlagItem = Math.abs(Math.floor(random_number() * 225));
    if(!arrayDailyFlags.includes(newFlagItem)){
    arrayDailyFlags.push(Math.abs(Math.floor(random_number() * 225)));
    localStorage.setItem("arrayDailyFlags", JSON.stringify(arrayDailyFlags));}
    console.log("arrayDailyFlags after population", JSON.parse(localStorage.getItem("arrayDailyFlags")))
  }
  console.log("array daily flags", JSON.parse(localStorage.getItem("arrayDailyFlags")).forEach((flag)=> flags[flag]))
}
//set up parameters for new game to local storage
function setNewGameParameters() {
  if (JSON.parse(localStorage.getItem("dailyMode")) === true) {
    const parameters = {
      firstTurn: false,
      countrySelected: false,
      turns: 0,
      score: 0,
      flagsShownToday: false,
      dateNumberSeed: dateNumberSeed,
    };

    for (const key in parameters) {
      localStorage.setItem(key, JSON.stringify(parameters[key]));
    }
  }
}

//ensure completedFlagsRound messages show up at the end
const fourTurnsCompleted = JSON.parse(localStorage.getItem("turns")) >= 4;
const guessSubmitted = JSON.parse(localStorage.getItem("countrySelected"));

if (
  //fifth turn completed
  fourTurnsCompleted &&
  guessSubmitted === true
  && JSON.parse(localStorage.getItem("dailyMode"))===true&&JSON.parse(localStorage.getItem("gameComplete"))==false
) {
  console.log("fifth turn completed, turns is 4", fourTurnsCompleted, "countrySelected", guessSubmitted);
  //finish up activites
  starFill();
  completedFlagsRound();
} else if (
  //fifth turn pending
  fourTurnsCompleted &&
  !guessSubmitted===true
) {
  console.log("start fifth turn");
  //start the fifth turn
  newQuizItem();
}
//populate stars
starFill();

//ensure that the correct screen is shown with the right score
if (JSON.parse(localStorage.getItem("turns")) <= "3" && JSON.parse(localStorage.getItem("dailyMode"))===true) {
  newQuizItem();
}
//display Timer
const displayTimer = function () {
 if(JSON.parse(localStorage.getItem("turns") <4)) {localStorage.setItem("countrySelected", JSON.stringify(true))};
  //date is current date
  let date = new Date();
  //showTimer
  labelTimer.style["visibility"] = "visible";
};


//run timer function every second so that it will count down
setInterval(displayTimer, 1000);

//if score wrong, reset.
//score and turns should never be over five. If this happens set back to first turn / score as a safety measure.
if (
  JSON.parse(localStorage.getItem("score") > 5) ||
  JSON.parse(localStorage.getItem("turns") > 5)
) {
  console.log("socres / turns above 5");
  localStorage.setItem("score", JSON.stringify(0));
  localStorage.setItem("turns", JSON.stringify(0));
  console.log(JSON.parse(localStorage.getItem("turns") ));
}

//handle changes after first four turns
function first4Turns() {
  console.log("first4turns running")
  //reset country chosen
  buttonClicked = 0;
  if(JSON.parse(localStorage.getItem("countrySelected")) ===true){

    displayChangesAfterTurn();
  }
}

function getCountryForFeedbackDisplay() {
  console.log("getCountryForFeedbackDisplay running")
  console.log("country Select3ed", JSON.parse(localStorage.getItem("countrySelected")) )
  //get flag to be displayed from the number of turns. Using that number to retrieve the flag from the array

  if(JSON.parse(localStorage.getItem("dailyMode"))===true){ rightFlag =
    flags[
      JSON.parse(
        JSON.parse(localStorage.getItem("arrayDailyFlags"))[
          JSON.parse(localStorage.getItem("turns"))
        ]
      )
    ];}
    else{
      rightFlag=JSON.parse(localStorage.getItem("flag"))
      console.log("rightFlag in function", rightFlag)
    }
  console.log("rightFlag", rightFlag);
  flagName.innerHTML = `The Answer Is <strong>${rightFlag}</strong>`;

}
function getAnswerFeedback() {
  JSON.parse(localStorage.getItem("isCorrect")) === true
    ? (feedback.innerHTML = `${correctAnswer}`)
    : (feedback.innerHTML = `${incorrectAnswer}`);
}
function increaseTurns(){
  console.log("function increase turns running");
  let turns = JSON.parse(localStorage.getItem("turns"));
  if(turns<4){
  let turns1 = (turns += 1);

  console.log("turns after turn", turns1)
  //set incremented number of turns
  localStorage.setItem("turns", JSON.stringify(turns1));

}


}

function displayChangesAfterTurn() {
  console.log("displaychangesAfterTurn running")
  getCountryForFeedbackDisplay();
  countryOptionButtons.style["display"] = "none";
  resetButton.style["display"] = "inline-block";
  resetButton.innerHTML =
    '<button type = button class = "newFlag">Have Another Go</button>';
  intro.style["display"] = "none";
  answer.style["display"] = "none";
  answer.value = "";
  getAnswerFeedback();
}

function getFinishGameMessage() {
  if (JSON.parse(localStorage.getItem("score")) === 5) {
    finishGameMessage.innerHTML = "Congratulations, Your FLAGL Score Is 100%!";
  }
  if (1 <= JSON.parse(localStorage.getItem("score")) <= 4) {
    finishGameMessage.innerHTML = `Your FLAGL Score Is ${calculateGameScore()}0%`;
  }
  if (JSON.parse(localStorage.getItem("score")) === 0) {
    finishGameMessage.innerHTML = `Better Luck Next Time, Your FLAGL Score is 0%`;
  }
  finishGameMessage.style["display"] = "inline-block";
}

function getFlagName() {
  flagName.innerHTML = `The answer is <strong>${JSON.parse(
    localStorage.getItem("flag")
  )}</strong>`;
  flagName.style["display"] = "inline-block";
}

function completedFlagsRoundDisplayChanges() {
  document.querySelectorAll(".share").forEach((item) => {
    item.style["display"] = "inline-block";
  });
  container.style["visibility"] = "visible";
  showFlag.style["display"] = "none";
  resetButton.style["display"] = "none";
  answer.style["display"] = "none";
  intro.style["display"] = "none";
  countryOptionButtons.style["display"] = "none";
  instruction.style["display"] = "none";
  feedback.style["display"] = "inline-block";
  practiceAtResults.style["display"] = "inline-block";
  labelTimer.style["display"] = "inline-block";


}

function completedFlagsRound() {

  console.log("completedFlagsRound started");
  localStorage.setItem("countrySelected", JSON.stringify(true));
  localStorage.setItem("gameComplete", JSON.stringify(true));

 
  getFlagName();
  completedFlagsRoundDisplayChanges();
  getAnswerFeedback();
  getFinishGameMessage();
  updateGameStats();

}

function starFill() {
  //check that score is valid for star fill
  if (
    JSON.parse(localStorage.getItem("score")) !== "0" &&
    JSON.parse(localStorage.getItem("score")) <= "5"
  ) {
    //ensure filled stars match the score
    for (
      let starNum = 0;
      starNum <= JSON.parse(localStorage.getItem("score")) - 1;
      starNum++
    ) {
      document.getElementById(`${starArray[starNum]}`).style["fill"] = "yellow";
    }
  }
  allStarsNotFilledIfReset();
}
function allStarsNotFilledIfReset() {
  if (JSON.parse(localStorage.getItem("score")) === "0") {
    const allStars = document.querySelectorAll(".star");
    allStars.forEach((star) => (star.style.fill = "white"));
  }
}

//listener for display new flag
resetButton.addEventListener("click", function () {

  console.log("display new flag = change name?");
 if(JSON.parse(localStorage.getItem("dailyMode"))===true){ startAgain()}else{handlePracticeMode()};
});

function displayFlagScreen() {
  countryOptionButtons.style["display"] = "none";
  finishGameMessage.style["display"] = "none";
  intro.style["display"] = "inline-block";
  feedback.style["display"] = "none";
  labelTimer.style["display"] = "none";
  flagName.style["display"] = "none";
  practiceAtResults.style["display"] = "none"
  resetButton.style["display"] = "none";
  answer.style["display"] = "inline-block";
  showFlag.style["display"] = "inline-block";
  showFlag.style["visibility"] = "visible";
  message.style["visibility"] = "visible";
  answer.style["visibility"] = "visible";
  instruction.style["display"] = "inline-block";
  intro.innerHTML = "<br>Type and Select a Country or Territory";
  instruction.innerHTML =
    "Which Country or Territory Does this Flag Belong to?";
  hideShareButtons();
}

function getPracticeFlagName(){
  console.log("getPracticeFlagName running")
  flag = String(flags[randomNumberPractice()]);
  console.log("practiceFlag", flag)
  localStorage.setItem("flag", JSON.stringify(flag));

}

function formatFlagNameToCompare() {
  flagLow = JSON.parse(localStorage.getItem("flag")).toLowerCase();
  console.log("flagLow", flagLow)
  let flagWithUnderscore = JSON.parse(localStorage.getItem("flag")).replaceAll(
    " ",
    "_"
  );
  localStorage.setItem(
    "flagWithUnderscore",
    JSON.stringify(flagWithUnderscore)
  );
}
function practiceQuizItem(){
  console.log("practiceQuizItem function running")
  //empties array of countries selected for predictive text
  countryMatchingPredText = [];
  // localStorage.setItem("countrySelected", JSON.stringify(false));
  getPracticeFlagName();
    //formats flag name to lower case removes underscores for comparison
    formatFlagNameToCompare();
    displayFlag();
    predictiveText();
     //changes for screen when new flag displayed
  displayFlagScreen();
}


function newQuizItem() {
  hideShareButtons();
  console.log("next quiz item running")
  countryMatchingPredText = [];
  //resets quiz item
  if(JSON.parse(localStorage.getItem("gameComplete"))===true){localStorage.setItem("countrySelected", JSON.stringify(false))}else{
    localStorage.setItem("countrySelected", JSON.stringify(true))}
  
  //places country name into array of flags displayed in round
  placeFlagNameIntoflagsDisplayedInRound();
  //formats flag name to lower case removes underscores for comparison
  formatFlagNameToCompare();
  //gets flag image and sets html for flag display
  displayFlag();
  //carries out filtering based on input text
  predictiveText();
}

function placeFlagNameIntoflagsDisplayedInRound() {
  //generate flag one by one today
  //find current flag name
  if(JSON.parse(localStorage.getItem("turns"))){
  let turns = JSON.parse(localStorage.getItem("turns"))}
  else{turns = 0;
    localStorage.setItem("turns", JSON.stringify(turns))}

  let getFlag =
    flags[JSON.parse(localStorage.getItem("arrayDailyFlags"))[JSON.parse(localStorage.getItem("turns"))]];
  //put current flag name into local storage
  localStorage.setItem("flag", JSON.stringify(getFlag));
  //check right amount of turns(shouldn't exceed 4)
  if (JSON.parse(localStorage.getItem("turns")) <= 4) {
    //put flag in array of all flags displayed in round so this can be added to total flags array after
    //so no flag goes missing after a round
    flagsDisplayedInRound.push(JSON.parse(localStorage.getItem("flag")));
  }
  console.log("flagsDisplayedInRound: ", flagsDisplayedInRound);
}
//get HTML for flag display
function displayFlag() {
  if (!JSON.parse(localStorage.getItem("gameComplete"))==true||!JSON.parse(localStorage.getItem("dailyMode"))==true) {
    //changes for screen when new flag displayed
    displayFlagScreen();
  let imageHTML =
    "<img src = ../Images/" +
    JSON.parse(localStorage.getItem("flagWithUnderscore")) +
    '.png  style="width:400px;height:250px;">';
  showFlag.innerHTML = imageHTML;
  showFlag.style["display"] = "inline-block";
  console.log("displayFlag running")
  localStorage.setItem("countrySelected", JSON.stringify(false));}
  // preventScoreUpdate();}
 
}
function preventScoreUpdate(){
   //Ensure scores not updated more than once
   if(dailyMode===true){
    localStorage.setItem("scoresUpdated", JSON.stringify(false));
  }

}



function predictiveText() {
 
  //listener for when a user types a letter
  answer.addEventListener("keyup", function (e) {
    answer.value = answer.value[0].toUpperCase().concat(answer.value.slice(1))
 
     console.log("answer displayed", answer.value[0].toUpperCase());
    //ensures country buttons are displayed
    countryOptionButtons.style["display"] = "inline";
    //get input text in lower case
    let lowerCasePredText = String(
      document.querySelector(".answer").value
    ).toLowerCase();
    //If predictive text matches add country to  countryMatchingPredText array
    ifPredTextMatchesCountryAddToArray(lowerCasePredText);
    //if input text is equal to those letters in a country return that country in next filter function
    countryMatchingPredText = countryMatchingPredText.filter((item) =>
      matchLowerCasePredTextToCountryInArray(item, lowerCasePredText)
    );
    console.log("countryMatchingPredText: " + countryMatchingPredText);
    defineButtonText();
  });
}
//checks if text typed matches country for filtering
function matchLowerCasePredTextToCountryInArray(
  predictedCountry,
  lowerCasePredText
) {
  if (
    lowerCasePredText ===
    String(predictedCountry.slice(0, lowerCasePredText.length)).toLowerCase()
  ) {
    return predictedCountry;
  }
}

function ifPredTextMatchesCountryAddToArray(lowerCasePredText) {
  //flagsCopy used to ensure all answer options stay(no flag was removed from list).
  //To avoid duplicates a country is removed from array "flags" after displayed.
  console.log(
    "lowerCasePredText).toLowerCase() ",
    lowerCasePredText.toLowerCase()
  );
  for (let i = 0; i < flagsCopy.length; i++) {
    if (
      //if predictive text is typed equals the beginning of a country
      //slice used to ensure equal number of characters are compared
      String(lowerCasePredText).length > 0 &&
      String(lowerCasePredText) ===
        String(flagsCopy[i].slice(0, lowerCasePredText.length)).toLowerCase()
    ) {
      //First check that country isn't already included in the array from which predictive text is generated
      if (!countryMatchingPredText.includes(flagsCopy[i])) {
        //push countries that share letters into the array
        console.log("flag to be inserted in matching countries", flagsCopy[i]);
        countryMatchingPredText.push(flagsCopy[i]);
        console.log("countryMatchingPredText", countryMatchingPredText);
      }
    }
  }
}

//event listener for country button clicked
submitValue();

function defineButtonText() {
  //for each predictive text button listen if pressed
  for (
    let buttonNum = 0;
    buttonNum < countryButtonClasses.length;
    buttonNum++
  ) {
    //button element is each of the button classes
    const buttonElement = document.querySelector(
      countryButtonClasses[buttonNum]
    );
    if (buttonElement) {
      buttonElement.style["visibility"] = "visible";
      //if a country matching the input text exists populate the country name on the button
      if (countryMatchingPredText[buttonNum]) {
        buttonElement.innerHTML = `${countryMatchingPredText[buttonNum]}`;
        buttonElement.style["display"] = "inline-block";
      } else {
        buttonElement.style["display"] = "none";
      }
    }
  }
}

//event listener for the country button that is clicked
//passes the button numebr that is clicked to the next function
function submitValue() {
  for (let i = 0; i < buttonClasses.length; i++) {
    document
      .querySelector(buttonClasses[i])
      .addEventListener("click", function () {
        buttonClicked = i;
        processAnswerSubmission();
        if(JSON.parse(localStorage.getItem("dailyMode"))===true) {
        increaseTurns()};
      });
  }
}

function processAnswerSubmission() {
  //flag for going to the answer screen
  localStorage.setItem("countrySelected", JSON.stringify(true));
  //get name for selected country
  let countrySelectedName = document.querySelector(
    countryButtonClasses[buttonClicked]
  ).innerHTML;
  resetQuizParameters(countrySelectedName);
  feedbackScreenLayout();
  whichFeedbackScreen();
}
function resetQuizParameters(countrySelectedName) {
  countrySelectedLow = countrySelectedName.toLowerCase();
  countrySelectedName = "";
  document.querySelector(countryButtonClasses[buttonClicked]).innerHTML == "";
  //empty array of countries that match predictive text
  countryMatchingPredText = [];
}

function feedbackScreenLayout() {
  if (turns < 4) {
    answer.style["visibility"] = "visible";
    flagName.style["visibility"] = "visible";
    showFlag.style["display"] = "none";
    instruction.style["display"] = "none";
    countryOptionButtons.style["display"] = "none";
    flagName.style["display"] = "inline-block";
    feedback.style["display"] = "inline-block";
  }
}

//flagImage.png
//crossImage.png
//../Images/"
function whichFeedbackScreen() {
  //if input matches the right answer
  console.log("countrySelectedLow, flagLow", countrySelectedLow, flagLow);
  if(JSON.parse(localStorage.getItem("shareResultsArray"))){
    
    console.log("getShareResultsArray exists in local storage");
    let getShareResultsArray = JSON.parse(localStorage.getItem("shareResultsArray"))
    console.log("getShareResultsArray exists in local storage", getShareResultsArray);}
  if (countrySelectedLow === String(flagLow)) {
    console.log("countrySelected matches flagLow", countrySelectedLow === String(flagLow))
    localStorage.setItem("isCorrect", JSON.stringify(true));
    localStorage.setItem("isIncorrect", JSON.stringify(false));
    resetInputParameters();
   if(JSON.parse(localStorage.getItem("dailyMode"))===true) {incrementScore();
    starFill();
   }
   if (!localStorage.getItem("shareResultsArray")) {
    // Initialize localStorage with an array containing "flag"
    console.log("getShareResultsArrayi not initiated /correct answer", JSON.parse(localStorage.getItem("shareResultsArray")))

    //console.log("flagImage", flagImage);
    localStorage.setItem("shareResultsArray", JSON.stringify([flagImage]));
}
else{
 // console.log("getShareResultsArrayinElse", getShareResultsArray)
 let updateShareResultsArray = JSON.parse(localStorage.getItem("shareResultsArray")).concat(flagImage);
 console.log('updateShareResultsArray', updateShareResultsArray);
 localStorage.setItem("shareResultsArray", JSON.stringify(updateShareResultsArray));
 updateShareResultsArray = '';


}

console.log("shareResultsArray", JSON.parse(localStorage.getItem("shareResultsArray")));

    
  } else {
    console.log("wrong answer in which FeedbackScreen")
    localStorage.setItem("isIncorrect", JSON.stringify(true));
    localStorage.setItem("isCorrect", JSON.stringify(false));
    if (!localStorage.getItem("shareResultsArray")) {
      console.log("no shareresultsarray found")
      // Initialize localStorage with an array containing "flag"
      localStorage.setItem("shareResultsArray", JSON.stringify([crossImage]));
  }


  else{
    console.log("getShareResultsArrayinElse Incorrect answer", JSON.parse(localStorage.getItem("shareResultsArray")))
    let updateShareResultsArray = JSON.parse(localStorage.getItem("shareResultsArray")).concat(crossImage);
    console.log('updateShareResultsArray', updateShareResultsArray);
    localStorage.setItem("shareResultsArray", JSON.stringify(updateShareResultsArray));
    updateShareResultsArray = '';
  
  }
  
    resetInputParameters();
  }

 if(JSON.parse(localStorage.getItem("dailyMode"))===true) {handleNextScreenBasedOnTurn();
}else{
  console.log("as practice mode going straight to first4Turns"); 
  first4Turns()}
}


function incrementScore() {
  score = JSON.parse(localStorage.getItem("score"));
  const score1 = (score += 1);
  localStorage.setItem("score", JSON.stringify(score1));
}
//determines screen based on the turn
function handleNextScreenBasedOnTurn() {
  console.log("handleNextScreenBasedonTurns running")
  if (JSON.parse(localStorage.getItem("turns")) < 4) {
    console.log("fewer than 4 turns")
    first4Turns();
  } else if (
    JSON.parse(localStorage.getItem("turns")) === 4 &&
    JSON.parse(localStorage.getItem("countrySelected")) === true||JSON.parse(localStorage.getItem("gameComplete")) === true
  ) {
    console.log("game completion screen running")
    completedFlagsRound();
  }
}

function resetInputParameters() {
  buttonClicked = 0;
  countrySelectedLow = "";
}

/****Played 5 Games****/

//After the user completed 5 rounds see overall score

function gameWrapup() {
  localStorage.setItem("score", JSON.stringify(0));
  let emptyArray = [];
  localStorage.setItem('shareResultsArray', JSON.stringify(emptyArray));
  starFill();
}
//displays new flag
function startAgain() {
  container.style["opacity"] = "100";
  clearAnswer();
  resetButton.style["display"] = "none";
  message.innerHTML = "";
  newQuizItem();
}

function clearAnswer(){
  console.log("clearAnswer running")
  answer.innerHTML = "";
  answer.value = "";
}

//starts new game from scratch
function startNewGame() {
  gameWrapup();
  //get flags to original length
  flags.push(...flagsDisplayedInRound);
  flagsDisplayedInRound = [];
  newGameDisplayChanges();
  starFill();
  newQuizItem();

}

function newGameDisplayChanges() {
  hideShareButtons();
  container.style["opacity"] = "100";
  container.style["visibility"] = "visible";
  resetButton.style["display"] = "none";
  finishGameMessage.style["display"] = "none";
  labelTimer.style["display"] = "none";
  instruction.innerHTML = "Which country does this flag belong to?";
  message.innerHTML = "";
}

//Do not display share buttons
function hideShareButtons(){
document.querySelectorAll(".share").forEach((item) => {
  item.style["display"] = "none";
});
}

/*****Stats Popup*****/

//Show Popup Content - Stats
document.querySelector(".stat-icon").addEventListener("click", function () {
  displayPopup("helpContent", "statsContent");
});

//Close Button - Stats
document
  .querySelector(".closeButtonStats")
  .addEventListener("click", function () {
    hidePopup("statsContent");
  });

//Show Popup Content - Help
document.querySelector(".how-to").addEventListener("click", function () {
  displayPopup("statsContent", "helpContent");
});

//Close Button - Help
document
  .querySelector(".closeButtonHelp")
  .addEventListener("click", function () {
    hidePopup("helpContent");
  });

  /*****Copy Results to Clipboard*****/
  //funciton in clipboard.js folder

  clipboard();


