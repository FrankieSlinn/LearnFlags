
import { flags } from "./flags.js";
import { flagsDisplayedInRound} from "./practiceAndDaily.js";

function placeFlagNameIntoflagsDisplayedInRound() {
    let turns;
    //generate flag one by one today
    //find current flag name
    if (JSON.parse(localStorage.getItem("turns"))) {
      let turns = JSON.parse(localStorage.getItem("turns"));
    } else {
      turns = 0;
      localStorage.setItem("turns", JSON.stringify(turns));
    }

    let getFlag =
      flags[
        JSON.parse(localStorage.getItem("arrayDailyFlags"))[
          JSON.parse(localStorage.getItem("turns"))
        ]
      ];
    //put current flag name into local storage
    localStorage.setItem("flag", JSON.stringify(getFlag));
    //check right amount of turns(shouldn't exceed 4)
    if (JSON.parse(localStorage.getItem("turns")) <= 4) {
      //put flag in array of all flags displayed in round so this can be added to total flags array after
      //so no flag goes missing after a round
      flagsDisplayedInRound.push(JSON.parse(localStorage.getItem("flag")));
    }
    console.log("flagsDisplayedInRound: ", flagsDisplayedInRound);
  }

  export{ placeFlagNameIntoflagsDisplayedInRound }