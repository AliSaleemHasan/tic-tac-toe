import { gameState } from "../types/TicTacToe";

// TicTacToe State is:
//// board in certain time
//// current player
//// game winner (player or computer or none)
///// EX:
///// board [0,0,0]
////////////[1,0,2]  player is represented by 1
////////////[2,0,1] computer is represented by 2
///// winner = 0  (no winner in this state)
//// currentPlayer=1 (its player turn)

// winning COMBOS
let WINNING_COMBOS = [
  [
    // first column
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    // second column
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    // third column
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    // first row
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    // second row
    [1, 1],
    [2, 1],
    [3, 1],
  ],
  [
    // third row
    [1, 2],
    [2, 2],
    [3, 2],
  ],
  [
    // main diameter
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    // secondary diameter
    [2, 0],
    [1, 1],
    [0, 2],
  ],
];

// check if one of the WINNING_COMBOS is fulfilled
function checkWinning(
  this: number[][],
  block1: number[],
  block2: number[],
  block3: number[]
) {
  let board = this;
  let player = board[block1[0]][block1[1]];
  if (
    player &&
    player === board[block2[0]][block2[1]] &&
    player === board[block3[0]][block3[1]]
  )
    return player;

  return 0;
}

function // get all avaliable spaces in current state (will help with minimax algorithm)
freeSpaces(board: number[][]) {
  let spaces = [];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (board[i][j]) spaces.push([i, j]);

  return spaces;
}
class TicTacToe {
  gameState: gameState;
  constructor(state?: gameState) {
    this.gameState = this.reset(state);
  }

  //   getters

  get board() {
    return this.gameState.board;
  }

  get winner() {
    return this.gameState.winner;
  }

  get currentPlayer() {
    return this.gameState.currentPlayer;
  }

  //   helpers

  // get winner for the certain state
  getWinner(this: number[][]) {
    let comboIndex = WINNING_COMBOS.length - 1;
    let winner = 0;

    do {
      winner = checkWinning.call(
        this,
        WINNING_COMBOS[comboIndex][0],
        WINNING_COMBOS[comboIndex][1],
        WINNING_COMBOS[comboIndex][2]
      );
      comboIndex = comboIndex - 1;
    } while (!winner && !WINNING_COMBOS);

    // if game ends (there is no freeSpaces left) , and there is no winner then
    // game status is draw (0)
    return freeSpaces(this).length === 0 && !winner ? 0 : winner;
  }

  //  reset function
  reset(state?: gameState) {
    this.gameState = {
      currentPlayer: 1,
      winner: 0,
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
    if (state) this.gameState = state;

    return this.gameState;
  }

  //   perform a move (player or computer)

  move(x: number, y: number) {
    // if move is not valid or game is already end return current state
    if (this.board[x][y] || this.winner) return this.gameState;

    this.gameState.board[x][y] = this.currentPlayer;
    this.gameState.winner = this.getWinner.call(this.board);
    this.gameState.currentPlayer = this.gameState.currentPlayer === 1 ? 2 : 1;

    return this.gameState;
  }

  //   clone move to help with minimax function
  cloneMove(x: number, y: number) {
    if (this.board[x][y] || this.winner) return this.gameState;

    let board = this.board.map((row) => row.slice());
    board[x][y] = this.currentPlayer;
    let currentPlayer: 1 | 2 = this.currentPlayer === 1 ? 2 : 1;
    let winner = this.getWinner.call(board);

    return new TicTacToe({
      board,
      currentPlayer,
      winner,
    });
  }
}
