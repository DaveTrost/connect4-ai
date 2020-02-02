const { Connect4 } = require('./index');  // externally: require('connect4-ai')

const game = new Connect4();
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
moves.forEach(humanPlay => handlePlay(humanPlay));

function handlePlay(column) {
  if(game.gameStatus().gameOver) return;
  if(!game.canPlay(column)) return;
    
  game.play(column);
  displayBoard(game.ascii());
  updateStatus(game.gameStatus());
}

function displayBoard(board) {
  console.log(`Column ${game.plays[game.plays.length - 1]} was played ${board}`);
}
function updateStatus(status) {
  console.log('\n', status, '\n');
}
