const { negamaxScores } = require('./negamax');

const DIFFICULTY_RATIOS = {
  'hard': {
    tier1Ratio: 1,
    tier2Ratio: 0,
    tier3Ratio: 0
  },
  'medium': {
    tier1Ratio: 0.5,
    tier2Ratio: 0.5,
    tier3Ratio: 0
  },
  'easy': {
    tier1Ratio: 0.2,
    tier2Ratio: 0.3,
    tier3Ratio: 0.5
  },
};

/*
 * This function provides a computerized play at a difficulty level from a provided game state
 * The difficulty algorithm is based on dividing the available moves into 3 tiers as follows:
 *  - Tier 1 contains moves with the best score rating
 *  - Tier 2 contains moves with the second best scores
 *  - Tier 3 contains moves with the third best scores
 *  - If there is no third best score, tiers 1 & 2 use the best score and tier 3 uses the second best
 * Difficulty settings can be tweaked by the global object. The ratios work as follows:
 *  - 'tier1Ratio' is a percentage for selecting the move with the best score rating 
 *  - 'tier2Ratio' is a percentage for selecting the move with the second best score rating 
 *  - 'tier3Ratio' is a percentage for selecting the move with the third best score rating 
 *  - Medium and Easy difficulties play a blend moves from multiple tiers to avoid AI behavior thar loses on purpose
 */
function aiPlay(game, difficulty = 'medium') {
  const scores = negamaxScores(game);
  const top3ScoreTiers = getTop3ScoreTiers(scores);
  const targetScore = getTargetScore(difficulty, top3ScoreTiers);
  console.log('target score:', targetScore);
  
  const plays = getTargetPlays(scores, targetScore);
  return getRandomEle(plays);
}

function getTop3ScoreTiers(scores) {
  const topScores = scores
    .filter(x => x !== null)
    .sort((scoreA, scoreB) => scoreB - scoreA)
    .reduce((uniqueScores, score) => {
      if(uniqueScores.includes(score))
        return uniqueScores;
      return [...uniqueScores, score];
    }, []);
  topScores.unshift(topScores[0], topScores[0]);
  return topScores.splice(-3, 3);
}

function getTargetScore(difficulty, top3ScoreTiers) {
  const { tier1Ratio, tier3Ratio } = DIFFICULTY_RATIOS[difficulty.toLowerCase()];
  
  const [tier1Score, tier2Score, tier3Score] = top3ScoreTiers;
  const [tier1Floor, tier2Floor, tier3Floor] = [1 - tier1Ratio, tier3Ratio, 0];
  
  const ratio = Math.random();
  if(ratio >= tier1Floor)
    return tier1Score;
  if(ratio < tier1Floor && ratio >= tier2Floor)
    return tier2Score;
  if(ratio < tier2Floor && ratio >= tier3Floor)
    return tier3Score;
}

function getTargetPlays(scores, targetScore) {
  return scores.reduce((plays, score, i) => {
    if(score === targetScore)
      plays.push(i);
    return plays;
  }, []);
}

function getRandomEle(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { aiPlay };
