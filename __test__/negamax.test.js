const { Board } = require('../lib/Board/Board');
const { aiPlays } = require('../lib/solvers/negamax');

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
    board.play(0); board.play(0);
    board.play(1); board.play(1);
    board.play(0); board.play(1);
    board.play(1); board.play(0);
    board.play(1); board.play(0);
    board.play(1); board.play(6);

    expect(aiPlays(board, fasterLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        -26,
        0,
        -26,
        27,
        -26,
        -26,
        -26,
      ]
    `);
  });
});

describe('Negamax Solver with default/faster settings', () => {
  const width = 7;
  const height = 6;
  const fasterLookaheadDepth = 3;

  it('identifies an immediate winning move in column 1', () => {
    const board = new Board(width, height);
    board.play(1); board.play(2);
    board.play(1); board.play(4);
    board.play(1); board.play(6);

    expect(aiPlays(board, fasterLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        33,
        35,
        33,
        33,
        33,
        33,
        33,
      ]
    `);
  });

  it('identifies a winning move in column 1 and a block of the opponents win in column 2', () => {
    const board = new Board(width, height);
    board.play(1); board.play(2);
    board.play(1); board.play(2);
    board.play(1); board.play(2);

    expect(aiPlays(board, fasterLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        -34,
        35,
        33,
        -34,
        -34,
        -34,
        -34,
      ]
    `);
  });

  it('identifies moves at columns 1 and 4 that each result in a win, 3 plays into the future', () => {
    const board = new Board(width, height);
    board.play(2); board.play(2);
    board.play(3); board.play(3);

    expect(aiPlays(board, fasterLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        35,
        35,
        0,
        0,
        35,
        35,
        0,
      ]
    `);
  });
});

describe('Negamax Solver with harder/slower settings', () => {
  const width = 7;
  const height = 6;
  const slowerLookaheadDepth = 4;

  it('identifies an immediate winning move in column 1', () => {
    const board = new Board(width, height);
    board.play(1); board.play(2);
    board.play(1); board.play(4);
    board.play(1); board.play(6);

    expect(aiPlays(board, slowerLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        33,
        35,
        31,
        33,
        31,
        33,
        33,
      ]
    `);
  });

  it('identifies a winning move in column 1 and a block of the opponents win in column 2', () => {
    const board = new Board(width, height);
    board.play(1); board.play(2);
    board.play(1); board.play(2);
    board.play(1); board.play(2);

    expect(aiPlays(board, slowerLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        -34,
        35,
        33,
        -34,
        -34,
        -34,
        -34,
      ]
    `);
  });

  it('finds moves at columns 1 and 4 that each result in a win, 3 plays into the future', () => {
    const board = new Board(width, height);
    board.play(2); board.play(2);
    board.play(3); board.play(3);

    expect(aiPlays(board, slowerLookaheadDepth)).toMatchInlineSnapshot(`
      Array [
        33,
        35,
        33,
        33,
        35,
        33,
        33,
      ]
    `);
  });
});
