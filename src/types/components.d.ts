// types for all TicTacToe related Components
// TicTacToe.tsc , Row.tsx and Block.tsx

import { gameState } from "./TicTacToe";

export interface TicTacToeProps {
  gameState: gameState;
}

export interface RowProps {
  row: number[];
  rowNumber: number;
}

export interface BlockProps {
  value: number;
  x: number;
  y: number;
}
