import { PhoneCall } from 'lucide-react'
import React from 'react'

function AboutUS() {
  return (
    <div>
      <div className='flex justify-center'>
        <h1 className='text-4xl font-bold underline'>About Us</h1>
      </div>
      <div className='p-4 bg-gray-600 rounded-md mt-4 flex justify-between'>
        <div className='text-white'>
            <h1 className='text-xl font-bold underline'>Want to know About us?</h1>

            <p className='ml-2 mt-4 text-md'>SkillShare Hub is a community-driven platform where people <br /> learn and share skills they’re passionate about — from tech and design to music and more. <br /> Whether you're here to teach or learn, we've got something for everyone. Let’s grow together!

</p>
        </div>
        <div className='text-white mr-20'>
            <div className=' underline text-xl font-bold flex gap-2 cursor-pointer'>
<h2><PhoneCall/></h2>
            <h2>Contact US</h2>
            </div>
            <div className='mt-4 cursor-pointer'>
            <p>Gmail: Kaushalrauniyar1@gmail.com</p>
            <p>PhoneNO: 8235914724</p>

            </div>
        </div>

      </div>
    </div>
  )
}

export default AboutUS
