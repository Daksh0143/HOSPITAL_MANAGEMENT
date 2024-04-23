const { ErrorHandler } = require("../Middlewares/error")
const { Appointment } = require("../Models/appointementSchema")
const { User } = require("../Models/userSchema")
const app = require("../app")

const postAppointment = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address
    } = req.body
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !appointment_date || !department ||
        !doctor_firstName || !doctor_lastName ||  !address) {
        return next(new ErrorHandler("Please provide all the detail", 401))
    }
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    })

    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor is not found", 401))
    }
    if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctors Conflics! Please contact through email or phone", 401))
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;

    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName
        },
        hasVisited,
        address,
        doctorId,
        patientId,
    })
    res.status(200).json({
        success: true,
        message: "Appointment Send",
        appointment
    })
}

const getAllAppointment=async(req,res,next)=>{
    const appointment=await Appointment.find();
    res.status(201).json({
        success:true,
        appointment

    })
}

const updateAppointmentStatus=async(req,res,next)=>{
    const {id} =req.params;
    let appointment=await Appointment.findById(id)
    if(!appointment){
        return next(new ErrorHandler("Appointment is not found",401))
    }
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(201).json({
        success:true,
        message:"Appointment updated successfully",
        appointment
    })
}

const deleteAppointment=async(req,res,next)=>{
    const {id}= req.params;
    let appointment=await Appointment.findById(id)
    if(!appointment){
        return next(new ErrorHandler("Appointment is not found",401))
    }
    await appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"Appointment deleted successfully"
    })
}

module.exports={postAppointment,getAllAppointment,updateAppointmentStatus,deleteAppointment}