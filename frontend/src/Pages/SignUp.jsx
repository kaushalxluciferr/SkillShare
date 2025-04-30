import { Cross, CrossIcon, Eye, EyeOff, LucideCross } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/Appcontext'


function SignUp() {

const {backendurl}=useContext(AppContext)


const navigate=useNavigate()
    const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[image,setimage]=useState(false)
    const[skill,setskill]=useState([])
    const[description,setdescription]=useState("")
    const[learn,setlearn]=useState([])
    const [newskill,setnewskill]=useState("")
    const [newlearn,setnewlearn]=useState("")
    
    const [eyee,seteye]=useState(false)

    const addskill=()=>{
        if(newskill.trim()!=="")
        {
           const skillArray=newskill.split(",").map(item=>item.trim())
           setskill([...skill,skillArray])
            setnewskill("")
        }
    }

    const addlearn=()=>{
        if(newlearn.trim()!=="")
        {
          const learnArray=newlearn.split(",").map(item=>item.trim())
            setlearn([...learn,learnArray])
            setnewlearn("")
        }
    }

const handledeleteskill=(itemindex)=>{
    setskill(prev=>prev.filter((_,index)=>index!==itemindex))
}

const handledeletelearn=(itemindex)=>{
    setlearn(prev=>prev.filter((_,index)=>index!==itemindex))
}


const handlelogin=async()=>{
  try{
const formdata=new FormData()
if(!image)
{
  return toast.error("please select image")
}
formdata.append("name",name)
formdata.append("email",email)
formdata.append("password",password)
formdata.append("image",image)
formdata.append("description",description)
skill.forEach((item)=>{
  formdata.append("skill",item)
})
learn.forEach((item=>{
  formdata.append("learn",item)
}))

const {data}=await axios.post(backendurl+"/signup",formdata)
if(data.success)
{
  toast.success("signup successfull")
  navigate("/login")
  setname('')
  setimage(false)
  setemail("")
  setpassword("")
  setskill([])
  setlearn([])
  setdescription("")
}else{
  toast.message(data.message)
}
  }catch(error)
  {
    toast.error(error.message)
  }
}


  return (
    <div className='p-6 flex flex-col justify-center min-h-screen rounded-lg bg-gradient-to-br from-blue-100 to-purple-200'>
        <div className='bg-white shadow-2xl rounded-2xl p-6'>

          <div className='flex justify-center mt-2 items-center gap-4'>
            <label htmlFor="image" className='flex flex-col items-center cursor-pointer'>
            <h1 className='font-bold mb-2 text-gray-700'>Upload your image here</h1>
                <img className='w-[120px] h-[120px] object-cover rounded-full border-4 border-blue-400' src={image?URL.createObjectURL(image):"https://cdn-icons-png.flaticon.com/512/10337/10337609.png"} alt="" />
                <input type="file" onChange={(e)=>setimage(e.target.files[0])} hidden name="image" id="image" />
            </label>
          </div>

          <hr className='mt-6 border-gray-300'/>

          <div className='mt-6 space-y-6'>

          <div className='flex justify-center items-center'>
            <h2 className='text-xl font-semibold text-gray-800'>Name:</h2>
            <input value={name} onChange={(e)=>setname(e.target.value)} type="text" placeholder='Enter your name' className='ml-2 p-2 border rounded-lg outline-none text-lg focus:ring-2 focus:ring-blue-400 w-1/2' />
          </div>

          <div className='flex justify-center items-center'>
            <h2 className='text-xl font-semibold text-gray-800'>Email:</h2>
            <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter your Email' className='ml-2 p-2 border rounded-lg outline-none text-lg focus:ring-2 focus:ring-blue-400 w-1/2' />
          </div>

          <div className='flex justify-center items-center'>
            <h2 className='text-xl font-semibold text-gray-800'>Password:</h2>
            <div className='flex border ml-2 items-center rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-blue-400'>
              <input type={eyee ? "password" : "text"} value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Enter your Password' className='ml-2 p-2 rounded-lg outline-none text-lg bg-transparent w-72' />
              {
                  eyee ?
                  <Eye onClick={()=>seteye(!eyee)} className='mt-2 mr-2 cursor-pointer text-gray-600'/> :
                  <EyeOff onClick={()=>seteye(!eyee)} className='mt-2 mr-2 cursor-pointer text-gray-600'/>
              }
            </div>
          </div>

          {/* Skill section */}
          <div className='flex justify-center items-center'>
            <h2 className='text-xl font-semibold text-gray-800'>Add Skill:</h2>
            <input type="text" value={newskill} onChange={(e)=>setnewskill(e.target.value)} placeholder='Enter your Skill one by one' className='ml-2 p-2 border rounded-lg outline-none text-lg focus:ring-2 focus:ring-green-400 w-1/2' />
            <button className='ml-4 bg-green-500 hover:bg-green-600 transition p-2 rounded-lg text-white font-bold px-6' onClick={addskill}>Add</button>
          </div>

          <div className='flex justify-center mt-4'>
            <ul className='list-disc list-inside space-y-2'>
            {
                skill.map((item,index)=>(
                    <div key={index} className='flex items-center gap-4 bg-green-100 px-4 py-2 text-green-900 text-lg rounded-md justify-between shadow-md'>
                        <li>{item}</li>
                        <LucideCross onClick={()=>handledeleteskill(index)} className='bg-red-500 text-white rounded-full cursor-pointer p-1 hover:bg-red-600 transition'/>
                    </div>
                ))
            }
            </ul>
          </div>

          {/* Learn section */}
          <div className='flex justify-center items-center'>
            <h2 className='text-xl font-semibold text-gray-800'>Want To Learn:</h2>
            <input type="text" value={newlearn} onChange={(e)=>setnewlearn(e.target.value)} placeholder='What you want to learn' className='ml-2 p-2 border rounded-lg outline-none text-lg focus:ring-2 focus:ring-indigo-400 w-1/2' />
            <button className='ml-4 bg-indigo-500 hover:bg-indigo-600 transition p-2 rounded-lg text-white font-bold px-6' onClick={addlearn}>Add</button>
          </div>

          <div className='flex justify-center mt-4'>
            <ul className='list-disc list-inside space-y-2'>
            {
                learn.map((item,index)=>(
                    <div key={index} className='flex items-center gap-4 bg-indigo-100 px-4 py-2 text-indigo-900 text-lg rounded-md justify-between shadow-md'>
                        <li>{item}</li>
                        <LucideCross onClick={()=>handledeletelearn(index)} className='bg-red-500 text-white rounded-full cursor-pointer p-1 hover:bg-red-600 transition'/>
                    </div>
                ))
            }
            </ul>
          </div>

          {/* Description */}
  <div className='flex justify-center items-center'>
         <h2 className='text-xl font-semibold text-gray-800'>Description:</h2>
       <textarea className='rounded-md ml-4 h-[200px] w-1/2 mb-4 border border-gray-300 outline-none p-3 text-lg focus:ring-2 focus:ring-purple-400 resize-none shadow-inner' value={description} onChange={(e)=>setdescription(e.target.value)} />
          </div>

          {/* Signup button */}
          <div className='flex justify-center items-center mb-6'>
            <button onClick={handlelogin} className='p-4 text-xl font-bold rounded-xl text-white bg-teal-500 hover:bg-teal-600 transition px-12 shadow-lg'>Signup here</button>
          </div>

          {/* Already have account */}
          <div className='flex justify-center items-center mb-6'>
            <p className='text-gray-700'>Already have account? <span onClick={()=>navigate('/login')} className='text-blue-700 underline cursor-pointer hover:text-blue-900'>Login here</span></p>
          </div>

          </div>

        </div>

    </div>
  )
}

export default SignUp
