import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Movie from './components/Movie/Movie';
import Navbar from './components/Navbar/Navbar';
import Appp from './components/App/App.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";





function App() {

  return (
    <BrowserRouter>
   <div className="App">
   <Routes>  
    
   <Route path='/' exact element={<Appp></Appp>} />
    </Routes>
    </div>
    </BrowserRouter>
  );
  
}

export default App;
