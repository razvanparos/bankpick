import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import './App.css';
import SplashPage from './Pages/SplashPage/SplashPage.tsx';
import Login from './Pages/Login/Login.tsx';
import Register from './Pages/Register/Register.tsx';
import Home from './Pages/Home/Home.tsx';
import {getDocs, collection, query, where, doc, setDoc, updateDoc} from 'firebase/firestore';
import {auth} from './firebase-config.js';
import {db} from './firebase-config.js';

/**
 * @typedef {Object} UserContextType
 * @property {Function} getUserData 
 */


export const UserContext = createContext(/** @type {UserContextType} */ ({}));

function App() {
  const [currentPage, setCurrentPage]=useState('splash')
  const [currentUser, setCurrentUser]=useState('')
  const [userData, setUserData]=useState('')
  const [statsBalance, setStatsBalance] = useState(0);
  const [chartData, setChartData] = useState([]);
  

  const changePage=(page)=>{
    setCurrentPage(page)
  }
  const getUserData=async()=>{
    let currentDate = new Date();
    let nextDay = new Date();
    nextDay.setDate(currentDate.getDate()+1)
    const q = query(collection(db,'UsersDetails'), where("id", "==", auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc)=>({
       ...doc.data(),
       id: doc.id,
   })) 
   setUserData(filteredData[0])

   const totalBalance = filteredData[0].myCards.reduce((acc, card) => acc + card.cardBalance, 0);
   setStatsBalance(totalBalance);

   const dateStringWithYear = `${filteredData[0].lastUpdated[0]} ${filteredData[0].lastUpdated[1]} ${filteredData[0].lastUpdated[2]}`;
   const formattedDate = new Date(dateStringWithYear);
   let timeDifference=currentDate.getTime()-formattedDate.getTime();
   let daysDifference = parseInt(timeDifference / (1000 * 60 * 60 * 24));
   let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',]
   const usersRef = doc(db, 'UsersDetails', auth.currentUser?.uid);
   if(daysDifference===0){
    if(filteredData[0].statsData[6].pv!=totalBalance){
      let dataFromDb = filteredData[0].statsData
      dataFromDb.pop();
      dataFromDb.push({
        date: `${currentDate.getDate()} ${months[currentDate.getMonth()]}`,
        pv: totalBalance
    });
    setChartData(dataFromDb)
    await updateDoc(usersRef, { statsData: dataFromDb});
    }else{
      setChartData(filteredData[0].statsData)
    }
   }else{
      let oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      let formattedDateTime = formattedDate.getTime();
      let dataFromDb = filteredData[0].statsData
      for(let i=0;i<daysDifference;i++){
        let nextDayTime = formattedDateTime + oneDayInMilliseconds+i*oneDayInMilliseconds;
        let nextDay = new Date(nextDayTime);
        dataFromDb.shift();
        dataFromDb.push({
            date: `${nextDay.getDate()} ${months[nextDay.getMonth()]}`,
            pv: totalBalance
        });
      }
      console.log(dataFromDb)
      // setChartData(dataFromDb)
      
      await updateDoc(usersRef, { statsData: dataFromDb});
      await updateDoc(usersRef, { lastUpdated: [currentDate.getMonth()+1, currentDate.getDate(), currentDate.getFullYear()]});
      getUserData();
   }
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
        {currentPage==='home'?<Home chartData={chartData} statsBalance={statsBalance} changePage={changePage} currentUser={currentUser} userData={userData} getUserData={getUserData}/>:''}
      </div>
    </UserContext.Provider>
    
  );
}

export default App;
