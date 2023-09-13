function getDefaultGame(){
  return {
    groups: [],
    start: false,
    status: {
      event: 1,
      /*
        1: Elegir grupo
        2: Elegir pregunta
        3: Responder
        4: Mostrar respuesta
        5: Mostrar puntos
        6: Mostrar ganador
       */
      choosingGroup: -1, // -1 significa que ningun grupo ha sido elegido
      questionSelected: -1, // -1 significa que ninguna pregunta ha sido elegida
    },
    round: 0,
  }
}

function getStatusGame(){
  const storedGame = localStorage.getItem('game');
  return storedGame === null ? getDefaultGame() : JSON.parse(storedGame);
}

// Global Vars
const maxRounds = 3;
let game = getStatusGame();

function startGame(currentGroups){
  if (currentGroups.length < 2){
    alert('You need at least 2 groups to start the game');
    game.start = false;
    game.round = 0;
  } else {
    game.start = true;
/*    game.groups = currentGroups;*/
    game.round = 1;
    game.status.event = 1;
  }
  localStorage.setItem('game', JSON.stringify(game));
}

function nextRound(currentGroups){
  if (game.round === maxRounds) {
    endGame();
    return;
  }
  game.round = game.round + 1;
  game.groups = currentGroups;
  localStorage.setItem('game', JSON.stringify(game));
}

function pauseGame(){
  game.start = false;
  localStorage.setItem('game', JSON.stringify(game));
}

function resumeGame(){
  game.pause = false;
  localStorage.setItem('game', JSON.stringify(game));
}

function endGame(){
  game.end = true;
  localStorage.setItem('game', JSON.stringify(game));
}

function resetGame(){
  game = getDefaultGame();
  localStorage.setItem('game', JSON.stringify(game));
}

// Event Update

function endChoosingGroup(grupoElegido){
  game.status.choosingGroup = grupoElegido;
  game.status.event = 2;
  // remove group from groups
  game.groups = game.groups.filter((group) => group.id !== (grupoElegido));
  localStorage.setItem('game', JSON.stringify(game));
}

function updateRound(currentGroups){
  game.round = game.round + 1;
  game.status.choosingGroup = -1;
  game.status.questionSelected = -1;
  game.status.event = 1;
  game.groups = currentGroups;
  localStorage.setItem('game', JSON.stringify(game));
}

export {
  updateRound,
  endChoosingGroup,
  getStatusGame,
  startGame,
  nextRound,
  pauseGame,
  resumeGame,
  endGame,
  resetGame,
  game,
  maxRounds,
}
