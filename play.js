const { Connect4AI } = require('./index');
const width = 7;
const height = 6;

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'C4> '
});

const HUMAN_V_COMPUTER = true;
const DIFFICULTY = 'easy';

const game = new Connect4AI(width, height);
console.log(game.ascii());
console.log('Player', game.getActivePlayer(), '- make a play');

rl.prompt();
rl.on('line', (line) => {

  const screen = line.trim() === '' ? 'empty' : line.trim();
  const col = Number(screen);
  if(col >= 0 && col < width && game.canPlay(col)) {
    game.play(col);
    showUpdateAndNextTurn(game);
    
    if(HUMAN_V_COMPUTER && !game.gameOver) {
      const play = game.playAI(DIFFICULTY);
      console.log('Computer played column:', play);
      showUpdateAndNextTurn(game);
    }
  }
  else {
    console.log(`Say what? That column is not valid for play '${line.trim()}'`);
  }

  console.log('Player', game.getActivePlayer(), '- make a play');
  rl.prompt();
}).on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});


function showUpdateAndNextTurn(game) {
  console.log(game.ascii());
  if(game.gameOver) {
    console.log('Game Over');
    console.log('Winner:', game.winner, '\n');
    game.reset();
    console.log(game.ascii());
  }
}
