import ChoosingGroup from "./ChoosingGroup.jsx";
import {useState} from "react";
import ChoosingAnswer from "./ChoosingAnswer.jsx";
import {getRandomQuest} from "../../Data/Questions.js";
import ShowResults from "./ShowResults.jsx";

export default function GameStatus({game, groups, refreshGame, preguntas}){

  const [updateStatus, refreshStatus] = useState(false);

  function refresh(){
    refreshStatus(!updateStatus);
  }
  console.log(game.status.event)

  function showStatus() {
    switch (game.status.event) {
      case 1:
        return (<ChoosingGroup availableQuestions={preguntas} game={game} groups={groups} refreshGame={refreshGame}
                               refresh={refresh}/>);
      case 2:
        return (<ChoosingAnswer
          refresh={refresh}
          quest={getRandomQuest()}
          currentGroup={groups.find((group) => group.id === game.status.choosingGroup)
        }/>);
      case 3:
        return (<ShowResults groups={groups}/>);
    }
  }

  return(
    <>
      {showStatus()}
    </>
  )
}