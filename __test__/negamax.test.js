const { Board } = require('../lib/Board/Board');
const { aiPlays } = require('../lib/solvers/negamax');

describe('Negamax Solver', () => {
  const width = 7;
  const height = 6;
  const reducedLookaheadDepth = 3;

  it('properly evaluates an immediate winning move in column 1', () => {
    const board = new Board(width, height);
    board.play(1);
    board.play(2);
    board.play(1);
    board.play(4);
    board.play(1);
    board.play(6);

    expect(aiPlays(board)).toMatchInlineSnapshot(`
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

    expect(aiPlays(board, reducedLookaheadDepth)).toMatchInlineSnapshot(`
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

  it('properly evaluates a winning move in column 1 and a block of the opponents win in column 2', () => {
    const board = new Board(width, height);
    board.play(1);
    board.play(2);
    board.play(1);
    board.play(2);
    board.play(1);
    board.play(2);

    expect(aiPlays(board)).toMatchInlineSnapshot(`
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

    expect(aiPlays(board, reducedLookaheadDepth)).toMatchInlineSnapshot(`
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
    board.play(2);
    board.play(2);
    board.play(3);
    board.play(3);

    expect(aiPlays(board)).toMatchInlineSnapshot(`
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

    expect(aiPlays(board, reducedLookaheadDepth)).toMatchInlineSnapshot(`
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

  it('ranks all columns equally when the board is empty', () => {
    const board = new Board(width, height);

    expect(aiPlays(board)).toMatchInlineSnapshot(`
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

    expect(aiPlays(board, reducedLookaheadDepth)).toMatchInlineSnapshot(`
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
});
