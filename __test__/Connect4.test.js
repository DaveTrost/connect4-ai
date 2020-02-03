const Connect4 = require('../lib/Connect4');
const Connect4AI = require('../lib/Connect4AI');

describe('Connect4 Class', () => {
  const width = 7;
  const height = 6;

  it('has basic game play functionality', () => {
    const board = new Connect4(width, height);

    expect(board.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
    expect(board.getActivePlayer()).toBe(1);
    expect(board.getMoveCount()).toBe(0);
    expect(board.gameOver).toBeFalsy();
    expect(board.winner).toBeNull;
    expect(board.gameStatus()).toMatchInlineSnapshot(`
      Object {
        "currentPlayer": 1,
        "gameOver": false,
        "movesPlayed": 0,
      }
    `);

    board.play(1);
    board.play(2);
    board.play(1);
    board.play(2);
    board.playMoves([1, 2]);
    board.play(1);

    expect(board.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  1  -  -  -  -  - 
       -  1  2  -  -  -  - 
       -  1  2  -  -  -  - 
       -  1  2  -  -  -  - 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
    expect(board.getActivePlayer()).toBe(2);
    expect(board.gameStatus()).toMatchInlineSnapshot(`
      Object {
        "currentPlayer": 2,
        "gameOver": true,
        "movesPlayed": 7,
        "solution": Array [
          Object {
            "column": 1,
            "spacesFromBottom": 3,
          },
          Object {
            "column": 1,
            "spacesFromBottom": 2,
          },
          Object {
            "column": 1,
            "spacesFromBottom": 1,
          },
          Object {
            "column": 1,
            "spacesFromBottom": 0,
          },
        ],
        "winner": 1,
      }
    `);
  });

  it('can predict and report a winning move in a vertical direction', () => {
    const board = new Connect4(width, height);
    board.play(1);
    board.play(2);
    board.play(1);
    board.play(2);
    board.play(1);
    board.play(2);

    expect(board.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  1  2  -  -  -  - 
       -  1  2  -  -  -  - 
       -  1  2  -  -  -  - 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
    expect(board.isWinningMove(1)).toBeTruthy();

    board.play(1);
    expect(board.gameStatus().solution).toMatchInlineSnapshot(`
      Array [
        Object {
          "column": 1,
          "spacesFromBottom": 3,
        },
        Object {
          "column": 1,
          "spacesFromBottom": 2,
        },
        Object {
          "column": 1,
          "spacesFromBottom": 1,
        },
        Object {
          "column": 1,
          "spacesFromBottom": 0,
        },
      ]
    `);
  });

  it('can predict and report winning moves in a horizontal direction', () => {
    const board = new Connect4(width, height);
    board.play(1);
    board.play(6);
    board.play(2);
    board.play(6);
    board.play(3);
    board.play(6);

    expect(board.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  2 
       -  -  -  -  -  -  2 
       -  1  1  1  -  -  2 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
    expect(board.isWinningMove(4)).toBeTruthy();

    board.play(4);
    expect(board.gameStatus().solution).toMatchInlineSnapshot(`
      Array [
        Object {
          "column": 4,
          "spacesFromBottom": 0,
        },
        Object {
          "column": 3,
          "spacesFromBottom": 0,
        },
        Object {
          "column": 2,
          "spacesFromBottom": 0,
        },
        Object {
          "column": 1,
          "spacesFromBottom": 0,
        },
      ]
    `);

    const board2 = new Connect4(width, height);
    board2.play(1);
    board2.play(6);
    board2.play(2);
    board2.play(6);
    board2.play(4);
    board2.play(6);

    expect(board2.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  2 
       -  -  -  -  -  -  2 
       -  1  1  -  1  -  2 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
    expect(board2.isWinningMove(3)).toBeTruthy();
  });

  it('can predict and report winning moves in both diagonal directions', () => {
    const board = new Connect4(width, height);
    board.play(0);
    board.play(6);
    board.play(5);
    board.play(1);
    board.play(1);
    board.play(5);
    board.play(4);
    board.play(2);
    board.play(4);
    board.play(2);
    board.play(2);
    board.play(4);
    board.play(3);
    board.play(3);

    board.play(3);
    expect(board.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  1  1  2  -  - 
       -  1  2  2  1  2  - 
       1  2  2  1  1  1  2 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
    expect(board.isWinningMove(3)).toBeTruthy();

    board.play(6);
    expect(board.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  1  1  2  -  - 
       -  1  2  2  1  2  2 
       1  2  2  1  1  1  2 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
    expect(board.isWinningMove(3)).toBeTruthy();

    const board2 = new Connect4(width, height);
    board2.play(0);
    board2.play(2);
    board2.play(1);
    board2.play(3);
    board2.play(1);
    board2.play(3);
    board2.play(4);
    board2.play(4);
    board2.play(2);
    board2.play(3);
    board2.play(3);
    board2.play(5);
    board2.play(5);
    board2.play(5);
    board2.play(6);
    board2.play(5);
    board2.play(5);
    board2.play(1);
    board2.play(0);
    board2.play(3);

    expect(board2.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  2  -  1  - 
       -  -  -  1  -  2  - 
       -  2  -  2  -  2  - 
       1  1  1  2  2  1  - 
       1  1  2  2  1  2  1 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
    expect(board2.isWinningMove(2)).toBeTruthy();
    expect(board2.isWinningMove(4)).toBeTruthy();

    board2.play(6);
    expect(board2.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  2  -  1  - 
       -  -  -  1  -  2  - 
       -  2  -  2  -  2  - 
       1  1  1  2  2  1  1 
       1  1  2  2  1  2  1 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
    expect(board2.isWinningMove(4)).toBeTruthy();

    board2.play(4);
    expect(board2.gameStatus().solution).toMatchInlineSnapshot(`
      Array [
        Object {
          "column": 4,
          "spacesFromBottom": 2,
        },
        Object {
          "column": 3,
          "spacesFromBottom": 1,
        },
        Object {
          "column": 2,
          "spacesFromBottom": 0,
        },
        Object {
          "column": 5,
          "spacesFromBottom": 3,
        },
      ]
    `);
  });

  it('can predict winning moves for corner cases', () => {
    const board = new Connect4(width, height);
    const plays = '312033242241434434636255'.split('');
    plays.forEach(play => board.play(play));

    expect(board.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  2  2  -  - 
       -  -  2  1  2  -  - 
       -  -  2  2  1  -  - 
       -  -  1  2  1  -  - 
       -  2  1  1  1  2  1 
       2  2  1  1  2  1  1 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
    expect(board.isWinningMove(5)).toBeTruthy();
  });

  it('can make plays with 1-based indices', () => {
    const board = new Connect4(width, height);
    board.play1BasedColumn(1);
    board.play1BasedColumn(2);
    expect(board.getActivePlayer()).toBe(1);
    expect(board.getMoveCount()).toBe(2);
    expect(board.gameOver).toBeFalsy();
  });

  it('can work with boards of different sizes', () => {
    const size = 3;
    const board = new Connect4(size, size);
    board.play(0);
    board.play(2);
    board.play(1);
    expect(board.getMoveCount()).toBe(3);
  });

  it('catches invalid moves', () => {
    const size = 3;
    const board = new Connect4(size, size);

    expect(board.canPlay(-1)).toBeFalsy();
    expect(board.canPlay(3)).toBeFalsy();
    expect(() => board.play(-1)).toThrow();
    expect(() => board.play(3)).toThrow();
    expect(board.getMoveCount()).toBe(0);
  });

  it('ends the game when a connect-4 is found', () => {
    const width = 4;
    const height = 3;
    const board = new Connect4(width, height);

    board.play(0);
    board.play(0);
    board.play(1);
    board.play(1);
    board.play(2);
    board.play(2);
    board.play(3);
    expect(board.gameStatus()).toMatchInlineSnapshot(`
      Object {
        "currentPlayer": 2,
        "gameOver": true,
        "movesPlayed": 7,
        "solution": Array [
          Object {
            "column": 3,
            "spacesFromBottom": 0,
          },
          Object {
            "column": 2,
            "spacesFromBottom": 0,
          },
          Object {
            "column": 1,
            "spacesFromBottom": 0,
          },
          Object {
            "column": 0,
            "spacesFromBottom": 0,
          },
        ],
        "winner": 1,
      }
    `);

    expect(board.getMoveCount()).toBe(7);
    for(let i = 0; i < 10; i++) board.play(3);
    expect(board.getMoveCount()).toBe(7);
  });

  it('ends the game when the board is full', () => {
    const width = 2;
    const height = 1;
    const board = new Connect4(width, height);

    board.play(0);
    board.play(1);
    expect(board.gameStatus()).toMatchInlineSnapshot(`
      Object {
        "currentPlayer": 1,
        "gameOver": true,
        "movesPlayed": 2,
        "solution": null,
        "winner": null,
      }
    `);

    expect(board.getMoveCount()).toBe(2);
    for(let i = 0; i < 10; i++) board.play(0);
    expect(board.getMoveCount()).toBe(2);
  });

  it('uses default size if not provided', () => {
    const board = new Connect4();
    expect(board.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);

    const boardWithAI = new Connect4AI();
    expect(boardWithAI.ascii()).toMatchInlineSnapshot(`
      "
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
       -  -  -  -  -  -  - 
      ---------------------
      [0][1][2][3][4][5][6]"
    `);
  });
});
