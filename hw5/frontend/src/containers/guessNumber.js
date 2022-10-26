import React, { useState } from 'react';
import GameMode from '../components/GameMode'
import StartPage from '../components/StartPage'
import './MineSweeper.css'

const GuessNumber = () => {
    const [hasStarted, setHasStarted] = useState(false)
    const [hasWon, setHasWon] = useState(false)
    const [number, setNumber] = useState('')
    const [status, setStatus] = useState('')

    const startGameOnClick = () => {
        setHasStarted(!hasStarted)
    }
    return (
        <div className='mineSweeper'>
            {hasStarted? <GameMode startGame={startGameOnClick}/> : <StartPage startGame={startGameOnClick}/>}            
        </div>
    );
}
export default GuessNumber;