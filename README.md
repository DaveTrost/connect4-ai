# connect4-ai

***IN DEVELOPMENT***

An NPM package providing game-state management for the game Connect-4 (aka: four-in-a-row). Two modes are supported: human vs. computer (v0.0.4 and later) & human vs. human (in development)

## Sample Code

### Human vs. Human
```
const Connect4 = require('./index');  // require('connect4-ai')
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