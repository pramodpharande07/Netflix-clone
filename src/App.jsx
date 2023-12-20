import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Netflix from './pages/Netflix'

export default function App() {
  return (
   <BrowserRouter>
     <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/" element={<Netflix/>}></Route>
     </Routes>
   
   </BrowserRouter>
  )
}
