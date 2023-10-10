import { flags } from "./flags.js";
console.log("flags", flags);
import { displayPopup, hidePopup } from './displayHidePopups.js';

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
let containervisible = 0;
let answervisible = 0;
let resetvisible = 0;
let messagevisible = 0;
let statistics = document.querySelector(".stats");
let starArray = ["star1", "star2", "star3", "star4", "star5"];
let countrySelectedLow = "";
let dailyMode = true;
let arrayDailyFlags = [];
const container = document.querySelector(".container");
const showFlag = document.querySelector(".showFlag");
const countryOptionButtons = document.querySelector(".countryOptionButtons");
const intro = document.querySelector(".intro");
const answer = document.querySelector(".answer");
const feedback = document.querySelector(".feedback");
const practice = document.querySelector(".practice");
const labelTimer = document.querySelector(".labelTimer");
const message = document.querySelector(".message");
const flagName = document.querySelector(".flagName");
const instruction = document.querySelector(".instruction");
const finishGameMessage = document.querySelector(".finishGameMessage");

//Score Variables
let score = 0;
let gameScore=0;
let countGames = 0;
let averageScore = 0;
let gamesPlayed = numGamesCalc();
let allGameScores = [];

function numGamesCalc() {
  return (JSON.parse(localStorage.getItem("allGameScores")) != null
    ? JSON.parse(localStorage.getItem("allGameScores")).length
    : 0)
}

function calcAverageScoreMultiValues() {
  if (JSON.parse(localStorage.getItem("allGameScores")).length === 1) {
    console.log("length allGameScores is one")
   return JSON.parse(localStorage.getItem("allGameScores"))[0];}
   else if(JSON.parse(localStorage.getItem("allGameScores")).length >= 1)
  return JSON.parse(localStorage.getItem("allGameScores"))
    .reduce(
      //add all scores to get tota
      (numa, numb) => numa + numb
    )
    .toFixed(0);
}

//Define average score
if (JSON.parse(localStorage.getItem("allGameScores"))) {
    averageScore = calcAverageScoreMultiValues();
  }
else {
  averageScore = 0;
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
  gameScore = Number(JSON.parse(localStorage.getItem("score")) * 2 * 10);
  window.localStorage.setItem("gameScore", JSON.stringify(gameScore));
  defineAndSaveLongGameScore(gameScore);
  averageScore = calcAverageScoreMultiValues();
  window.localStorage.setItem("averageScore", JSON.stringify(averageScore));
  gamesPlayed = numGamesCalc();
  //update statistics in popup
  gameStatsDisplay();
}
function gameStatsDisplay() {
  statistics.innerHTML = `FLAGL Score: <strong>${gameScore}</strong><br>Games: <strong>${gamesPlayed}</strong><br>Average Score: <strong>${averageScore}</strong>`;
}
function defineAndSaveLongGameScore(gameScore) {
  allGameScores = JSON.parse(localStorage.getItem("allGameScores"))
    ? JSON.parse(localStorage.getItem("allGameScores")).concat(gameScore)
    : [JSON.parse(localStorage.getItem("gameScore"))];
  window.localStorage.setItem("allGameScores", JSON.stringify(allGameScores));
}

//generates 5 random numbers for each day based on UK Julien Date
let fullDate = new Date();
console.log("fullDate", fullDate);
//Today's date split into three values
let year = String(fullDate.getFullYear());
let month = String(fullDate.getMonth() + 1);
let day = String(fullDate.getDate());
//number based on current date which is used as dateInputForSeed
let dateNumberSeed = day + month + year;

function murmurHash3(dateInputForSeed) {
  let i = 0;
  let hash = 0;
  // XOR the dateInputForSeed with an initial hash value
  hash = 1779033703 ^ dateInputForSeed.length;

  // Loop through each character in the dateInputForSeed
  for (i; i < dateInputForSeed.length; i++) {
    // XOR the current hash with the current character's ASCII code
    let bitwise_xor_from_character = hash ^ dateInputForSeed.charCodeAt(i);

    // Perform multiplication and bit-shifting operations
    hash = Math.imul(bitwise_xor_from_character, 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }
  return () => {
    // This returns a closure that can be used as a pseudo-random number generator (PRNG) with the computed hash as the dateInputForSeed.
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    return (hash ^= hash >>> 16) >>> 0; // Ensure the result is a positive integer
  };
}

function generateRandomNumber(seed_1, seed_2, seed_3, seed_4) {
  return () => {
    // Ensure that the seed values are treated as unsigned 32-bit integers
    seed_1 >>>= 0;
    seed_2 >>>= 0;
    seed_3 >>>= 0;
    seed_4 >>>= 0;

    // Combine seed_1 and seed_2, then cast it to a signed 32-bit integer
    let cast32 = (seed_1 + seed_2) | 0;

    // Update seed_1 by applying bitwise operations
    seed_1 = seed_2 ^ (seed_2 >>> 9);

    // Update seed_2 by applying bitwise and addition operations
    seed_2 = (seed_3 + (seed_3 << 3)) | 0;

    // Update seed_3 by applying bitwise shift operations
    seed_3 = (seed_3 << 21) | (seed_3 >>> 11);

    // Increment seed_4
    seed_4 = (seed_4 + 1) | 0;

    // Combine cast32 and seed_4, then cast it to an unsigned 32-bit integer
    cast32 = (cast32 + seed_4) | 0;

    // Update seed_3 by combining it with cast32
    seed_3 = (seed_3 + cast32) | 0;

    // Return a pseudo-random number between 0 (inclusive) and 1 (exclusive)
    return (cast32 >>> 0) / 4294967296;
  };
}

let generate_seed = murmurHash3(dateNumberSeed);
let random_number = generateRandomNumber(generate_seed(), generate_seed());
localStorage.setItem("random_number", JSON.stringify(random_number()));

//if new day for English Time handle new game
if (
  dailyMode === true &&
  (String(dateNumberSeed) !==
    String(JSON.parse(localStorage.getItem("dateNumberSeed"))) ||
    (fullDate.getHours() == 0 &&
      fullDate.getMinutes() == 0 &&
      fullDate.getSeconds() == 0) ||
    JSON.parse(localStorage.getItem("firstTurn")) == true)
) {
  setNewGameParameters();
  populateArrayDailyFlags();
  startNewGame();
}

//adds flags to the array of 5 flags for that day via random number and set to local storage
function populateArrayDailyFlags() {
  for (let flagNum = 0; flagNum <= 4; flagNum++) {
    //random_number needs to be a function to generate number
    arrayDailyFlags.push(Math.abs(Math.floor(random_number() * 225)));
    localStorage.setItem("arrayDailyFlags", JSON.stringify(arrayDailyFlags));
  }
}
//set up parameters for new game to local storage
function setNewGameParameters() {
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

//ensure completedFlagsRound messages show up at the end
const fourTurnsCompleted = JSON.parse(localStorage.getItem("turns")) === 4;
console.log("fourTurnsCompleted", fourTurnsCompleted);
const guessSubmitted = JSON.parse(localStorage.getItem("countrySelected"));
console.log("guessSubmitted", guessSubmitted);

if (
  //fifth turn completed
  fourTurnsCompleted &&
  guessSubmitted === true
) {
  //finish up activites
  starFill();
  completedFlagsRound();
  console.log("run finish up activities");
} else if (
  //fifth turn pending
  fourTurnsCompleted &&
  guessSubmitted === false
) {
  console.log("start fifth turn");
  //start the fifth turn
  newQuizItem();
}
//populate stars
starFill();

//ensure that the correct screen is shown with the right score
if (JSON.parse(localStorage.getItem("turns")) <= "3") {
  newQuizItem();
}
console.log("new Date", new Date());
//display Timer
const displayTimer = function () {
  //date is current date
  let date = new Date();
  //showTimer
  labelTimer.style["visibility"] = "visible";
  document.querySelector(
    ".labelTimer"
  ).innerHTML = `FLAGL Will Restart in <strong>
    ${23 - new Date().getHours()}</strong> Hours<strong> ${
    60 - new Date().getMinutes()
  }
    </strong> Minutes <strong>${60 - new Date().getSeconds()}</strong> Seconds`;
};

// displayTimer();
//run timer function every second so that it will count down
setInterval(displayTimer, 1000);

//if score wrong, reset.
//score and turns should never be over five. If this happens set back to first turn / score as a safety measure.
if (
  JSON.parse(localStorage.getItem("score") > 5) ||
  JSON.parse(localStorage.getItem("turns") > 5)
) {
  localStorage.setItem("score", JSON.stringify(0));
  localStorage.setItem("turns", JSON.stringify(0));
}

//handle changes after first four turns
function first4Turns() {
  //reset country chosen
  buttonClicked = 0;
  displayChangesAfterTurn();
  let turns = JSON.parse(localStorage.getItem("turns"));
  let turns1 = (turns += 1);
  console.log("turns after turn", turns1);
  //set incremented number of turns
  localStorage.setItem("turns", JSON.stringify(turns1));
  //reset country selected
  localStorage.setItem("countrySelected", JSON.stringify(false));
}

function getCountryForFeedbackDisplay() {
  //get flag to be displayed from the number of turns. Using that number to retrieve the flag from the array
  const rightFlag =
    flags[
      JSON.parse(
        JSON.parse(localStorage.getItem("arrayDailyFlags"))[
          JSON.parse(localStorage.getItem("turns"))
        ]
      )
    ];
  console.log("rightFlag", rightFlag);
  flagName.innerHTML = `The Answer Is <strong>${rightFlag}</strong>`;
}
function getAnswerFeedback() {
  JSON.parse(localStorage.getItem("isCorrect")) === true
    ? (feedback.innerHTML = `${correctAnswer}`)
    : (feedback.innerHTML = `${incorrectAnswer}`);
}

function displayChangesAfterTurn() {
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
  if (score === 5) {
    finishGameMessage.innerHTML = "Congratulations, Your FLAGL Score Is 100%!";
  }
  if (1 <= JSON.parse(localStorage.getItem("score")) <= 4) {
    finishGameMessage.innerHTML = `Your FLAGL Score Is ${
      JSON.parse(localStorage.getItem("score")) * 2
    }0%`;
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
  container.style["visibility"] = "visible";
  showFlag.style["display"] = "none";
  resetButton.style["display"] = "none";
  answer.style["display"] = "none";
  intro.style["display"] = "none";
  countryOptionButtons.style["display"] = "none";
  feedback.style["display"] = "inline-block";
  practice.style["display"] = "inline-block";
  labelTimer.style["display"] = "inline-block";
}

function completedFlagsRound() {
  console.log("completedFlagsRound started");
  localStorage.setItem("countrySelected", JSON.stringify(true));
  getFlagName();
  completedFlagsRoundDisplayChanges();
  getAnswerFeedback();
  getFinishGameMessage();
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
  startAgain();
});

function displayFlagScreen() {
  countryOptionButtons.style["display"] = "none";
  finishGameMessage.style["display"] = "none";
  intro.style["display"] = "inline-block";
  feedback.style["display"] = "none";
  labelTimer.style["display"] = "none";
  flagName.style["display"] = "none";
  practice.style["display"] = "none";
  answer.style["display"] = "inline-block";
  showFlag.style["display"] = "inline-block";
  showFlag.style["visibility"] = "visible";
  message.style["visibility"] = "visible";
  answer.style["visibility"] = "visible";
  instruction.style["display"] = "inline-block";
  intro.innerHTML = "<br>Type and Select a Country or Territory";
  instruction.innerHTML =
    "Which Country or Territory Does this Flag Belong to?";
}
function formatFlagNameToCompare() {
  flagLow = JSON.parse(localStorage.getItem("flag")).toLowerCase();
  let flagWithUnderscore = JSON.parse(localStorage.getItem("flag")).replaceAll(
    " ",
    "_"
  );
  localStorage.setItem(
    "flagWithUnderscore",
    JSON.stringify(flagWithUnderscore)
  );
}

function newQuizItem() {
  countryMatchingPredText = [];
  //resets quiz item
  localStorage.setItem("countrySelected", JSON.stringify(false));
  //places country name into array of flags displayed in round
  placeFlagNameIntoflagsDisplayedInRound();
  //formats flag name to lower case removes underscores for comparison
  formatFlagNameToCompare();
  //gets flag image and sets html for flag display
  displayFlag();
  //changes for screen when new flag displayed
  displayFlagScreen();
  //carries out filtering based on input text
  predictiveText();
}

function placeFlagNameIntoflagsDisplayedInRound() {
  //generate flag one by one today
  //find current flag name
  let turns = JSON.parse(localStorage.getItem("turns"));
  let getFlag =
    flags[JSON.parse(localStorage.getItem("arrayDailyFlags"))[turns]];
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
  let imageHTML =
    "<img src = ../Images/" +
    JSON.parse(localStorage.getItem("flagWithUnderscore")) +
    '.png  style="width:400px;height:250px;">';
  showFlag.innerHTML = imageHTML;
  showFlag.style["display"] = "inline-block";
}

function predictiveText() {
  //listener for when a user types a letter
  answer.addEventListener("keyup", function (e) {
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

function whichFeedbackScreen() {
  //if input matches the right answer
  if (countrySelectedLow === String(flagLow)) {
    localStorage.setItem("isCorrect", JSON.stringify(true));
    localStorage.setItem("isIncorrect", JSON.stringify(false));
    resetInputParameters();
    incrementScore();
    starFill();
  } else {
    localStorage.setItem("isIncorrect", JSON.stringify(true));
    localStorage.setItem("isCorrect", JSON.stringify(false));
    resetInputParameters();
  }
  handleNextScreenBasedOnTurn();
}

function incrementScore() {
  score = JSON.parse(localStorage.getItem("score"));
  const score1 = (score += 1);
  localStorage.setItem("score", JSON.stringify(score1));
}
//determines screen based on the turn
function handleNextScreenBasedOnTurn() {
  if (JSON.parse(localStorage.getItem("turns")) < 4) {
    first4Turns();
  } else if (
    JSON.parse(localStorage.getItem("turns")) === 4 &&
    JSON.parse(localStorage.getItem("countrySelected")) === true
  ) {
    updateGameStats();
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
  starFill();
}
//displays new flag
function startAgain() {
  container.style["opacity"] = "100";
  answer.innerHTML = "";
  resetButton.style["display"] = "none";
  message.innerHTML = "";
  newQuizItem();
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

function newGameDisplayChanges(){
  container.style["opacity"] = "100";
  container.style["visibility"] = "visible";
  resetButton.style["display"] = "none";
  finishGameMessage.style["display"] = "none";
  labelTimer.style["display"] = "none";
  instruction.innerHTML = "Which country does this flag belong to?";
  message.innerHTML = "";
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

//Share Score
document.querySelectorAll(".share").forEach((item) =>
  item.addEventListener("click", function () {
    var r = document.createRange();
    r.selectNode(document.querySelector(".statsContent"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("FLAGL Results Copied To Clipboard");
  })
);

