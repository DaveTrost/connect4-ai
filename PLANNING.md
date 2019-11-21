# Planning and Notes for connect4-ai

## Project Notes

### 11/20/2019

My research uncovered several pre-existing npm packages with the ability to manage a connect4 game board state. The plan was to include one of those packages as a dependency in this project and avoid some code-writing. With this plan, I started researching AI algorithms. I discovered the packages didn't have a key functionality that was needed for AI look-ahead logic - testing if an unplayed move would result in a win. 

- [a connect-4 npm package without pre-move win evaluation](https://www.npmjs.com/package/connect-four/v/0.0.3)
- [Blog posts for AI in connect4](http://blog.gamesolver.org/solving-connect-four/01-introduction/)

Now, I have constructed my own class that manages a connect4 game board. The class includes the functionality to check an unplayed move for a win, and the class includes an ascii print-out that shows the state of the game board as this is a handy debugging tool.

## Progress

- [x] Set up npm package and publish it for testing purposes - 11/20/2019
- [x] Research npm packages. Research AI algorithms - 11/20/2019
- [x] Board class - 11/20/2019
  - [x] Tests
- [ ] Re-publish the connect4-ai package
- Import the npm package to a front-end app and build a workable two-player connect-4 game. 
- Implement the first level of AI (brute force negamax)
  - [ ] More getter methods
  - [ ] Separate player name and player mark, create getter functions
  - [ ] Encapsulate the win prediction logic in negamax function
- Modify the front-end to have a play vs. computer option. 
- Implement the second level of AI (alpha-beta pruning)
- Implement the third level of AI (move exploration order)
- Create more difficulty levels for the AI
- That's MVP!
- Further objectives:
  - A back-end with socket.io to play against other humans across the web 