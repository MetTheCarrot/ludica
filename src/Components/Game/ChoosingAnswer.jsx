import {Stack} from "react-bootstrap";
import {useState} from "react";
import {getRandomQuest} from "../../Data/Questions.js";

export default function ChoosingAnswer({currentGroup}){

  const [getQuestion, setQuestion] = useState(getRandomQuest());

  useState(() => {
    setQuestion(getRandomQuest());
    console.log(getQuestion)
  }, []);

  return(
    <>

      Grupo {currentGroup} elija una respuesta

      <section>
        {getQuestion.pregunta_en}

        <Stack direction="horizontal" gap={2}>
          <div className="p-2 bg-warning">
            {getQuestion.respuestas_en[0].texto}
          </div>
          <div className="p-2 ms-auto bg-info">
            {getQuestion.respuestas_en[1].texto}
          </div>
        </Stack>
        <Stack direction="horizontal" gap={2}>
          <div className="p-2 bg-warning">
            {getQuestion.respuestas_en[2].texto}
          </div>
          <div className="p-2 ms-auto bg-info">
            {getQuestion.respuestas_en[3].texto}
          </div>
        </Stack>
      </section>
    </>
  )
}