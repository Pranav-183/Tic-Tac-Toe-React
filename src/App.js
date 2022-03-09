import './App.css';
import 'material-icons'
import Grid from './Grid';
import History from './History';
import { useState } from 'react';

function App() {
  const [results, setResults] = useState([])
  return (
    <div className="App">
      <div className="main">
        <Grid results={results} setResults={setResults} />
        <History results={results} />
      </div>
    </div>
  )
}

export default App;
