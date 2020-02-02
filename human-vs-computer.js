const { Connect4AI } = require('./index');  // externally: require('connect4-ai')

const game = new Connect4AI();
const movesPlayer1 = [
  3,
  4,
  3,
  2,
  1,
  1,
  1,
  2,
  3,
  5,
];
movesPlayer1.forEach(humanPlay => {
  handlePlay(() => game.play(humanPlay));
  handlePlay(() => game.playAI('hard'));   // or 'easy' or 'medium'
});

function handlePlay(playFunction) {
  if(game.gameStatus().gameOver) return;
    
  playFunction();

  displayBoard(game.ascii());
  updateStatus(game.gameStatus());
}

function displayBoard(board) {
  console.log(`Column ${game.plays[game.plays.length - 1]} was played ${board}`);
}
function updateStatus(status) {
  console.log('\n', status, '\n');
}
