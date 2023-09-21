import {Button, ButtonGroup, Container} from "react-bootstrap";
import ShowGroups from "./ShowGroups.jsx";
import {addNewGroup, getGroupList, removeGroup} from "../Data/Groups.js";
import {startGame} from "../Data/Game.js";

export default function LoadingGame({groups, setGroups, refreshGame}){

  function addGroup(){
    addNewGroup();
    setGroups(getGroupList());
  }

  function deleteGroup(){
    removeGroup();
    setGroups(getGroupList());
  }

  function initGame(){
    startGame(groups);
    refreshGame();
  }

  return(
    <section className='m-0 vh-100 row justify-content-center align-content-center'>
      <Container
        className='col-auto'
        style={{
        }}>

        <h3>
          Iniciando el juego...
        </h3>

        <ShowGroups groups={groups} />

        <section
          className='d-flex justify-content-center'
        >

          <ButtonGroup
            className='shadow border '
          >
            <Button variant="primary"
                    onClick={addGroup}
            >
              Añadir nuevo grupo
            </Button>

            <Button variant="danger"
                    onClick={initGame}
            >
              Iniciar juego
            </Button>

            <Button variant="warning"
                    onClick={deleteGroup}
            >
              Eliminar ultimo grupo
            </Button>
          </ButtonGroup>
        </section>
      </Container>
    </section>
  )
}