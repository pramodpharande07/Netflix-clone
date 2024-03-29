import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Netflix from './pages/Netflix'
import Player from './pages/Player'
// import Movies from './pages/Movies'
import MoviePage from './pages/Movies'
import TVShows from './pages/TVShows'
import UserLiked from './pages/UserLiked'


export default function App() {
  return (
   <BrowserRouter>
     <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/player" element={<Player/>}></Route>
        <Route path="/movies" element={<MoviePage/>}></Route>
        <Route path="/tv" element={<TVShows/>}></Route>
        <Route path="/My List" element={<UserLiked/>}/>
       
        <Route path="/" element={<Netflix/>}></Route>
     </Routes>
   
   </BrowserRouter>
  )
}
