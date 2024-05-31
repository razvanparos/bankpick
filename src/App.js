import React, { useEffect } from 'react'
import { useState } from 'react';
import './App.css';
import SplashPage from './Pages/SplashPage/SplashPage.tsx';
import Login from './Pages/Login/Login.tsx';
import Register from './Pages/Register/Register.tsx';

function App() {
  const [currentPage, setCurrentPage]=useState('splash')

  const changePage=(page)=>{
    setCurrentPage(page)
  }
  useEffect(()=>{
    setTimeout(() => {
      setCurrentPage('login')
    }, 2000);
  },[])

  return (
    <div className="App">
      {currentPage==='splash'?<SplashPage/>:''}
      {currentPage==='login'?<Login changePage={changePage}/>:''}
      {currentPage==='register'?<Register changePage={changePage}/>:''}
    
    </div>
  );
}

export default App;
