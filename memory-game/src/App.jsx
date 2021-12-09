import { useState } from 'react'
import logo from './logo.svg'
import './App.css';
import MemoryGame from './components/MemoryGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MemoryGame />
    </div>
  )
}

export default App
