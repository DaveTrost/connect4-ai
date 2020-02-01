const { Board } = require('./Board');

/*
 * This function recursively solves a connect 4 position using the negamax variant of min-max algorithm.
 * Based on a provided game state, it returns an array with the "score" for playing each column.
 *   Scoring follows this convention:
 *    - 0 for a draw game or an unknown outcome
 *    - Positive score if the move can win despite the opponent's responses. 
 *    - Negative score if the opponent can force a loss. 
 *    - The faster the win/loss can occur, the larger the absolute value of the score
 *    - The magnitude of +/- scores is determined by: the number of spaces remaining on the board after the win/loss.
 * The optional maxDepth parameter can adjust AI accuracy
 *  - The default is set to 3 levels of recursion - currently for performance reasons
 *  - Larger values can be specidied with the tradeoff of longer execution time
 */
const RECURSIVE_DEPTH_LIMIT = 3;
function aiPlays(game, maxDepth = RECURSIVE_DEPTH_LIMIT) {
  if(game.gameOver) throw 'Exception - the game is over and AI cannot play';

  const movesToReset = game.plays.split('');
  const bestScores = Array.from({ length: game.width }, (_, col) => {
    if(!game.canPlay(col)) return null;

    const board = recreateBoard(game, movesToReset);
    return limitedNegaMax(board, col, maxDepth);
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
    const board = recreateBoard(game, movesToReset);
    const testScore = limitedNegaMax(board, c, maxDepth, depth + 1);
    bestScore = myMax(bestScore, testScore);
  }
  return 0 - bestScore ;
}

function recreateBoard(game, movesToReset) {
  const newBoard = new Board(game.width, game.height);
  newBoard.playMoves(movesToReset);
  return newBoard;
}

function myMax(val1, val2) {
  if(val1 === null) return val2;
  if(val2 === null) return val1;
  return Math.max(val1, val2);
}

module.exports = { aiPlays };