import ChoosingGroup from "./ChoosingGroup.jsx";
import {useState} from "react";
import ChoosingAnswer from "./ChoosingAnswer.jsx";
import {getRandomQuest} from "../../Data/Questions.js";
import ShowResults from "./ShowResults.jsx";

export default function GameStatus({game, groups, refreshGame, preguntas, setGroups}){

  const [updateStatus, refreshStatus] = useState(false);
  const [event, setEvent] = useState(game.status.event);

  function refresh(){
    refreshStatus(!updateStatus);
  }
  console.log(event)

  function showStatus() {
    switch (event) {
      case 1:
        return (<ChoosingGroup availableQuestions={preguntas} game={game} groups={groups} refreshGame={refreshGame}
                               setEvent={setEvent}
                               refresh={refresh}/>);
      case 2:
        return (<ChoosingAnswer
          setGroups={setGroups}
          refresh={refresh}
          setEvent={setEvent}
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