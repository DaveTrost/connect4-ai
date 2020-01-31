# connect4-ai

***IN DEVELOPMENT***

An NPM package providing game-state management and AI (computer) moves for the game Connect-4 (aka: four-in-a-row). 
From a given game state, the tool will provide a list of possible moves and the win/loss weights for each move.
The package can aso provide game state management for games with 2 humans, reporting the game over and win/draw status.

## Sample Code

### Human vs. Human
```
const Connect4 = require('./index');  // require('connect4-ai')
const width = 7;
const height = 6;

const game = new Connect4(width, height);
const moves = [3, 2,  4, 4,  3, 3,  2, 5,  1, 1,  1, 4,  1, 2,  2, 3,  3, 6,  5, 5];  // and so on ...
moves.forEach(humanPlay => handlePlay(humanPlay));

function handlePlay(column) {
  if(game.gameStatus().gameOver) return;
  if(!game.canPlay(column)) return;

  game.play(column);
  updateBoard(column);
  updateStatus(game.gameStatus());
}
```