import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Task from './pages/Task'

function App() {

  return (
    <>
    <Router>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/task/:id' element={<Task/>} />
    </Routes>
    </Router>
    </>
  )
}

export default App
