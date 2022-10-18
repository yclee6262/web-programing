/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";
import { useState } from "react";

const Board = ({ turn, guesses, curGuess }) => {
    const [board, setboard] = useState([1,2,3,4,5,6])
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {board.map((row, rowIdx) => {
                if (turn === rowIdx){
                    console.log("turn", turn)
                    return <CurRow curGuess={curGuess} rowIdx={rowIdx}/>
                }
                else{
                    console.log(rowIdx)
                    return <Row prev={curGuess} guess={guesses[rowIdx]} rowIdx={rowIdx} key={rowIdx} id={rowIdx}/>
                }
            })}
            
        </div>
    )
};
export default Board;
