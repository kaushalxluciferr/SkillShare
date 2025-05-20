
import React, { useEffect, useRef, useState } from 'react'

import './ChatBot.css'
import { SkillshareInfo } from '../../SkillshareInfo'
import Chatboticon from '../Chatboticon'
import SplineBot from './SplineBot'
function ChatBot() {
 const inputRef=useRef()
const [history,sethistory]=useState([{
  hideInChat:true,
  role:"model",
  text:SkillshareInfo
}])

console.log(import.meta.env.VITE_API_URL);

const updatebotchat=(text)=>{
  sethistory(prev=>[...prev.filter(msg=>msg.text!=="Thinking"),{role:"model",text}])
}


const botResponse=async(histry)=>{
histry=histry.map(({role,text})=>({role,parts:[{text}]}))



  const requestOptions={
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({contents:histry})
  }

  try{
const response=await fetch(import.meta.env.VITE_API_URL,requestOptions)
const data= await response.json()

if(!response.ok) throw new Error(data.error.message||"Something went wrong") 
const apiresponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
updatebotchat(apiresponse)
  

  }catch(error)
  {
console.log(error);
  }

}




// 
const handlesubmit = async (e) => {
  e.preventDefault();
  const message = inputRef.current.value.trim();
  if (!message) return;
  inputRef.current.value = "";
const userMessage = { role: "user", text: message };
const apiMessage = { role: "user", text: `using the details provided above, please address the query: ${message}` };

const newHistory = [...history, userMessage];
  sethistory([...newHistory, { role: "model", text: "Thinking" }]);

  setTimeout(() => {
    botResponse(newHistory);
  }, 600);
};

// console.log(history);



useEffect(()=>{
const chatbody=document.querySelector('.chat-body')
chatbody.scrollTop=chatbody.scrollHeight
},[history])

 return (
  <div className='kaushal flex flex-row items-start bg-[#a0d2eb] -mt-[10px] justify-between gap-20 w-full px-10'>


     {/* Right: SplineBot */}
    <div className='w-1/2   h-[450px] '>
      <SplineBot />
    </div>
    {/* Left: ChatBot */}
    <div className='container  ml-[100px] mt-4 mb-4 w-1/2'>
      <div className='chatbot-popup'>
        {/* header */}
        <div className='chat-header'>
          <div className='header-info'>
            <Chatboticon />
            <h2 className='logo-text'>SkillShare ChatBot</h2>
          </div>
        </div>
        {/* body */}
        <div className="chat-body">
          <div className="message bot-message">
            <Chatboticon />
            <p className='message-text'>
              Welcome To SkillShare <br />
              How Can i help You❤️?
            </p>
          </div>
          {history.filter(item => !item.hideInChat).map((item, index) => (
         <div className={`message ${item.role === "model" ? "bot" : "user"}-message`} key={index}>
           {item.role === "model" && <Chatboticon />}
            <p className='message-text'>{item.text}</p>
            </div>
          ))}


        </div>
        {/* footer */}
        <div className='chat-footer'>
          <form action="#" className='chat-form' onSubmit={handlesubmit}>
        <input type="text" placeholder='Type here' ref={inputRef} className='message-input' required />
  <button className='btn'>send</button>
     </form>
        </div>
      </div>
    </div>

   
  </div>
);

}

export default ChatBot
