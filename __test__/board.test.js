const { Board } = require('../lib/Board/Board');

describe('Board Class', () => {
  const width = 7;
  const height = 6;

  it('has basic game play functionality', () => {
    const board = new Board(width, height);

    expect(board.ascii()).toMatchSnapshot();
    expect(board.getActivePlayer()).toBe(1);
    expect(board.getMoves()).toBe(0);
    expect(board.gameOver).toBeFalsy;
    expect(board.winner).toBeNull;
    
    board.play(1); board.play(2);
    board.play(1); board.play(2);
    board.play(1); board.play(2);
    board.play(1);
    
    expect(board.ascii()).toMatchSnapshot();
    expect(board.getActivePlayer()).toBe(2);
    expect(board.getMoves()).toBe(7);
    expect(board.gameOver).toBeTruthy;
    expect(board.winner).toBe(1);
  });

  it('can predict a winning move in a vertical direction', () => {
    const board = new Board(width, height);
    board.play(1); board.play(2);
    board.play(1); board.play(2);
    board.play(1); board.play(2);
    
    expect(board.isWinningMove(1)).toBeTruthy;
  });

  it('can predict a winning move in a horizontal direction', () => {
    const board = new Board(width, height);
    board.play(1); board.play(6);
    board.play(2); board.play(6);
    board.play(3); board.play(6);
    
    expect(board.isWinningMove(4)).toBeTruthy;
  });

  it('can predict a winning moves in both diagonal directions', () => {
    const board = new Board(width, height);
    board.play(0); board.play(6);
    board.play(5); board.play(1);
    board.play(1); board.play(5);
    board.play(4); board.play(2);
    board.play(4); board.play(2);
    board.play(2); board.play(4);
    board.play(3); board.play(3); 

    board.play(3);
    expect(board.ascii()).toMatchSnapshot();
    expect(board.isWinningMove(3)).toBeTruthy;
    
    board.play(6);
    expect(board.ascii()).toMatchSnapshot();
    expect(board.isWinningMove(3)).toBeTruthy;
  });

  it('can make plays with 1-based indices', () => {
    const board = new Board(width, height);
    board.play1BasedColumn(1); board.play1BasedColumn(2);    
    expect(board.getActivePlayer()).toBe(1);
    expect(board.getMoves()).toBe(2);
    expect(board.gameOver).toBeFalsy;
  });

  it('can work with boards of different sizes', () => {
    const size = 3;
    const board = new Board(size, size);
    board.play(0); board.play(2); 
    board.play(1); 
    expect(board.getMoves()).toBe(3);
  });

  it('catches invalid moves', () => {
    const size = 3;
    const board = new Board(size, size);

    expect(board.canPlay(-1)).toBeFalsy;
    expect(board.canPlay(3)).toBeFalsy;
    expect(() => board.play(-1)).toThrow();
    expect(() => board.play(3)).toThrow();
    expect(board.getMoves()).toBe(0);
  });

  it('ends the game when a connect-4 is found', () => {
    const width = 4;
    const height = 3;
    const board = new Board(width, height);

    board.play(0); board.play(0);
    board.play(1); board.play(1);
    board.play(2); board.play(2);
    board.play(3); 
    expect(board.gameOver).toBeTruthy;

    expect(board.getMoves()).toBe(7);
    for(let i = 0; i < 10; i++) board.play(3);
    expect(board.getMoves()).toBe(7);
  });

  it('ends the game when the board is full', () => {
    const width = 2;
    const height = 1;
    const board = new Board(width, height);

    board.play(0); board.play(1);
    expect(board.gameOver).toBeTruthy;

    expect(board.getMoves()).toBe(2);
    for(let i = 0; i < 10; i++) board.play(0);
    expect(board.getMoves()).toBe(2);
  });

});
