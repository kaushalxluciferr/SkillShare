import express from 'express'
import upload from '../middleware/multer.js'
import { alluserinfo, getApllicantinfo, getprofile, getuserinfo, login, signup, updateinfo,getMessagedUserIds } from '../controller/usercontroller.js'
import userAuth from '../middleware/userAuth.js'

const Userrouter=express.Router()

Userrouter.post("/signup",upload.single('image'),signup)
Userrouter.post("/login",login)
Userrouter.post("/getuserinfo",userAuth,getuserinfo)
Userrouter.post("/alluserinfo",userAuth,alluserinfo)
Userrouter.post("/getprofile",userAuth,getprofile)
Userrouter.post("/userprofile",userAuth,getApllicantinfo)
Userrouter.post("/updateinfo",upload.single("image"),userAuth,updateinfo)
Userrouter.post('/messaged-users', userAuth, getMessagedUserIds);



export default Userrouter