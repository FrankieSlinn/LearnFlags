/*****Imports*****/

import { flags } from "./flags.js";
import { displayPopup, hidePopup } from "./displayHidePopups.js";
import { starFill } from "./starFillFunctions.js";
import { murmurHash3, generateRandomNumber } from "./randomNumberFromSeed.js";
import { placeFlagNameIntoflagsDisplayedInRound } from "./flagNames.js";
import {
  predictiveText,
  countryMatchingPredTextEmpty,
} from "./predictiveTextFunctions.js";
import {
  defineAverageScore,
  calculateGameScore,
  updateGameStats,
  incrementScore,
  gameStatsDisplay,
} from "./scoreStatistics.js";
import {
  practiceModeAfterClick,
  dailyModeChanges,
  handlePracticeMode,
} from "./dailyAndPracticeFunctions.js";
import { clipboard } from "./clipboard.js";

/*****Variables******/

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
let turns = 0;
let flagsDisplayedInRound = [];
let flag = "";
let flagLow = "";
let correctAnswer = "Congratulations, That Was Correct";
let incorrectAnswer = "Unlucky, That Was Not Correct";
let resetButton = document.querySelector(".reset");
let countrySelectedLow = "";
let arrayDailyFlags = [];
let rightFlag = "";
const container = document.querySelector(".container");
const showFlag = document.querySelector(".showFlag");
const countryOptionButtons = document.querySelector(".countryOptionButtons");
const intro = document.querySelector(".intro");
let isCorrect;
const answer = document.querySelector(".answer");
const feedback = document.querySelector(".feedback");
const practice = document.querySelectorAll(".practice");
const practiceAtResults = document.querySelector(".practiceAtResults");
const labelTimer = document.querySelector(".labelTimer");
const message = document.querySelector(".message");
const flagName = document.querySelector(".flagName");
const instruction = document.querySelector(".instruction");
const finishGameMessage = document.querySelector(".finishGameMessage");
const shareResults = document.querySelector(".shareResults");
const dailyGameButton = document.querySelector(".dailyGameButton");
let flagImage = "../Images/flagImageBackground.png";
let crossImage = "../Images/crossImageBackground.png";
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

//Changes
/*

Sort Out

-Get rid of extra character in mobile
-Make sure results can be copied in mobile

-Firefox display - Done
-Mobile display - Done
-Practice display(chrome, Firefox, mobile) - Done
-Make stats(with / without sharebutton adaptive) - Done
-Check popup display - Done
-mobile make sure after load goes to top

Testing
-Make sure to test after delete history
-Ensure switch between practice and daily - Done


-advert - Done
-After finish game resets before it's meant to - Done
Sort out same flags not being shown if played before - Possbly Done

Before Live
-Delete console items showing flag name - Done
-Set FLAGL Day to one


-User Testing - Done


*/

/*****New Game Activity*****/

//Make sure FLAGL Opens with top displayed
function scrollToTop() {
  window.scrollTo(0, 0);
}

//ensure predictive Text runs
predictiveText();

//game starts - Ensure defaults set. Set to default to dailyMode is true, populate flag array, set turns to null.
document.addEventListener("DOMContentLoaded", function () {
  console.log("event listenr for load running");
  if (
    !JSON.parse(localStorage.getItem("gameComplete")) == true &&
    !JSON.parse(localStorage.getItem("arrayDailyFlags"))
  ) {
    console.log(
      "after load running event listenr conditions met to populate flag array"
    );
    setTurnstoZero();
    populateArrayDailyFlags();
  }
  localStorage.setItem("dailyMode", "true");
  dailyModeChanges();
});

//if new day for English Time handle new game
function automaticNewGame() {
  console.log("automaticNewGame running");
  //Check if the day is different to the day last played or if the user is playing the game for the first time
  if (
    (JSON.parse(localStorage.getItem("dailyMode")) === true &&
      String(dateNumberSeed) !==
        String(JSON.parse(localStorage.getItem("dateNumberSeed"))) &&
      JSON.parse(localStorage.getItem("dateNumberSeed")) != null) ||
    JSON.parse(localStorage.getItem("dateNumberSeed")) === null ||
    (fullDate.getHours() == 0 &&
      fullDate.getMinutes() == 0 &&
      fullDate.getSeconds() == 0)
  ) {
    console.log(
      "Strings for dates are not the same",
      String(JSON.parse(localStorage.getItem("dateNumberSeed")))
    );
    //Trigger a new daily game
    localStorage.setItem("gameComplete", JSON.stringify(false));
    localStorage.setItem("scoresUpdated", JSON.stringify(false));
    localStorage.setItem("dateNumberSeed", dateNumberSeed);
    setNewGameParameters();
    populateArrayDailyFlags();
    startNewGame();
  }
}

automaticNewGame();

//Generates random numbers that can be used in practice mode
function randomNumberPractice() {
  return Math.abs(Math.floor(Math.random() * flags.length - 1));
}
//adds flags to the array of 5 flags for that day via random number and set to local storage
function populateArrayDailyFlags() {
  console.log("populateArrayDailyFlags running")
  arrayDailyFlags = [];
  console.log("arrayDailyFlags", arrayDailyFlags);
  while (arrayDailyFlags.length < 5) {
    //random_number needs to be a function to generate number
generateNewFlagsToPopulateArrayDailyFlags();
if(arrayDailyFlags.length===4){
  newFlagItem = null;
  generateNewFlagsToPopulateArrayDailyFlags();

    }
  }
  console.log(
    "array daily flags after generated in populateArrayDailyFlags",
    JSON.parse(localStorage.getItem("arrayDailyFlags")).forEach(
      (flag) => flags[flag]
    )
  );
}

function generateNewFlagsToPopulateArrayDailyFlags(){
  while (arrayDailyFlags.length < 5) {
  let newFlagItem = Math.abs(Math.floor(random_number() * 225));
  console.log("newFlagItem", newFlagItem);
    if (!arrayDailyFlags.includes(newFlagItem)) {
      console.log("not duplicate item")
      arrayDailyFlags.push(newFlagItem);
      localStorage.setItem("arrayDailyFlags", JSON.stringify(arrayDailyFlags));
    }
  }
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

//Makes sure if the user has never played the game the turns will start as zero
function setTurnstoZero() {
  if (!JSON.parse(localStorage.getItem("turns"))) {
    console.log("turns set to zero as they were indicated as null");
    localStorage.setItem("turns", JSON.stringify(0));
    console.log("turns after reset", JSON.parse(localStorage.getItem("turns")));
  }
}

/*****Mode Switches*****/

//switch to daily game mode
document.querySelector(".dailyGameButton").addEventListener("click", () => {
  console.log("dailyG game mode button clicked");
  dailyModeChanges();
});

//switch to practice mode

practice.forEach((button) =>
  button.addEventListener("click", () => {
    practiceModeAfterClick();
  })
);

/*****Stats Functions*****/

//if score wrong, reset.
//score and turns should never be over five. If this happens set back to first turn / score as a safety measure.
if (
  JSON.parse(localStorage.getItem("score") > 5) ||
  JSON.parse(localStorage.getItem("turns") > 5)
) {
  console.log("socres / turns above 5");
  localStorage.setItem("score", JSON.stringify(0));
  localStorage.setItem("turns", JSON.stringify(0));
  console.log(JSON.parse(localStorage.getItem("turns")));
}

defineAverageScore();
//Populate stats message at beginning of game
gameStatsDisplay();

//localStorage.setItem("random_number", JSON.stringify(random_number())); //may not be needed?

/*****Timer Function*****/
//display Timer
const displayTimer = function () {
  checkNoPrematureFinish();
  //date is current date
  let date = new Date();
  //showTimer
  labelTimer.style["visibility"] = "visible";
  //Text displayed in labelTimer element counting down to next game
  document.querySelector(
    ".labelTimer"
  ).innerHTML = `FLAGL Will Restart in <strong>
  ${23 - new Date().getHours()}</strong> Hours<strong> ${
    60 - new Date().getMinutes()
  }
  </strong> Minutes <strong>${60 - new Date().getSeconds()}</strong> Seconds`;
};

//run timer function every second so that it will count down
setInterval(displayTimer, 1000);

/*****Game Flow*****/

/**New Game**/

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
function hideShareButtons() {
  document.querySelectorAll(".share").forEach((item) => {
    item.style["display"] = "none";
  });
}

/**New Quiz Items**/

function practiceQuizItem() {
  console.log("practiceQuizItem function running");
  //empties array of countries selected for predictive text
  countryMatchingPredTextEmpty();
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
  console.log("next quiz item running");
  countryMatchingPredTextEmpty();
  //resets quiz item
  if (JSON.parse(localStorage.getItem("gameComplete")) === true) {
    localStorage.setItem("countrySelected", JSON.stringify(false));
  } else {
    localStorage.setItem("countrySelected", JSON.stringify(true));
  }
  //places country name into array of flags displayed in round
  placeFlagNameIntoflagsDisplayedInRound();
  //formats flag name to lower case removes underscores for comparison
  formatFlagNameToCompare();
  //gets flag image and sets html for flag display
  displayFlag();
  //carries out filtering based on input text
  predictiveText();
}

/**Turns**/

//determines screen based on the turn
function handleNextScreenBasedOnTurn() {
  console.log("handleNextScreenBasedonTurns running");
  if (JSON.parse(localStorage.getItem("turns")) < 4) {
    console.log("fewer than 4 turns");
    first4Turns();
  } else if (
    (JSON.parse(localStorage.getItem("turns")) === 4 &&
      JSON.parse(localStorage.getItem("countrySelected")) === true) ||
    JSON.parse(localStorage.getItem("gameComplete")) === true
  ) {
    console.log("game completion screen running");
    completedFlagsRound();
  }
}

//handle changes after first four turns
function first4Turns() {
  console.log("first4turns running");
  //reset country chosen
  buttonClicked = 0;
  if (JSON.parse(localStorage.getItem("countrySelected")) === true) {
    displayChangesAfterTurn();
  }
}

//ensure completedFlagsRound messages show up at the end
const fourTurnsCompleted = JSON.parse(localStorage.getItem("turns")) >= 4;
const guessSubmitted = JSON.parse(localStorage.getItem("countrySelected"));
//check fifth turn completed
if (
  fourTurnsCompleted &&
  guessSubmitted === true &&
  JSON.parse(localStorage.getItem("dailyMode")) === true &&
  JSON.parse(localStorage.getItem("gameComplete")) == false
) {
  //if turns is 4 and game complete go to game completion actions
  console.log(
    "fifth turn completed, turns is 4",
    fourTurnsCompleted,
    "countrySelected",
    guessSubmitted
  );
  //finish up activites
  starFill();
  completedFlagsRound();
} else if (
  //if iturns is 4 but game incomplete start the fifth turn
  fourTurnsCompleted &&
  !guessSubmitted === true
) {
  console.log("start fifth turn");
  //start the fifth turn
  newQuizItem();
}

//populate stars
starFill();

//ensure that the correct screen is shown if turns fewer than or equal to three
if (
  JSON.parse(localStorage.getItem("turns")) <= "3" &&
  JSON.parse(localStorage.getItem("dailyMode")) === true
) {
  newQuizItem();
}

//If countrySelected is true, won't go to end screen. Done every second ot ensure current.
function checkNoPrematureFinish() {
  if (JSON.parse(localStorage.getItem("turns") < 4)) {
    localStorage.setItem("countrySelected", JSON.stringify(true));
  }
}

//Where the number of turns is under 4 add a turn
function increaseTurns() {
  console.log("function increase turns running");
  let turns = JSON.parse(localStorage.getItem("turns"));
  if (turns < 4) {
    let turns1 = (turns += 1);
    console.log("turns after turn", turns1);
    //set incremented number of turns
    localStorage.setItem("turns", JSON.stringify(turns1));
  }
}

function displayChangesAfterTurn() {
  console.log("displaychangesAfterTurn running");
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

/**Submission Flow**/

//event listener for country button clicked
submitValue();

//event listener for the country button that is clicked
//passes the button numebr that is clicked to the next function
function submitValue() {
  for (let i = 0; i < buttonClasses.length; i++) {
    document
      .querySelector(buttonClasses[i])
      .addEventListener("click", function () {
        buttonClicked = i;
        processAnswerSubmission();
        if (JSON.parse(localStorage.getItem("dailyMode")) === true) {
          increaseTurns();
        }
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
  countryMatchingPredTextEmpty();
}

/*****Flag Functions*****/

//listener for display new flag
resetButton.addEventListener("click", function () {
  console.log("display new flag = change name?");
  if (JSON.parse(localStorage.getItem("dailyMode")) === true) {
    startAgain();
  } else {
    handlePracticeMode();
  }
});

//get HTML for flag display
function displayFlag() {
  if (
    !JSON.parse(localStorage.getItem("gameComplete")) == true ||
    !JSON.parse(localStorage.getItem("dailyMode")) == true
  ) {
    //changes for screen when new flag displayed
    displayFlagScreen();
    let imageHTML =
      "<img src='../Images/" +
  JSON.parse(localStorage.getItem("flagWithUnderscore")) +
  ".png' class='displayedFlagImage' ;'>";
    showFlag.innerHTML = imageHTML;
    showFlag.style["display"] = "inline-block";
    console.log("displayFlag running");
    localStorage.setItem("countrySelected", JSON.stringify(false));
  }
}

function displayFlagScreen() {
  countryOptionButtons.style["display"] = "none";
  finishGameMessage.style["display"] = "none";
  intro.style["display"] = "inline-block";
  feedback.style["display"] = "none";
  labelTimer.style["display"] = "none";
  flagName.style["display"] = "none";
  practiceAtResults.style["display"] = "none";
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

function getPracticeFlagName() {
  console.log("getPracticeFlagName running");
  flag = String(flags[randomNumberPractice()]);
  console.log("practiceFlag", flag);
  localStorage.setItem("flag", JSON.stringify(flag));
}

function formatFlagNameToCompare() {
  flagLow = JSON.parse(localStorage.getItem("flag")).toLowerCase();
  //console.log("flagLow", flagLow);
  let flagWithUnderscore = JSON.parse(localStorage.getItem("flag")).replaceAll(
    " ",
    "_"
  );
  localStorage.setItem(
    "flagWithUnderscore",
    JSON.stringify(flagWithUnderscore)
  );
}

/*****Feedback Functions*****/

//The name of the correct flag will appear in the feedback message
function getCountryForFeedbackDisplay() {
  console.log("getCountryForFeedbackDisplay running");
  console.log(
    "country Select3ed",
    JSON.parse(localStorage.getItem("countrySelected"))
  );
  //get flag to be displayed from the number of turns. Using that number to retrieve the flag from the array
  if (JSON.parse(localStorage.getItem("dailyMode")) === true) {
    rightFlag = JSON.parse(localStorage.getItem("flag"));
  } else {
    rightFlag = JSON.parse(localStorage.getItem("flag"));
    //console.log("rightFlag in function", rightFlag);
  }
  //console.log("rightFlag", rightFlag);
  flagName.innerHTML = `The Answer Is <strong>${rightFlag}</strong>`;
  flagName.style["display"] = "inline-block";
}

//Display if the answer is correct or not in feedback message
function getAnswerFeedback() {
  if (
    (JSON.parse(localStorage.getItem("isCorrect")) === true &&
      JSON.parse(localStorage.getItem("dailyMode")) === true) ||
    (isCorrect === true &&
      JSON.parse(localStorage.getItem("dailyMode")) === false)
  ) {
    feedback.innerHTML = `${correctAnswer}`;
    console.log("answer is correct.");
  } else if (
    (JSON.parse(localStorage.getItem("isCorrect")) === false &&
      JSON.parse(localStorage.getItem("dailyMode")) === true) ||
    (isCorrect === false &&
      JSON.parse(localStorage.getItem("dailyMode")) === false)
  ) {
    feedback.innerHTML = `${incorrectAnswer}`;
    console.log("answer is incorrect");
  }
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

function whichFeedbackScreen(feedback) {
  let answerResult;
  //if input matches the right answer
  console.log("countrySelectedLow, flagLow", countrySelectedLow, flagLow);
  countrySelectedLow === String(flagLow) ? (answerResult = "right") : "wrong";
  feedbackScreenProcessAnswer(answerResult);
  if (JSON.parse(localStorage.getItem("dailyMode")) === true) {
    handleNextScreenBasedOnTurn();
  } else {
    console.log("as practice mode going straight to first4Turns");
    first4Turns();
  }
}

function feedbackScreenProcessAnswer(feedback) {
  feedback === "right"
    ? console.log(
        "countrySelected matches flagLow",
        countrySelectedLow === String(flagLow)
      )
    : console.log("wrong answer in which FeedbackScreen");
  if (
    JSON.parse(localStorage.getItem("dailyMode")) == true &&
    JSON.parse(localStorage.getItem("gameComplete")) === false
  ) {
    feedback === "right"
      ? localStorage.setItem("isCorrect", JSON.stringify(true))
      : localStorage.setItem("isCorrect", JSON.stringify(false));
  } else if (JSON.parse(localStorage.getItem("dailyMode")) == false) {
    feedback === "right" ? (isCorrect = true) : (isCorrect = false);
    console.log("isCorrect in practice mode", isCorrect);
    console.log(
      "daily mode is true",
      JSON.parse(localStorage.getItem("dailyMode")) == true
    );
  }
  resetInputParameters();
  let resultStatus;
  if (feedback === "right") {
    resultStatus = "correct";
    if (JSON.parse(localStorage.getItem("dailyMode")) === true) {
      incrementScore();
      starFill();
    }
  } else {
    resultStatus = "notCorrect";
  }
  shareResultsArrayChanges(resultStatus);
}

//*****Share Results Array*****/

function shareResultsArrayChanges(symbol) {
  let pic;
  symbol == "correct" ? (pic = flagImage) : (pic = crossImage);
  if (JSON.parse(localStorage.getItem("dailyMode")) == true) {
    if (!localStorage.getItem("shareResultsArray")) {
      console.log("no shareresultsarray found");
      // Initialize localStorage with an array containing "flag"
      localStorage.setItem("shareResultsArray", JSON.stringify([pic]));
    } else {
      console.log(
        "getShareResultsArrayinElse Incorrect answer",
        JSON.parse(localStorage.getItem("shareResultsArray"))
      );
      let updateShareResultsArray = JSON.parse(
        localStorage.getItem("shareResultsArray")
      ).concat(pic);
      console.log("updateShareResultsArray", updateShareResultsArray);
      localStorage.setItem(
        "shareResultsArray",
        JSON.stringify(updateShareResultsArray)
      );
      updateShareResultsArray = "";
    }
  }
  console.log(
    "shareResultsArray",
    JSON.parse(localStorage.getItem("shareResultsArray"))
  );
}

/*****Reset Functions*****/

function resetInputParameters() {
  buttonClicked = 0;
  countrySelectedLow = "";
}

//displays new flag
function startAgain() {
  container.style["opacity"] = "100";
  clearAnswer();
  resetButton.style["display"] = "none";
  message.innerHTML = "";
  newQuizItem();
}

function clearAnswer() {
  console.log("clearAnswer running");
  answer.innerHTML = "";
  answer.value = "";
}

/*****Completed Game Functions*****/

//Messages on score after the user has completed the game.
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
  getCountryForFeedbackDisplay();
  completedFlagsRoundDisplayChanges();
  getAnswerFeedback();
  getFinishGameMessage();
  updateGameStats();
}

//After the user completed 5 rounds see overall score

function gameWrapup() {
  localStorage.setItem("score", JSON.stringify(0));
  let emptyArray = [];
  localStorage.setItem("shareResultsArray", JSON.stringify(emptyArray));
  starFill();
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


/*****Exports*****/

export {
  formatFlagNameToCompare,
  displayFlag,
  clearAnswer,
  dailyGameButton,
  shareResults,
  answer,
  feedback,
  flagName,
  hideShareButtons,
  handleNextScreenBasedOnTurn,
  container,
  newGameDisplayChanges,
  practiceQuizItem,
  scrollToTop,
  getAnswerFeedback,
  countryOptionButtons,
  flagsCopy,
  countryButtonClasses,
  flagsDisplayedInRound,
};
