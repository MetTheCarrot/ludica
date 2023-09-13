import sillas from "../../assets/sillas.png";
import {useEffect} from "react";
import {endChoosingGroup, updateRound} from "../../Data/Game.js";

export default function ChoosingGroup({groups, game, refreshGame}){

  useEffect(() => {

    console.log("Elegir grupo")
    console.log(game.groups)

    if(game.groups.length === 0){
      // Si no hay grupos, aumenta la ronda.
      console.log("No hay grupos, aumentar ronda")
      updateRound(groups);
      refreshGame();
    }

    if(game.groups.length === 1){
      // Si solo hay un grupo, se elige ese grupo
      console.log("Solo hay un grupo, elegir ese grupo")
      endChoosingGroup(game.groups[0].id);
      refreshGame();
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
      console.log("Grupo actual: " + grupoActual)
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
    }, 10000) // Al pasar 10 segundos se detiene el intervalo
  }, []);

  function endChoose(){
    let grupoAleatorio = Math.floor(Math.random() * groups.length);
    while (grupoYaEstaElegido(grupoAleatorio)){
      grupoAleatorio = Math.floor(Math.random() * groups.length);
    }
    console.log("Grupo aleatorio: " + grupoAleatorio)
    document.getElementById(grupoAleatorio).classList.remove('notChoose');
    document.getElementById(grupoAleatorio).classList.add('Choose');
    endChoosingGroup(grupoAleatorio);
    refreshGame();
    refreshGame();
    refreshGame();
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
      <div
        className='d-flex justify-content-center p-3'
      >
        {
          groups.map((group, index) => (
            grupoYaEstaElegido(group.id) ?
            <section key={index} className='p-3 alreadyChoose'>
              <img src={sillas} alt='silla'/>
              <h5>
                {group.points} puntos
              </h5>
            </section>
              :
            <section key={index} className='p-3 notChoose' id={group.id}>
              <img src={sillas} alt='silla'/>
              <h5>
                {group.points} puntos
              </h5>
            </section>
          ))
        }
      </div>
    )
  }

  return(
    <>
      {allGroups({groups})  }
    </>
  )
}