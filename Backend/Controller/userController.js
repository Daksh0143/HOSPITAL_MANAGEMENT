const { ErrorHandler } = require("../Middlewares/error")
const { User } = require("../Models/userSchema")
const { generateToken } = require("../Utills/jwtToken")
const cloudinary = require("cloudinary")

const patientRegister = async (req, res, next) => {
    const { firstName, lastName, email, password, phone, nic, dob, gender, role } = req.body
    if (!firstName || !lastName || !email || !password || !phone || !nic || !dob || !gender || !role) {
        return next(new ErrorHandler("Please provide all the details", 401))
    }
    let user = await User.findOne({
        $or: [{ "email": email, "phone": phone }]
    })

    if (user) {
        if (user.email === email) {
            return next(new ErrorHandler("Email is already exists", 401))
        }
        else if (user.phone === phone) {
            return next(new ErrorHandler("Phone is already exists", 401))
        }
        return next(new ErrorHandler("User already exists", 401))
    }

    user = await User.create({
        firstName, lastName, email, password, phone, nic, dob, gender, role
    })
    generateToken(user, "user registered successfullt", 201, res)

}

const patientLogin = async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please provide all detail", 401))
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and confirm password is not match", 401))
    }
    const user = await User.findOne({ email })
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    const isPasswordMatch = await user.comparePassword(password)

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email ", 401))
    }

    if (role !== user.role) {
        return next(new ErrorHandler("User is not login with this role", 401))
    }
    generateToken(user, "user login successfully", 201, res)

}

const addNewAdmin = async (req, res, next) => {
    const { firstName, lastName, email, password, phone, nic, dob, gender } = req.body
    if (!firstName || !lastName || !email || !password || !phone || !nic || !dob || !gender) {
        return next(new ErrorHandler("Please Provide all the detail", 401))
    }
    const isRegistered = await User.findOne({ email })
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exist`))
    }
    const admin = await User.create({ firstName, lastName, email, password, phone, nic, dob, gender, role: "Admin" })
    res.status(201).json({
        success: true,
        message: "Admin registered sucessfully",
        admin
    })
}

const getAllDoctors = async (req, res, next) => {
    const doctor = await User.find({ role: "Doctor" })
    res.status(200).json({
        success: true,
        doctor
    })
}

const getUserDetail = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
}

const logoutAdmin = async (req, res, next) => {
    res.status(200).cookie("adminToken", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure:true,
        sameSite:"None"
    }).json({
        success: true,
        message: "Admin Logout Successfully"
    })
}

const logoutPatient = async (req, res, next) => {
    res.status(200).cookie("patientToken", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure:true,
        sameSite:"None"
    }).json({
        success: true,
        message: "User Logout Successfully"
    })
}

const addNewDoctor = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length == 0) {
        return next(new ErrorHandler("Doctor Avatar is required", 401))
    }
    const { docAvatar } = req.files
    const allowedFormats = ["/image/png", "/image/jpg", "image/jpeg", "image/webp"]
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("Please give me a image in JPG,JPEG,PNG or WEBP format"))
    }
    const { firstName, lastName, email, password, phone, nic, dob, gender, doctorDepartment } = req.body
    if (!firstName || !lastName || !email || !password || !phone || !nic || !dob || !gender || !doctorDepartment) {
        return next(new ErrorHandler("Please enter all the field", 401))
    }
    const isRegistered = await User.findOne({ email })
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} is already exist with this email`, 401))
    }
    const cloudinaryResponce = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
        );
        if(!cloudinaryResponce || cloudinaryResponce.error){
            console.error("Clodinary Error :-",cloudinaryResponce.error || "UnknownCloudinary Error")
        }
        const doctor=await User.create({
            firstName,
            lastName, 
            email, 
            password, 
            phone, 
            nic, 
            dob, 
            gender, 
            doctorDepartment,
            docAvatar:{
                public_id:cloudinaryResponce.public_id,
                url:cloudinaryResponce.secure_url
            },
            role:"Doctor"
        })
        res.status(200).json({
            success:true,
            message:"New Doctor Registered",
            doctor
        })
}

module.exports = { patientRegister, patientLogin, addNewAdmin, getAllDoctors, getUserDetail, logoutAdmin, logoutPatient,addNewDoctor }