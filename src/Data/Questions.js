import {listOfQuest} from '../Components/Game/Answers/Answers.js';

function getQuestions(){
  return listOfQuest;
}

let questions = getQuestions();

function getRandomQuest(){
  const randomize = Math.floor(Math.random() * questions.length);
  // TODO: Añadir removedor de preguntas contestadas
  return questions[randomize];
}

export {
  questions,
  getRandomQuest
}