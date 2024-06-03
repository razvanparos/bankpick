import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import './App.css';
import SplashPage from './Pages/SplashPage/SplashPage.tsx';
import Login from './Pages/Login/Login.tsx';
import Register from './Pages/Register/Register.tsx';
import Home from './Pages/Home/Home.tsx';
import {getDocs, collection, query, where, doc, setDoc} from 'firebase/firestore';
import {auth} from './firebase-config.js';
import {db} from './firebase-config.js';

/**
 * @typedef {Object} UserContextType
 * @property {Function} getUserData - A function to fetch user data
 */


export const UserContext = createContext(/** @type {UserContextType} */ ({}));

function App() {
  const [currentPage, setCurrentPage]=useState('splash')
  const [currentUser, setCurrentUser]=useState('')
  const [userData, setUserData]=useState('')

  const changePage=(page)=>{
    setCurrentPage(page)
  }
  const getUserData=async()=>{
    const q = query(collection(db,'UsersDetails'), where("id", "==", auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc)=>({
       ...doc.data(),
       id: doc.id,
   })) 
   setUserData(filteredData[0])
  }
  const loginUser=(uid,remember,data)=>{
    if(remember===true){
      localStorage.setItem('RememberUser',uid)
    }
    setUserData(data)
    setCurrentUser(uid)
    
  }
  useEffect(()=>{
    setTimeout(() => {
      if(localStorage.getItem('RememberUser')){
        setCurrentUser(localStorage.getItem('RememberUser'))
        setCurrentPage('home')
        getUserData()
      }else{
        setCurrentPage('login')
      }
    }, 1000);
  },[])


  return (
    <UserContext.Provider value={{getUserData}}>
      <div className="App">
        {currentPage==='splash'?<SplashPage/>:''}
        {currentPage==='login'?<Login changePage={changePage} loginUser={loginUser}/>:''}
        {currentPage==='register'?<Register changePage={changePage}/>:''}
        {currentPage==='home'?<Home changePage={changePage} currentUser={currentUser} userData={userData}/>:''}
      </div>
    </UserContext.Provider>
    
  );
}

export default App;
