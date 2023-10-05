import { flags } from "./flags.js";

let flagsCopy = [...flags];
let buttonClasses = [".First", ".Second", ".Third", ".Fourth", ".Fifth"];
let labelContent = [
  "firstLabel",
  "secondLabel",
  "thirdLabel",
  "fourthLabel",
  "fifthLabel",
];
let buttonClicked = 0;
let letterOnly = /^[a-zA-Z]+$/g;
let flagWithLetter = [];
let keysJoin = "";
let selection = document.querySelector(".selection");
let turns = 0;
let countryDisplayed = [];
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
let letter = "";
let isCorrect = false;
let isIncorrect = false;
let starArray = ["star1", "star2", "star3", "star4", "star5"];
let flagNum1 = "";
let flagNum2 = "";
let flagNum3 = "";
let flagNum4 = "";
let flagNum5 = "";
let inputValLow="";
let dailyMode = true;
let arrayDailyFlags = [];
//Score Variables
let score = 0;
let countGames = 0;
let averageScore = 0;
let gamesPlayed = 0;
//sumLongCount needed for sum equation to add up items in array for average score
let sumLongCount = 0;
let gameScores = [];
let allGameScores = [];
let numGames =
  JSON.parse(localStorage.getItem("allGameScores")) != null
    ? JSON.parse(localStorage.getItem("allGameScores")).length
    : 0;
let longGameAverage =
  JSON.parse(localStorage.getItem("allGameScores")) != null
    ? //Get sum of all game scores
      (
        JSON.parse(localStorage.getItem("allGameScores")).reduce(
          (numa, numb) => numa + numb,
          //If no game scores the average is zero
          0
        ) / JSON.parse(localStorage.getItem("allGameScores")).length
      )
        //Remove any decimals
        .toFixed(0)
    : 0;
console.log("longGameAverage", longGameAverage);

let statsScore =
  JSON.parse(localStorage.getItem("allGameScores")) != null
    ? JSON.parse(localStorage.getItem("allGameScores"))[
        JSON.parse(localStorage.getItem("allGameScores")).length - 1
      ]
    : 0;
if (
  JSON.parse(localStorage.getItem("allGameScores")) == null &&
  JSON.parse(localStorage.getItem("firstTurn")) != false
) {
  localStorage.setItem("firstTurn", JSON.stringify(true));
} else {
  localStorage.setItem("firstTurn", JSON.stringify(false));
}

//makes sure score not null so in first turn flag can be matched to score.
if (JSON.parse(localStorage.getItem("score")) == null) {
  localStorage.setItem("score", JSON.stringify(0));
}

document.querySelector(
  ".stats"
).innerHTML = `FLAGL Score: <strong>${statsScore}</strong><br>Games: <strong>${numGames}</strong><br>Average Score: <strong>${longGameAverage}</strong>`;

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
  dailyMode===true &&
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
function populateArrayDailyFlags(){
  for (let flagNum = 0; flagNum <= 4; flagNum++) {
    //random_number needs to be a function to generate number
    arrayDailyFlags.push(Math.abs(Math.floor(random_number() * 225)));
    localStorage.setItem("arrayDailyFlags", JSON.stringify(arrayDailyFlags));
  }
}
//set up parameters for new game to local storage
function setNewGameParameters(){
  localStorage.setItem("firstTurn", JSON.stringify(false));
  localStorage.setItem("valueSubmitted", JSON.stringify(false));
  localStorage.setItem("isCorrect", JSON.stringify(false));
  localStorage.setItem("isIncorrect", JSON.stringify(false));
  localStorage.setItem("turns", JSON.stringify(0));
  localStorage.setItem("score", JSON.stringify(0));
  localStorage.setItem("flagsShownToday", JSON.stringify(false));
  localStorage.setItem("dateNumberSeed", JSON.stringify(dateNumberSeed));
}

//ensure fifthturn messages show up at the end
const fourTurnsCompleted = JSON.parse(localStorage.getItem("turns")) == "4";
const guessSubmitted =  JSON.parse(localStorage.getItem("valueSubmitted"));
if (
  //fifth turn completed
  fourTurnsCompleted
  &&
 guessSubmitted === true
) {
  //finish up activites
  starFill();
  fifthTurn();
} else if (
  //fifth turn pending
  fourTurnsCompleted
   &&
  guessSubmitted == false
) {
  //start the fifth turn
  displayFlag();
}
//populate stars
starFill();

//ensure that the correct screen is shown with the right score
if (JSON.parse(localStorage.getItem("turns")) <= "3") {
  displayFlag();
}
console.log("new Date", new Date())
//display Timer
const displayTimer = function () {
  //date is current date
  let date = new Date();
  //showTimer
  document.querySelector(".labelTimer").style["visibility"] = "visible";
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

//get flag to be displayed from the number of turns. Using that number to retrieve the flag from the array
const  rightFlag =
flags[
  JSON.parse(
    JSON.parse(localStorage.getItem("arrayDailyFlags"))[
      JSON.parse(localStorage.getItem("turns"))
    ]
  )
];

function first4Turns() {
  localStorage.setItem("valueSubmitted", JSON.stringify(false));
  buttonClicked = 0;
  document.querySelector(
    ".flagName"
  ).innerHTML = `The Answer Is <strong>${rightFlag}</strong>`;

  document.getElementById("spanBut").style["display"] = "none";
  resetButton.style["display"] = "inline-block";
  document.querySelector(".reset").innerHTML =
    '<button type = button class = "newFlag">Have Another Go</button>';
  document.querySelector(".intro").style["display"] = "none";
  document.querySelector(".answer").style["display"] = "none";

  if (JSON.parse(localStorage.getItem("isCorrect")) == true) {
   
    document.querySelector(".feedback").innerHTML = `${correctAnswer}`;
  }
  if (JSON.parse(localStorage.getItem("isIncorrect")) == true) {

    document.querySelector(".feedback").innerHTML = `${incorrectAnswer}`;
  }

  let turns = JSON.parse(localStorage.getItem("turns"));
  let turns1 = (turns += 1);
  localStorage.setItem("turns", JSON.stringify(turns1));

}

function fifthTurn() {
  console.log("fifthturn running");
  localStorage.setItem("valueSubmitted", JSON.stringify(true));

  //answer = JSON.parse(localStorage.getItem("flag"))
  document.querySelector(
    ".flagName"
  ).innerHTML = `The answer is <strong>${JSON.parse(
    localStorage.getItem("flag")
  )}</strong>`;
  document.querySelector(".flagName").style["display"] = "inline-block";
  document.querySelector(".container").style["visibility"] = "visible";

  document.querySelector(".showFlag").style["display"] = "none";
  document.querySelector(".reset").style["display"] = "none";
  document.querySelector(".answer").style["display"] = "none";
  document.querySelector(".intro").style["display"] = "none";
  document.getElementById("spanBut").style["display"] = "none";
  document.querySelector(".feedback").style["display"] = "inline-block";
  document.querySelector(".practice").style["display"] = "inline-block";

  if (JSON.parse(localStorage.getItem("isCorrect")) == true) {
    console.log("fifth turn is correct");
    document.querySelector(".feedback").innerHTML = `${correctAnswer}`;
  }
  if (JSON.parse(localStorage.getItem("isIncorrect")) == true) {
    console.log("fifth turn is incorrect");
    document.querySelector(".feedback").innerHTML = `${incorrectAnswer}`;
  }

  document.querySelector(".labelTimer").style["display"] = "inline-block";

  if (score === 5) {
    document.querySelector(".finishGameMessage").innerHTML =
      "Congratulations, Your FLAGL Score Is 100%!";
  }
  if (1 <= JSON.parse(localStorage.getItem("score")) <= 4) {
    document.querySelector(
      ".finishGameMessage"
    ).innerHTML = `Your FLAGL Score Is ${
      JSON.parse(localStorage.getItem("score")) * 2
    }0%`;
  }
  if (JSON.parse(localStorage.getItem("score")) === 0) {
    document.querySelector(
      ".finishGameMessage"
    ).innerHTML = `Better Luck Next Time, Your FLAGL Score is 0%`;
  }
  document.querySelector(".finishGameMessage").style["display"] =
    "inline-block";
  console.log(
    "finishgamemessage in fifth",
    document.querySelector(".finishGameMessage")
  );
  console.log(
    "score, turns in fifth Turn",
    JSON.parse(localStorage.getItem("score")),
    JSON.parse(localStorage.getItem("turns"))
  );
}

function starFill() {
  console.log("starFill Running");
  if (
    JSON.parse(localStorage.getItem("score")) !== "0" &&
    JSON.parse(localStorage.getItem("score")) <= "5"
  ) {
    console.log("score not null can do starfill");
    for (let i = 0; i <= JSON.parse(localStorage.getItem("score")) - 1; i++) {
      console.log("starfilli");
      document.getElementById(`${starArray[i]}`).style["fill"] = "yellow";
      console.log(`star i is star${i}`);
    }
    if (JSON.parse(localStorage.getItem("score")) == "0") {
      console.log("starFill 0 score");
      const allStars = document.querySelectorAll(".star");
      allStars.forEach((j) => (j.style.fill = "white"));
    }
  }
}

//listener for display new flag
document.querySelector(".reset").addEventListener("click", function () {
  console.log("resetButton clicked");
  startAgain();
});

function displayFlagScreen() {
  document.getElementById("spanBut").style["display"] = "none";
  document.querySelector(".finishGameMessage").style["display"] = "none";
  document.querySelector(".answer").style["display"] = "inline-block";
  document.querySelector(".showFlag").style["display"] = "inline-block";
  document.querySelector(".showFlag").style["visibility"] = "visible";
  document.querySelector(".message").style["visibility"] = "visible";
  document.querySelector(".intro").innerHTML =
    "<br>Type and Select a Country or Territory";
  document.querySelector(".intro").style["display"] = "inline-block";
  document.querySelector(".feedback").style["display"] = "none";
  document.querySelector(".labelTimer").style["display"] = "none";
  document.querySelector(".flagName").style["display"] = "none";
  document.querySelector(".practice").style["display"] = "none";
  document.querySelector(".instruction").innerHTML =
    "Which Country or Territory Does this Flag Belong to?";
}

function displayFlag() {
  localStorage.setItem("valueSubmitted", JSON.stringify(false));

  console.log("displayflag running");

  //generate flag one by one today

  for (let i = 0; i <= 4; i++) {
    console.log("generating flags for today running");
    console.log(
      "flags today in display flag",
      JSON.parse(localStorage.getItem("arrayDailyFlags"))
    );

    if (JSON.parse(localStorage.getItem("turns")) == i) {
      let getFlag = flags[JSON.parse(localStorage.getItem("arrayDailyFlags"))[i]];
      console.log("getFlag", getFlag);
      localStorage.setItem("flag", JSON.stringify(getFlag));
      console.log(
        "flag for today",
        JSON.parse(localStorage.getItem("flag")),
        flags.indexOf(JSON.parse(localStorage.getItem("flag")))
      );
    }
    console.log(
      "flag for today",
      JSON.parse(localStorage.getItem("flag")),
      flags.indexOf(JSON.parse(localStorage.getItem("flag")))
    );
  }

  let flagIndex = flags.indexOf(JSON.parse(localStorage.getItem("flag")));
  console.log(
    "flagIndex, flag",
    flagIndex,
    JSON.parse(localStorage.getItem("flag"))
  );
  console.log("arrayDailyFlags", arrayDailyFlags);
  console.log(
    "arrayDailyFlags countries",
    arrayDailyFlags.map((item) => flags[item])
  );
  if (JSON.parse(localStorage.getItem("turns")) <= 4) {
    console.log(JSON.parse(localStorage.getItem("flag")));
    console.log("countrydisplayed", countryDisplayed);
    console.log("countryDisplayed", typeof countryDisplayed);

    countryDisplayed.push(JSON.parse(localStorage.getItem("flag")));
  }
  console.log("How many Flags", flags.length);

  flagLow = JSON.parse(localStorage.getItem("flag")).toLowerCase();
  let flagWithUnderscore = JSON.parse(localStorage.getItem("flag")).replaceAll(
    " ",
    "_"
  );
  localStorage.setItem(
    "flagWithUnderscore",
    JSON.stringify(flagWithUnderscore)
  );
  console.log(JSON.parse(localStorage.getItem("flag")));

  let pngName =
    "<img src = ../Images/" +
    flagWithUnderscore +
    '.png  style="width:400px;height:250px;">';

  let box =
    '<input type="text" id="cGuess" name="number" autocomplete="one-time-code">';

  document.querySelector(".showFlag").innerHTML = pngName;
  document.querySelector(".showFlag").style["display"] = "inline-block";

  document.querySelector(".answer").innerHTML = box;

  document.querySelector(".answer").style["visibility"] = "visible";
  //document.querySelector(".submitButton").style["display"] = "inline-block";

  console.log("flagWithLetter", flagWithLetter);
  displayFlagScreen();

  /**** PREDICTIVE TEXT *****/

  document.getElementById("cGuess").addEventListener("keyup", function (e) {
    //e.preventDefault();
    document.getElementById("spanBut").style["display"] = "inline";
    console.log("cGuessvalue", cGuess.value);

    let keysJoin = String(cGuess.value).toLowerCase();
    console.log("keysjoin", keysJoin);
    //flagsCopy used to ensure all answer options stay. To avoid duplicates a country is removed from array "flags" after displayed.
    for (let i = 0; i < flagsCopy.length; i++) {
      if (
        String(keysJoin).toLowerCase() ===
          String(flagsCopy[i].slice(0, keysJoin.length)).toLowerCase() &&
        flagWithLetter.indexOf(flagsCopy[i] == -1)
      ) {
        if (!flagWithLetter.includes(flagsCopy[i])) {
          flagWithLetter.push(flagsCopy[i]);
        }
      }
    }
    console.log("flagwithLetter after first push", flagWithLetter);
    let filterFunct = function (a) {
      if (
        keysJoin.toLowerCase() ==
        String(a.slice(0, keysJoin.length)).toLowerCase()
      ) {
        return a;
      }
    };
    flagWithLetter = flagWithLetter.filter((item) => filterFunct(item));

    console.log("flagWithLetter", flagWithLetter);
    //checkonly alphabetical characters
    function alphabet(inputtxt) {
      if (inputtxt.match(letterOnly)) {
        return true;
      }
    }

    defineButtonText();
  });
  ///end predictive text

  document.querySelector(".instruction").style["display"] = "inline-block";
  //ensure current flag only removed last
}
console.log(
  "arrayDailyFlags countries",
  arrayDailyFlags.map((item) => flags[item])
);

if (JSON.parse(localStorage.getItem("flag")) == "") {
  console.log("noflag");
  localStorage.setItem("randomRun", JSON.stringify(false));
}

console.log(
  "outside function what flag",
  JSON.parse(localStorage.getItem("flag"))
);
submitValue();

function defineButtonText() {
  for (let i = 0; i < buttonClasses.length; i++) {
    document.getElementById(labelContent[i]).style["visibility"] = "visible";
    if (flagWithLetter[i]) {
      document.getElementById(
        labelContent[i]
      ).innerHTML = `${flagWithLetter[i]}`;
      //console.log("is first element checked?", document.querySelector('.First').checked);
      //document.querySelector(".First").style["display"] = "inline-block";
      document.getElementById(labelContent[i]).style["display"] =
        "inline-block";
    } else {
      document.querySelector(buttonClasses[i]).style["display"] = "none";
    }
  }
}

function submitValue() {
  console.log(
    "Submit value what flag",
    JSON.parse(localStorage.getItem("flag"))
  );
  //console.log("get input value what flag", JSON.parse(localStorage.getItem("flag")))
  for (let i = 0; i < buttonClasses.length; i++) {
    document
      .querySelector(buttonClasses[i])
      .addEventListener("click", function () {
        //console.log("submitting value", document.querySelector(buttonClasses[i]))

        buttonClicked = i + 1;

        getInputValue();
      });
  }
}

function getInputValue() {
  localStorage.setItem("valueSubmitted", JSON.stringify(true));
  let inputValue = document.getElementById(
    labelContent[buttonClicked - 1]
  ).innerHTML;
  document.querySelector(buttonClasses[buttonClicked - 1]).checked = false;
  document.getElementById(labelContent[buttonClicked - 1]).innerHTML == "";
  document.querySelector(".container").style["visibility"] = "visible";
  inputValLow = inputValue.toLowerCase();
  inputValue = "";
  feedbackScreenLayout();
  whichFeedbackScreen();
  flagWithLetter = [];
}

function feedbackScreenLayout() {
  if (turns < 4) {
    document.querySelector(".answer").style["visibility"] = "visible";
    document.querySelector(".flagName").style["visibility"] = "visible";
    document.querySelector(".showFlag").style["display"] = "none";
    document.querySelector(".instruction").style["display"] = "none";
    document.getElementById("spanBut").style["display"] = "none";
    document.querySelector(".flagName").style["display"] = "inline-block";
    document.querySelector(".feedback").style["display"] = "inline-block";
  }
}

function whichFeedbackScreen() {
  if (inputValLow == String(flagLow)) {
    localStorage.setItem("isCorrect", JSON.stringify(true));
    localStorage.setItem("isIncorrect", JSON.stringify(false));
    //correct();
    console.log("correct answer should lead to one more turn");
    buttonClicked = 0;
    inputValLow = "";
    score = JSON.parse(localStorage.getItem("score"));
    const score1 = score += 1;
    localStorage.setItem("score", JSON.stringify(score1));
    starFill();
  } else {
    localStorage.setItem("isIncorrect", JSON.stringify(true));
    localStorage.setItem("isCorrect", JSON.stringify(false));
    // incorrect();

    buttonClicked = 0;
    inputValLow = "";
  }
  if (JSON.parse(localStorage.getItem("turns")) < 4) {
    first4Turns();
  } else if (
    JSON.parse(localStorage.getItem("turns")) == 4 &&
    JSON.parse(localStorage.getItem("valueSubmitted")) == true
  ) {
    numGamestats();
    fifthTurn();
  }
}

function numGamestats() {
  //set long scores
  let gameScore = Number(JSON.parse(localStorage.getItem("score")) * 2 * 10);

  gameScores.push(gameScore);

  allGameScores =
    numGames == 0
      ? gameScores
      : JSON.parse(localStorage.getItem("allGameScores")).concat(gameScore);

  window.localStorage.setItem("allGameScores", JSON.stringify(allGameScores));
  averageScore = (
    gameScores.reduce((numa, numb) => numa + numb, 0) / gameScores.length
  ).toFixed(0);

  window.localStorage.setItem("averageScore", JSON.stringify(averageScore));

  numGames = window.localStorage.getItem(
    "allGameScores",
    JSON.stringify(allGameScores).length
  );
  //set score for inclusion in statsHTML
  statsScore = JSON.parse(localStorage.getItem("allGameScores"))[
    JSON.parse(localStorage.getItem("allGameScores")).length - 1
  ];
  gamesPlayed = allGameScores.length;

  const sumallGameScores = function (array) {
    for (let i = 0; i < array.length; i++) {
      sumLongCount += array[i];
    }
    return sumLongCount;
  };

  let sumLongCount = 0;
  statistics.innerHTML = `FLAGL Score: <strong>${statsScore}</strong><br>Games: <strong>${gamesPlayed}</strong><br>Average Score: <strong>${(
    sumallGameScores(JSON.parse(localStorage.getItem("allGameScores"))) /
    JSON.parse(localStorage.getItem("allGameScores")).length
  ).toFixed(0)}</strong>`;
}

/****Played 5 Games****/

//After the user completed 5 rounds see overall score

function gameWrapup() {
  countGames += 1;
  let turns0 = 0;
  let score0 = 0;

  starFill();
}
//displays new flag
function startAgain() {
  console.log("displayNewFlag");
  document.querySelector(".container").style["opacity"] = "100";

  document.querySelector(".answer").innerHTML = "";

  resetButton.style["display"] = "none";

  document.querySelector(".message").innerHTML = "";

  displayFlag();
}

//starts new game from scratch
function startNewGame() {
  gameWrapup();

  //generate random number
  document.querySelector(".container").style["opacity"] = "100";

  document.querySelector(".container").style["visibility"] = "visible";

  //get flags to original length
  flags.push(...countryDisplayed);
  countryDisplayed = [];

  resetButton.style["display"] = "none";
  document.querySelector(".finishGameMessage").style["display"] = "none";
  document.querySelector(".labelTimer").style["display"] = "none";

  document.querySelector(".instruction").innerHTML =
    "Which country does this flag belong to?";
  document.querySelector(".message").innerHTML = "";
  starFill();
  displayFlag();
}

/*****Stats Popup*****/
document.querySelector(".stat-icon").addEventListener("click", function () {
  if ((document.querySelector(".stats-popuptext").style["display"] = "none"))
    document.querySelector(".stats-popuptext").style["display"] =
      "inline-block";

  //checks if container or wrapup section open so it can be closed and opened by close button
  if (document.querySelector(".container").offsetParent != null) {
    containervisible = 1;

    document.querySelector(".container").style["visibility"] = "hidden";
  }

  if (document.querySelector(".answer").offsetParent != null) {
    answervisible = 1;

    document.querySelector(".answer").style["visibility"] = "hidden";
  }
  if (document.querySelector(".reset").offsetParent != null) {
    resetvisible = 1;

    document.querySelector(".reset").style["visibility"] = "hidden";
  }
  if (document.querySelector(".message").offsetParent != null) {
    messagevisible = 1;

    document.querySelector(".message").style["visibility"] = "hidden";
  }
});

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
//Close Button Stats
document
  .querySelector(".popupCloseButton")
  .addEventListener("click", function () {
    document.querySelector(".stats-popuptext").style["display"] = "none";
    if (containervisible == 1) {
      document.querySelector(".container").style["visibility"] = "visible";
      containervisible = 0;
    }
    if (answervisible == 1) {
      document.querySelector(".answer").style["visibility"] = "visible";
      answervisible = 0;
    }
    if (resetvisible == 1) {
      document.querySelector(".reset").style["visibility"] = "visible";
      resetvisible = 0;
    }
    if (messagevisible == 1) {
      document.querySelector(".message").style["visibility"] = "visible";
      messagevisible = 0;
    }
  });

/***********Help Popup******** */
document.querySelector(".how-to").addEventListener("click", function () {
  if (document.querySelector(".container").offsetParent != null) {
    containervisible = 1;

    document.querySelector(".container").style["visibility"] = "hidden";
  }

  if (document.querySelector(".answer").offsetParent != null) {
    answervisible = 1;

    document.querySelector(".answer").style["visibility"] = "hidden";
  }
  if (document.querySelector(".reset").offsetParent != null) {
    resetvisible = 1;
    document.querySelector(".reset").style["visibility"] = "hidden";
  }
  if (document.querySelector(".message").offsetParent != null) {
    messagevisible = 1;

    document.querySelector(".message").style["visibility"] = "hidden";
  }

  if ((document.querySelector(".help-popup").style["display"] = "none"))
    document.querySelector(".help-popup").style["display"] = "inline-block";
});

//Close Button - Help

document
  .querySelector(".popupCloseButton-help")
  .addEventListener("click", function () {
    document.querySelector(".help-popup").style["display"] = "none";

    //ensures elements previously open stay displayed
    if (containervisible == 1) {

      document.querySelector(".container").style["visibility"] = "visible";
      containervisible = 0;
    }

    if (answervisible == 1) {
      document.querySelector(".answer").style["visibility"] = "visible";
      answervisible = 0;
    }

    if (resetvisible == 1) {
      document.querySelector(".reset").style["visibility"] = "visible";
      resetvisible = 0;
    }

    if (messagevisible == 1) {
      document.querySelector(".message").style["visibility"] = "visible";
      messagevisible = 0;
    }
  });

