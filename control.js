

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
 "Albania", "Andorra", "Armenia","Austria", "Azerbaijan",
 "Greenland", "Nicaragua", "Peru", "Singapore", "Tonga", ];
console.log("how many flags", flags.length);
let passed = 0; 
let turns = 0; 
let score = 0;

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
    if(inputValLow == String(flagLow)){document.querySelector(".message").innerHTML = "You are no fool. You know your flags.";
    score +=1;
    turns +=1; 
    }
    else{document.querySelector(".message").innerHTML = "You need to study hard and then you will get better at knowing flags." ;
    
    turns +=1; };
    
    let scorePerTurn = score/turns; 
    console.log("this section works");
    document.querySelector(".stats").innerHTML = `STATS : You have guessed ${score} flag(s) correctly in ${turns} turn(s). Your guessing average per turn is ${scorePerTurn}.`;
   document.querySelector(".reset").innerHTML = "<button type = button class = \"reset\">Reset this mentally stimulating game.</button>";
    document.querySelector(".answer").innerHTML = `The answer is ${flag}`;
    document.querySelector(".intro").innerHTML = "";
    document.querySelector(".instruction").innerHTML = "";
    resetButton.style['display'] = "inline-block";
    
    const begin = document.querySelector(".start");
    begin.style.display = 'none'; 
    
    const sub = document.querySelector(".submit");
    sub.style.display = 'none';

    document.querySelector(".showFlag").innerHTML = "";

     
    
    function startAgain(){
       
        document.querySelector(".startAgain").innerHTML = "";
       
        document.querySelector(".answer").innerHTML = "";
        resetButton.style['display'] = "none";
        
        
        displayFlag(); 
    };
   
resetButton.addEventListener("click", startAgain);
}






function displayFlag(){
    console.log("Here is a flag. You need to guess it NOW");
    document.querySelector(".intro").innerHTML = "<br>Here is a flag.You need to guess it NOW.";
     
    flag = String(flags[randomNumber()]);
    flagLow = flag.toLowerCase(); 
    flagWithUnderscore =flag.replace(" ", "_")
    console.log(flag);
    ;;console.log(typeof(flag));
    pngName = ("<img src = "+flagWithUnderscore+".png style=\"width:400px;height:250px;\">");
   
    let box ='<input type="text" id="cGuess" autocomplete = "off">'
    let buttonValue = '<button type="button" class = "submit" onclick="getInputValue();">Submit My Answer</button>'
    document.querySelector(".showFlag").innerHTML = pngName;
    
    document.querySelector(".answer").innerHTML = box;

    document.querySelector(".subButton").innerHTML = buttonValue;  
    document.querySelector(".stats").innerHTML = "Currently no stats available";
    document.querySelector(".start").style['display'] = "none";
   
};
function resetGame(){
document.querySelector("reset")

};



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