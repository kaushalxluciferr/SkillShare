import Message from '../model/message.js';
import User from '../model/user.js';
import mongoose from 'mongoose';



// Send message
export const sendMessage = async (req, res) => {
  try {
    const {receiver,content}=req.body;
    const {userId}=req; 
    if (!receiver||!content) {
      return res.json({
        success: false,
        message: "Receiver and content are required"
      })
    }

    const message = new Message({
      sender:userId,
      receiver,
      content
    })

    await message.save();
    return res.json({
      success: true,
      message: "Message sent successfully",
      data: message
    })

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    })
  }
}




// Get conversation between two users
export const getConversation = async (req, res) => {
  try {
    const {userId}=req.params;
    const currentUser=req.userId;
    const messages=await Message.find({
      $or:[
        {sender:currentUser,receiver:userId },
        { sender:userId,receiver:currentUser }
      ]
    }).sort('createdAt').populate('sender', 'name image').populate('receiver', 'name image');

    return res.json({
      success: true,
      message: "Conversation fetched",
      data: messages
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};



// Get all conversations for current user
export const fetchAllconvo = async (req, res) => {
  try {
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: userObjectId },
            { receiver: userObjectId }
          ]
        }
      },
      {
        $sort: { createdAt: -1 } 
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", userObjectId] },
              "$receiver",
              "$sender"
            ]
          },
          lastMessage: { $first: "$$ROOT" }, // Get most recent message
          unreadCount: {
            $sum: {
              $cond: [
                { 
                  $and: [
                    { $eq: ["$read", false] },
                    { $ne: ["$sender", userObjectId] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          "user.password": 0,
          "user.__v": 0,
          "user.email": 0 // Optional: remove if you need email
        }
      },
      { $sort: { "lastMessage.createdAt": -1 } }
    ]);
    return res.json({
      success: true,
      data: conversations
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message
    });
  }
};


// Get user details for new conversation
export const getUserDetails = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId)
        .select('-password -__v');
  
      if (!user) {
        return res.json({
          success: false,
          message: "User not found"
        });
      }
  
      return res.json({
        success: true,
        message: "User details fetched",
        data: user
      });
  
    } catch (error) {
      return res.json({
        success: false,
        message: error.message
      });
    }
  };


  export const deletemsg=async(req,res)=>{
    try{
const{id}=req.body

await Message.findByIdAndDelete(id)
return res.json({
  success:true,
  message:"deleted successfully"
})

    }catch(error)
    {
      return res.json({
        success:false,
        message:error.message
      })
    }

  }
  