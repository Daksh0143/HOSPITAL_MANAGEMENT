const mongoose=require("mongoose")
require("dotenv").config()

const connectDb=async()=>{
    await mongoose.connect(process.env.MONGO_URI,{
        dbName:"HOSPITAL_MANAGEMENT"
    })
    .then((res)=>{
        console.log("DB Connection Succesfully")
    }).catch((error)=>{
        console.log(error)
    })
}


module.exports={connectDb}