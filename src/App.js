import React, { useState, createContext, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import GameOver from './components/GameOver'
import Keyboard from './components/Keyboard'
import { boardDefault, generateWordSet } from './Words'

export const AppContext = createContext()

const App = () => {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState([]);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  // const correctWord = "RIGHT"

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ""
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return      

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })

    if (correctWord.toUpperCase().includes(currWord)) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }


    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }

    
  }
  return (
    <div className='App'>
      <nav>
        <h3>WORD SOME - Wordle</h3>
      </nav>
      <AppContext.Provider
        value={{
          board, setBoard,
          currAttempt, setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters, setDisabledLetters,
          gameOver, setGameOver
        }}
      >
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App