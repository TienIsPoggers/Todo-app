import { useState } from 'react'
import './App.css'
import toast from 'react-hot-toast'
import Navbar from './Layout/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import TaskPage from './pages/TaskPage'
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/task/:id' element={<TaskPage />} />
      </Routes>
    </>
  )
}

export default App
