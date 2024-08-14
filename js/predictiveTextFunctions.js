import { answer, countryOptionButtons, countryButtonClasses, flagsCopy } from "./practiceAndDaily.js";
let countryMatchingPredText = [];

function predictiveText() {
  //listener for when a user types a letter
  answer.addEventListener("keyup", function (e) {
    answer.value = answer.value[0].toUpperCase().concat(answer.value.slice(1));
    console.log("answer displayed", answer.value[0].toUpperCase());
    //ensures country buttons are displayed
    countryOptionButtons.style["display"] = "inline";
    //get input text in lower case
    let lowerCasePredText = String(
      document.querySelector(".answer").value
    ).toLowerCase();
    //If predictive text matches add country to  countryMatchingPredText array
    ifPredTextMatchesCountryAddToArray(lowerCasePredText);
    //if input text is equal to those letters in a country return that country in next filter function
    countryMatchingPredText = countryMatchingPredText.filter((item) =>
      matchLowerCasePredTextToCountryInArray(item, lowerCasePredText)
    );
    console.log("countryMatchingPredText: " + countryMatchingPredText);
    defineButtonText();
  });
}

function countryMatchingPredTextEmpty(){
    countryMatchingPredText = [];

}
//checks if text typed matches country for filtering
function matchLowerCasePredTextToCountryInArray(
  predictedCountry,
  lowerCasePredText
) {
  if (
    lowerCasePredText ===
    String(predictedCountry.slice(0, lowerCasePredText.length)).toLowerCase()
  ) {
    return predictedCountry;
  }
}

function ifPredTextMatchesCountryAddToArray(lowerCasePredText) {
  //flagsCopy used to ensure all answer options stay(no flag was removed from list).
  //To avoid duplicates a country is removed from array "flags" after displayed.
  console.log(
    "lowerCasePredText).toLowerCase() ",
    lowerCasePredText.toLowerCase()
  );
  for (let i = 0; i < flagsCopy.length; i++) {
    if (
      //if predictive text is typed equals the beginning of a country
      //slice used to ensure equal number of characters are compared
      String(lowerCasePredText).length > 0 &&
      String(lowerCasePredText) ===
        String(flagsCopy[i].slice(0, lowerCasePredText.length)).toLowerCase()
    ) {
      //First check that country isn't already included in the array from which predictive text is generated
      if (!countryMatchingPredText.includes(flagsCopy[i])) {
        //push countries that share letters into the array
        console.log("flag to be inserted in matching countries", flagsCopy[i]);
        countryMatchingPredText.push(flagsCopy[i]);
        console.log("countryMatchingPredText", countryMatchingPredText);
      }
    }
  }
}

function defineButtonText() {
    //for each predictive text button listen if pressed
    for (
      let buttonNum = 0;
      buttonNum < countryButtonClasses.length;
      buttonNum++
    ) {
      //button element is each of the button classes
      const buttonElement = document.querySelector(
        countryButtonClasses[buttonNum]
      );
      if (buttonElement) {
        buttonElement.style["visibility"] = "visible";
        //if a country matching the input text exists populate the country name on the button
        if (countryMatchingPredText[buttonNum]) {
          buttonElement.innerHTML = `${countryMatchingPredText[buttonNum]}`;
          buttonElement.style["display"] = "inline-block";
        } else {
          buttonElement.style["display"] = "none";
        }
      }
    }
  }

export { predictiveText, defineButtonText, countryMatchingPredText, countryMatchingPredTextEmpty };
