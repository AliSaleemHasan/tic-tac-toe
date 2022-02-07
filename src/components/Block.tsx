import React from "react";
import { BlockProps } from "../types/components";

const Block: React.FC<BlockProps> = ({ x, y, value }) => {
  let makeMove = (): void => {
    console.log(x, y);
  };
  return (
    <div
      onClick={makeMove}
      className="bg-main-blue w-20  h-20  text-center  flex items-center justify-center sm:w-28 sm:h-28  md:w-32 md:h-32 hover:cursor-pointer hover:bg-main-yellow text-white font-sans  "
    >
      <p>{value === 1 ? "X" : value !== 0 ? "O" : "_"}</p>
    </div>
  );
};

export default Block;
