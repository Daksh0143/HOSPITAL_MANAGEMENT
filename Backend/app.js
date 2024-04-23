const express=require("express")
const { connectDb } = require("./Database/dbConnection")
const cors=require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const messageRoute = require("./Routes/messageRoute")
const userRoute=require("./Routes/userRoute")
const appointmentRoute=require("./Routes/appointmentRoute")
const {errorMiddleware }=require("./Middlewares/error")


const app=express()
app.use(express.json())
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

app.use("/api/v1/message",messageRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/appointment",appointmentRoute)

connectDb()

app.use(errorMiddleware)
module.exports=app