import React, { useState } from 'react';
import { startGame_backend, processGuessByBackend, restart } from '../axios'


const GameMode = ({startGame, setHasWon, setNumber}) => {
    const [guess, setGuess] = useState('');
    const [status, setStatus] = useState('')
    
    const handleGuess = async () => {
        const response = await processGuessByBackend(guess)
        console.log(response)
        if(response === 'Equal') {
            setHasWon(true)
        }
        else{
            setStatus(response)
            setNumber('')
        }
    }
    console.log(status)
    return(
        <form>
            <input
            type='number'
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            />
            <button type='button'
            onClick={handleGuess}
            disabled={!Number}
            >GUESS</button>
            <h1>{status}</h1>
        </form>
        
    );
}
export default GameMode