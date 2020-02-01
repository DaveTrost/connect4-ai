const { Board } = require('../lib/Board');
const { aiPlays } = require('../lib/negamax');

describe('Negamax Solver corner cases', () => {
  const width = 7;
  const height = 6;
  const fasterLookaheadDepth = 3;

  it('ranks all columns equally when the board is empty', () => {
    const board = new Board(width, height);

    expect(aiPlays(board, fasterLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ]
    `);
  });

  it('identifies a column that is full as being unplayable', () => {
    const board = new Board(width, height);
    board.playMoves([
      0, 0, 
      1, 1, 
      0, 1,
      1, 0,
      1, 0,
      1, 6,
    ]);

    expect(aiPlays(board, fasterLookaheadDepth)[1]).toBe(null);
  });
});

describe('Negamax Solver with default/faster settings', () => {
  const width = 7;
  const height = 6;
  const fasterLookaheadDepth = 3;

  it('identifies an immediate winning move in column 1', () => {
    const board = new Board(width, height);
    board.playMoves([
      1, 2,
      1, 4,
      1, 6,
    ]);

    expect(aiPlays(board, fasterLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        0,
        35,
        0,
        0,
        0,
        0,
        0,
      ]
    `);
  });

  it('identifies a winning move in column 1 and a block of the opponents win in column 2', () => {
    const board = new Board(width, height);
    board.playMoves([
      1, 2,
      1, 2,
      1, 2,
    ]);

    expect(aiPlays(board, fasterLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        -34,
        35,
        0,
        -34,
        -34,
        -34,
        -34,
      ]
    `);
  });

  it('identifies moves at columns 1 and 4 that each result in a win, 3 plays into the future', () => {
    const board = new Board(width, height);
    board.playMoves([
      2, 2,
      3, 3,
    ]);

    expect(aiPlays(board, fasterLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        0,
        35,
        0,
        0,
        35,
        0,
        0,
      ]
    `);
  });
});

describe.skip('Negamax Solver with harder/slower settings', () => {
  const width = 7;
  const height = 6;
  const slowerLookaheadDepth = 4;

  it('identifies an immediate winning move in column 1', () => {
    const board = new Board(width, height);
    board.playMoves([
      1, 2,
      1, 4,
      1, 6,
    ]);

    expect(aiPlays(board, slowerLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        0,
        35,
        0,
        0,
        0,
        0,
        0,
      ]
    `);
  });

  it('identifies a winning move in column 1 and a block of the opponents win in column 2', () => {
    const board = new Board(width, height);
    board.playMoves([
      1, 2,
      1, 2,
      1, 2,
    ]);

    expect(aiPlays(board, slowerLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        -34,
        35,
        0,
        -34,
        -34,
        -34,
        -34,
      ]
    `);
  });

  it('finds moves at columns 1 and 4 that each result in a win, 3 plays into the future', () => {
    const board = new Board(width, height);
    board.playMoves([
      2, 2,
      3, 3,
    ]);

    expect(aiPlays(board, slowerLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        0,
        35,
        0,
        0,
        35,
        0,
        0,
      ]
    `);
  });
});
