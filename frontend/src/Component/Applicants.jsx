import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/Appcontext'
import { Search } from 'lucide-react'
function Applicants() {
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
      <h1 className='text-2xl font-bold underline'><span className='text-red-600'>Top Eight</span> Applicants <span className='text-green-600'>Here</span></h1>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <div className='flex gap-2'>
          <h1 className='font-bold text-blue-700 text-xl underline'>Search by Skill: </h1>
          <div className='flex border items-center p-1 rounded-xl'>
          <input value={searchskill} onChange={(e)=>setsearchskill(e.target.value)} type="text" className='  outline-none px-2 font-bold font-sans rounded-xl' placeholder='search by skill' name="" id="" />
          <Search className='cursor-pointer'/>
          </div>
          </div>
          <div>
            <button onClick={()=>{navigate("/allApplicant");scrollTo(0,0)}} className='px-2 border mr-[100px] bg-red-500 text-white p-1 rounded-xl'>View All Applicants</button>
          </div>
        </div>
<div className='grid grid-cols-4 gap-6 p-6 '>
    {
     filteruser.length>0&& filteruser.slice(0,8).map((item,index)=>(
        <div onClick={()=>{navigate(`/profile/${item._id}`);scrollTo(0,0)}} key={index}  className='bg-gray-100 cursor-pointer   shadow-md rounded-lg p-4'>
            <div className='flex justify-center'><img className='w-[130px] h-[130px] rounded-full' src={item.image} alt="" /></div>
           <h3 className='text-xl font-semibold text-center'>{item.name}</h3>


           {/* skilla */}
           <div>
  <h1 className='text-xl mt-2'>Skills: </h1>
  <ul className='list-disc list-inside'>
    {Array.isArray(item.skill) && item.skill.length > 0 &&
      item.skill.map((it, index) => (
        <li key={index} className='mt-1 ml-6 text-blue-700 text-lg'>{it}</li>
      ))
    }
  </ul>
</div>
{/* learning section */}
<div>
  <h1 className='text-xl mt-2'>Want to learn:</h1>
  <ul className='list-disc list-inside'>
    {Array.isArray(item.learn) && item.learn.length > 0 &&
      item.learn.map((it, index) => (
        <li key={index} className='mt-1 ml-6 text-blue-700 text-lg'>{it}</li>
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

export default Applicants
