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
    this.players = [2, 1];
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
    this.board[col].push(this.players[this.moveCount % 2]);

    if(this.moveCount >= this.height * this.width) this.gameOver = true;
  }

  /* Returns true if playing into the given column results in a win */
  isWinningMove(col) {
    const chipToBePlayed = `${this.players[(this.moveCount + 1) % 2]}`;
    const winPreReq = chipToBePlayed.repeat(3);

    if(this.southBy3(col).includes(winPreReq)) return true;

    // console.log('southwest northeast at', col, '=', this.southwestBy3NortheastBy3(col), '\n');
    
    if(this.westBy3EastBy3(col).includes(winPreReq)) return true;
    if(this.southwestBy3NortheastBy3(col).includes(winPreReq)) return true;
    if(this.northwestBy3SoutheastBy3(col).includes(winPreReq)) return true;
    return false;
  }

  southBy3(col) {
    return this.board[col].join('').slice(-3);
  }
  westBy3EastBy3(col) {
    const row = this.board[col].length;
    return Object.values(this.board).reduce((string, colArr, colIndex) => {
      const colDelta = colIndex - col;
      if(Math.abs(colDelta) > 3) return string;

      return `${string}${colArr[row] || '_'}`;
    }, '');
  }
  southwestBy3NortheastBy3(col) {
    const row = this.board[col].length;
    return Object.values(this.board).reduce((string, colArr, colIndex) => {
      const colDelta = colIndex - col;
      if(Math.abs(colDelta) > 3) return string;
      
      return `${string}${colArr[row + colDelta] || '_'}`;
    }, '');
  }
  northwestBy3SoutheastBy3(col) {
    const row = this.board[col].length;
    return Object.values(this.board).reduce((string, colArr, colIndex) => {
      const colDelta = colIndex - col;
      if(Math.abs(colDelta) > 3) return string;
      
      return `${string}${colArr[row - colDelta] || '_'}`;
    }, '');
  }

  getMoves() {
    return this.moveCount; 
  }

  getActivePlayer() {
    return this.players[(this.moveCount + 1) % 2];
  }

  ascii() {
    const asciiBoard = Object.values(this.board).map(c => c.map(val => ` ${val} `));
    asciiBoard.forEach(c => {
      while(c.length < this.height) c.push(' - ');
    });

    let ascii = '\n';
    for(let r = this.height - 1; r >= 0; r--) {
      for(let c = 0; c < this.width; c++) {
        ascii += asciiBoard[c][r];
      }
      ascii += '\n';
    }
    ascii += '---'.repeat(this.width) + '\n';
    ascii += [...Array(this.width)].map((_, i) => `[${i + 1}]`).join('');

    return ascii;
  }
}

module.exports = { Board };
