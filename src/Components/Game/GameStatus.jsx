import ChoosingGroup from "./ChoosingGroup.jsx";

export default function GameStatus({game, groups, refreshGame}){

  function showStatus(){
    switch (game.status.event) {
      case 1:
        return(<ChoosingGroup game={game} groups={groups} refreshGame={refreshGame} />);
      case 2:
        return(
          <h1>Gano el grupo {
          groups[game.status.choosingGroup - 1].id
          }
        </h1>);
    }
  }

  return(
    <>
      status: {game.status.event}
      {showStatus()}
    </>
  )
}