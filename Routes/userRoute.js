const express=require("express")
const { patientRegister, 
    patientLogin,
    addNewAdmin,
    getAllDoctors,
    getUserDetail,
    logoutAdmin,
    logoutPatient,
    addNewDoctor } = require("../Controller/userController")
const { catchAsyncError } = require("../Middlewares/catchAsyncError")
const {isAdminAuthenticated,isPatientAuthenticated} =require("../Middlewares/auth")

const router=express.Router()

router.post("/patient/register",catchAsyncError(patientRegister))
router.post("/patient/login",catchAsyncError(patientLogin))
router.post("/admin/addNewAdmin",isAdminAuthenticated,catchAsyncError(addNewAdmin))
router.get("/getAllDoctor",catchAsyncError(getAllDoctors))
router.get("/admin/me",isAdminAuthenticated,catchAsyncError(getUserDetail))
router.get("/patient/me",isPatientAuthenticated,catchAsyncError(getUserDetail))
router.get("/patient/logout",isPatientAuthenticated,catchAsyncError(logoutPatient))
router.get("/admin/logout",isAdminAuthenticated,catchAsyncError(logoutAdmin))
router.post("/doctor/addDoctor",isAdminAuthenticated,catchAsyncError(addNewDoctor))


module.exports=router