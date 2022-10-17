/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard'; 
import React, { useEffect, useState } from 'react';


const Board = ({ startGame, boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(boardSize * boardSize - mineNum);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(mineNum);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();

    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        
        console.log(newBoard.mineLocations[0][0])
        setBoard(newBoard.board)
        setMineLocations(newBoard.mineLocations)
        
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.

    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        if (board[x][y].revealed || gameOver || win) return;
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        newBoard[x][y].flagged = !newBoard[x][y].flagged;
        setBoard(newBoard)
        if (newBoard[x][y].flagged === true){
            setRemainFlagNum(newFlagNum - 1)
        }
        else {
            setRemainFlagNum(newFlagNum + 1)
        }

        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end

    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
        let renewed_board = revealed(newBoard, x, y, nonMineCount)
        setBoard(renewed_board.board)
        if (newBoard[x][y].value !== "💣"){          
            setNonMineCount(renewed_board.newNonMinesCount)
            if (nonMineCount === 0){
                setWin(true)
                console.log(win)
            }
        }
        if (newBoard[x][y].value === "💣"){
            setGameOver(true)
            for (var i = 0; i < mineNum; i++){
                var each_mine = mineLocations[i]
                var mine_x = each_mine[0]
                var mine_y = each_mine[1]
                var explode_board = revealed(newBoard, mine_x, mine_y, nonMineCount)
                setBoard(explode_board.board)
            }
        }
        
    };


    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                <div className='boardContainer'>
                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                    <Dashboard remainFlagNum={remainFlagNum} />
                    {board.map((row, rowIdx) => <div id={'row' + rowIdx} style={{display: "flex"}}>
                        {row.map((col, colIdx) => {
                            return (
                            <Cell
                            rowIdx={rowIdx}
                            colIdx={colIdx}
                            detail={board[colIdx][rowIdx]}
                            updateFlag={updateFlag}
                            revealCell={revealCell}            
                            />
                            )
                        })} 
                    </div>)}
                    
                </div>
                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                
            </div>
        </div>
    );



}

export default Board