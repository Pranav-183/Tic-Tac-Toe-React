import { useState } from "react";

const GridFunction = ({ results, setResults }) => {

   const grid = [1, 2, 3, 4, 5, 6, 7, 8, 9]
   const winCheckArr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
   ]
   const winMssg1 = '✕ Wins!!!'
   const winMssg2 = '◯ Wins!!!'

   const [xwins, setxwins] = useState(0)
   const [ywins, setywins] = useState(0)

   const [turn, setTurn] = useState(0)
   const [gameOver, setGameOver] = useState(false)
   const [gameResultState, setGameResultState] = useState(null)
   let gameResult = null, gameNum = 1

   const playTurn = e => {
      if (gameOver || gameResult || e.target.innerText === '✕' || e.target.innerText === '◯') return
      if (turn === 0) {
         e.target.innerText = '✕'
         setTurn(1)
         document.querySelector('.yourTurn1').classList.remove('show')
         document.querySelector('.yourTurn2').classList.add('show')
      } else {
         e.target.innerText = '◯'
         setTurn(0)
         document.querySelector('.yourTurn2').classList.remove('show')
         document.querySelector('.yourTurn1').classList.add('show')
      }
      e.target.classList.add('filled')
      checkForWin()
      checkForGridFilled()
   }

   const selectBox = num => {
      return document.querySelector(`.box${num}`)
   }

   const checkForWin = () => {
      winCheckArr.forEach(arr => {
         let result
         const box1 = selectBox(arr[0])
         const box2 = selectBox(arr[1])
         const box3 = selectBox(arr[2])
         const text1 = box1.innerText
         const text2 = box2.innerText
         const text3 = box3.innerText
         if (text1 === text2 && text2 === text3 && text1 !== '') {
            if (text1 === '✕') {
               result = winMssg1
               setxwins(xwins + 1)
            } else {
               result = winMssg2
               setywins(ywins + 1)
            }
            gameNum++
            if (gameNum % 2 == 0) {
               setTurn(1)
            } else {
               setTurn(0)
            }
            setGameOver(true)
            gameResult = result
            setGameResultState(gameResult)
            results.push(result)
            setResults(results)
            document.querySelector('.result').classList.add('show')
            document.querySelector('.reset').classList.remove('disabled')
            const line = document.querySelector('.line')
            if (arr[1] - arr[0] === 1) {
               line.style.height = '5px'
               line.style.left = '5vw'

               if (arr[0] === 1) {
                  line.style.top = '6.4vw'
               } else if (arr[0] === 4) {
                  line.style.top = '20vw'
               } else {
                  line.style.top = '33.5vw'
               }

               line.style.animation = 'horizontal 1s forwards'
            } else if (arr[1] - arr[0] === 3) {
               line.style.width = '5px'
               line.style.top = '5vw'

               if (arr[0] === 1) {
                  line.style.left = '6.4vw'
               } else if (arr[0] === 2) {
                  line.style.left = '19.7vw'
               } else {
                  line.style.left = '33.2vw'
               }

               line.style.animation = 'vertical 1s forwards'
            }
         }
      })
   }

   const checkForGridFilled = () => {
      const check = []
      for (let i = 1; i < 10; i++) {
         const el = selectBox(i)
         el.innerText === '✕' || el.innerText === '◯' ? check.push(true) : check.push(false)
      }
      if (!check.includes(false)) {
         if (gameResult === winMssg1 || gameResult === winMssg2) return
         results.push('Tie')
         gameNum++
         if (gameNum % 2 == 0) {
            setTurn(1)
         } else {
            setTurn(0)
         }
         setGameOver(true)
         setGameResultState('Tie')
         setResults(results)
         document.querySelector('.result').classList.add('show')
         document.querySelector('.reset').classList. remove('disabled')
      }
   }

   const reset = e => {
      if (e.target.classList.contains('disabled')) return
      e.preventDefault()
      grid.forEach(num => {
         selectBox(num).innerText = ''
         selectBox(num).classList.remove('filled')
      })
      gameResult = null
      setGameResultState(null)
      setGameOver(false)
      setTurn(0)
      document.querySelector('.result').classList.remove('show')
      document.querySelector('.line').style = null
      e.target.classList.add('disabled')
   }

   return (
      <>
         <div className="top">
            <div className="players">
               <span className="playerLogo">Player 1 ({xwins}) - ✕ <span className="yourTurn yourTurn1 show">*</span></span>
               <span className="playerLogo">Player 2 ({ywins}) - ◯ <span className="yourTurn yourTurn2">*</span></span>
            </div>
            <span className="result">{gameResultState}</span>
            <button className="reset disabled" onClick={reset}>Reset</button>
         </div>
         <div className="grid">
            {grid.map(gridNum => (
               <div className={`box box${gridNum}`} onClick={playTurn} key={gridNum}></div>
            ))}
            <span className="line"></span>
         </div>
      </>
   )
}

export default GridFunction;