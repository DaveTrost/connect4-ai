const { getTargetScore } = require('../lib/helperFunctions');
const Connect4AI = require('../lib/Connect4AI');

describe('AI Game Play', () => {
  const width = 7;
  const height = 6;

  it('selects the winning move in column 1 using "hard" difficulty', () => {
    const board = new Connect4AI(width, height);
    board.playMoves([1, 2, 1, 2, 1, 2]);
    const computerMove = board.playAI('hard');

    expect(computerMove).toBe(1);
  });

  it('selects either the winning move in column 1 or the blocking move in column 2 using default difficulty', () => {
    const board = new Connect4AI(width, height);
    board.playMoves([1, 2, 1, 2, 1, 2]);
    const computerMove = board.playAI();

    expect(computerMove).toBeGreaterThanOrEqual(1);
    expect(computerMove).toBeLessThanOrEqual(2);
  });

  it('has an operational function for getting the Target Score', () => {
    for(let i = 0; i < 16; i++) {
      expect(getTargetScore('easy', [0, 0, 0])).toBe(0);
    }
    expect(getTargetScore('medium', [1, 1, 0])).toBe(1);
    expect(getTargetScore('hard', [15, 0, -13])).toBe(15);
  });
});
