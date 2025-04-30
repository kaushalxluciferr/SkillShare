import { CopyrightIcon } from 'lucide-react'
import React from 'react'

function Copyright() {
  return (
    <div className='bg-gray-600 mt-2 p-4 rounded-md text-white text-xl'>
        <div className='flex justify-center gap-2 cursor-wait'><p className='mt-1'><CopyrightIcon/> </p>
      <h1 className=''>Copyright 2024@ kaushal- All Right Reserved</h1>

        </div>
    </div>
  )
}

export default Copyright
