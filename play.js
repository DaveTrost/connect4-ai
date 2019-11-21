const { Board } = require('./lib/Board/Board');
const width = 7;
const height = 6;

function solve(plays) {
  const board = new Board(width, height);
  let validPlays = '';

  plays.split('').every(play => {
    const col = play - 1;
    board.play(col);
    validPlays += `${play}`;
    console.log(board.ascii());
    
    if(board.gameOver) {
      console.log('Game Over. Plays =', validPlays, '\n\n\n');
      return false;
    }  

    for(let c = 0; c < width; c++) {
      if(board.isWinningMove(c)) {
        console.log('player', board.getActivePlayer(), '- game can end with play at', c + 1);
      }
    }
    return true;
  });

}

// solve('3456356767676767');
// solve('223344556677');
// solve('223344417374');
solve('4441213735555');
