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
  "turns, score in beginning",
  JSON.parse(localStorage.getItem("turns")),
  JSON.parse(localStorage.getItem("score"))
);
console.log(
  "get longGameScores, first Game",
  JSON.parse(localStorage.getItem("longGameScores"))
);
let longGames =
  JSON.parse(localStorage.getItem("longGameScores")) != null
    ? JSON.parse(localStorage.getItem("longGameScores")).length
    : 0;
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

let statsScore =
  JSON.parse(localStorage.getItem("longGameScores")) != null
    ? JSON.parse(localStorage.getItem("longGameScores"))[
        JSON.parse(localStorage.getItem("longGameScores")).length - 1
      ]
    : 0;

let numFlagGuesses = 0;
let countryDisplayed = [];
let flag = "";
let score = 0;

let correctAnswer = "Congratulations, That Was Correct";
let incorrectAnswer = "Unlucky, That Was Not Correct";

let resetButton = document.querySelector(".reset");

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

let isCorrect = false;
let isIncorrect = false;
let starArray = ["star1", "star2", "star3", "star4", "star5"];
let flagNum1 = ""; 
let flagNum2 = ""; 
let flagNum3 = ""; 
let flagNum4 = ""; 
let flagNum5 = ""; 
let flagsToday = [];
//makes sure score not null so in first turn flag can be matched to score. 
if(JSON.parse(localStorage.getItem("score"))==null){
  localStorage.setItem("score", JSON.stringify(0));
}




//generates 5 random numbers for each day based on UK Julien Date
fullDate = new Date();


console.log(fullDate);
let year = String(fullDate.getFullYear());
let month = String(fullDate.getMonth()+1);
let day = String(fullDate.getDate());
console.log("YMD", year, month, day);
let dateNumber = day+month+year;
console.log("dateNumber", dateNumber);
console.log("minutes", fullDate.getMinutes())
console.log("hours", fullDate.getHours())



function MurmurHash3(string) {
  let i = 0;
  for (i, hash = 1779033703 ^ flags.length; i < flags.length; i++) {
      let bitwise_xor_from_character = hash ^ string[i];
      hash = Math.imul(bitwise_xor_from_character, 3432918353);
      hash = hash << 13 | hash >>> 19;
  } return () => {
     // Return the hash that you can use as a seed
      hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
      hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
      return (hash ^= hash >>> 16) >>> 0;
  }
}

//MurmurHash3(dateNumber);
//flagsToday can get duplicates resolve
function SimpleFastCounter32(seed_1, seed_2, seed_3, seed_4) {
  return () => {
    seed_1 >>>= 0; seed_2 >>>= 0; seed_3 >>>= 0; seed_4 >>>= 0;
    let cast32 = (seed_1 + seed_2) | 0;
    seed_1 = seed_2 ^ seed_2 >>> 9;
    seed_2 = seed_3 + (seed_3 << 3) | 0;
    seed_3 = (seed_3 << 21 | seed_3 >>> 11);
    seed_4 = seed_4 + 1 | 0;
    cast32 = cast32 + seed_4 | 0;
    seed_3 = seed_3 + cast32 | 0;
    return (cast32 >>> 0) / 4294967296;}}


let generate_seed = MurmurHash3(dateNumber);
    let random_number = SimpleFastCounter32(generate_seed(), generate_seed());
    localStorage.setItem(
      "random_number",
     JSON.stringify(random_number()));
    
    console.log("run random seed before local storage", SimpleFastCounter32(generate_seed(), generate_seed()));
    console.log("print random number not full function", localStorage.getItem("random_number"));

    if(String(dateNumber) !== String(JSON.parse(localStorage.getItem("dateNumber")))||(fullDate.getHours()==0&&fullDate.getMinutes()==0&&fullDate.getSeconds()==0)||gamesPlayed==0){
      console.log("gamesplayed to start", gamesPlayed);
      console.log("datenumber !== localStorage DateNumber?", String(dateNumber) !== String(JSON.parse(localStorage.getItem("dateNumber"))));
      console.log("new game started based on date difference");
      localStorage.setItem("dateNumber", JSON.stringify(dateNumber));
      for (let i=0; i<=4; i++){
        //random_number needs to be a function to generate number
        //console.log(JSON.parse(localStorage.getItem("random_number")*225));
        console.log("get flagstoday function running")
        flagsToday.push(Math.abs(Math.floor(random_number()*225)));
        localStorage.setItem(
          "flagsToday",
         JSON.stringify(flagsToday));
         console.log("flagsToday after defined"), JSON.parse(localStorage.getItem("flagsToday"))
        console.log("flagsToday", flagsToday);
        }
      startNewGame();
      console.log("START NEW GAME");
      console.log("datenumber !== localStorage DateNumber?", String(dateNumber) !== String(JSON.parse(localStorage.getItem("dateNumber"))));
      console.log("times = 0?", fullDate.getHours()==0&&fullDate.getMinutes()==0&&fullDate.getSeconds()==0)


   




};   




//console.log("flag", JSON.parse(localStorage.getItem("flag")));
console.log("isCorrect", JSON.parse(localStorage.getItem("isCorrect")));
console.log("isIncorrect", JSON.parse(localStorage.getItem("isIncorrect")));

if (JSON.parse(localStorage.getItem("turns")) == "4") {
  console.log("4 turns after refresh");
  //document.querySelector(".finishGameMessage").style["display"] = "inline-block";
  starFill();
  fifthTurn();
}

starFill();

//ensure that the correct screen is shown with the right score

console.log(
  "turns are less than 4",
  JSON.parse(localStorage.getItem("turns")) <= "3"
);
if (JSON.parse(localStorage.getItem("turns")) <= "3") {
  console.log("display flag at beginning as turns less than 4");
  displayFlag();
} else {
  feedbackScreenLayout();
}

console.log(
  "stored score turns",
  JSON.parse(localStorage.getItem("score", JSON.stringify(score))),
  JSON.parse(localStorage.getItem("turns", JSON.stringify(turns)))
);
console.log("fullmin, fullsec",fullDate.getMinutes(), fullDate.getSeconds() )
//

console.log(" string dateNumber", String(dateNumber));
console.log(" string localStorage DataNumber", String(JSON.parse(localStorage.getItem("dateNumber"))));
console.log("hours min sec, ", fullDate.getHours(), fullDate.getMinutes(), fullDate.getSeconds());
console.log("String(dateNumber) !== String(JSON.parse(localStorage.getItem(dateNumber)))",String(dateNumber) !== String(JSON.parse(localStorage.getItem("dateNumber"))))

const tick = function () {




  let date = new Date();

  document.querySelector(".labelTimer").style["visibility"] = "visible";
 

  document.querySelector(
    ".labelTimer"
  ).innerHTML = `FLAGL Will Restart in <strong>
  ${23 - new Date().getHours()}</strong> Hours<strong> ${60 - new Date().getMinutes()}
  </strong> Minutes <strong>${61 - new Date().getSeconds()}</strong> Seconds`;
  //document.querySelector(".labelTimer")[0].innerHTML = `${60-new Date().getMinutes()} Minutes ${61-new Date().getSeconds()} Seconds`;

  //if (time ===0){
  time = 60;
  // clearInterval(timer);
  // }
  time = time - 1;
};

tick();

setInterval(tick, 1000);

//if score wrong, reset
if(JSON.parse(localStorage.getItem("score")>5)||JSON.parse(localStorage.getItem("turns")>5)){
  localStorage.setItem("score", JSON.stringify(0));
  localStorage.setItem("turns", JSON.stringify(0));
}

console.log(
  "longGameScores",
  JSON.parse(localStorage.getItem("longGameScores"))
);

document.querySelector(
  ".stats"
).innerHTML = `FLAGL Score: <strong>${statsScore}</strong><br>Games: <strong>${longGames}</strong><br>Average Score: <strong>${longGameAverage}</strong>`;
console.log("stats message", statistics);
/*
function randomNumber() {
  return Math.abs(Math.floor(Math.random() * flags.length));
}
*/


function first4Turns() {
  buttonClicked = 0;
  console.log("first4Turns, flagsToday", JSON.parse(localStorage.getItem("flagsToday")))
  rightFlag = flags[JSON.parse(JSON.parse(localStorage.getItem("flagsToday"))[JSON.parse(localStorage.getItem("turns"))])];
  console.log("rightFlag", rightFlag)
  console.log("first4 Turns what flag", flags[JSON.parse(localStorage.getItem("flagsToday"))[JSON.parse(localStorage.getItem("turns"))]])
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
    console.log("beforefifth turn is correct");
    document.querySelector(".feedback").innerHTML = `${correctAnswer}`;
  }
  if (JSON.parse(localStorage.getItem("isIncorrect")) == true) {
    console.log("before fifth turn is incorrect");
    document.querySelector(".feedback").innerHTML = `${incorrectAnswer}`;
  }
  console.log(JSON.parse(localStorage.getItem("turns")));
  let turns = JSON.parse(localStorage.getItem("turns"));
  let turns1 = (turns += 1);
  localStorage.setItem("turns", JSON.stringify(turns1));
  console.log(
    "score, turns in first 4",
    JSON.parse(localStorage.getItem("score")),
    JSON.parse(localStorage.getItem("turns"))
  )
}

function fifthTurn() {
  console.log("fifthturn running");

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
    document.querySelector(".finishGameMessage").innerHTML = `Your FLAGL Score Is ${
      JSON.parse(localStorage.getItem("score")) * 2
    }0%`;
  }
  if (JSON.parse(localStorage.getItem("score")) === 0) {
    document.querySelector(
      ".finishGameMessage"
    ).innerHTML = `Better Luck Next Time, Your FLAGL Score is 0%`;
  }
  document.querySelector(".finishGameMessage").style["display"] ="inline-block";
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
  if (JSON.parse(localStorage.getItem("score")) !== "0" && JSON.parse(localStorage.getItem("score")) <= "5") {
    console.log("score not null can do starfill");
    for (let i = 0; i <= JSON.parse(localStorage.getItem("score")) - 1; i++) {
      console.log("starfilli");
      document.getElementById(`${starArray[i]}`).style["fill"] = "yellow";
      console.log(`star i is star${i}`);
    }
    if (JSON.parse(localStorage.getItem("score")) == "0") {
      console.log("starFill 0 score")
      const allStars = document.querySelectorAll('.star');
      allStars.forEach((j)=>j.style.fill = "white")
      }
    }
  };

//listener for display new flag
document.querySelector(".reset").addEventListener("click", function () {
  console.log("resetButton clicked");
  startAgain();
});

function displayFlagScreen(){
  document.getElementById("spanBut").style["display"] = "none";
  document.querySelector(".finishGameMessage").style["display"] = "none";
  document.querySelector(".answer").style["display"] = "inline-block";
  document.querySelector(".showFlag").style["display"] = "inline-block";
  document.querySelector(".message").style["visibility"] = "visible";
  document.querySelector(".intro").innerHTML = "<br>Type and Select a Country";
  document.querySelector(".intro").style["display"] = "inline-block";
  document.querySelector(".feedback").style["display"] = "none";
  document.querySelector(".labelTimer").style["display"] = "none";
  document.querySelector(".flagName").style["display"] = "none";
  document.querySelector(".practice").style["display"] = "none";
  document.querySelector(".instruction").innerHTML =
    "Which country or territory does this flag belong to?";

}

function displayFlag() {
  //in displayFlag so doesn't set if user doesn't do anything. 
  //localStorage.setItem("dateNumber", JSON.stringify(dateNumber));


  console.log("displayflag running");
  displayFlagScreen();
  //generate flag
  console.log(
    "flag before randomRun"
  );


  //generate flag one by one today

  for(let i = 0; i<=4; i++){
    console.log("generating flags for today running");
    console.log("flags today in display flag", JSON.parse(localStorage.getItem("flagsToday")));
    
  
    if(JSON.parse(localStorage.getItem("turns")) ==i){
      let getFlag = flags[JSON.parse(localStorage.getItem("flagsToday"))[i]]; 
      console.log("getFlag", getFlag)
      localStorage.setItem("flag",JSON.stringify(getFlag));
      console.log("flag for today", JSON.parse(localStorage.getItem("flag")), flags.indexOf(JSON.parse(localStorage.getItem("flag"))));
    }
    console.log("flag for today", JSON.parse(localStorage.getItem("flag")), flags.indexOf(JSON.parse(localStorage.getItem("flag"))));
  };

  flagIndex = flags.indexOf(JSON.parse(localStorage.getItem("flag")));
  console.log(
    "flagIndex, flag",
    flagIndex,
    JSON.parse(localStorage.getItem("flag"))
  );
  console.log("flagsToday", flagsToday);
  console.log("flagstoday countries", flagsToday.map((item)=>flags[item]));
  if (JSON.parse(localStorage.getItem("turns")) < 4) {
    console.log(JSON.parse(localStorage.getItem("flag")));
    console.log("countrydisplayed", countryDisplayed);
    console.log("countryDisplayed", typeof countryDisplayed);

    countryDisplayed.push(JSON.parse(localStorage.getItem("flag")));
  }
  console.log("How many Flags", flags.length);

  flagLow = JSON.parse(localStorage.getItem("flag")).toLowerCase();
  flagWithUnderscore = JSON.parse(localStorage.getItem("flag")).replaceAll(
    " ",
    "_"
  );
  console.log(JSON.parse(localStorage.getItem("flag")));

  pngName =
    "<img src = Images/" +
    flagWithUnderscore +
    '.png  style="width:400px;height:250px;">';

  let box =
    '<input type="text" id="cGuess" autocomplete="autocomplete_off_randString">';

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
    //flagsCopy used to ensure all answer options stay. To avoid duplicates a country is removed from array "flags" after displayed.
    for (i = 0; i < flagsCopy.length; i++) {
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
  //document.querySelector(".introduction").style["display"] = "none";
  document.querySelector(".instruction").style["display"] = "inline-block";
  //ensure current flag only removed last
}
console.log("flagstoday countries", flagsToday.map((item)=>flags[item]));

if (JSON.parse(localStorage.getItem("flag")) == "") {
  console.log("noflag");
  localStorage.setItem("randomRun", JSON.stringify(false));
}
submitValue();
console.log("outside function what flag", JSON.parse(localStorage.getItem("flag")))
function defineButtonText() {
  for (i = 0; i < buttonClasses.length; i++) {
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
  console.log("Submit value what flag", JSON.parse(localStorage.getItem("flag")))
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
  console.log("get input value what flag", JSON.parse(localStorage.getItem("flag")))
  console.log("getinputval started");
  console.log("buttonClicked in beg input value is", buttonClicked);

  inputValue = document.getElementById(
    labelContent[buttonClicked - 1]
  ).innerHTML;
  document.querySelector(buttonClasses[buttonClicked - 1]).checked = false;
  document.getElementById(labelContent[buttonClicked - 1]).innerHTML == "";

  document.querySelector(".container").style["visibility"] = "visible";

  console.log(
    "longGameScores",
    JSON.parse(localStorage.getItem("longGameScores"))  
  );

  inputValLow = inputValue.toLowerCase();
  inputValue = "";
  //console.log("inputValLow", inputValLow);

  //console.log("string flag", String(flag));
  feedbackScreenLayout();

  whichFeedbackScreen();

  

  flagWithLetter = [];

  //reset values
  flags.splice(flagIndex, 1);
}

function feedbackScreenLayout() {
  console.log("longGames", longGames);
  document.querySelector(".answer").style["visibility"] = "visible";
  document.querySelector(".flagName").style["visibility"] = "visible";
  document.querySelector(".showFlag").style["display"] = "none";
  document.querySelector(".instruction").style["display"] = "none";
  document.getElementById("spanBut").style["display"] = "none";
  document.querySelector(".flagName").style["display"] = "inline-block";
  document.querySelector(".feedback").style["display"] = "inline-block";
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
    score1 = score += 1;
    localStorage.setItem("score", JSON.stringify(score1));
    starFill();
  } else {
    localStorage.setItem("isIncorrect", JSON.stringify(true));
    localStorage.setItem("isCorrect", JSON.stringify(false));
    // incorrect();
    console.log("correct answer should lead to one more turn");
    buttonClicked = 0;
    inputValLow = "";
  }
  if (JSON.parse(localStorage.getItem("turns")) < 4) {
    first4Turns();
  } else if (JSON.parse(localStorage.getItem("turns")) == 4) {
    longGameStats();
    fifthTurn();
  }
}

function longGameStats(){
  //set long scores
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

  console.log("statistics.innerHTML", statistics);
  console.log("longGames after longGamesScores set", longGames);
  console.log("longGameScores", longGameScores);
  console.log("gameScores", gameScores);

  averageScore = (
    gameScores.reduce((numa, numb) => numa + numb, 0) / gameScores.length
  ).toFixed(0);
  console.log("averageScore", averageScore);
  window.localStorage.setItem("averageScore", JSON.stringify(averageScore));

  longGames = window.localStorage.getItem(
    "longGameScores",
    JSON.stringify(longGameScores).length
  );
  //set score for inclusion in statsHTML
  statsScore = JSON.parse(localStorage.getItem("longGameScores"))[
    JSON.parse(localStorage.getItem("longGameScores")).length - 1
  ];
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



}

/****Played 5 Games****/

console.log(JSON.parse(localStorage.getItem("turns")), "turns");

//After the user completed 5 rounds see overall score

function gameWrapup() {
  console.log("wrapup started");
  

  //document.querySelector(".finishGameMessage").style['display'] = "none";
  console.log(
    "endScore, turns",
    JSON.parse(localStorage.getItem("score")),
    JSON.parse(localStorage.getItem("turns"))
  );
  

  countGames += 1;
  turns0 = 0;
  score0 = 0;

  localStorage.setItem("turns", JSON.stringify(0));
  localStorage.setItem("score", JSON.stringify(0));
  localStorage.setItem("isCorrect", JSON.stringify(false));
  localStorage.setItem("isIncorrect", JSON.stringify(false));
  starFill();

  //console.log('statistics.innerHTML', statistics);
  //console.log("longGames after longGamesScores set", longGames)
  console.log("longGameScores", longGameScores);
  //console.log("gameScores", gameScores);
  //console.log("testaverageScore", JSON.parse(window.localStorage.getItem("averageScore")));

  //console.log("countGames", countGames, "averageScore", averageScore)
}
//displays new flag
function startAgain() {
  console.log("displayNewFlag");
  document.querySelector(".container").style["opacity"] = "100";
  //document.querySelector(".finishGameMessage").style["display"] = "100";

  document.querySelector(".answer").innerHTML = "";

  resetButton.style["display"] = "none";

  document.querySelector(".message").innerHTML = "";



  displayFlag();
}

//starts new game from scratch
function startNewGame () {
  gameWrapup();
  
  
  console.log("start new game selected");
  //generate random number
  document.querySelector(".container").style["opacity"] = "100";

  document.querySelector(".container").style["visibility"] = "visible";

  //get flags to original length
  flags.push(...countryDisplayed);
  countryDisplayed = [];
 
  localStorage.setItem("score", JSON.stringify(0));
  localStorage.setItem("turns", JSON.stringify(0));
  console.log(
    "in startNewGames score, turns",
    JSON.parse(localStorage.getItem("score")),
    JSON.parse(localStorage.getItem("turns"))
  );
  resetButton.style["display"] = "none";
  document.querySelector(".finishGameMessage").style["display"] = "none";
  document.querySelector(".labelTimer").style["display"] = "none";
  
  document.querySelector(".instruction").innerHTML =
    "Which country does this flag belong to?";
  document.querySelector(".message").innerHTML = "";
 starFill();
  displayFlag();
};

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

  document.querySelectorAll(".share")
  .forEach((item)=>
  item.addEventListener("click", function(){

    var r = document.createRange();
        r.selectNode(document.querySelector(".statsContent"));

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        alert("FLAGL Results Copied To Clipboard");
  }));


  
/*
  function clickThis(){
    console.log("shareScore clicked");
  }*/
 

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
      // console.log("container visible 1 or 0", containervisible);
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

/*********/
