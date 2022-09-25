let flags = [
  "Algeria",
  "Angola",
  "Burundi",
  "Benin",
  "Burkina Faso",
  "Botswana",
  "Cameroon",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo",
  "Democratic Republic of Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea Bissau",
  "Ivory Coast",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mauritania",
  "Mauritius",
  "Mali",
  "Mayotte",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Reunion",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "eSwatini",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zanzibar",
  "Zambia",
  "Zimbabwe",
  "Afghanistan",
  "Bahrain",
  "Bangladesh",
  "Bhutan",
  "Brunei",
  "Cambodia",
  "China",
  "East Timor",
  "Hong Kong",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Jordan",
  "Japan",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Lebanon",
  "Macau",
  "Malaysia",
  "Maldives",
  "Mongolia",
  "Myanmar",
  "Nepal",
  "North Korea",
  "Oman",
  "Pakistan",
  "Palestine",
  "Philippines",
  "Qatar",
  "Saudi Arabia",
  "Korea",
  "Sri Lanka",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Thailand",
  "Turkmenistan",
  "United Arab Emirates",
  "Uzbekistan",
  "Vietnam",
  "Yemen",
  "Albania",
  "Andorra",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Belarus",
  "Belgium",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czechia",
  "Denmark",
  "England",
  "Estonia",
  "Faroe Islands",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Kazakhstan",
  "Kosovo",
  "Liechtenstein",
  "Lithuania",
  "Latvia",
  "Luxembourg",
  "Malta",
  "Moldova",
  "Monaco",
  "Montenegro",
  "Netherlands",
  "Norway",
  "North Macedonia",
  "Northern Ireland",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "San Marino",
  "Scotland",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Turkey",
  "Ukraine",
  "Wales",
  "American Samoa",
  "Australia",
  "Cook Islands",
  "Fiji",
  "Kiribati",
  "Micronesia",
  "New Caledonia",
  "New Zealand",
  "Northern Mariana Islands",
  "Papua New Guinea",
  "Samoa",
  "Solomon Islands",
  "Tahiti",
  "Tuvalu",
  "Vanuatu",
  "Argentina",
  "Bolivia",
  "Brazil",
  "Chile",
  "Colombia",
  "Ecuador",
  "Paraguay",
  "Uruguay",
  "Venezuela",
  "Anguilla",
  "Aruba",
  "Antigua and Barbuda",
  "Bahamas",
  "Barbados",
  "Belize",
  "Bermuda",
  "Bonaire",
  "British Virgin Islands",
  "Saint Barthelemy",
  "Canada",
  "Cayman Islands",
  "Costa Rica",
  "Cuba",
  "Curacao",
  "Dominica",
  "Dominican Republic",
  "El Salvador",
  "French Guiana",
  "Grenada",
  "Guadeloupe",
  "Guatemala",
  "Guyana",
  "Haiti",
  "Honduras",
  "Jamaica",
  "Martinique",
  "Mexico",
  "Montserrat",
  "Nicaragua",
  "Panama",
  "Puerto Rico",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Suriname",
  "Trinidad and Tobago",
  "Turks and Caicos",
  "United Kingdom",
  "United States",
  "Greenland",
  "Peru",
  "Singapore",
  "Tonga",
  "Wallis and Futuna",
];
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
//let inputVal = "";
let flagsort = flags.sort();
console.log("flagsort", flagsort);
console.log("how many flags", flags.length);
let passed = 0;
let turns = 0;
let countGames = 0;
let gameScores = [];
let longGameScores = [];
console.log(
  "first longGameScores, variable",
  JSON.parse(localStorage.getItem("longGameScores"))
);
//cater for first element
console.log(
  "get longGameScores, first Game",
  JSON.parse(localStorage.getItem("longGameScores"))
);
let longGames =
  JSON.parse(localStorage.getItem("longGameScores")) != null
    ? JSON.parse(localStorage.getItem("longGameScores")).length
    : 0;
//console.log("is longGamesScores.length zero", JSON.parse(localStorage.getItem("longGameScores")).length==0)
console.log("longgames", longGames);

let longGameAverage =
  JSON.parse(localStorage.getItem("longGameScores")) != null
    ? (
        JSON.parse(localStorage.getItem("longGameScores")).reduce(
          (numa, numb) => numa + numb,
          0
        ) / JSON.parse(localStorage.getItem("longGameScores")).length
      ).toFixed(0)
    : 0;

    let statsScore = JSON.parse(localStorage.getItem("longGameScores")) != null
? (
  JSON.parse(localStorage.getItem("longGameScores"))[((JSON.parse(localStorage.getItem("longGameScores"))).length)-1]):0;

let numFlagGuesses = 0;
let countryDisplayed = [];
let flag = "";
let score = 0;


let correctAnswer = "Congratulations. That was correct.";
let incorrectAnswer = "Unlucky. That was not correct.";

let resetButton = document.querySelector(".reset");
let gameScore = document.querySelector(".getGameScore");

let averageScore = 0;
//let longaverageScore = 0;
let gamesPlayed = 0;
let containervisible = 0;
let wrapupvisible = 0;
let answervisible = 0;
let resetvisible = 0;
let messagevisible = 0;
let statistics = document.querySelector(".stats");
//sumLongCount needed for sum equation to add up items in array for average score
let sumLongCount = 0;
let letter = "";

/*******local storage 
 * get local storage for turns and scores then commit
 * get local storage for flag per turn
 * could split flag generating function
 * for each turn keep flag as is, then change
 * run function for wrapup screen if wrapup screen time using local storage data
 * run function for show Game Score if show Game Score using local storage data
 */

//timer function
/*
window.onbeforeunload = function(){
  
  localStorage.setItem("score", JSON.stringify(score));
  localStorage.setItem("turns", JSON.stringify(turns));
};
window.unload = function(){
  console.log("refreshed");
  JSON.parse(localStorage.getItem("score", JSON.stringify(score)));
  JSON.parse(localStorage.getItem("turns", JSON.stringify(turns)));
  console.log("score, turns", JSON.parse(localStorage.getItem("score", JSON.stringify(score))), JSON.parse(localStorage.getItem("turns", JSON.stringify(turns))))
}*/

console.log("stored score turns", JSON.parse(localStorage.getItem("score", JSON.stringify(score))),
JSON.parse(localStorage.getItem("turns", JSON.stringify(turns))))

document.querySelector(".labelTimer").style["display"] = "none";
//document.querySelector(".submitButton").style["display"] = "none";

console.log(
  "longGameScores",
  JSON.parse(localStorage.getItem("longGameScores"))
);



  const tick  = function(){
    //  window.onbeforeunload = function () {return null; 
    // console.log("testwindow.beforeunload")};
  

    if (new Date().getSeconds() ==0 && (new Date().getMinutes()==30)){
      
      
      startNewGame();
      console.log("START NEW GAME");
}
  

    let date = new Date(); 
    //console.log("date.getMinutes ==", 60-new Date().getMinutes());
   //console.log("date.getSeconds ==", 61-new Date().getSeconds());
    //console.log("new Date()", date.getTime());
    //get value of last hour and add an hour
    //let countDown =  ((( new Date().getTime()/60000 -((new Date().getTime())/60000)%(1000*60*60))) +1000*60*60);
    //let timeUntil = countDown - new Date().getTime()/60000;
    
    //console.log("countDown - new Date() in sec ---", (countDown- new Date())/1000/60/60);

   // console.log("tick function working")
   document.querySelector(".labelTimer").style['visibility'] = "visible";
   //document.querySelector(".labelTimer").innerHTML = `This game restarts in ${secmin}`;
   //console.log("get min and seconds", labelTimer.textContent);

   document.querySelector(".labelTimer").innerHTML = `This Game Will Restart in <strong>${60-new Date().getMinutes()}</strong> Minutes <strong>${61-new Date().getSeconds()}</strong> Seconds`
   //document.querySelector(".labelTimer")[0].innerHTML = `${60-new Date().getMinutes()} Minutes ${61-new Date().getSeconds()} Seconds`;
 
    //if (time ===0){
      time = 60;
     // clearInterval(timer);
   // }
    time = time-1;
  };
  tick();

  setInterval(tick, 1000);

//console.log("localStorageLongGameAverage", longGameAverage);
//selection.style["display"] = "none";
//document.querySelector(".startNewGame").style["display"] = "none";
//document.querySelector(".startNewGame").style["visibility"] = "hidden";
//document.querySelector(".submitButton").style["display"] = "none";

console.log(
  "longGameScores",
  JSON.parse(localStorage.getItem("longGameScores"))
);

document.querySelector(
  ".stats"
).innerHTML = `FLAGL Score: <strong>${statsScore}</strong><br>Games: <strong>${longGames}</strong><br>Average Score: <strong>${longGameAverage}</strong>`;
console.log("stats message", statistics);

function randomNumber() {
  return Math.abs(Math.floor(Math.random() * flags.length));
}

console.log(randomNumber());

function first4Turns() {
  console.log((JSON.parse(localStorage.getItem("turns"))))
  let turns = JSON.parse(localStorage.getItem("turns"))
  let turns1 = turns += 1;
  localStorage.setItem("turns", JSON.stringify(turns1));
  console.log("score, turns in first 4",JSON.parse(localStorage.getItem("score")) , JSON.parse(localStorage.getItem("turns")));
  resetButton.style["display"] = "inline-block";
  document.querySelector(".reset").innerHTML =
    '<button type = button class = "reset">Have Another Go</button>';

  resetButton.addEventListener("click", startAgain);
}
function fifthTurn() {
  console.log("!!4 turns!!");
  document.querySelector(".getGameScore").style["display"] = "inline-block";
  resetButton.style["display"] = "none";
  console.log("score, turns in fifth Turn", JSON.parse(localStorage.getItem("score")), JSON.parse(localStorage.getItem("turns")));
}

function correct() {
  console.log("got correct");
  buttonClicked = 0;
  document.getElementById("spanBut").style["display"] = "none";
  document.querySelector(".container").style["visibility"] = "visible";
  document.querySelector(".message").style["visibility"] = "visible";
  document.querySelector(".message").innerHTML = correctAnswer;

  //document.querySelector(".submitButton").style["display"] = "none";
  score1 = score += 1;
  localStorage.setItem("score", JSON.stringify(score1));
  if (JSON.parse(localStorage.getItem("turns")) < 4) {
    first4Turns();
    inputValue = "";
  } else if (JSON.parse(localStorage.getItem("turns")) == 4) {
    fifthTurn();
  }
}
function incorrect() {
  console.log("buttonClicked", buttonClicked);
  buttonClicked = 0;
  console.log("got incorrect");
  document.getElementById("spanBut").style["display"] = "none";
  document.querySelector(".container").style["visibility"] = "visible";
  document.querySelector(".message").innerHTML = incorrectAnswer;

  if (JSON.parse(localStorage.getItem("turns")) < 4) {
    first4Turns();
    inputValue = "";
  } else if (JSON.parse(localStorage.getItem("turns")) == 4) {
    fifthTurn();
  }
}

function displayFlag() {
  console.log(
    "firstlabel first at=fter displayflag",
    document.getElementById("firstLabel")
  );
 // let selection = document.querySelector(".selection");
  //document.querySelector(".selection").style["visibility"] = "hidden";
  document.querySelector(".wrapup").style["z-index"] = "-1";
  document.getElementById("spanBut").style["display"] = "none";
  startButton.style["visibility"] = "hidden";
  document.querySelector(".container").style["visibility"] = "visible";
  document.querySelector(".message").style["visibility"] = "visible";
  document.querySelector(".intro").innerHTML = "<br>Type and Select a Country";

  flag = String(flags[randomNumber()]);
  flagIndex = flags.indexOf(flag);
  console.log("flagIndex, flag", flagIndex, flag);
  if (JSON.parse(localStorage.getItem("turns")) < 4) {
    console.log(flag);
    console.log("countryDisplayed", countryDisplayed);
    console.log("countryDisplayed", typeof countryDisplayed);

    countryDisplayed.push(flag);
  }
  console.log("How many Flags", flags.length);

  flagLow = flag.toLowerCase();
  flagWithUnderscore = flag.replaceAll(" ", "_");
  console.log(flag);

  pngName =
    "<img src = Images/" +
    flagWithUnderscore +
    '.png  style="width:400px;height:250px;">';

  let box =
    '<input type="text" id="cGuess" autocomplete="autocomplete_off_randString">';
  /* for(letter of  getInputValue()){
    console.log("letter", letter);
  }*/

  document.querySelector(".showFlag").innerHTML = pngName;

  document.querySelector(".answer").innerHTML = box;

  document.querySelector(".answer").style["visibility"] = "visible";
  //document.querySelector(".submitButton").style["display"] = "inline-block";

  console.log("flagWithLetter", flagWithLetter);

  /**** PREDICTIVE TEXT *****/

  document.getElementById("cGuess").addEventListener("keyup", function (e) {
    //e.preventDefault();
    //document.querySelector(".selection").innerHTML = "";
    document.getElementById("spanBut").style["display"] = "inline";
    console.log("cGuessvalue", cGuess.value);

    let keysJoin = String(cGuess.value).toLowerCase();
    console.log("keysjoin", keysJoin);

    for (i = 0; i < flags.length; i++) {
      if (
        String(keysJoin).toLowerCase() ===
          String(flags[i].slice(0, keysJoin.length)).toLowerCase() &&
        flagWithLetter.indexOf(flags[i] == -1)
      ) {
        if (!flagWithLetter.includes(flags[i])) {
          flagWithLetter.push(flags[i]);
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

    //Display Predictive text
    //document.querySelector(".selection").style["display"] = "inline-block";
    //document.querySelector(".selection").style["visibility"] = "visible";
    //console.log(
    //  "selection displayed",
    //  (document.querySelector(".selection").style["display"] = "inline-block")
   // );

    defineButtonText();
  });
  ///end predictive text

  document.querySelector(".start").style["display"] = "none";
  document.querySelector(".introduction").style["display"] = "none";
  document.querySelector(".instruction").style["display"] = "inline-block";
  //ensure current flag only removed last
}

submitValue();

function defineButtonText() {
  for (i = 0; i < buttonClasses.length; i++) {
    if (flagWithLetter[i]) {
      //console.log("flag with letter[i]", flagWithLetter[i]);
      //console.log("1st flags with letter full", i);
      // console.log("firstLabel",  i);
      document.getElementById(
        labelContent[i]
      ).innerHTML = `${flagWithLetter[i]}`;
      //console.log("is first element checked?", document.querySelector('.First').checked);
      //document.querySelector(".First").style["display"] = "inline-block";
      document.getElementById(labelContent[i]).style["visibility"] = "visible";
      document.getElementById(labelContent[i]).style["display"] =
        "inline-block";
      //console.log("button 1 displayed", document.getElementById(labelContent[0]).style["visibility"] = "visible");
      //console.log("button 2 displayed", document.getElementById(labelContent[1]).style["visibility"] = "visible");
      //console.log("button 3 displayed", document.getElementById(labelContent[2]).style["visibility"] = "visible")
    } else {
      document.getElementById(labelContent[i]).style["visibility"] = "visible";
      document.querySelector(buttonClasses[i]).style["display"] = "none";
    }
  }
}

function submitValue() {
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
  console.log("getinputval started");
  console.log("buttonClicked in beg input value is", buttonClicked);

  inputValue = document.getElementById(
    labelContent[buttonClicked - 1]
  ).innerHTML;
  document.querySelector(buttonClasses[buttonClicked - 1]).checked = false;
  document.getElementById(labelContent[buttonClicked - 1]).innerHTML == "";

  //document.querySelector(".selection").style["visibility"] = "hidden";
  //document.querySelector(".option").style["visibility"] = "hidden";
  document.querySelector(".container").style["visibility"] = "visible";
 // selection.style["display"] = "none";
  // Selecting the input element and get its value
  console.log(
    "longGameScores",
    JSON.parse(localStorage.getItem("longGameScores"))
  );

  inputValLow = inputValue.toLowerCase();
  inputValue = "";
  //console.log("inputValLow", inputValLow);

  //console.log("string flag", String(flag));
  console.log("longGames", longGames);
  document.querySelector(".answer").style["visibility"] = "visible";

  if (inputValLow == String(flagLow)) {
    correct();
    console.log("correct answer should lead to one more turn");
    buttonClicked = 0;
    inputValLow = "";
  } else {
    incorrect();
    console.log("correct answer should lead to one more turn");
    buttonClicked = 0;
    inputValLow = "";
  }

  //let scorePerTurn = score / turns;

  //document.querySelector(".stats").innerHTML = `You have guessed ${score} flag(s) correctly in ${turns} turn(s). Your guessing average per turn is ${scorePerTurn.toFixed(2)}.`;

  document.querySelector(".answer").innerHTML = `The answer is ${flag}`;
  document.querySelector(".intro").innerHTML = "";
  document.querySelector(".instruction").innerHTML = "";
  document.querySelector(".showFlag").innerHTML = "";
  flagWithLetter = [];

  //reset values
  flags.splice(flagIndex, 1);
}

var startButton = document.querySelector(".start");
//startButton.style.color = "blue";
startButton.addEventListener("click", displayFlag);

/****Played 5 Games****/

console.log(JSON.parse(localStorage.getItem("turns")), "turns");

//After the user completed 5 rounds see overall score

document.querySelector(".getGameScore").addEventListener("click", function () {
  console.log("finishCycle started");

  document.querySelector(".container").style["opacity"] = "0";
  //document.querySelector(".finishGameMessage").style['display'] = "none";
  console.log("endScore, turns", JSON.parse(localStorage.getItem("score")), JSON.parse(localStorage.getItem("turns")));
  document.querySelector(".wrapup").style["display"] = "inline-block";
  document.querySelector(".wrapup").style["visibility"] = "visible";
  document.querySelector(".wrapup").style["opacity"] = "100";
  document.querySelector(".wrapup").style["z-index"] = "1";
  document.querySelector(".labelTimer").style["display"] =
  "inline-block";

  //document.querySelector(".container").style["visibility"] = "visible";
  document.querySelector(".finishGameMessage").style["display"] =
    "inline-block";
  document.querySelector(".finishGameMessage").style["visibility"] = "visible";
  if (score === 5) {
    document.querySelector(".finishGameMessage").innerHTML =
      "Congratulations, you scored 100%!";
  }
  if (1 <= JSON.parse(localStorage.getItem("score")) <= 4) {
    document.querySelector(".finishGameMessage").innerHTML = `You have scored ${
      JSON.parse(localStorage.getItem("score")) * 2
    }0%`;
  }
  if (JSON.parse(localStorage.getItem("score")) === 0) {
    document.querySelector(
      ".finishGameMessage"
    ).innerHTML = `Unlucky, you scored 0%`;
  }

  let gameScore = Number(JSON.parse(localStorage.getItem("score")) * 2 * 10);
  console.log("gameScore", gameScore);
  gameScores.push(gameScore);
  console.log(
    "longGameScores",
    JSON.parse(localStorage.getItem("longGameScores"))
  );
  longGameScores =
    longGames == 0
      ? gameScores
      : JSON.parse(localStorage.getItem("longGameScores")).concat(gameScore);
  console.log("longGameScores after concat", longGameScores);

  window.localStorage.setItem("longGameScores", JSON.stringify(longGameScores));
  console.log(
    "longGames 1st part of formula, expected: true",
    JSON.parse(localStorage.getItem("longGameScores")) != null
  );

  // statistics.innerHTML = `Games: ${longGames}<br>Average Score: ${JSON.parse(localStorage.getItem("longGameAverage"))}`;
  console.log("statistics.innerHTML", statistics);
  console.log("longGames after longGamesScores set", longGames);
  console.log("longGameScores", longGameScores);
  console.log("gameScores", gameScores);

  averageScore = (
    gameScores.reduce((numa, numb) => numa + numb, 0) / gameScores.length
  ).toFixed(0);
  console.log("averageScore", averageScore);

  countGames += 1;
  turns0 = 0;
  score0 = 0;

  localStorage.setItem("turns", JSON.stringify(turns0));
  localStorage.setItem("score", JSON.stringify(score0));

  //document.querySelector(".finishGameInstruction").style['display'] = "inline-block";

  window.localStorage.setItem("averageScore", JSON.stringify(averageScore));

  longGames = window.localStorage.getItem(
    "longGameScores",
    JSON.stringify(longGameScores).length
  );
//set score for inclusion in statsHTML
  statsScore = JSON.parse(localStorage.getItem("longGameScores"))[((JSON.parse(localStorage.getItem("longGameScores"))).length)-1];
  gamesPlayed = longGameScores.length;

  sumLongGameScores = function (array) {
    for (let i = 0; i < array.length; i++) {
      //console.log(array[i])
      sumLongCount += array[i];
      //console.log(sumLongCount);
    }
    return sumLongCount;
  };

  console.log("gamePlayed", gamesPlayed);

  let sumLongCount = 0;
  statistics.innerHTML = `FLAGL Score: <strong>${statsScore}</strong><br>Games: <strong>${gamesPlayed}</strong><br>Average Score: <strong>${(
    sumLongGameScores(JSON.parse(localStorage.getItem("longGameScores"))) /
    JSON.parse(localStorage.getItem("longGameScores")).length
  ).toFixed(0)}</strong>`;
  //console.log('statistics.innerHTML', statistics);
  //console.log("longGames after longGamesScores set", longGames)
  console.log("longGameScores", longGameScores);
  //console.log("gameScores", gameScores);
  //console.log("testaverageScore", JSON.parse(window.localStorage.getItem("averageScore")));

  //console.log("countGames", countGames, "averageScore", averageScore)

  //document.querySelector(".startNewGame").style["display"] = "inline-block";
  //document.querySelector(".startNewGame").style["visibility"] = "visible";
  document.querySelector(".getGameScore").style["display"] = "none";
  document.querySelector(".container").style["visibility"] = "hidden";
  resetButton.style["display"] = "";
});

function startAgain() {
  console.log("started again");
  document.querySelector(".container").style["opacity"] = "100";
  //document.querySelector(".startAgain").innerHTML = "";

  document.querySelector(".answer").innerHTML = "";

  resetButton.style["display"] = "none";
  document.querySelector(".instruction").innerHTML =
    "Which country does this flag belong to?";
  document.querySelector(".message").innerHTML = "";
  document.querySelector(".getGameScore").style["display"] = "none";
  displayFlag();
}

//starts new game from scratch
startNewGame =function() {
  console.log("start new game selected");
  document.querySelector(".container").style["opacity"] = "100";
  document.querySelector(".wrapup").style["opacity"] = "0";

  document.querySelector(".container").style["visibility"] = "visible";
  document.querySelector(".wrapup").style["visibility"] = "hidden";
  document.querySelector(".finishGameMessage").style["visibility"] = "hidden";
  document.querySelector(".startNewGame").style["visibility"] = "hidden";

  //get flags to original length
  flags.push(...countryDisplayed);
  countryDisplayed = [];

  score0 = 0;
  turns0 = 0;
  localStorage.setItem("score", JSON.stringify(score0));
  localStorage.setItem("score", JSON.stringify(turns0));

  resetButton.style["display"] = "none";
  document.querySelector(".instruction").innerHTML =
    "Which country does this flag belong to?";
  document.querySelector(".message").innerHTML = "";
  // document.querySelector(".message").innerHTML = "";
  document.querySelector(".getGameScore").style["display"] = "none";
  displayFlag();
};

/*****Stats Popup*****/
document.querySelector(".stat-icon").addEventListener("click", function () {
  if ((document.querySelector(".stats-popuptext").style["display"] = "none"))
    document.querySelector(".stats-popuptext").style["display"] =
      "inline-block";

    //Ensures wrapup section doesn't appear underneath popup contetn  
    document.querySelector(".wrapup").style["opacity"] = "0";

  //checks if container or wrapup section open so it can be closed and opened by close button
  if (document.querySelector(".container").offsetParent != null) {
    containervisible = 1;

    document.querySelector(".container").style["visibility"] = "hidden";
  }
  if (document.querySelector(".wrapup").offsetParent != null) {
    wrapupvisible = 1;

    document.querySelector(".wrapup").style["visibility"] = "hidden";
    document.querySelector(".wrapup").style["z-index"] = "-1";
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
  
//copy results from stats popup
  document
  .querySelector(".shareResults")
  .addEventListener("click", function () {
    {
      var r = document.createRange();
      r.selectNode(document.querySelector(".statsContent"));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      alert("FLAGL Results Copied");
    }
  });
});
//Close Button Stats
document
  .querySelector(".popupCloseButton")
  .addEventListener("click", function () {

    //Ensures wrapup section can be viewed after close
    document.querySelector(".wrapup").style["opacity"] = "100";

    document.querySelector(".stats-popuptext").style["display"] = "none";
    if (containervisible == 1) {
      document.querySelector(".container").style["visibility"] = "visible";
      containervisible = 0;
    }
    if (wrapupvisible == 1) {
      document.querySelector(".wrapup").style["visibility"] = "visible";
      wrapupvisible = 0;
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
    //document.querySelector(".container").style.visibility = "visible";
    //document.querySelector(".wrapup").style.visibility = "visible";
  });

/***********Help Popup******** */
document.querySelector(".how-to").addEventListener("click", function () {

  document.querySelector(".wrapup").style["opacity"] = "0";

  if (document.querySelector(".container").offsetParent != null) {
    containervisible = 1;

    document.querySelector(".container").style["visibility"] = "hidden";
  }
  if (document.querySelector(".wrapup").offsetParent != null) {
    wrapupvisible = 1;

    document.querySelector(".wrapup").style["visibility"] = "hidden";
    

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

  //document.querySelector(".container").style.visibility = "hidden";
});

//Close Button - Help

document
  .querySelector(".popupCloseButton-help")
  .addEventListener("click", function () {
    document.querySelector(".help-popup").style["display"] = "none";

    document.querySelector(".wrapup").style["opacity"] = "100";
    //ensures elements previously open stay displayed
    if (containervisible == 1) {
      // console.log("container visible 1 or 0", containervisible);
      document.querySelector(".container").style["visibility"] = "visible";
      containervisible = 0;
    }

    if (wrapupvisible == 1) {
      document.querySelector(".wrapup").style["visibility"] = "visible";
      wrapupvisible = 0;
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

/*********/
