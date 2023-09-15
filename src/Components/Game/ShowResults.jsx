import {Button, Container} from "react-bootstrap";
import sillas from "../../assets/sillas.png";
import nosillas from "../../assets/nogroups.png";

export default function ShowResults({groups}){

  function obtenerPrimerLugar(){
    //Retorna el grupo del primer lugar
    let primerLugar = groups[0];
    groups.forEach((group) => {
      if(group.points >= primerLugar.points)
        primerLugar = group;
    })
    return primerLugar;
  }

  function obtenerSegundoLugar(){
    //Retorna el grupo del segundo lugar
    let primerLugar = obtenerPrimerLugar();
    let segundoLugar = groups[0];
    groups.forEach((group) => {
      if(group.points >= segundoLugar.points && group.id !== primerLugar.id)
        segundoLugar = group;
    })
    return segundoLugar;
  }

  function obtenerTercerLugar(){
    //Retorna el grupo del tercer lugar
    let primerLugar = obtenerPrimerLugar();
    let segundoLugar = obtenerSegundoLugar();
    let tercerLugar = groups[0];
    groups.forEach((group) => {
      if(group.points >= tercerLugar.points && group.id !== primerLugar.id && group.id !== segundoLugar.id)
        tercerLugar = group;
    })
    return tercerLugar;
  }

  function getClassName(idGroup){
    const primerLugar = obtenerPrimerLugar();
    if(idGroup === primerLugar.id){
      console.log("Primer lugar, id: " + idGroup)
      return 'p-3 primerLugar';
    }
    //Si hay segundo lugar
    if(groups.length > 1){
      const segundoLugar = obtenerSegundoLugar();
      if(idGroup === segundoLugar.id){
        console.log("Segundo lugar, id: " + idGroup)
        return 'p-3 segundoLugar';
      }
    }
    //Si hay tercer lugar
    if(groups.length > 2){
      const tercerLugar = obtenerTercerLugar();
      if(idGroup === tercerLugar.id){
        console.log("Tercer lugar, id: " + idGroup)
        return 'p-3 tercerLugar';
      }
    }
    return 'p-3';
  }


  return(
    <Container>
      <h1>Resultados</h1>
      <div
        className='d-flex justify-content-center p-3'
      >
        {
          groups.length > 0 ?
            groups.map((group, index) => (
              <section key={index} className={getClassName(group.id)}>
                <h5>
                  Fila {group.id}
                </h5>
                <img src={sillas} alt='silla'/>
                <h5>
                  {group.points} puntos
                </h5>
              </section>
            ))
            :
            <section className='p-3'>
              <img src={nosillas} alt='silla' />
            </section>
        }
      </div>
      <Button onClick={() => {
        localStorage.clear()
        window.location.reload()
      }}>Volver a jugar</Button>
    </Container>
  )
}