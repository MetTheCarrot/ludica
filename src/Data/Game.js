function getDefaultGame(){
  return {
    groups: [],
    start: false,
    pause: false,
    end: false,
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
    game.groups = currentGroups;
    game.round = 1;
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
  game.pause = true;
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

export {
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
