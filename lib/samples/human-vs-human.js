const Connect4 = require('./index');  // require('connect4-ai')
const width = 7;
const height = 6;

const game = new Connect4(width, height);
let player1Play = 3;

function handlePlay(column) {
  if(game.gameStatus().gameOver) return;
  if(!game.canPlay(column)) return;
    
  updateBoard(column);
  game.play(column);
  updateStatus(game.gameStatus());
}

function updateStatus(status) {
  console.log(status);
}

function updateBoard(column) {
  console.log(`${game.getActivePlayer()} played column ${column}`);
  console.log(game.ascii());
}

  