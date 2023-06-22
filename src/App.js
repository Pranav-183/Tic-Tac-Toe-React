import './App.css';
import 'material-icons'
import History from './History';
import { useState } from 'react';
import GridFunction from './GridFunction';

function App() {
  const [results, setResults] = useState([])
  return (
    <div className="App">
      <div className="main">
        <GridFunction results={results} setResults={setResults} />
        <History results={results} />
      </div>
    </div>
  )
}

export default App;
