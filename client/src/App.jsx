import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

function App() {

  return (
    <>
    <Router>
    <Routes>
      <Route path={'/login'} element={<Login/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
