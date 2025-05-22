import React from 'react'
import { Topskill } from '../assets/Assests'

function TopSkill() {
  return (
    <div>
       <div className='flex items-center justify-center mt-5'>
      <h1 className='text-2xl font-bold text-white underline'><span className='text-red-600'>Top</span> Skills <span className='text-green-600'>Here</span></h1>
        </div>
        <div className='flex justify-between  mx-20 bg-indigo-800 rounded-lg mt-4 '>

       {Topskill.map((item,index)=>(
           <div key={index} className=' p-4 flex flex-row items-center  rounded-full ' >
         <div className='flex flex-col'>
             <img className='h-16 w-16 rounded-full' src={item.img} alt="" />
         <h1 className='mt-2 ml-2 font-bold text-md text-white'>{item.name}</h1>
         </div>
           </div>
       ))}
       </div>
    </div>
  )
}

export default TopSkill
