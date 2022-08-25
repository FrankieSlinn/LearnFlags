const flags = [
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
let flagsort = flags.sort();
console.log("flagsort", flagsort);
console.log("how many flags", flags.length);
let passed = 0;
let turns = 0;
let countGames = 0;
let gameScores = [];
let longGameScores = [];
console.log("first longGameScores, variable", JSON.parse(localStorage.getItem("longGameScores")))
//cater for first element
console.log("get longGameScores, first Game", JSON.parse(localStorage.getItem("longGameScores")))
let longGames = JSON.parse(localStorage.getItem("longGameScores"))!=null?JSON.parse(localStorage.getItem("longGameScores")).length:0;
//console.log("is longGamesScores.length zero", JSON.parse(localStorage.getItem("longGameScores")).length==0)
console.log("longgames", longGames)


let longGameAverage = JSON.parse(localStorage.getItem("longGameScores"))!=null?((JSON.parse(localStorage.getItem("longGameScores")).reduce((numa, numb) => numa + numb, 0)) / JSON.parse(localStorage.getItem("longGameScores")).length).toFixed(0):0;


let score = 0;
let numFlagGuesses = 0;
let countryDisplayed = [];
let flag = "";
//let flagCandidate = String(flags[randomNumber()]);

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
let statistics = document.querySelector('.stats');
//sumLongCount needed for sum equation to add up items in array for average score
let sumLongCount = 0;

console.log("localStorageLongGameAverage", longGameAverage);

  console.log("longGameScores", JSON.parse(localStorage.getItem("longGameScores")));

  

  document.querySelector(
    ".stats"
  ).innerHTML = `Games: ${longGames}<br>Average Score: ${longGameAverage}`;
  console.log("stats message", statistics)

function randomNumber() {
  return Math.abs(Math.floor(Math.random() * flags.length));
}

console.log(randomNumber());

function correct() {
    document.querySelector(".container").style["visibility"] = "visible";
    document.querySelector(".message").style["visibility"] = "visible";
  document.querySelector(".message").innerHTML = correctAnswer;

  document.querySelector(".submitButton").style["display"] = "none";
  score += 1;
  if (turns <= 4) {
    turns += 1;
    console.log("score, turns", score, turns);
  } else if (turns == 4) {
    console.log("!!4 turns!!");
    document.querySelector(".getGameScore").style["display"] = "inline-block";
    resetButton.style["display"] = "none";
    console.log("score, turns", score, turns);
  }
}

function getInputValue() {
    document.querySelector(".container").style["visibility"] = "visible";
  // Selecting the input element and get its value
  inputVal = document.getElementById("cGuess").value;
  inputValLow = inputVal.toLowerCase().trim();
  console.log(inputVal);
  
  console.log("string flag", String(flag));
  console.log("longGames", longGames);
  document.querySelector(".answer").style["visibility"] = "visible";
 
  document.querySelector(".submitButton").style["display"] = "none";
  if (inputValLow == String(flagLow)) {
    correct();
  } else if (String(flagLow) === "united states") {
    if (
      inputValLow === "usa" ||
      "us" ||
      "united states of america" ||
      "america"
    ) {
      correct();
    }
  } else if (String(flagLow) === "united kingdom") {
    if (inputValLow === "uk" || "britain" || "great britain") {
      correct();
    }
  } else if (String(flagLow) === "antigua and barbuda") {
    if (inputValLow === "Antigua" || "Barbuda") {
      correct();
    }
  } else if (String(flagLow) === "netherlands") {
    if (inputValLow === "Holland" || "holland") {
      correct();
    }
  } else if (String(flagLow) === "eswatini") {
    if (inputValLow === "swaziland") {
      correct();
    }
  } else if (String(flagLow) === "myanmar") {
    if (inputValLow === "burma") {
      correct();
    }
  } else if (String(flagLow) === "korea") {
    if (inputValLow === "south korea") {
      correct();
    }
  } else if (String(flagLow) === "british virgin islands") {
    if (inputValLow === "virgin islands") {
      correct();
    }
  }
    else if (String(flagLow) === "saint barthelemy") {
      if (inputValLow === "st barths"|| "st barts"|| "st barthelemy" || "saint barts" || "saint barths") {
        correct();
      }
    }
    else if (String(flagLow) === "saint vincent and the grenadines") {
      if (inputValLow === "st vincent and the grenadines" || "st vincent" || "saint vincent") {
        correct();
      }
    }

   else {
    document.querySelector(".container").style["visibility"] = "visible";
    document.querySelector(".message").innerHTML = incorrectAnswer;

    if (turns <= 4) {
      turns += 1;
      console.log("score, turns", score, turns);
    } else {
      document.querySelector(".startNewGame").style["display"] = "inline-block";

      console.log("score, turns", score, turns);
    }
  }

  let scorePerTurn = score / turns;

  //document.querySelector(".stats").innerHTML = `You have guessed ${score} flag(s) correctly in ${turns} turn(s). Your guessing average per turn is ${scorePerTurn.toFixed(2)}.`;

  document.querySelector(".answer").innerHTML = `The answer is ${flag}`;
  document.querySelector(".intro").innerHTML = "";
  document.querySelector(".instruction").innerHTML = "";
  document.querySelector(".showFlag").innerHTML = "";

  if (turns <= 4) {
    resetButton.style["display"] = "inline-block";
    document.querySelector(".reset").innerHTML =
      '<button type = button class = "reset">Have Another Go</button>';
    
    resetButton.addEventListener("click", startAgain);
  } else {
    
    document.querySelector(".getGameScore").style["display"] = "inline-block";
    document.querySelector(".reset").style["display"] = "none";
  }

  //const begin = document.querySelector(".start");
  //begin.style.display = 'none';
}

function displayFlag() {
  
  document.querySelector(".container").style["visibility"] = "visible";
  document.querySelector(".message").style["visibility"] = "visible";
  document.querySelector(".intro").innerHTML = "<br>Type the answer below";

  flag = String(flags[randomNumber()]);
  flagIndex = flags.indexOf(flag);
  console.log("flagIndex, flag", flagIndex, flag);
  if (turns < 5) {
    countryDisplayed.push(flag);

    flags.splice(flagIndex, 1);
  }
  console.log("How many Flags", flags.length);

  flagLow = flag.toLowerCase();
  flagWithUnderscore = flag.replaceAll(" ", "_");
  console.log(flag);
  

  pngName =
    "<img src = Images/" +
    flagWithUnderscore +
    '.png  style="width:400px;height:250px;">';

  let box = '<input type="text" id="cGuess" autocomplete = "off">';

  document.querySelector(".showFlag").innerHTML = pngName;

  document.querySelector(".answer").innerHTML = box;

  document.querySelector(".answer").style["visibility"] = "visible";
 
 

  document.querySelector(".submitButton").style["display"] = "block";
  document.getElementById("cGuess").addEventListener("keyup", function (e) {
    e.preventDefault();
    if (e.key === "Enter") {
      
      getInputValue();
    }
  });
  //document.querySelector(".stats").innerHTML = "Currently no stats available";
  document.querySelector(".start").style["display"] = "none";
  document.querySelector(".introduction").style["display"] = "none";
  document.querySelector(".instruction").style["display"] = "inline-block";
}
//function resetGame(){
//document.querySelector("reset")

//};

var startButton = document.querySelector(".start");
startButton.style.color = "blue";
startButton.addEventListener("click", displayFlag);

/****Played 5 Games****/

console.log(turns, "turns");

//After the user completed 5 rounds see overall score

document.querySelector(".getGameScore").addEventListener("click", function () {
  console.log("finishCycle started");
  
  document.querySelector(".container").style['opacity'] = "0";
  //document.querySelector(".finishGameMessage").style['display'] = "none";
  console.log("endScore", score);
  //document.querySelector(".wrapup").style['display'] = "inline-block";
  //document.querySelector(".container").style["visibility"] = "visible";
  document.querySelector(".finishGameMessage").style["display"] =
    "inline-block";
  if (score === 5) {
    document.querySelector(".finishGameMessage").innerHTML =
      "Congratulations, you scored 100%!";
  }
  if (1 <= score <= 4) {
    document.querySelector(".finishGameMessage").innerHTML = `You have scored ${
      score * 2
    }0%`;
  }
  if (score === 0) {
    document.querySelector(
      ".finishGameMessage"
    ).innerHTML = `Unlucky, you scored 0%`;
  }
  

  let gameScore = Number(score * 2 * 10);
  console.log("gameScore", gameScore);
  gameScores.push(gameScore);
  longGameScores = longGames ==0?gameScores:JSON.parse(localStorage.getItem("longGameScores")).concat(gameScores);
  console.log("longGameScores after concat", longGameScores);
  
  window.localStorage.setItem("longGameScores", JSON.stringify(longGameScores));
  console.log("longGames 1st part of formula, expected: true", JSON.parse(localStorage.getItem("longGameScores"))!=null)
  
 // statistics.innerHTML = `Games: ${longGames}<br>Average Score: ${JSON.parse(localStorage.getItem("longGameAverage"))}`;
  console.log('statistics.innerHTML', statistics);
  console.log("longGames after longGamesScores set", longGames)
  console.log("longGameScores", longGameScores)
  console.log("gameScores", gameScores);
 
 
  averageScore = (
    gameScores.reduce((numa, numb) => numa + numb, 0) / gameScores.length
  ).toFixed(0);
  console.log("averageScore", averageScore);

  countGames += 1;
  turns = 0;
  score = 0;

  //document.querySelector(".finishGameInstruction").style['display'] = "inline-block";
 
 
  window.localStorage.setItem("averageScore", JSON.stringify(averageScore));

  longGames = window.localStorage.getItem("longGameScores", JSON.stringify(longGameScores).length);
  gamesPlayed = longGameScores.length; 
  
  sumLongGameScores = function(array){
    for (let i=0; i<array.length; i++){
       console.log(array[i])
      sumLongCount+=array[i];
      console.log(sumLongCount);

    }
    return sumLongCount;

  };
 
  console.log("gamePlayed", gamesPlayed);
 
  let sumLongCount = 0;
  statistics.innerHTML = `Games: ${gamesPlayed}<br>Average Score: ${((sumLongGameScores(JSON.parse(localStorage.getItem("longGameScores")))) / ((JSON.parse(localStorage.getItem("longGameScores"))).length)).toFixed(0)}`;
  //console.log('statistics.innerHTML', statistics);
  //console.log("longGames after longGamesScores set", longGames)
  console.log("longGameScores", longGameScores)
  //console.log("gameScores", gameScores);
  //console.log("testaverageScore", JSON.parse(window.localStorage.getItem("averageScore")));
  
  //console.log("countGames", countGames, "averageScore", averageScore)
  //console.log("localStorageScore", JSON.parse(localStorage.getItem("averageScore")));
  //console.log("localStorageScore", JSON.parse(localStorage.getItem("gameScores")));


  document.querySelector(".startNewGame").style["display"] = "inline-block";
  document.querySelector(".getGameScore").style["display"] = "none";
  document.querySelector(".container").style["visibility"] = "hidden";
  resetButton.style["display"] = "";

  flags.push(countryDisplayed);
});

//Show next flag.
function startAgain() {
  console.log("started again");
  document.querySelector(".container").style['opacity'] = "100";
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
document.querySelector(".startNewGame").addEventListener("click", function () {
  console.log("start new game selected");
  document.querySelector(".container").style['opacity'] = "100";

  document.querySelector(".container").style["visibility"] = "visible";
  document.querySelector(".finishGameInstruction").style["display"] = "none";
  document.querySelector(".finishGameMessage").style["display"] = "none";
  document.querySelector(".startNewGame").style["display"] = "none";

  score = 0;
  turns = 0;

  resetButton.style["display"] = "none";
  document.querySelector(".instruction").innerHTML =
    "Which country does this flag belong to?";
  document.querySelector(".message").innerHTML = "";
  // document.querySelector(".message").innerHTML = "";
  document.querySelector(".getGameScore").style["display"] = "none";
  displayFlag();
});

/*****Stats Popup*****/
document.querySelector(".stat-icon").addEventListener("click", function () {
  if ((document.querySelector(".stats-popuptext").style["display"] = "none"))
    document.querySelector(".stats-popuptext").style["display"] ="inline-block";

      //checks if container or wrapup section open so it can be closed and opened by close button
      if(document.querySelector(".container").offsetParent != null){
        containervisible = 1; 
      
        document.querySelector(".container").style["visibility"] = "hidden";

  }
  if(document.querySelector(".wrapup").offsetParent != null){
    wrapupvisible = 1; 
  
    document.querySelector(".wrapup").style["visibility"] = "hidden";

}
if(document.querySelector(".answer").offsetParent != null){
    answervisible = 1; 
   
    document.querySelector(".answer").style["visibility"] = "hidden";

}
if(document.querySelector(".reset").offsetParent != null){
    resetvisible = 1; 
   
    document.querySelector(".reset").style["visibility"] = "hidden";

}
if(document.querySelector(".message").offsetParent != null){
    messagevisible = 1; 
   
    document.querySelector(".message").style["visibility"] = "hidden";

}
  //
  let copyText = document.querySelector(".stats");
  console.log("copyText", copyText.value);
  console.log("popup content", copyText.value);
  document
    .querySelector(".shareResults")
    .addEventListener("click", function () {
      {
        var r = document.createRange();
        r.selectNode(document.querySelector(".popup-Content"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        //alert("Results Copied");
      }
    });
});
//Close Button Stats
document
  .querySelector(".popupCloseButton")
  .addEventListener("click", function () {
   
    
   
   
  
    document.querySelector(".stats-popuptext").style["display"] = "none";
    if(containervisible ==1){
        document.querySelector(".container").style["visibility"] = "visible";
           containervisible = 0;}
    if(wrapupvisible ==1){
        document.querySelector(".wrapup").style["visibility"] = "visible";
            wrapupvisible = 0;}
    if(answervisible ==1){
        document.querySelector(".answer").style["visibility"] = "visible";
            answervisible = 0;}
    if(resetvisible ==1){
        document.querySelector(".reset").style["visibility"] = "visible";
            resetvisible = 0;}
    if(messagevisible ==1){
            document.querySelector(".message").style["visibility"] = "visible";
            messagevisible = 0;}
    //document.querySelector(".container").style.visibility = "visible";
    //document.querySelector(".wrapup").style.visibility = "visible";
  });

/***********Help Popup******** */
document.querySelector(".how-to").addEventListener("click", function () {
    if(document.querySelector(".container").offsetParent != null){
        containervisible = 1; 
   
        document.querySelector(".container").style["visibility"] = "hidden";
        
  }
  if(document.querySelector(".wrapup").offsetParent != null){
    wrapupvisible = 1; 
   
    document.querySelector(".wrapup").style["visibility"] = "hidden";
}
if(document.querySelector(".answer").offsetParent != null){
    answervisible = 1; 
  
    document.querySelector(".answer").style["visibility"] = "hidden";

}
if(document.querySelector(".reset").offsetParent != null){
    resetvisible = 1; 
    document.querySelector(".reset").style["visibility"] = "hidden";
}
if(document.querySelector(".message").offsetParent != null){
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



    //ensures elements previously open stay displayed
    if(containervisible ==1){
       // console.log("container visible 1 or 0", containervisible);
 document.querySelector(".container").style["visibility"] = "visible";
    containervisible = 0;}

   
    if(wrapupvisible ==1){
        document.querySelector(".wrapup").style["visibility"] = "visible"; 
            wrapupvisible = 0;}
     if(answervisible ==1){
         document.querySelector(".answer").style["visibility"] = "visible";
             answervisible = 0;}
    if(wrapupvisible ==1){
        document.querySelector(".wrapup").style["visibility"] = "visible"; 
            wrapupvisible = 0;}
     if(resetvisible ==1){
            document.querySelector(".reset").style["visibility"] = "visible";
            resetvisible = 0;}

    if(messagevisible ==1){
         document.querySelector(".message").style["visibility"] = "visible";
         messagevisible = 0;}
   // document.querySelector(".container")["visibility"] = "hidden";
    // document.querySelector(".container").style.visibility = "visible";
    //document.querySelector(".wrapup").style.visibility = "visible";
  });

/*********/
/*
capitalisation
reveal answer
share score on clipboard
*/
