import { useState } from 'react'
import DigitalFactory from '../component/DigitalFactory'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DigitalFactory />
    </>
  )
}

export default App