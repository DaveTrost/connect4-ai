/*
 * Recursively solve a connect 4 position using negamax variant of min-max algorithm.
 * Return the possible moves from a given game state. 
 * With each possible move, provide the best-case outcome as follows:
 *  - 0 for a draw game
 *  - positive score if the move can win despite the opponent's responses. The score is
 *    the number of moves until the win (the faster the win occurs, the higher the score)
 *  - negative score if the opponent can force a loss. The score is the negative by 
 *    the number of moves before the loss (the faster the loss occurs, the lower the score).
 */
const { Board } = require('../Board/Board');

const RECURSIVE_DEPTH_LIMIT = 5;

function playAI(game) {
  if(game.gameOver) throw 'Exception - the game is over and AI cannot play';
  
  const movesToReset = game.plays.split('');
  const bestScores = Array(game.width)
    .fill(0)
    .map((_, c) => {
      const futureBoard = new Board(game.width, game.height);
      movesToReset.forEach(play => futureBoard.play(play));

      // prevent illegal plays by weighting this choice **very low**
      if(!futureBoard.canPlay(c)) return -999;

      futureBoard.play(c);
      return limitedNegaMax(futureBoard);
    });
  
  console.log('computer has these choices to work with ...');
  console.log(bestScores);

  const totalGameSquares = game.width * game.height;
  const bestScore = bestScores.reduce((high, score) => Math.max(high, score), -totalGameSquares);
  const bestMoveIndices = bestScores
    .map((score, i) => score >= bestScore ? i : -1)
    .filter(index => index >= 0);

  return bestMoveIndices[Math.floor(Math.random() * bestMoveIndices.length)];
}

function limitedNegaMax(game, depth = 0) {  
  const totalGameSquares = game.width * game.height;
  if(game.gameOver) return totalGameSquares + 10;

  for(let c = 0; c < game.width; c++) {
    if(game.canPlay(c) && game.isWinningMove(c)) {
      return (totalGameSquares - game.moveCount) / 2;
    }
  }
  
  let bestScore = -totalGameSquares;
  if(depth > RECURSIVE_DEPTH_LIMIT) return bestScore;

  const movesToReset = game.plays.split('');
  for(let c = 0; c < game.width; c++) {
    const futureBoard = new Board(game.width, game.height);
    movesToReset.forEach(play => futureBoard.play(play));
    if(futureBoard.canPlay(c)) {
      futureBoard.play(c);
      const testScore = -1 * limitedNegaMax(futureBoard, depth + 1);
      bestScore = Math.max(bestScore, testScore);
    }
  }
  return bestScore;
}

module.exports = { playAI };