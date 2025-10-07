import { useState } from 'react'
import './App.css'
import Nav from './Components/Nav'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav />
      <Footer />
    </>
  )
}

export default App
