/** 
 * This class for storing a Connect 4 board is structured 
 * based on an outline from Pascal Pons at the following site:
 * http://blog.gamesolver.org/
 */

class Board {
  constructor(w = 7, h = 6) {
    this.width = w;
    this.height = h;
    this.board = {};
    for(let c = 0; c < this.width; c++) {
      this.board[c] = [];
    }

    this.moveCount = 0;
    this.plays = '';
    this.playerMarks = [2, 1];
    this.gameOver = false;
    this.winner = null;
  }

  /*  Indicates whether a (zero-based index) column is playable. */
  canPlay(col) {
    if(!this.board[col]) throw `Exception: the column ${col} is not valid`;
    return this.board[col].length < this.height;
  }

  /* Plays a playable column */
  play(col) {
    if(!this.canPlay(col)) return;

    if(this.isWinningMove(col)) {
      this.gameOver = true;
      this.winner = this.getActivePlayer();
    }

    this.moveCount++;
    this.plays += `${col + 1}`;
    this.board[col].push(this.playerMarks[this.moveCount % 2]);

    if(this.moveCount >= this.height * this.width) this.gameOver = true;
  }

  /* Returns true if playing into the given column results in a win */
  isWinningMove(col) {
    const markToBePlayed = `${this.playerMarks[(this.moveCount + 1) % 2]}`;
    const winPreReq = markToBePlayed.repeat(3);

    if(this.southBy3(col).includes(winPreReq)) return true;
    if(this.westBy3EastBy3(col).includes(winPreReq)) return true;
    if(this.southwestBy3NortheastBy3(col).includes(winPreReq)) return true;
    if(this.northwestBy3SoutheastBy3(col).includes(winPreReq)) return true;
    return false;
  }

  southBy3(col) {
    return this.board[col].join('').slice(-3);
  }
  westBy3EastBy3(col, rowMovementWestToEast = 0) {
    const row = this.board[col].length;
    return Object.values(this.board).reduce((marks, colArr, colIndex) => {
      const colDelta = colIndex - col;
      if(Math.abs(colDelta) > 3) return marks;

      const mark = colArr[row + rowMovementWestToEast * colDelta] || '_';
      return marks + mark;
    }, '');
  }
  southwestBy3NortheastBy3(col) {
    return this.westBy3EastBy3(col, +1);
  }
  northwestBy3SoutheastBy3(col) {
    return this.westBy3EastBy3(col, -1);
  }

  getMoves() {
    return this.moveCount; 
  }

  getActivePlayer() {
    return this.playerMarks[(this.moveCount + 1) % 2];
  }

  ascii() {
    const asciiBoard = Object.values(this.board)
      .map(col => col.map(mark => ` ${mark} `));
    asciiBoard.forEach(col => {
      while(col.length < this.height) col.push(' - ');
    });

    let ascii = '\n';
    for(let row = this.height - 1; row >= 0; row--) {
      for(let col = 0; col < this.width; col++) {
        ascii += asciiBoard[col][row];
      }
      ascii += '\n';
    }
    ascii += '---'.repeat(this.width) + '\n';
    for(let col = 0; col < this.width; col++) {
      ascii += `[${col + 1}]`;
    }

    return ascii;
  }
}

module.exports = { Board };
