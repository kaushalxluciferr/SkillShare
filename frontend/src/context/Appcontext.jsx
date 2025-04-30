import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext=createContext()
const AppContextProvider=(props)=>{

const backendurl=import.meta.env.VITE_BACKEND_URL   
const backendurl1=import.meta.env.VITE_BACKEND_URL2
const [user,setuser]=useState({})
const [usertoken,setusertoken]=useState(localStorage.getItem("usertoken")||false)
const [alluser,setalluser]=useState({})
const [userId,setuserId]=useState(localStorage.getItem("userId")||false)

const [allmessageuser,setallmessgaeuser]=useState([])


const getuserinfo=async()=>{
    try{
const {data}=await axios.post(backendurl+"/getuserinfo",{},{
    headers:{
        token:usertoken
    }
})
if(data.success)
{
    setuser(data.user)
    localStorage.setItem("userId",data._id)
    setuserId(data._id)
}
    }catch(error)
    {
        toast.error((error.message))
    }
}

const getallmessageuser=async()=>{
    try{
const {data}=await axios.post(backendurl+'/messaged-users',{},{
    headers:{
        token:usertoken
    }
})
if(data.success)
{
    setallmessgaeuser(data.data)
}
else{
    toast.error(data.message)
}
    }catch(error)
    {
toast.error(error.message)
    }
}



useEffect(()=>{
if(usertoken)
{
    getuserinfo()
    getallmessageuser()
}
},[usertoken])




const getalluser=async()=>{
    try{
const {data}=await axios.post(backendurl+"/alluserinfo",{},{headers:{
    token:usertoken
}})
if(data.success)
{
    setalluser(data.user)
}
else{
    toast.error(data.message)
}
    }catch(error)
    {
        toast.error(error.message)
    }
}

useEffect(()=>{
if(usertoken)
{
    getalluser()
}
},[])


    const value={
        backendurl,user,setuser,usertoken,setusertoken,alluser,setalluser,userId,allmessageuser,backendurl1
    }

    return (
        <AppContext.Provider value={value}>
{props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider