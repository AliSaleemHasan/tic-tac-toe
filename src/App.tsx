import React from "react";
import TicTacToe from "./components/TicTacToe";
import { gameState } from "./types/TicTacToe";
const gametate: gameState = {
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  winner: 0,
  currentPlayer: 0,
};

function App() {
  return (
    <div className="w-screen h-screen bg-main-blue flex flex-col">
      <TicTacToe gameState={gametate} />
      {/* TicTacToe */}
      {/* has 3 Rows */}
      {/* has 3 Blocks */}
      <footer className="w-screen h-10 bg-main-yellow"></footer>
    </div>
  );
}

export default App;
