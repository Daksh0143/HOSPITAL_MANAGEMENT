const express=require("express")
const {catchAsyncError}=require("../Middlewares/catchAsyncError")
const { sendMessage,getAllMessages} = require("../Controller/messageController")
const {isAdminAuthenticated,isPatientAuthenticated} =require("../Middlewares/auth")

const router=express.Router()


router.post("/send",catchAsyncError(sendMessage))
router.get("/getAllMessages",isAdminAuthenticated,catchAsyncError(getAllMessages))



module.exports=router