const Connect4 = require('./Connect4');
const { 
  getTop3ScoreTiers, 
  getTargetScore, 
  getTargetPlays, 
  getMax, 
  getRandomEle 
} = require('./helperFunctions');

/*
 * This class adds computerized play with a difficulty levels to the base Connect4 class
 * The difficulty algorithm is based on dividing the available moves into 3 tiers as follows:
 *  - Tier 1 contains moves with the best score rating
 *  - Tier 2 contains moves with the second best scores
 *  - Tier 3 contains moves with the third best scores
 *  - If there is no third best score, tiers 1 & 2 use the best score and tier 3 uses the second best
 * Difficulty settings are declared in a separate file. The ratios work as follows:
 *  - 'tier1Ratio' is a percentage for selecting the move with the best score rating 
 *  - 'tier2Ratio' is a percentage for selecting the move with the second best score rating 
 *  - 'tier3Ratio' is a percentage for selecting the move with the third best score rating 
 *  - Medium and Easy difficulties play a blend moves from multiple tiers to avoid AI behavior thar loses on purpose
 */
class Connect4AI extends Connect4 {
  constructor(w = 7, h = 6) {
    super(w, h);
    this.recursiveDepthLimit = 3;
  }

  playAI(difficulty = 'medium') {
    const scores = this.negamaxScores();
    const top3ScoreTiers = getTop3ScoreTiers(scores);
    const targetScore = getTargetScore(difficulty, top3ScoreTiers);
    const plays = getTargetPlays(scores, targetScore);
    const aiPlay = getRandomEle(plays);
    this.play(aiPlay);
    return aiPlay;
  }

  /*
  * This method recursively solves a connect 4 position using the negamax variant of min-max algorithm.
  * Based on a string of the prior game plays, it returns an array with the "score" for playing each column.
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
  negamaxScores(maxDepth) {
    if(!maxDepth) maxDepth = this.recursiveDepthLimit;

    const bestScores = Array.from({ length: this.width }, (_, col) => {
      if(!this.canPlay(col)) return null;

      const board = this.recreateBoard(this.getPlays());
      return this.negamax(board, col, maxDepth);
    });

    return bestScores;
  }

  negamax(game, nextPlay, maxDepth, currentDepth = 0) {
    if(currentDepth > maxDepth) return 0;
    if(!game.canPlay(nextPlay)) return 0;

    game.play(nextPlay);
    if(game.gameOver) {
      return (game.width * game.height - game.moveCount);
    }

    let bestScore = null;
    const resetString = game.getPlays();
    for(let c = 0; c < game.width; c++) {
      const newBoard = this.recreateBoard(resetString);
      const testScore = this.negamax(newBoard, c, maxDepth, currentDepth + 1);
      bestScore = getMax(bestScore, testScore);
    }
    return 0 - bestScore ;
  }

  recreateBoard(gamePlays) {
    const newBoard = new Connect4();
    if(gamePlays) {
      newBoard.playMoves(gamePlays.split(''));
    }
    return newBoard;
  }
}

module.exports = Connect4AI;
