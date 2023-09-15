import {listOfQuest} from '../Components/Game/Answers/Answers.js';

function getQuestions(){
  return listOfQuest;
}

let questions = getQuestions();

function getRandomQuest(){
  let randomize = Math.floor(Math.random() * questions.length);
  while(questions[randomize].respondida === true){
    randomize = Math.floor(Math.random() * questions.length);
  }
  return questions[randomize];
}

function skipQuestion(question){
  //find index
  let id = questions.findIndex((item) => item === question);
  //change respondida to true
  questions[id].respondida = true;
  //update questions
  localStorage.setItem('questions', JSON.stringify(questions));
}

export {
  skipQuestion,
  questions,
  getRandomQuest
}