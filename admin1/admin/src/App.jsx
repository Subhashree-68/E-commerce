import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <div>
    <BrowserRouter>

      <Navbar />
      <Admin />
    </BrowserRouter>
    </div>
  )
}

export default App
