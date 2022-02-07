import React from "react";
import { TicTacToeProps } from "../types/components";
import Row from "./Row";

const TicTacToe: React.FC<TicTacToeProps> = ({ gameState }) => {
  return (
    <main className="flex-1 flex flex-col justify-center items-center ">
      {gameState.board.map((row, index) => (
        <Row key={index} rowNumber={index} row={row} />
      ))}
    </main>
  );
};

export default TicTacToe;
