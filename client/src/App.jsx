import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Registerpage from './pages/Registerpage'
import Loginpage from './pages/Loginpage'



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Toaster/>
      <Routes>
        <Route path='/' element={<Homepage />} />

        <Route path='/register' element={< Registerpage />} />
        <Route path='/login' element={<Loginpage />} />

      </Routes>
    </>
  )
}

export default App
