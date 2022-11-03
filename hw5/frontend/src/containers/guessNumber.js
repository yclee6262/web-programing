import React, { useState } from 'react';
import { startGame_backend } from '../axios';
import GameMode from '../components/GameMode'
import StartPage from '../components/StartPage'
import './MineSweeper.css'


const GuessNumber = () => {
    const [hasStarted, setHasStarted] = useState(false)
    const [hasWon, setHasWon] = useState(false)
    const [number, setNumber] = useState('')


    const startGameOnClick = () => {
        console.log('start')
        setHasStarted(!hasStarted)
        startGame_backend()
        console.log(startGame_backend())
        console.log("started")
    }

    return (
        <div className='mineSweeper'>
            {hasStarted? <GameMode startGame={startGameOnClick} setHasWon={setHasWon} setNumber={setNumber}/> : <StartPage startGame={startGameOnClick}/>}            
        </div>
    );
}
export default GuessNumber;