import { flags } from "./flags.js";
import { formatFlagNameToCompare, displayFlag, clearAnswer, dailyGameButton, shareResults, answer, 
  hideShareButtons, feedback, flagName, handleNextScreenBasedOnTurn, container, newGameDisplayChanges,
scrollToTop, practiceQuizItem, getAnswerFeedback} from "./practiceAndDaily.js";
import { displayPopup, hidePopup } from "./displayHidePopups.js";
import { gameStatsDisplay, statistics} from "./scoreStatistics.js";


const modeButton = document.querySelector(".mode-button");
const stars = document.querySelectorAll(".star");
const statsText = document.querySelector(".statsText");

function practiceModeAfterClick() {
  localStorage.setItem("dailyMode", JSON.stringify(false));
  document.body.classList.add("practiceMode");
  practiceModeDisplayChanges();
  handlePracticeMode();
  clearAnswer();
  scrollToTop();
}

function handlePracticeMode() {
  console.log("daily mode false");
  newGameDisplayChanges();
  practiceQuizItem();
}

function practiceModeDisplayChanges() {
  hidePopup("helpContent");
  statistics.innerHTML = `You are in Practice Mode. <br>To play the Daily FLAGL Game with statistics select the button below.`;
  statistics.classList.add("practiceStatistics");
  dailyGameButton.style["display"] = "inline-block";
  shareResults.style["display"] = "none";
  stars.forEach((star) => (star.style["display"] = "none"));
  container.style["margin-top"] = "-2rem";
  statsText.style["margin-bottom"] = "-0.25rem";
}


function dailyModeChanges() {
  dailyArrayChanges();
  formatFlagNameToCompare();
  displayFlag();
  clearAnswer();
  hidePopup("statsContent");
  document.body.classList.remove("practiceMode");
  statistics.classList.remove("practiceStatistics");
  gameStatsDisplay();
  dailyStyleChanges();
  handleNextScreenBasedOnTurn();
  getAnswerFeedback();

}

function dailyStyleChanges() {
  dailyGameButton.style["display"] = "none";
  modeButton.style["display"] = "inline-block";
  shareResults.style["display"] = "inline-block";
  answer.style["display"] = "inline-block";
  feedback.style["display"] = "none";
  flagName.style["display"] = "none";
  hideShareButtons();
  stars.forEach((star) => (star.style["display"] = "inline-block"));
  stars.forEach((star) => (star.style["margin-top"] = "2rem"));
}

function dailyArrayChanges() {
  console.log(
    "Arraydaioyflags",
    JSON.parse(localStorage.getItem("arrayDailyFlags"))
  );
  let dailyFlagArrayDisplay = JSON.parse(
    localStorage.getItem("arrayDailyFlags")
  );
  dailyFlagArrayDisplay.forEach((flag) => console.log(flags[flag]));
  localStorage.setItem("dailyMode", JSON.stringify(true));
  let turnsDaily = JSON.parse(localStorage.getItem("turns"));
  localStorage.setItem(
    "flag",
    JSON.stringify(
      flags[JSON.parse(localStorage.getItem("arrayDailyFlags"))[turnsDaily]]
    )
  );
}

export{practiceModeAfterClick, practiceModeDisplayChanges, dailyModeChanges, dailyStyleChanges, dailyArrayChanges, handlePracticeMode}
