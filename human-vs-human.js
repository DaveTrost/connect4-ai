const Connect4 = require('./index');  // require('connect4-ai')
const width = 7;
const height = 6;

const game = new Connect4(width, height);

const moves = [
  3, 2, 
  4, 4, 
  3, 3,
  2, 5,
  1, 1,
  1, 4,
  1, 2,
  2, 3,
  3, 6,
  5, 5
];
moves.forEach(humanPlay => {
  handlePlay(humanPlay);
});

function handlePlay(column) {
  if(game.gameStatus().gameOver) return;
  if(!game.canPlay(column)) return;
    
  game.play(column);
  updateBoard(column);
  updateStatus(game.gameStatus());
}

function updateStatus(status) {
  console.log('\n', status, '\n');
}

function updateBoard(column) {
  console.log(`Column ${column} was played: ${game.ascii()}`);
}
