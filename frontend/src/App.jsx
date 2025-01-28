import React from 'react'
import 'normalize.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Routes/Register/Register'
import Login from './Routes/Login/login'
import Home from './Routes/Home/Home'
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App