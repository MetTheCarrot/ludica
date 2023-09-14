import ShowGroups from "../ShowGroups.jsx";
import {Container} from "react-bootstrap";

export default function ShowResults({groups}){
  return(
    <Container>
      <h1>Resultados</h1>
      <ShowGroups groups={groups} />
    </Container>
  )
}