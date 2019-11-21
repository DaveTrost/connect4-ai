const { Board } = require('./lib/Board/Board');
const width = 7;
const height = 6;

function solve(plays) {
  const board = new Board(width, height);

  plays.split('').forEach(play => {
    board.play(play);

    if(!board.gameOver) {
      for(let c = 0; c < width; c++) {
        if(board.isWinningMove(c)) {
          console.log(board.ascii());
          console.log('player', board.getActivePlayer(), '- game can end with play at', c);
        }
      }
    }
  });

  console.log(board.ascii());
  console.log('Game Over?', board.gameOver);
  console.log('Winner:', board.winner);
  console.log('\n\n\n');

}

solve('2345245656565656');
solve('112233445566');
solve('112233306263');
solve('3330102624444');
