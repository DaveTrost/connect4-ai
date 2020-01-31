const { Board } = require('../lib/Board/Board');
const { playAI } = require('../lib/solvers/negamax');

describe('Negamax Solver', () => {
  const width = 7;
  const height = 6;

  it('properly weights a winning move in a vertical direction', () => {
    const board = new Board(width, height);
    board.play(1);
    board.play(2);
    board.play(1);
    board.play(4);
    board.play(1);
    board.play(6);

    expect(playAI(board)).toMatchInlineSnapshot(`
      Array [
        -42,
        17.5,
        -42,
        -42,
        -42,
        -42,
        -42,
      ]
    `);
  });

  it('properly weights a winning move in a vertical direction w.r.t. a block in a vertical direction', () => {
    const board = new Board(width, height);
    board.play(1);
    board.play(2);
    board.play(1);
    board.play(2);
    board.play(1);
    board.play(2);

    expect(playAI(board)).toMatchInlineSnapshot(`
      Array [
        -18,
        17.5,
        -42,
        -18,
        -18,
        -18,
        -18,
      ]
    `);
  });

  it('finds a winning move 2 plays into the future (in a horizontal direction)', () => {
    const board = new Board(width, height);
    board.play(2);
    board.play(2);
    board.play(3);
    board.play(3);

    expect(playAI(board)).toMatchInlineSnapshot(`
      Array [
        -42,
        18.5,
        -42,
        -42,
        18.5,
        -42,
        -42,
      ]
    `);
  });
});
