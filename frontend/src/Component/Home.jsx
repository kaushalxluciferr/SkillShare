import React from 'react'

import HomeTitle from './HomeTitle/HomeTitle'
import TopSkill from './TopSkill'
import Applicants from './Applicants'
import Chatboticon from './Chatboticon'
import { useNavigate } from 'react-router-dom'
function Home() {

  const navigate=useNavigate()
  return (
    <div>
      <div>
     <HomeTitle/>
    </div>
    <TopSkill/>
    <Applicants/>
    <button onClick={()=>navigate('/chatbot')} className=' cursor-pointer fixed  bottom-5 right-5 bg-purple-500 mb-5 flex items-center font-bold text-white  px-3 rounded-full'>
      <Chatboticon/>
      AI-ChatBot</button>
    </div>
  )
}

export default Home
