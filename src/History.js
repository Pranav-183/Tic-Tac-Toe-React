import { useState } from "react"
import logo from "./tic-tac-toe-logo.png"

const History = (props) => {
   const [toggled, setToggled] = useState(false)

   const addToggleClass = (item, item2, item3) => {
      item.classList.add('toggled')
      item2.classList.add('toggled')
      item3.classList.add('toggled')
   }

   const removeToggleClass = (item, item2, item3) => {
      item.classList.remove('toggled')
      item2.classList.remove('toggled')
      item3.classList.remove('toggled')
   }

   const toggleHistory = (e) => {
      let historyList
      let el
      if (e) {  
         if (e.target.classList.contains('toggleHistory')) {
            el = e.target
         } else if (e.target.classList.contains('material-icons')) {
            el = e.target.parentElement
         }
         historyList = el.parentElement.children[1]
      } else {
         el = document.querySelector('.toggleHistory')
         historyList = document.querySelector('.historyList')
      }

      if (!toggled) {
         addToggleClass(el, el.children[0], historyList)
         setToggled(true)
      } else {
         removeToggleClass(el, el.children[0], historyList)
         setToggled(false)
      }
   }

   document.addEventListener('keyup', e => {
      if (e.key === 'o') {
         toggleHistory()
      }
   })

   return (
      <div className="History">
         <div className="toggleHistory" onClick={toggleHistory}>
            <span className="material-icons" onClick={toggleHistory}>arrow_back_ios</span>
         </div>
         <div className="historyList">
            <h2><img src={ logo }/>Game History</h2>
            {props.results.map((result, i) => (
               <span key={i+1}>Game {i + 1} - {result}</span>
            ))}
         </div>
      </div>
   )
}

export default History