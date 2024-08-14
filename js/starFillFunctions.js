let starArray = ["star1", "star2", "star3", "star4", "star5"];

function starFill() {
    //check that score is valid for star fill
    if (
      JSON.parse(localStorage.getItem("score")) !== "0" &&
      JSON.parse(localStorage.getItem("score")) <= "5"
    ) {
      //ensure filled stars match the score
      for (
        let starNum = 0;
        starNum <= JSON.parse(localStorage.getItem("score")) - 1;
        starNum++
      ) {
        document.getElementById(`${starArray[starNum]}`).style["fill"] = "yellow";
      }
    }
    allStarsNotFilledIfReset();
  }

  function allStarsNotFilledIfReset() {
    if (JSON.parse(localStorage.getItem("score")) === "0") {
      const allStars = document.querySelectorAll(".star");
      allStars.forEach((star) => (star.style.fill = "white"));
    }
  }

  export{starFill}