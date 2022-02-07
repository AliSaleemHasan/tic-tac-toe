import { gameState } from "../types/TicTacToe";
import { TicTacToe } from "./TicTacToe";

export var test = 10;

// first  optimal move for AI(copmuter) will be the middle block
// if middle block is chosed by player then the next best optimal move is to use one of board corners

// board corner coordinates ...
let CORNERS = [
  [0, 0],
  [0, 2],
  [2, 0],
  [2, 2],
];

// max-depth that minimax can reach is 9
// for each move ai can make the depth will increase by one
// first move will always get done by player
// so at game first computer will have 8 block left so 8 depth at most
let MAX_DEPTH = 9;

// get game score when its computer turn
// if computer is winner then the score will be negative because is minimizing
// otherwise the score will be positive
let score = (winner: number, depth: number) => {
  return winner === 1 ? depth + MAX_DEPTH : depth - MAX_DEPTH;
};

let minimax = (game: TicTacToe, depth = 0) => {
  if (depth >= MAX_DEPTH) throw new Error("minimax depth is " + depth);
  if (game.winner !== 0) return { score: score(game.winner, depth) };

  let moves: number[][] = [];
  let scores: number[] = [];

  game.freeSpaces.forEach((move) => {
    let { score } = minimax(
      game.cloneMove.call(game, move[0], move[1]),
      depth + 1
    );
    if (score) {
      moves.push(move);
      scores.push(score);
    }
  });

  //   get index of (max if player | min if computer )
  let index = scores.indexOf(
    Math[game.currentPlayer == 1 ? "max" : "min"].apply(Math, scores)
  );

  return { move: moves[index], score: scores[index] };
};

let state: gameState = {
  board: [
    [1, 0, 2],
    [0, 1, 1],
    [0, 0, 2],
  ],
  currentPlayer: 2,
  winner: 0,
};

let game = new TicTacToe(state);
