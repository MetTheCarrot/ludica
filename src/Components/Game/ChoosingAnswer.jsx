import {Button, ButtonGroup, Container} from "react-bootstrap";
import {getRandomQuest} from "../../Data/Questions.js";
import {useState} from "react";
import {addPoint, removePoint} from "../../Data/Groups.js";
import confetti from 'canvas-confetti'
import {endChoosingQuestion} from "../../Data/Game.js";

export default function ChoosingAnswer({currentGroup, quest, refresh}){

  const [pregunta, setPregunta] = useState(quest);
  const [showSpanishQuestion, setShowSpanishQuestion] = useState(false);
  const [showSpanishRespuetas, setShowSpanishRespuestas] = useState(false);
  const [removeTwoAnswers, setRemoveTwoAnswers] = useState(false);
  const [changeQuestion, setChangeQuestion] = useState(false);

  function checkAnswer(indicePulsado){
    const acerto = pregunta.respuestas_en[indicePulsado].correcta;
    const respuestaCuadadrado = document.getElementById("resultGame");
    document.querySelectorAll('.cardQuestion').forEach((element) => {
      element.classList.remove('cardQuestion');
      element.classList.add('incorrectAnswer');
    });
    // Obtener indice correcto
    const correctAnswer = pregunta.respuestas_en.findIndex((respuesta) => respuesta.correcta);
    // Pintar de verde la respuesta correcta
    const correctAnswerElement = document.getElementById(correctAnswer);
    correctAnswerElement.classList.remove('cardQuestion');
    correctAnswerElement.classList.add('correctAnswer');
    correctAnswerElement.classList.remove('incorrectAnswer');
    if(acerto){
      respuestaCuadadrado.innerHTML = "¡Respuesta correcta! (+6 puntos)";
      respuestaCuadadrado.style.color = 'green';
      addPoint(currentGroup.id, 6);
      document.getElementById(currentGroup.id + "grupo").innerHTML = "Tienen " + currentGroup.points + " puntos";
      confetti().then(() => {
        console.log("Cambiando a escoger otro grupo")
        endChoosingQuestion();
        // Elige siguiente grupo
      })
    } else {
      respuestaCuadadrado.innerHTML = "¡Respuesta incorrecta! (+0 puntos)";
      respuestaCuadadrado.style.color = 'red';
      setTimeout(() => {
        console.log("Cambiando a escoger otro grupo")
        endChoosingQuestion();
        refresh();
        // Elige siguiente grupo
      }, 4000) // Al pasar 2 segundos se detiene el intervalo
    }
  }

  function mostrarRespuestas(number){
    try{
      if (showSpanishRespuetas)
        return pregunta.respuestas_es[number].texto;
      else
        return pregunta.respuestas_en[number].texto;
    } catch (e) {
      setPregunta(getRandomQuest());
      return "No ha cargado la pregunta";
    }
  }

  function mostrarPregeunta(){
    try{
      if (showSpanishQuestion)
        return pregunta.pregunta_es;
      else
        return pregunta.pregunta_en;
    } catch (e) {
      setPregunta(getRandomQuest());
      return "No ha cargado la pregunta";
    }
  }

  function mostrarPreguntaEnEspanol(){
    setShowSpanishQuestion(true);
    removePoint(currentGroup.id, 3);
    document.getElementById(currentGroup.id + "grupo").innerHTML = "Tienen " + currentGroup.points + " puntos";
    refresh();
  }

  function mostrarRespuestasEnEspanol(){
    setShowSpanishRespuestas(true);
    removePoint(currentGroup.id, 2);
    document.getElementById(currentGroup.id + "grupo").innerHTML = "Tienen " + currentGroup.points + " puntos";
    refresh();
  }

  function cambiarPregunta(){
    setPregunta(getRandomQuest());
    setChangeQuestion(true);
    removePoint(currentGroup.id, 3);
    document.getElementById(currentGroup.id + "grupo").innerHTML = "Tienen " + currentGroup.points + " puntos";
    refresh();
  }

  function eliminarDosRespuestas(){
    removePoint(currentGroup.id, 2);
    setRemoveTwoAnswers(true);
    // Obtener el indice de la respuesta correcta
    const correctAnswer = pregunta.respuestas_en.findIndex((respuesta) => respuesta.correcta);
    // Obtener un numero aleatorio entre 0 y 3
    let randomAnswer = Math.floor(Math.random() * 4);
    while(randomAnswer === correctAnswer){
      randomAnswer = Math.floor(Math.random() * 4);
    }
    const posiblesRta= [0, 1, 2, 3];
    posiblesRta.splice(correctAnswer, 1);
    posiblesRta.splice(randomAnswer, 1);
    // Ocultar las respuestas
    document.getElementById(posiblesRta[0]).style.visibility = 'hidden';
    document.getElementById(posiblesRta[1]).style.visibility = 'hidden';
    document.getElementById(currentGroup.id + "grupo").innerHTML = "Tienen " + currentGroup.points + " puntos";
    refresh();
  }

  return(
    <section className='m-0 vh-100 row justify-content-center align-content-center'>

      <Container
        className='col-auto p-4'
        style={{
        border: 'dashed 5px black',
      }}>

        <h1>
          Grupo {currentGroup.id} elija una respuesta
        </h1>
        <h1
          id={currentGroup.id + "grupo"}
        >
          Tienen {currentGroup.points} puntos
        </h1>

        <div className='align-items-end row'
          style={{
            height: '55vh'
          }}
        >
          <h2
            className='p-2 bg-white rounded m-1 card'
          >
            {
              mostrarPregeunta()
            }
          </h2>

          {/*Debuffs*/}

            <section className='d-flex  justify-content-center align-self-end'>
              <ButtonGroup
                size='lg'
                className='shadow border'
              >
                <Button variant="primary"
                        onClick={eliminarDosRespuestas}
                        disabled={removeTwoAnswers}
                >
                  <div>
                    50/50
                  </div>
                    (-2 puntos)
                </Button>

                <Button variant="danger"
                        disabled={changeQuestion}
                        onClick={cambiarPregunta}
                >
                  <div>
                    Cambiar pregunta
                  </div>
                    (-3 puntos)
                </Button>

                <Button variant="warning"
                        disabled={showSpanishQuestion}
                        onClick={mostrarPreguntaEnEspanol}
                >
                  <div>
                    Traducir pregunta
                  </div>
                    (-3 puntos)
                </Button>

                <Button variant="secondary"
                        disabled={showSpanishRespuetas}
                        onClick={mostrarRespuestasEnEspanol}
                >
                  <div>
                    Traducir respuestas
                  </div>
                    (-2 puntos)
                </Button>
              </ButtonGroup>
            </section>

          <h2
            id='resultGame'
          >
          </h2>

          <div className='col'>
            <section className='d-flex bg-dark justify-content-center p-2 align-self-end'>
              <h4 className="p-2 bg-white rounded m-1 cardQuestion"
                id='0'
                  onClick={() => checkAnswer(0)}
              >
                {
                  mostrarRespuestas(0)
                }
              </h4>
              <h4 className="p-2 bg-white rounded m-1 cardQuestion"
                id="1"
                  onClick={() => checkAnswer(1)}

              >
                {
                  mostrarRespuestas(1)
                }
              </h4>
              <h4 className="p-2 bg-white rounded m-1 cardQuestion"
                id='2'
                  onClick={() => checkAnswer(2)}
              >
                {
                  mostrarRespuestas(2)
                }
              </h4>
              <h4 className="p-2 bg-white rounded m-1 cardQuestion"
                id='3'
                  onClick={() => checkAnswer(3)}
              >
                {
                  mostrarRespuestas(3)
                }
              </h4>
            </section>
          </div>

        </div>

      </Container>
    </section>
  )
}
