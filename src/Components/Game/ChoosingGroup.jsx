import sillas from "../../assets/sillas.png";
import {useEffect} from "react";
import {endChoosingGroup, maxRounds, nextRound} from "../../Data/Game.js";
import {Container} from "react-bootstrap";
import confetti from 'canvas-confetti'

export default function ChoosingGroup({ groups, game, refreshGame, refresh, setEvent }){

  useEffect(() => {
    console.log(game)
    if(game.groups.length === 0){
      // Si no hay grupos, aumenta la ronda.
      console.log("No hay grupos, aumentar ronda")
      nextRound(groups);
      refreshGame();
    }
  }, [game]);

  useEffect(() => {
    if(game.round >= maxRounds){
      console.log("Maxima rondas logradas")
      setEvent(3)
      return;
    }

    if(game.groups.length === 1){
      // Si solo hay un grupo, se elige ese grupo
      console.log("Solo hay un grupo, elegir ese grupo")
      document.getElementById(game.groups[0].id).classList.remove('notChoose');
      document.getElementById(game.groups[0].id).classList.add('Choose');

      confetti();

      setTimeout(() => {
        endChoosingGroup(game.groups[0].id);
        setEvent(2)
        refreshGame();
      }, 2000)
      return;
    }
    let grupoActual = 0;
    const recorrerGrupos =
    setInterval(() => {
      while(grupoYaEstaElegido(grupoActual)){
        if(grupoActual === groups.length)
          grupoActual = 0;
        else
          grupoActual++;
      }
      document.querySelectorAll('.Choose').forEach((element) => {
        element.classList.remove('Choose');
        element.classList.add('notChoose');
      });
      const grupoSeleccionado = document.getElementById(grupoActual);
      grupoSeleccionado.classList.remove('notChoose');
      grupoSeleccionado.classList.add('Choose');
      if(grupoActual === groups.length)
        grupoActual = 0;
      else
        grupoActual++;
    }, 200);

    setTimeout(() => {
      clearInterval(recorrerGrupos)
      document.querySelectorAll('.Choose').forEach((element) => {
        element.classList.remove('Choose');
        element.classList.add('notChoose');
      });
      // Elegir grupo aleatorio
      endChoose();
    }, 6000) // Al pasar 6 segundos se detiene el intervalo
  }, []);

  function endChoose(){
    refreshGame()
    let grupoAleatorio = Math.floor(Math.random() * groups.length);
    while (grupoYaEstaElegido(grupoAleatorio)){
      grupoAleatorio = Math.floor(Math.random() * groups.length);
    }
    console.log("Grupo aleatorio: " + grupoAleatorio)
    document.getElementById(grupoAleatorio).classList.remove('notChoose');
    document.getElementById(grupoAleatorio).classList.add('Choose');

    confetti();
    setTimeout(() => {
      endChoosingGroup(grupoAleatorio);
      setEvent(2)
      refreshGame();
      refresh();
    }, 2000)
  }

  function grupoYaEstaElegido(id){
    for (let i = 0; i < game.groups.length; i++) {
      if(game.groups[i].id === id)
        return false; // Si se encontro el grupo en la lista de grupos elegidos
    }
    return true; // Si no se encontro el grupo en la lista de grupos elegidos
  }

  function allGroups({groups}){
    return(

      <section className='m-0 vh-100 row justify-content-center align-content-center'>

        <Container
          className='col-auto'
          style={{
          }}>
          <h1>
            Eligiendo fila - Ronda {game.round}/{maxRounds}
          </h1>
          <div
            className='d-flex justify-content-center p-3'
          >
            {
              groups.map((group, index) => (
                grupoYaEstaElegido(group.id) ?
                  <section key={index} className='p-3 alreadyChoose'>
                    <h5>
                      Fila {group.id}
                    </h5>
                    <img src={sillas} alt='silla'/>
                    <h5>
                      {group.points} puntos
                    </h5>
                  </section>
                  :
                  <section key={index} className='p-3 notChoose' id={group.id}>
                    <h5>
                      Fila {group.id}
                    </h5>
                    <img src={sillas} alt='silla'/>
                    <h5>
                      {group.points} puntos
                    </h5>
                  </section>
              ))
            }
          </div>
        </Container>
      </section>
    )
  }

  return(
    <>
      {allGroups({groups})  }
    </>
  )
}
