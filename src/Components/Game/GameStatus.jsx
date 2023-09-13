import ChoosingGroup from "./ChoosingGroup.jsx";
import {useState} from "react";
import ChoosingAnswer from "./ChoosingAnswer.jsx";

export default function GameStatus({game, groups, refreshGame, preguntas}){

  const [updateStatus, refreshStatus] = useState(false);

  function refresh(){
    refreshStatus(!updateStatus);
  }

  function showStatus(){
    switch (game.status.event) {
      case 1:
        return(<ChoosingGroup game={game} groups={groups} refreshGame={refreshGame} refresh={refresh} />);
      case 2:
        return(<ChoosingAnswer currentGroup={game.status.choosingGroup}/>);
    }
  }

  return(
    <>
      {showStatus()}
    </>
  )
}