/*
 * Recursively solve a connect 4 position using negamax variant of min-max algorithm.
 * Return the possible moves from a given game state. 
 * With each possible move, provide the best-case outcome as follows:
 *  - 0 for a draw game or an unknown outcome
 *  - positive score if the move can win despite the opponent's responses. 
 *  - negative score if the opponent can force a loss. 
 *    - the magnitude of either score is determined by: 
 *      number of spaces remaining on the board after the win/loss.
 *      The faster the win/loss can occur, the larger the absolute value of the score
 */
const { Board } = require('../Board/Board');

const RECURSIVE_DEPTH_LIMIT = 4;

function aiPlays(game, maxDepth = RECURSIVE_DEPTH_LIMIT) {
  if(game.gameOver) throw 'Exception - the game is over and AI cannot play';
  
  const movesToReset = game.plays.split('');
  const bestScores = Array(game.width)
    .fill(0)
    .map((_, c) => {
      const resetBoard = new Board(game.width, game.height);
      movesToReset.forEach(play => resetBoard.play(play));

      const weight = limitedNegaMax(resetBoard, c, maxDepth);
      return weight === null ? 0 : weight;
    });

  return bestScores;
}

function limitedNegaMax(game, nextPlay, maxDepth, depth = 0) {  
  if(depth > maxDepth) return 0;
  if(!game.canPlay(nextPlay)) return 0;

  game.play(nextPlay);
  if(game.gameOver) {
    return (game.width * game.height - game.moveCount);
  }

  let bestScore = null;
  const movesToReset = game.plays.split('');
  for(let c = 0; c < game.width; c++) {
    const resetBoard = new Board(game.width, game.height);
    movesToReset.forEach(play => resetBoard.play(play));

    const testScore = limitedNegaMax(resetBoard, c, maxDepth, depth + 1);
    if(testScore) bestScore = myMax(bestScore, testScore);
  }
  return 0 - bestScore ;
}

function myMax(val1, val2) {
  if(val1 === null) return val2;
  if(val2 === null) return val1;
  return Math.max(val1, val2);
}

module.exports = { aiPlays };