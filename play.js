const Connect4 = require('./index');
const width = 7;
const height = 6;
const { aiPlays } = require('./lib/negamax');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'C4> '
});

const HUMAN_V_COMPUTER = true;

let game = new Connect4(width, height);
console.log(game.ascii());
console.log('Player', game.getActivePlayer(), '- make a play');

rl.prompt();
rl.on('line', (line) => {

  const screen = line.trim() === '' ? 'empty' : line.trim();
  const col = Number(screen);
  if(col >= 0 && col < width && game.canPlay(col)) {
    game.play(col);
    game = showBoardUpdate(game);
    
    if(HUMAN_V_COMPUTER && !game.gameOver) {
      const play = aiPlays(game);  // needs to be re-worked
      game.play(play);
      console.log('Computer played column:', play);
      game = showBoardUpdate(game);
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


function showBoardUpdate(game) {
  console.log(game.ascii());
  if(game.gameOver) {
    console.log('Game Over');
    console.log('Winner:', game.winner, '\n');
    game = new Connect4(width, height);
    console.log(game.ascii());
  }
  return game;
}


/*
function solve(plays) {
  const game = new Connect4(width, height);

  plays.split('').forEach(play => {
    game.play(play);

    if(!game.gameOver) {
      for(let c = 0; c < width; c++) {
        if(game.isWinningMove(c)) {
          console.log(game.ascii());
          console.log('player', game.getActivePlayer(), '- game can end with play at', c);
        }
      }
    }
  });

  console.log(game.ascii());
  console.log('Game Over?', game.gameOver);
  console.log('Winner:', game.winner);
  console.log('\n\n\n');

}

// solve('2345245656565656');
// solve('112233445566');
// solve('112233306263');
// solve('3330102624444');
*/
