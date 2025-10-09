import { useState } from 'react'
import './App.css'
import Nav from './Components/Nav'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav />
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <h1>Hola mundo</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
