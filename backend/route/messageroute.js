import express from 'express';
import {sendMessage,getConversation,fetchAllconvo,getUserDetails, deletemsg} from '../controller/messagecontroller.js';
import userAuth from '../middleware/userAuth.js';

const messageRouter = express.Router();

messageRouter.post('/send', userAuth, sendMessage);
// Get conversation with specific user
messageRouter.get('/conversation/:userId', userAuth, getConversation);
// Get user details for new conversation
messageRouter.get('/user/:userId', userAuth, getUserDetails);
// Get all conversations
messageRouter.get('/', userAuth, fetchAllconvo);
// delete particular msges
messageRouter.post("/delete",userAuth,deletemsg)


export default messageRouter;