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
function defineAverageScore() {
  if (JSON.parse(localStorage.getItem("allGameScores"))) {
    averageScore = calcAverageScoreMultiValues();
  } else {
    averageScore = 0;
  }
}

function calculateGameScore() {
  return JSON.parse(localStorage.getItem("score")) * 2;
}


function incrementScore() {
  score = JSON.parse(localStorage.getItem("score"));
  const score1 = (score += 1);
  localStorage.setItem("score", JSON.stringify(score1));
}
//called on fifth turn after country selected as wrapup game activity
function updateGameStats() {
  //score when a game is completed expressed as percentage
  console.log(
    "updateGameStats running and scores updated",
    JSON.parse(localStorage.getItem("scoresUpdated"))
  );
  //below: ensure scores not updated for samegame more than once
  if (
    JSON.parse(localStorage.getItem("scoresUpdated")) === false ||
    JSON.parse(localStorage.getItem("scoresUpdated")) === null
  ) {
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

function defineAndSaveLongGameScore(gameScore) {
  console.log("defineAndSaveLongGameScore running");
  allGameScores = JSON.parse(localStorage.getItem("allGameScores"))
    ? JSON.parse(localStorage.getItem("allGameScores")).concat(gameScore)
    : [JSON.parse(localStorage.getItem("gameScore"))];
  window.localStorage.setItem("allGameScores", JSON.stringify(allGameScores));
  console.log(
    "allGameScores",
    JSON.parse(localStorage.getItem("allGameScores"))
  );
}

function gameStatsDisplay() {
  if (JSON.parse(localStorage.getItem("dailyMode")) === true) {
    statistics.innerHTML = `Last FLAGL Score: <strong>${gameScore}</strong><br><br>Games Played: <strong>${gamesPlayed}</strong><br><br>Average Score: <strong>${averageScore}</strong>`;
  }
}

export {
  numGamesCalc,
  calcAverageScoreMultiValues,
  defineAverageScore,
  calculateGameScore,
  gameStatsDisplay,
  updateGameStats,
  defineAndSaveLongGameScore,
  incrementScore, 
  statistics
};
