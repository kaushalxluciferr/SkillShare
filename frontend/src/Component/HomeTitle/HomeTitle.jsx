import React from 'react'

function HomeTitle() {
  return (
    <div className='p-4 -mt-6 -mb-2'>
        <div className='flex mt-6 border p-6 justify-between rounded-md bg-gradient-to-r from-blue-400 to-gray-400'>
<div><h1 className='text-6xl font-bold text-blue-700'>Peer-to-peer skill <br /><span className='ml-5'>exchange platform</span></h1>
<p className='ml-4 mt-6 text-2xl font-bold text-gray-100'>Find the skills you need. Share the skills you have.
<br /><span className='ml-6'>
Connect with classmates to learn and share valuable skills.
</span>
</p></div>
<div>
    <img className='h-50 rounded-md w-[500px]' src="https://cdn.dribbble.com/userupload/14940717/file/original-9be4a77019b4c8f2dd97fbc40377429d.png?resize=1200x708&vertical=center" alt="" /></div>
        </div>
    </div>
  )
}

export default HomeTitle
