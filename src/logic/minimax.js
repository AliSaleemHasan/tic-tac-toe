"use strict";
exports.__esModule = true;
exports.test = void 0;
var TicTacToe_1 = require("./TicTacToe");
exports.test = 10;
// first  optimal move for AI(copmuter) will be the middle block
// if middle block is chosed by player then the next best optimal move is to use one of board corners
// board corner coordinates ...
var CORNERS = [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
];
// max-depth that minimax can reach is 9
// for each move ai can make the depth will increase by one
// first move will always get done by player
// so at game first computer will have 8 block left so 8 depth at most
var MAX_DEPTH = 9;
// get game score when its computer turn
// if computer is winner then the score will be negative because is minimizing
// otherwise the score will be positive
var score = function (winner, depth) {
    return winner === 1 ? depth + MAX_DEPTH : depth - MAX_DEPTH;
};
var minimax = function (game, depth) {
    if (depth === void 0) { depth = 0; }
    if (depth >= MAX_DEPTH)
        throw new Error("minimax depth is " + depth);
    if (game.winner !== 0)
        return { score: score(game.winner, depth) };
    var moves = [];
    var scores = [];
    game.freeSpaces.forEach(function (move) {
        var score = minimax(game.cloneMove.call(game, move[0], move[1]), depth + 1).score;
        // console.log(score);
        if (score) {
            moves.push(move);
            scores.push(score);
        }
    });
    console.log(scores);
    //   get index of (max if player | min if computer )
    var index = scores.indexOf(Math[game.currentPlayer == 1 ? "max" : "min"].apply(Math, scores));
    // console.log(index + " is th index");
    return { move: moves[index], score: scores[index] };
};
var state = {
    board: [
        [1, 0, 2],
        [0, 1, 1],
        [0, 0, 2],
    ],
    currentPlayer: 2,
    winner: 0
};
var game = new TicTacToe_1.TicTacToe(state);
console.log(minimax(game));
