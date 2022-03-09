import { Component } from "react"

class Grid extends Component {
   constructor(props) {
      super(props)
      this.grid = [1,2,3,4,5,6,7,8,9]
      this.winCheckArr = [
         [1,2,3],
         [4,5,6],
         [7,8,9],
         [1,4,7],
         [2,5,8],
         [3,6,9],
         [1,5,9],
         [3,5,7]
      ]
      this.results = this.props.results
   }

   state = {
      turn: 1,
      gameOver: false,
      gameResult: null
   }

   updateState(key, val) {
      this.setState({
         ...this.state,
         [key]: val
      })
   }

   playTurn = (e) => {
      if (this.state.gameOver || this.state.gameResult || e.target.innerText === '✕' || e.target.innerText === '◯') return
      if (this.state.turn === 1) {
         e.target.innerText = '✕'
         this.updateState('turn', 2)
         document.querySelectorAll('.yourTurn')[0].classList.remove('show')
         document.querySelectorAll('.yourTurn')[1].classList.add('show')
      } else if (this.state.turn === 2) {
         e.target.innerText = '◯'
         this.updateState('turn', 1)
         document.querySelectorAll('.yourTurn')[1].classList.remove('show')
         document.querySelectorAll('.yourTurn')[0].classList.add('show')
      }
      this.checkForWin()
      this.checkForGridFilled()
   }

   selectBox = (num) => {
      return document.querySelector(`.box${num}`)
   }

   checkForGridFilled = () => {
      let check = []
      for (let i = 1; i < 10; i++) {
         const el = this.selectBox(i)
         el.innerText === '✕' || el.innerText === '◯' ? check.push(true) : check.push(false)
      }
      if (!check.includes(false)) {
         if (this.state.gameResult === 'Player 1 Wins!!!' || this.state.gameResult === 'Player 2 Wins!!!') return
         this.setState({
            ...this.state,
            turn: 1,
            gameOver: true,
            gameResult: 'Tie'
         })
         this.results.push('Tie')
         this.props.setResults(this.results)
         document.querySelector('.result').classList.add('show')
         document.querySelector('.result').style.left = '225px'
         document.querySelector('.reset').classList.remove('disabled')
      }
   }

   checkForWin = () => {
      this.winCheckArr.forEach(arr => {
         let result
         let box1 = this.selectBox(arr[0]).innerText
         let box2 = this.selectBox(arr[1]).innerText
         let box3 = this.selectBox(arr[2]).innerText
         if (box1 === box2 && box2 === box3 && box3 === box1 && box1 !== '') {
            if (box1 === '✕') {
               result = 'Player 1 Wins!!!'
            } else if (box1 === '◯') {
               result = 'Player 2 Wins!!!'
            }
            this.setState({
               ...this.state,
               turn: 1,
               gameOver: true,
               gameResult: result
            })
            this.results.push(result)
            this.props.setResults(this.results)
            document.querySelector('.result').classList.add('show')
            document.querySelector('.reset').classList.remove('disabled')
         }
      })
   }
   
   reset(e) {
      if (e.target.classList.contains('disabled')) return
      e.preventDefault()
      this.grid.forEach(el => {
         this.selectBox(el).innerText = ''
      })
      this.updateState('gameResult', null)
      document.querySelector('.result').classList.remove('show')
      this.setState({
         ...this.state,
         gameOver: false,
         gameResult: null,
         turn: 1
      })
      e.target.classList.add('disabled')
   }

   render() {
      return (
         <>
            <div className="playerLogos">
               <span className="playerLogo">Player 1 - ✕ <span className="yourTurn show">(Your Turn)</span></span>
               <span className="playerLogo">Player 2 - ◯ <span className="yourTurn">(Your Turn)</span></span>
            </div>
            <div className="grid">
               {this.grid.map(grid => (
                  <div className={'box box'+ grid} onClick={e => this.playTurn(e)} key={grid}></div>
               ))}
               <span className="result">{ this.state.gameResult }</span>
            </div>
            <button className="reset disabled" onClick={e => this.reset(e)}>Reset</button>
         </>
      )
   }
}

export default Grid
// X Symbol - ✕
// O Symbol - ◯
