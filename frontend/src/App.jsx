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
import LandingPage from './Pages/LandingPage'
import ChatBot from './Component/ChatBot/ChatBot'

function App() {

const [token ,settoken]=useState(localStorage.getItem("usertoken")||false)
const {user}=useContext(AppContext)


// s
  return (
    <div className='bg-black'>
      <div className='p-2'>
      {
        token&& 
        <Navbar/>
      }
      </div>
    <Routes>
      <Route path='/' element={token?<Home/>:<LandingPage/>}/>
      <Route path='/home' element={token?<Home/>:<Login/>}/>
      <Route path='/message/:id' element={token?<Message/>:<Login/>}/>
      <Route path='/profile/:id' element={token?<UserInfo/>:<Login/>}/>
      <Route path='/myprofile' element={token?<UserProfile/>:<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/allApplicant' element={token?<Allusers/>:<Login/>}/>
      <Route path='/chatbot' element={token?<ChatBot/>:<Login/>}/>
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
