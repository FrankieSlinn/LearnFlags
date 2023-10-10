// Ensures the active popup is displayed and remaining content hidden.
function displayPopup(inactivePopup, activePopup) {
    document.querySelector(`.${inactivePopup}`).style["display"] = "none";
    document.querySelector(".overallContainer").style["display"] = "none";
    document.querySelector(".overallContainer").style["z-index"] = "-1";
    document.querySelector(`.${activePopup}`).style["display"] = "inline-block";
  }
  
  function hidePopup(closedPopup) {
    document.querySelector(".overallContainer").style["display"] = "inline";
    document.querySelector(".overallContainer").style["z-index"] = "1";
    document.querySelector(`.${closedPopup}`).style["display"] = "none";
  }
  
  // Export the functions so that they can be used in other files
  export { displayPopup, hidePopup };
  