import React, { use, useEffect, useState } from 'react'
import Navbar from './Component/Navbarr/Navbar'
import Home from './Component/Home'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Message from './Pages/Message'
import UserInfo from './Pages/UserInfo'
import AboutUS from './Component/AboutUS'
import Copyright from './Component/Copyright'
import { ToastContainer } from 'react-toastify'
import UserProfile from './Pages/UserProfile'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import { useContext } from 'react'
import { AppContext } from './context/Appcontext'
import Allusers from './Pages/Allusers'

function App() {

const [token ,settoken]=useState(localStorage.getItem("usertoken")||false)
const {user}=useContext(AppContext)


// s
  return (
    <div className='p-4 '>
      {
        token&& 
        <Navbar/>
      }
    <Routes>
      <Route path='/' element={token?<Home/>:<Login/>}/>
      <Route path='/message/:id' element={token?<Message/>:<Login/>}/>
      <Route path='/profile/:id' element={token?<UserInfo/>:<Login/>}/>
      <Route path='/myprofile' element={token?<UserProfile/>:<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/allApplicant' element={token?<Allusers/>:<Login/>}/>
    </Routes>
    {
      token &&
      <>
   <AboutUS/>
   <Copyright/>
      </>
    }


   <ToastContainer position='bottom-right'/>
    </div>
  )
}

export default App
