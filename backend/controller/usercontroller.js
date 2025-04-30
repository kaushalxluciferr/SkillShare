import {v2 as cloudinary} from 'cloudinary'
import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import Message from '../model/message.js'

// userr singup
const signup=async(req,res)=>{
    try{
const {name,email,password,description,skill,learn}=req.body
const imageFIle=req.file

if(!name||!email||!imageFIle||!password||!description||!skill||!learn)
{
    return res.json({
        success:false,
        message:"Some Fields are missing"
    })
}

const exemail=await User.findOne({email})
if(exemail)
{
    return res.json({
        success:false,
        message:"Email already exist"
    })
}

const imageupload=await cloudinary.uploader.upload(imageFIle.path)

const hashpass=await bcrypt.hash(password,10)

const user=await User.create({
    name,email,
    password:hashpass,
    image:imageupload.secure_url,
    skill,description,learn
})
await user.save()

const token= jwt.sign({_id:user._id},process.env.SECRET)
return res.json({
    success:true,
    message:"Signup Successfull",
    token
})


    }catch(error)
    {
        res.json({
            success:false,
            message:error.message
        })
    }
}



// user login
const login=async(req,res)=>{
    try{
const {email,password}=req.body

const user=await User.findOne({email})
if(!user)
{
    return res.json({
        success:false,
        message:"Email not exist"
    })
}

const match=await bcrypt.compare(password,user.password)
if(!match) return res.json({success:false,message:"password incorrect"})

    const token=jwt.sign({_id:user._id},process.env.SECRET)
    return res.json({
        success:true,
        message:"signin successfull"
        ,
        token
    })


    }catch(error)
    {
        res.json({
            success:false,
            message:error.message
        })
    }
}



// get userinfo
const getuserinfo=async (req,res)=>{
    try{
const {userId}=req

const user=await User.findById(userId).select("-password") 
if(!user)
{
    res.json({
        success:false,
        message:"user not found"
    })
}
return res.json({
    success:true,
    message:"fetched succesfull",
    user
})
    }catch(error)
    {
        res.json({
            success:false,
            message:error.message
        })
    }
}



// get all user
const alluserinfo=async(req,res)=>{
    try{
const {userId}=req

const user=await User.find({_id:{$ne:userId}}).select("-password")
if(!user)
{
    return res.json({
        success:"false",
        message:"kuxh to gadbad hai bidu"
    })
}
return res.json({
    success:true,
    message:"successful",
    user
})
    }catch(error)
    {
        res.json({
            success:false,
            message:error.message
        })
    }
}



// get profile of userinfo
const getprofile=async (req,res)=>{
    try{
const {userid}=req.body

const user=await User.findById(userid).select("-password")
if(!user)
{
    return res.json({
        success:false,
        message:"Applicant not found "
    })
}

return res.json({
    success:true,
    message:"Found",
    user
})

    }catch(error)
    {
return res.json({
    success:false,
    message:error.message
})
    }
}




// get Applicatnt info
const getApllicantinfo=async(req,res)=>{
    try{
const {id}=req.body

const user=await User.findById(id).select("-password")
if(!user)
{
    return res.json({
        success:false,
        message:"Applicant not found"
    })
}

return res.json({
    success:true,
    message:"Applicant found successfully",
    user
})

    }catch(error)
    {
        res.json({
            success:false,
            message:error.message
        })
    }
}



// update user info

const updateinfo=async(req,res)=>{
    try{
const {name,skill,learn,description,userid}=req.body
const image=req.file

if(!name||!skill||!learn||!description)
{
    return res.json({
        success:false,
        message:"some field is missing"
    })
}
const skillArray=JSON.parse(skill)
const learnArray=JSON.parse(learn)

await User.findByIdAndUpdate(userid,{name,skill:skillArray,learn:learnArray,description})

if(image)
{
    const imagefile=await cloudinary.uploader.upload(image.path,{resource_type:"image"})
    await User.findByIdAndUpdate(userid,{image:imagefile.secure_url})
}
return res.json({
    success:true,
    message:"updated successfully"
})


    }catch(error)
    {
        res.json({
            success:false,
            message:error.message
        })
    }
}


// controllers/messageController.js
const getMessagedUserIds = async (req, res) => {
  try {
    const userId=new mongoose.Types.ObjectId(req.userId); 

    const userIDs=await Message.aggregate([
      {
        $match:{$or:[{sender:userId},{receiver:userId}]}},
      {$project:{otherUserId:{$cond:[{$eq:["$sender",userId]},"$receiver","$sender"]}
        }
      },
      {
        $group:{_id:"$otherUserId"}
      }
    ]);

    const ids=userIDs.map(user=>user._id.toString());
    return res.json({
      success: true,
      data: ids
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




export  {signup,login,getuserinfo,alluserinfo,getprofile,getApllicantinfo,updateinfo,getMessagedUserIds}