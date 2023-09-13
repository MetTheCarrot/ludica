import {Container} from 'react-bootstrap';
import {useState} from "react";
import {groupList} from "./Data/Groups.js";
import ShowGroups from "./Components/ShowGroups.jsx";
import LoadingGame from "./Components/LoadingGame.jsx";
import {game as initGame} from "./Data/Game.js";

function App() {

  const [groups, setGroups] = useState(groupList);
  const [game, setStatusGame] = useState(initGame);

  return (
    <Container className='text-center'>
      {
        game.start ?
          <ShowGroups groups={groups} />
          :
          <LoadingGame groups={groups} setGroups={setGroups} setStatusGame={setStatusGame} />
      }
    </Container>
  )
}

export default App
