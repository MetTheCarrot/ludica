import {listOfQuest} from '../Components/Game/Answers/Answers.js';

function getQuestions(){
  const preguntas = localStorage.getItem('questions');
  return preguntas === null ? [] : JSON.parse(preguntas);
}

let questions = getQuestions();

function addNewQuestion(){
  // Randomize listOfQuest of Answers.js
  const randomize = Math.floor(Math.random() * listOfQuest.length);
  questions.push(listOfQuest[randomize]);
  localStorage.setItem('questions', JSON.stringify(questions));
}

function getRandomQuest(){
  addNewQuestion();
  const randomize = Math.floor(Math.random() * questions.length);
  return questions[randomize];
}

export {
  questions,
  getRandomQuest
}