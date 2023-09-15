import {Container} from 'react-bootstrap';
import {useState} from "react";
import {groupList} from "./Data/Groups.js";
import LoadingGame from "./Components/LoadingGame.jsx";
import {game as initGame} from "./Data/Game.js";
import GameStatus from "./Components/Game/GameStatus.jsx";
import {questions} from "./Data/Questions.js";

function App() {

  const [groups, setGroups] = useState(groupList);
  const [game, ] = useState(initGame);
  const [update, refresh] = useState(false);
  const [preguntas,] = useState(questions);

  function refreshGame(){
    refresh(!update);
  }
  console.log("Preguntas")
  console.log(preguntas)

  return (
    <Container className='text-center'>
      {
        game.start ?
          <GameStatus setGroups={setGroups} game={game} groups={groups} refreshGame={refreshGame} preguntas={preguntas}/>
          :
          <LoadingGame refreshGame={refreshGame} groups={groups} setGroups={setGroups} />
      }
    </Container>
  )
}

export default App
