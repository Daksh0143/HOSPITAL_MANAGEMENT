const jwt=require("jsonwebtoken")
const { catchAsyncError } = require("./catchAsyncError");
const { ErrorHandler } = require("./error");
const { User } = require("../Models/userSchema");

const isAdminAuthenticated=catchAsyncError(async(req,res,next)=>{
    const token=req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin is not authenticated",401))
    }
    const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decoded.id);
    if(req.user.role!=="Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource `))
    }
    next()
})
const isPatientAuthenticated=catchAsyncError(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient is not authenticated",401))
    }
    const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decoded.id);
    if(req.user.role!=="Patient"){
        return next(new ErrorHandler(`${req.user.role} not authorized for this resource `))
    }
    next()
})


module.exports={isAdminAuthenticated,isPatientAuthenticated}