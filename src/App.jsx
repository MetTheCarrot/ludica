import {Container} from 'react-bootstrap';
import {useEffect, useState} from "react";
import {groupList} from "./Data/Groups.js";
import LoadingGame from "./Components/LoadingGame.jsx";
import {game as initGame, pauseGame} from "./Data/Game.js";
import GameStatus from "./Components/Game/GameStatus.jsx";

function App() {

  const [groups, setGroups] = useState(groupList);
  const [game, setStatusGame] = useState(initGame);
  const [update, refresh] = useState(false);

  function refreshGame(){
    refresh(!update);
  }

  useEffect(() => {
    game.start = false;
    pauseGame();
  }, [game]);

  return (
    <Container className='text-center'>
      {
        game.start ?
          <GameStatus game={game} groups={groups} refreshGame={refreshGame}/>
          :
          <LoadingGame refreshGame={refreshGame} groups={groups} setGroups={setGroups} />
      }
    </Container>
  )
}

export default App
