import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/Appcontext'
import { Search } from 'lucide-react'
function Allusers() {
const {alluser}=useContext(AppContext)
const [searchskill,setsearchskill]=useState('')
  const navigate=useNavigate()

const filteruser=useMemo(()=>{
  if(!searchskill.trim()) return alluser
  
  return alluser.filter(user=>{
    const matchskill=Array.isArray(user.skill)&&user.skill.some(skill=>skill.toLowerCase().includes(searchskill.toLowerCase()))

    return matchskill
  })
},[alluser,searchskill])




  return (
    <div>
<div className='flex items-center justify-center mt-5'>
      <h1 className='text-2xl font-bold text-gray-300 font-serif underline'><span className='text-red-600'>All</span> Applicants <span className='text-green-600'>Here</span></h1>
        </div>
        <div className='flex items-center justify-between ml-10 gap-2'>
          <div className='flex gap-2'>
          <h1 className='font-bold text-[#6aa6f0] text-xl underline'>Search by Skill: </h1>
          <div className='flex border items-center p-1 rounded-xl bg-white'>
          <input value={searchskill} onChange={(e)=>setsearchskill(e.target.value)} type="text" className='  outline-none px-2 font-bold font-sans rounded-xl' placeholder='search by skill' name="" id="" />
          <Search className='cursor-pointer'/>
          </div>
          </div>
         
        </div>
<div className='grid grid-cols-3 gap-6 p-6 '>
    {
     filteruser.length>0&& filteruser.map((item,index)=>(
        <div onClick={()=>{navigate(`/profile/${item._id}`);scrollTo(0,0)}} key={index}  className='bg-gray-800 hover:bg-gray-700 transition-all p-4 rounded-lg cursor-pointer shadow-lg'>
            <div className='flex justify-center'><img className='w-[130px] h-[130px] rounded-full' src={item.image} alt="" /></div>
           <h3 className='text-xl font-semibold text-center text-white'>{item.name}</h3>


           {/* skilla */}
           <div>
  <h1 className='text-xl mt-2 text-white'>Skills: </h1>
  <ul className='list-disc list-inside'>
    {Array.isArray(item.skill) && item.skill.length > 0 &&
      item.skill.map((it, index) => (
        <li key={index} className='mt-1 ml-6 text-blue-300 text-lg'>{it}</li>
      ))
    }
  </ul>
</div>
{/* learning section */}
<div>
  <h1 className='text-xl text-white mt-2'>Want to learn:</h1>
  <ul className='list-disc list-inside'>
    {Array.isArray(item.learn) && item.learn.length > 0 &&
      item.learn.map((it, index) => (
        <li key={index} className='mt-1 ml-6 text-blue-400 text-lg'>{it}</li>
      ))
    }
  </ul>
</div>


        </div>
      )) 
    }
</div>


    </div>
  )
}

export default Allusers
