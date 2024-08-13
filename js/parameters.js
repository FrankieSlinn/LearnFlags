
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
let starArray = ["star1", "star2", "star3", "star4", "star5"];
let countrySelectedLow = "";
let dailyMode = true;
let arrayDailyFlags = [];
let rightFlag = "";
const container = document.querySelector(".container");
const showFlag = document.querySelector(".showFlag");
const countryOptionButtons = document.querySelector(".countryOptionButtons");
const intro = document.querySelector(".intro");
let isCorrect; 
let isIncorrect;
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
const modeButton = document.querySelector(".mode-button");
const dailyGameButton = document.querySelector(".dailyGameButton");
const statsText = document.querySelector(".statsText");
const stars = document.querySelectorAll(".star");
let flagImage = "../Images/flagImageBackground.png";
let crossImage = "../Images/crossImageBackground.png";

export{
        flagsCopy,
        buttonClasses,
        countryButtonClasses,
        buttonClicked,
        countryMatchingPredText,
        lowerCasePredText,
        turns,
        flagsDisplayedInRound,
        flag,
        flagLow,
        correctAnswer,
        incorrectAnswer,
        resetButton,
        starArray,
        countrySelectedLow,
        dailyMode,
        arrayDailyFlags,
        rightFlag,
        container,
        showFlag,
        countryOptionButtons,
        intro,
        isCorrect,
        isIncorrect,
        answer,
        feedback,
        practice,
        practiceAtResults,
        labelTimer,
        message,
        flagName,
        instruction,
        finishGameMessage,
        shareResults,
        modeButton,
        dailyGameButton,
        statsText,
        stars,
        flagImage,
        crossImage,
      };
    
  