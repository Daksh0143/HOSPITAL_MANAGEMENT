const express=require("express")
const { catchAsyncError } = require("../Middlewares/catchAsyncError")
const {isAdminAuthenticated,isPatientAuthenticated} =require("../Middlewares/auth")
const { postAppointment, getAllAppointment ,updateAppointmentStatus, deleteAppointment} = require("../Controller/appointmentController")
const router=express.Router()

router.post("/postAppointment",isPatientAuthenticated,catchAsyncError(postAppointment))
router.get("/getAppointment",isAdminAuthenticated,catchAsyncError(getAllAppointment))
router.put("/update/:id",isAdminAuthenticated,catchAsyncError(updateAppointmentStatus))
router.delete("/delete/:id",isAdminAuthenticated,catchAsyncError(deleteAppointment))


module.exports=router