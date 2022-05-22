import React, { FC, useEffect, useRef, useState }  from 'react'
import { Colors } from '../models/Colors';
import { Player } from '../models/Player'

interface TimerProps {
   currentPlayer: Player | null;
   restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer , restart}) => {
   const [blackTime , setBlackTime] = useState(30)
   const [whiteTime , setWhiteTime] = useState(30)
   const timer = useRef<null | ReturnType<typeof setInterval>>(null)
   const [game ,setGame] = useState(false)
   //const [player , setPlayer] = useState({})
    
   
   useEffect(() => {
      
      startTimer()
      
   }, [currentPlayer])
   useEffect(() => {

      if (blackTime === 0 || whiteTime === 0) {
         setGame(true)
         handleRestart()
         console.log(currentPlayer?.color , "lose this game")
         // const cur = currentPlayer?.color
         // setPlayer({cur})
      }

   }, [blackTime , whiteTime])

   function startTimer() {
      if (timer.current) {
         clearInterval(timer.current)
      }
      const callback = currentPlayer?.color === Colors.BLACK ? decrementBlackTimer : decrementWhiteTimer;
      
      timer.current = setInterval(callback , 1000)
      // setTimeout(() => {
      //    setGame(false)
      // },2000)
   }

   function decrementBlackTimer() {
      
         setBlackTime(prev => prev - 1 )
         
      
   }
   function decrementWhiteTimer() {
      
         setWhiteTime(prev => prev - 1 )
         
      
   }
   const handleRestart = () => {
   setWhiteTime(30)
   setBlackTime(30)
   restart()
   }

   return (
      <div className='timer'>
         {/* {game 
         ? <div> {{player}} lose game! </div>
         : ''
         } */}
         <div>
            <button onClick={handleRestart}>Restart game</button>
         </div>
         <h2>Black - {blackTime}</h2>
         <h2>White - {whiteTime}</h2>
      </div>
   )
}

export default Timer