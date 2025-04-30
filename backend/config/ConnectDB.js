import mongoose from "mongoose";

const ConnectDB=async()=>{
    mongoose.connection.on("connected",()=>{
        console.log("DB Connected successfully");
    })
    await mongoose.connect(process.env.MONGODB_URL)
}

export default ConnectDB