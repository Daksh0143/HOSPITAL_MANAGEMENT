const mongoose=require("mongoose")
const validator=require("validator")


const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please provide a valid email"]
    },
    phone:{
        type:String,
        minLength:[10,"Phone number must contain only 10 charracter "],
        maxLength:[10,"Phone number must contain only 10 character"],
        required:true
    },
    message:{
        type:String,
        required:true
    }

    
},{timestamps:true})



const Message=mongoose.model("Message",messageSchema)

module.exports={Message}