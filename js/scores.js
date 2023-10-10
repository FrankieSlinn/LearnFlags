//Score Variables
let score = 0;
let averageScore = 0;
let gamesPlayed = numGamesCalc();
let allGameScores = [];

//Define average score
if (JSON.parse(localStorage.getItem("allGameScores"))) {
    averageScore = calcAverageScoreMultiValues();
  }
else {
  averageScore = 0;
}


let gameScore = JSON.parse(localStorage.getItem("allGameScores"))
  ? //get last score
    JSON.parse(localStorage.getItem("allGameScores"))[
      JSON.parse(localStorage.getItem("allGameScores")).length - 1
    ]
  : 0;


function calculateGameScore(){
    return (JSON.parse(localStorage.getItem("score")) * 2)
}

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

  function updateGameStats() {
    //score when a game is completed expressed as percentage
    let gameScore = Number(JSON.parse(localStorage.getItem("score")) * 2 * 10);
    window.localStorage.setItem("gameScore", JSON.stringify(gameScore));
    defineAndSaveLongGameScore(gameScore);
    averageScore = calcAverageScoreMultiValues();
    window.localStorage.setItem("averageScore", JSON.stringify(averageScore));
    gamesPlayed = numGamesCalc();
    //update statistics in popup
    gameStats();
  }
  function gameStats() {
   document.querySelector(".stats").innerHTML = `FLAGL Score: <strong>${gameScore}</strong><br>Games: <strong>${gamesPlayed}</strong><br>Average Score: <strong>${averageScore}</strong>`;
  }
  function defineAndSaveLongGameScore(gameScore) {
    allGameScores = JSON.parse(localStorage.getItem("allGameScores"))
      ? JSON.parse(localStorage.getItem("allGameScores")).concat(gameScore)
      : [JSON.parse(localStorage.getItem("gameScore"))];
    window.localStorage.setItem("allGameScores", JSON.stringify(allGameScores));
  }

  export {
    numGamesCalc,
    calcAverageScoreMultiValues,
    updateGameStats,
    gameStats,
    defineAndSaveLongGameScore,
    calculateGameScore,
  };