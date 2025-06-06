import React, { useContext } from 'react'
import { MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/Appcontext'
import Chatboticon from '../Chatboticon'
function Navbar() {
  
  const navigate=useNavigate()
const {user,allmessageuser}=useContext(AppContext)
const n=allmessageuser.length
const useriid=allmessageuser[n]

const handlelogout=()=>{
  localStorage.removeItem("usertoken")
  navigate("/")
  window.location.reload()
}

  return (
    <div className='p-2 rounded-xl  bg-[#292966] bg-transparent flex justify-between '>
     
     <div className='bg-blue-800 p-2  cursor-pointer rounded-md' onClick={()=>navigate('/home')}>
<h1 className='text-white  text-2xl font-bold' 

>SkillShare</h1>
     </div>
     <div className='flex justify-between gap-8'>
     
      <div  onClick={()=>navigate(`/message/${useriid}`)} className='mt-2 bg-black text-white p-2 rounded-full flex gap-3 items-center cursor-pointer'>
        <p>Inbox</p>
      <div className='relative'>
     <MessageCircle/>
     <div className='absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full'>..</div>
      </div>
      </div>
      <div className='h-16 w-16'>  <img className='h-full w-full rounded-full  cursor-pointer' onClick={()=>navigate("/myprofile")} src={user.image} alt="" />   </div>
      <div><p className=' text-white font-bold text-xl'>{user.name}</p>
      <p className='text-xs text-blue-500 cursor-pointer font-bold'>{user.email}</p></div>
      <button onClick={handlelogout} className='bg-blue-700 px-4 rounded-md text-xl font-bold text-white cursor-pointer'>Logout</button></div>

    </div>
  )
}

export default Navbar
