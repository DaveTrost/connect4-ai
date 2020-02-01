# connect4-ai

***IN DEVELOPMENT***

An NPM package providing game-state management for the game Connect-4 (aka: four-in-a-row). Two modes are supported: human vs. human (v0.0.7 and later) & human vs. computer (in development)

## Setup and Usage

The package can be installed using `npm install connect4-ai`. The code snippets below give an idea how the package can be used.

### Human vs. Human

```
const Connect4 = require('connect4-ai')
const width = 7;
const height = 6;

const game = new Connect4(width, height);
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

coming soon ...
