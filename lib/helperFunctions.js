const difficultyRatios = require('./difficultyRatiosForAI');

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
  const { tier1Ratio, tier3Ratio } = difficultyRatios[difficulty.toLowerCase()];
  
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

function getMax(val1, val2) {
  if(val1 === null) return val2;
  return Math.max(val1, val2);
}

function getRandomEle(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { getTop3ScoreTiers, getTargetScore, getTargetPlays, getMax, getRandomEle };
