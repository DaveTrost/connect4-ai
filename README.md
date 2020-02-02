# connect4-ai

An NPM package providing game-state management for the game Connect-4 (aka: four-in-a-row). Two modes are supported: human vs. human (v0.0.7 and later) & human vs. computer (v0.1.0 and later)

## Setup and Usage

The package can be installed using `npm install connect4-ai`. The code snippets below give an idea how the package can be used.

### Human vs. Human

```
const { Connect4 } = require('connect4-ai')

const game = new Connect4();
const moves = [3, 2,  4, 4,  3, 3,  2, 5,  1, 1];  // and so on ...
moves.forEach(humanPlay => handlePlay(humanPlay));

function handlePlay(column) {
  if(game.gameStatus().gameOver) return;
  if(!game.canPlay(column)) return;

  game.play(column);

  displayBoard(game.ascii);
  updateStatus(game.gameStatus());
}
```

### Human vs. Computer

```
const { Connect4AI } = require('connect4-ai')

const game = new Connect4AI();
const movesPlayer1 = [3, 4, 3, 2, 1];  // and so on ...

movesPlayer1.forEach(humanPlay => {
  handlePlay(() => game.play(humanPlay));
  handlePlay(() => game.playAI('hard'));   // or 'easy' or 'medium'
});

function handlePlay(playFunction) {
  if(game.gameStatus().gameOver) return;
    
  playFunction();

  displayBoard(game.ascii());
  updateStatus(game.gameStatus());
}
```
