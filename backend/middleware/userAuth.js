import jwt from 'jsonwebtoken'

const userAuth=async (req,res,next)=>{
    try{
const {token}=req.headers

if(!token)
{
    res.json({
        success:false,
        message:"login/Signup first"
    })
}

const tokenn=jwt.verify(token,process.env.SECRET)
req.userId=tokenn._id
next()

    }catch(error)
    {
        res.json({
            success:false,
            message:error.message
        })
    }
}
export default userAuth