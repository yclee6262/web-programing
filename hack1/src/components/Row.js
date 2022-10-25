/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx, id }) => {
    console.log("guess",guess)
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper' key={id}>
                <div className='Row-wordbox'>{guess}</div>
                <div className='Row-wordbox'>{guess}</div>
                <div className='Row-wordbox'>{guess}</div>
                <div className='Row-wordbox'>{guess}</div>
                <div className='Row-wordbox'>{guess}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;