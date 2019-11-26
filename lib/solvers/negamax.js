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

const RECURSIVE_DEPTH_LIMIT = 1;
const INVALID_COLUMN = -999;
const RATIO_OF_PLAYING_MEDIUM_DIFFICULTY = 0.2;
const RATIO_OF_PLAYING_EASY_DIFFICULTY = 0.4;

const SET_MEDIUM_DIFFICULTY = 1;
const SET_EASY_DIFFICULTY = 0;

function playAI(game) {
  if(game.gameOver) throw 'Exception - the game is over and AI cannot play';
  
  const movesToReset = game.plays.split('');
  const bestScores = Array(game.width)
    .fill(0)
    .map((_, c) => {
      const futureBoard = new Board(game.width, game.height);
      movesToReset.forEach(play => futureBoard.play(play));

      // prevent illegal plays by weighting this choice **very low**
      if(!futureBoard.canPlay(c)) return INVALID_COLUMN;

      futureBoard.play(c);
      return -limitedNegaMax(futureBoard);
    });

  const [hard, medium, easy] = bestScores
    .slice()
    .sort((scoreA, scoreB) => scoreB - scoreA)
    .reduce((uniqueScores, score) => {
      if(uniqueScores.includes(score) || score === INVALID_COLUMN) return uniqueScores; 
      return [...uniqueScores, score];
    }, []);

  const indicesByDifficulty = bestScores.reduce((obj, score, i) => {
    if(hard && score === hard) obj.hard.push(i);
    if(!medium && score === hard) obj.medium.push(i);
    if(medium && score === medium) obj.medium.push(i);
    if(!easy || score === easy) obj.easy.push(i);
    return obj;
  }, { hard: [], medium: [], easy: [] });

  const playMedium = SET_MEDIUM_DIFFICULTY && Math.random() < RATIO_OF_PLAYING_MEDIUM_DIFFICULTY;
  const playEasy = !SET_MEDIUM_DIFFICULTY && SET_EASY_DIFFICULTY && Math.random() < RATIO_OF_PLAYING_EASY_DIFFICULTY;
  const bestMoveIndices = playEasy && indicesByDifficulty.easy ||
    playMedium && indicesByDifficulty.medium ||
    indicesByDifficulty.hard;

  return bestMoveIndices[Math.floor(Math.random() * bestMoveIndices.length)];
}

function limitedNegaMax(game, depth = 0) {  
  const totalGameSquares = game.width * game.height;
  if(game.gameOver) {
    console.log('found game over ... playback =', game.plays);
    return -(totalGameSquares - game.moveCount) / 2;
  }

  for(let c = 0; c < game.width; c++) {
    if(game.canPlay(c) && game.isWinningMove(c)) {
      return (totalGameSquares - game.moveCount + 1) / 2;
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