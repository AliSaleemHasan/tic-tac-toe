import React from "react";
import { RowProps } from "../types/components";
import Block from "./Block";

const Row: React.FC<RowProps> = ({ row, rowNumber }) => {
  return (
    <div className="gap-2 pb-2 last:pb-0  bg-slate-100 flex content-evenly">
      {row.map((value, column) => (
        <Block
          value={value}
          x={rowNumber}
          y={column}
          key={column + "_" + rowNumber}
        />
      ))}
    </div>
  );
};

export default Row;
