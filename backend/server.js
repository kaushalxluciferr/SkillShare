import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import ConnectDB from "./config/ConnectDB.js"
import Userrouter from "./route/userroute.js"
import ConnectClod from "./config/ConnectCLoudinary.js"
import messageRouter from "./route/messageroute.js"

dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


ConnectDB()
ConnectClod()
app.use("/api/user",Userrouter)
app.use("/api/messages",messageRouter)

app.get("/",(req,res)=>{
    res.send("hey sanamika");
})


app.listen(process.env.PORT,()=>{
    console.log("server started");
    
})
