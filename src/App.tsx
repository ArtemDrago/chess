import React, { useEffect, useState } from 'react';
import BoardComponents from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';
import './style/App.css';



function App() {
  const [board , setBoard] = useState(new Board())
  const [whitePlayer , setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer , setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer , setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
  restart()
  setCurrentPlayer(whitePlayer)
  }, [])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="App">
      <Timer
      restart={restart}
      currentPlayer={currentPlayer}
      />
      <BoardComponents
      board={board}
      setBoard={setBoard}
      currentPlayer={currentPlayer}
      swapPlayer={swapPlayer}
      />
      <div className='desc'>
      <LostFigures 
      title='Black figures'
      figures={board.lostBlackFigures}
      />
       <LostFigures 
      title='White figures'
      figures={board.lostWhiteFigures}
      />
      </div>
    </div>
  );
}

export default App;
