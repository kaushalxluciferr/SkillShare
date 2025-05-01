import React, { createContext, use, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import { toast } from 'react-toastify'
import axios from 'axios'

function Login() {

  const navigate=useNavigate()
const {usertoken,backendurl,setusertoken}=useContext(AppContext)

const [email,setemail]=useState('')
const[password,setpassword]=useState('')



const handlelogin=async()=>{
  try{
const {data}=await axios.post(backendurl+"/login",{email,password})
if(data.success)
{
  setusertoken(data.token)
  localStorage.setItem("usertoken",data.token)
  toast.success(data.message)
  toast.success("Login Successfull")
  navigate("/home")
  scrollTo(0,0)
  window.location.reload()

}else{
  toast.error(data.message)
}
  }catch(error)
  {
    toast.error(error.message)
  }
}


  return (
    <div className='flex  flex-col justify-center p-6 rounded-2xl mt-10 w-[400px] ml-[400px] bg-red-200'>
        <h1 className='text-center text-blue-500 text-3xl underline'>Login here</h1>
        <div className='flex justify-center flex-col gap-6 mt-4 '>
      <div className='flex justify-center items-center gap-2'>
        <h2 className='text-xl'>Email:</h2>
        <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} className='border outline-none rounded-lg  font-serif text-lg px-2' />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <h2 className='text-xl'>Password:</h2>
        <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className='border outline-none rounded-lg  font-serif text-lg px-2' />
      </div>
      <div className='mt-6 flex justify-center'>
        <button onClick={handlelogin} className='bg-blue-600 px-4 p-1 text-white font-bold text-xl rounded-full'>Login Here</button>
      </div>
<div className='flex justify-center'>
    <p>New Here? <span onClick={()=>navigate("/signup")} className='text-green-500 cursor-pointer underline text-lg'>click to Create an account</span></p>

</div>

        </div>
    </div>
  )
}

export default Login
