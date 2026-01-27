import { useState } from 'react'

import './App.css'
import HomeView from './view/HomeView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' '>
    <HomeView/>
    </div>
  )
}

export default App
