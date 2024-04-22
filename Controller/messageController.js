
const { ErrorHandler } = require("../Middlewares/error")
const {Message} =require("../Models/messageSchema")


const sendMessage=async(req,res,next)=>{
    const {firstName,lastName,email,phone,message } =req.body
    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please provide all the detail",401))    
    }
    const data=await Message.create({firstName,lastName,email,phone,message});
    res.status(200).json({
        success:true,
        message:"Successfully message Posted",
        data
    })
}

const getAllMessages=async(req,res,next)=>{
    const data=await Message.find()
    return res.status(200).json({
        success:true,
        message:"Successfully get all messages",
        data
    })
}

module.exports={sendMessage,getAllMessages}