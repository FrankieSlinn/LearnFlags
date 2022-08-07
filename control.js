

const flags = ["Algeria", "Angola", "Burundi", "Benin", "Burkina Faso", "Botswana", "Cameroon", 
"Cape Verde", "Central African Republic", "Chad", "Comoros", "Congo", "Democratic Republic of Congo", "Djibouti", "Egypt", "Equatorial Guinea",
"Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea Bissau", "Ivory Coast", "Kenya", 
"Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mauritania", "Mauritius",
"Mali", "Mayotte", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Reunion", "Rwanda", "Sao Tome and Principe", "Senegal", 
"Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Swaziland", "Tanzania", "Togo", "Tunisia","Uganda",
"Zanzibar", "Zambia", "Zimbabwe",
"Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", "East Timor", "Hong Kong", "India", "Indonesia", "Iran", "Iraq", "Jordan",
"Japan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Macau", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", 
"Pakistan", "Palestine", "Philippines", "Qatar", "Saudi Arabia", "South Korea", "Sri Lanka",
 "Syria", "Taiwan", "Tajikistan", "Thailand", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen",
 "Albania", "Andorra", "Armenia","Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia",
 "Cyprus", "Czechia", "Denmark", "England", "Estonia", "Faroe Islands", "Finland", "France", "Georgia", 
 "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Kosovo", "Liechtenstein", 
 "Lithuania", "Latvia", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "North Macedonia", 
 "Northern Ireland", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Scotland", 
 "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey","Ukraine","Wales",
 "American Samoa", "Australia", "Cook Islands", "Fiji", "Kiribati", "Micronesia", "New Caledonia", "New Zealand", 
 "Northern Mariana Islands", "Papua New Guinea", "Samoa", "Solomon Islands", "Tahiti", "Tuvalu","Vanuatu",
 "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador",  "Paraguay", "Uruguay", "Venezuela",
 "Anguilla", "Aruba", "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Bermuda", "Bonaire", 
 "British Virgin Islands",
 "Saint Barthelemy", "Canada", "Cayman Islands", "Costa Rica", "Cuba", "Curacao", 
 "Dominica", "Dominican Republic", "El Salvador", "French Guiana", "Grenada", "Guadeloupe", "Guatemala", "Guyana",
 "Haiti", "Honduras", "Jamaica", "Martinique", "Mexico", "Montserrat", "Nicaragua", 
 "Panama", "Puerto Rico", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon",
 "Saint Vincent and the Grenadines",
 "Suriname", "Trinidad and Tobago", "Turks and Caicos", "United Kingdom", "United States",

 "Greenland", "Nicaragua", "Peru", "Singapore", "Tonga",  "Wallis and Futuna"];
console.log("how many flags", flags.length);
let passed = 0; 
let turns = 0; 
let score = 0;

let correctAnswer = "That was correct";
let incorrectAnswer = "Unlucky. That was not correct."

var resetButton = document.querySelector(".reset");

function randomNumber() { 
    return Math.floor(Math.random() * flags.length);
} ;
console.log("yes");
console.log(randomNumber());
let inputVal
function getInputValue(){
    // Selecting the input element and get its value 
    inputVal = document.getElementById("cGuess").value;
    inputValLow = inputVal.toLowerCase(); 
    console.log(inputVal);
    console.log("typeof inputVal", typeof inputVal);
    console.log("string flag", String(flag));
    if(inputValLow == String(flagLow)){document.querySelector(".message").innerHTML = correctAnswer;
    score +=1;
    turns +=1; 
    document.querySelector(".submitButton").style['display'] = "none"; 
    }
    else if(String(flagLow) === "united states")
        {if (inputValLow === "usa" || "us" || "united states of america" || "america"){document.querySelector(".message").innerHTML = correctAnswer;
        score +=1;
        turns +=1; 
        document.querySelector(".submitButton").style['display'] = "none"; }}
        else if(String(flagLow) === "united kingdom")
        {if (inputValLow === "uk" || "britain" || "great britain"){document.querySelector(".message").innerHTML = correctAnswer;
        score +=1;
        turns +=1; 
        document.querySelector(".submitButton").style['display'] = "none"; }}
    
    
    else{document.querySelector(".message").innerHTML = incorrectAnswer;
    document.querySelector(".submitButton").style['display'] = "none"; 
    turns +=1; };
    
    let scorePerTurn = score/turns; 
  
    document.querySelector(".stats").innerHTML = `You have guessed ${score} flag(s) correctly in ${turns} turn(s). Your guessing average per turn is ${scorePerTurn.toFixed(2)}.`;
   document.querySelector(".reset").innerHTML = "<button type = button class = \"reset\">Have Another Go</button>";
    document.querySelector(".answer").innerHTML = `The answer is ${flag}`;
    document.querySelector(".intro").innerHTML = "";
    document.querySelector(".instruction").innerHTML = "";
    resetButton.style['display'] = "inline-block";
    
    //const begin = document.querySelector(".start");
    //begin.style.display = 'none'; 
    

    document.querySelector(".showFlag").innerHTML = "";

     
    
    function startAgain(){
       
        document.querySelector(".startAgain").innerHTML = "";
       
        document.querySelector(".answer").innerHTML = "";
        document.querySelector(".message").innerHTML = "";
        resetButton.style['display'] = "none";
        document.querySelector(".instruction").innerHTML = "Which country does this flag belong to?";
       
        
        
        displayFlag(); 
    };
   
resetButton.addEventListener("click", startAgain);
}


function displayFlag(){
    console.log("Here is a flag. You need to guess it NOW");
    document.querySelector(".intro").innerHTML = "<br>Type the answer below";
     
    flag = String(flags[randomNumber()]);
    flagLow = flag.toLowerCase(); 
    flagWithUnderscore =flag.replaceAll(" ", "_")
    console.log(flag);
    ;;console.log(typeof(flag));
    pngName = ("<img src = Images/"+flagWithUnderscore+".png style=\"width:400px;height:250px;\">");
   
    let box ='<input type="text" id="cGuess" autocomplete = "off">'
   
    document.querySelector(".showFlag").innerHTML = pngName;
    
    
    document.querySelector(".answer").innerHTML = box;
 
    document.querySelector(".submitButton").style['display'] = "block"; 
    document.getElementById("cGuess").addEventListener('keyup', function (e) {
     e.preventDefault();
      if (e.key === 'Enter') {
      console.log("enter");
      getInputValue()}});
    //document.querySelector(".stats").innerHTML = "Currently no stats available";
    document.querySelector(".start").style['display'] = "none";
    document.querySelector(".introduction").style['display'] = "none";
    document.querySelector(".instruction").style['display'] = "inline-block";
   
};
//function resetGame(){
//document.querySelector("reset")

//};



var startButton = document.querySelector(".start");
startButton.style.color = "blue";
startButton.addEventListener("click", displayFlag);

/*****Stats Popup*****/
document.querySelector('.stat-icon').addEventListener('click', function(){

    if(document.querySelector(".stats-popuptext").style['display'] = "none")
    document.querySelector(".stats-popuptext").style['display'] = "inline-block"; 
    document.querySelector(".container").style['opacity'] = "0";
    
});

document.querySelector('.popupCloseButton').addEventListener('click', function(){
    console.log("close Button");
    document.querySelector(".stats-popuptext").style['display'] = "none";
     document.querySelector(".container").style['opacity'] = "1";
});

/***********Help Popup******** */
document.querySelector('.how-to').addEventListener('click', function(){

    if(document.querySelector(".help-popup").style['display'] = "none")
    console.log("yes");
    document.querySelector(".help-popup").style['display'] = "inline-block"; 
    //document.querySelector(".help-popup").requestFullscreen();
    document.querySelector(".container").style['opacity'] = "0";
    
});

document.querySelector('.popupCloseButton-help').addEventListener('click', function(){
    console.log("close Button");
    document.querySelector(".help-popup").style['display'] = "none";
     document.querySelector(".container").style['opacity'] = "1";
});

/*********/
/*
capitalisation
reveal answer
share score on clipboard
*/