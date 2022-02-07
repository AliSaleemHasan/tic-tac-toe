// types for all TicTacToe related Components
// TicTacToe.tsc , Row.tsx and Block.tsx

export interface TicTacToeProps {
  board: number[][];
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
