import ShowGroups from "../ShowGroups.jsx";
import {Button, Container} from "react-bootstrap";

export default function ShowResults({groups}){
  return(
    <Container>
      <h1>Resultados</h1>
      <ShowGroups groups={groups} />
      <Button onClick={() => {
        localStorage.clear()
        window.location.reload()
      }}>Volver a jugar</Button>
    </Container>
  )
}