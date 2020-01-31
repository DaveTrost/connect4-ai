const Connect4 = require('./index');  // require('connect4-ai')
const width = 7;
const height = 6;

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

solve('2345245656565656');
solve('112233445566');
solve('112233306263');
solve('3330102624444');
