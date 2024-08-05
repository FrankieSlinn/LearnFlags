//Score Variables
let score = 0;
let gameScore = 0;
//let countGames = 0;
let averageScore = 0;
let gamesPlayed = numGamesCalc();
let allGameScores = [];
let statistics = document.querySelector(".stats");

gameScore = JSON.parse(localStorage.getItem("allGameScores"))
  ? //get last score
    JSON.parse(localStorage.getItem("allGameScores"))[
      JSON.parse(localStorage.getItem("allGameScores")).length - 1
    ]
  : 0;

function numGamesCalc() {
  return JSON.parse(localStorage.getItem("allGameScores")) != null
    ? JSON.parse(localStorage.getItem("allGameScores")).length
    : 0;
}

function calcAverageScoreMultiValues() {
  console.log("calcaverage running");
  if (JSON.parse(localStorage.getItem("allGameScores")).length === 1) {
    console.log("length allGameScores is one");
    return JSON.parse(localStorage.getItem("allGameScores"))[0];
  } else if (JSON.parse(localStorage.getItem("allGameScores")).length >= 1) {
    console.log("length allgames more than 1");
    let allScores = JSON.parse(localStorage.getItem("allGameScores"));
    return (
      allScores.reduce(
        //add all scores to get tota
        (numa, numb) => numa + numb
      ) / allScores.length
    ).toFixed(0);
  }
}

//Define average score
function defineAverageScore(){
if (JSON.parse(localStorage.getItem("allGameScores"))) {
  averageScore = calcAverageScoreMultiValues();
} else {
  averageScore = 0;
}}

function calculateGameScore() {
  return JSON.parse(localStorage.getItem("score")) * 2;
}

function gameStatsDisplay() {
    if (JSON.parse(localStorage.getItem("dailyMode")) === true) {
      statistics.innerHTML = `Last FLAGL Score: <strong>${gameScore}</strong><br><br>Games: <strong>${gamesPlayed}</strong><br><br>Average Score: <strong>${averageScore}</strong>`;
    }
  }



  export{
    numGamesCalc, calcAverageScoreMultiValues, defineAverageScore, calculateGameScore, gameStatsDisplay

  }