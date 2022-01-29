"use strict";
exports.__esModule = true;
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
var WINNING_COMBOS = [
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
function checkWinning(block1, block2, block3) {
    var board = this;
    var player = board[block1[0]][block1[1]];
    if (player &&
        player === board[block2[0]][block2[1]] &&
        player === board[block3[0]][block3[1]])
        return player;
    return 0;
}
function freeSpaces(board) {
    var spaces = [];
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            if (board[i][j])
                spaces.push([i, j]);
    return spaces;
}
var TicTacToe = /** @class */ (function () {
    function TicTacToe(state) {
        this.gameState = this.reset(state);
    }
    Object.defineProperty(TicTacToe.prototype, "board", {
        //   getters
        get: function () {
            return this.gameState.board;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TicTacToe.prototype, "winner", {
        get: function () {
            return this.gameState.winner;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TicTacToe.prototype, "currentPlayer", {
        get: function () {
            return this.gameState.currentPlayer;
        },
        enumerable: false,
        configurable: true
    });
    //   helpers
    // get winner for the certain state
    TicTacToe.prototype.getWinner = function () {
        var comboIndex = WINNING_COMBOS.length - 1;
        var winner = 0;
        do {
            winner = checkWinning.call(this, WINNING_COMBOS[comboIndex][0], WINNING_COMBOS[comboIndex][1], WINNING_COMBOS[comboIndex][2]);
            comboIndex = comboIndex - 1;
        } while (!winner && !WINNING_COMBOS);
        // if game ends (there is no freeSpaces left) , and there is no winner then
        // game status is draw (0)
        return freeSpaces(this).length === 0 && !winner ? 0 : winner;
    };
    //  reset function
    TicTacToe.prototype.reset = function (state) {
        this.gameState = {
            currentPlayer: 1,
            winner: 0,
            board: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ]
        };
        if (state)
            this.gameState = state;
        return this.gameState;
    };
    //   perform a move (player or computer)
    TicTacToe.prototype.move = function (x, y) {
        // if move is not valid or game is already end return current state
        if (this.board[x][y] || this.winner)
            return this.gameState;
        this.gameState.board[x][y] = this.currentPlayer;
        this.gameState.winner = this.getWinner.call(this.board);
        this.gameState.currentPlayer = this.gameState.currentPlayer === 1 ? 2 : 1;
        return this.gameState;
    };
    //   clone move to help with minimax function
    TicTacToe.prototype.cloneMove = function (x, y) {
        if (this.board[x][y] || this.winner)
            return this.gameState;
        var board = this.board.map(function (row) { return row.slice(); });
        board[x][y] = this.currentPlayer;
        var currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        var winner = this.getWinner.call(board);
        return new TicTacToe({
            board: board,
            currentPlayer: currentPlayer,
            winner: winner
        });
    };
    return TicTacToe;
}());
var state = {
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    winner: 0,
    currentPlayer: 1
};
var game = new TicTacToe(state);
var move = game.move.call(game, 1, 1);
console.log(move.board);
var cloneedMobe = game.cloneMove.call(game, 2, 2);
console.log(cloneedMobe.board);
