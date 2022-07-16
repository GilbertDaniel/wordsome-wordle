import React, { useState, createContext } from 'react'
import './App.css'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { boardDefault } from './Words'

export const AppContext = createContext()

const App = () => {
  const [board, setBoard] = useState(boardDefault)
  return (
    <div className='App'>
      <nav>
        <h3>WORD SOME - Wordle</h3>
      </nav>
      <AppContext.Provider value={{board, setBoard}}>
        <Board />
        <Keyboard />
      </AppContext.Provider>
    </div>
  )
}

export default App