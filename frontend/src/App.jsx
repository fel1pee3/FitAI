import React from 'react'
import 'normalize.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Routes/Register/Register'
import Login from './Routes/Login/login'
import Home from './Routes/Home/Home'
import PerguntasUser from './Routes/PerguntasUser/PerguntasUser';
import HomeStart from './Routes/HomeStart/HomeStart';
import Dieta from './Routes/Dieta/Dieta';
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/perguntasUser' element={<PerguntasUser />}></Route>
        <Route path='/homeStart' element={<HomeStart />}></Route>
        <Route path='/dieta' element={<Dieta />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App