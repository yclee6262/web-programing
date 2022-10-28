import React from 'react';
import { useState } from 'react';
import { startGame_backend, processGuessByBackend, restart } from './axios'
import './App.css'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startGameOnClick = async() => {
    setHasStarted(!hasStarted)
    const response = await startGame_backend
  }

  const restartGameOnClick = async() => {
    setHasWon(false)
    setStatus('')
    const response = await restart
  }

  const handleGuess = async () => {
    const response = await processGuessByBackend(number)
    console.log(response)
    if(response === 'Equal') {
      setHasWon(true)
    }
    else{
      setStatus(response)
      setNumber('')
    }
  }

  const HomePage = (
    <div className='HomeWrapper'>
      <p className='title'>Guess Number</p>
      <button className='btn' onClick={startGameOnClick}> Start Game </button>
    </div>
  )

  const GameMode = (
    <form>
      <input
      type='number'
      value={number}
      onChange={(e) => setNumber(e.target.value)}
      />
      <button type='button'
      onClick={handleGuess}
      disabled={!Number}
      >GUESS</button>
      <h1>{status}</h1>
    </form>
  )
  
  const WinMode = (
    <>
      <h1>YOU WIN!!</h1>
      <p>The number is {number}.</p>
      <button type='button'
      onClick={restartGameOnClick}>RESTART</button>
    </>
  )

  const Game = (
    <div>
      {hasStarted? GameMode:HomePage}
    </div>
  )

  return (
    <div className='App'>
      {hasWon? WinMode:Game}
    </div>
  );
}

export default App;
