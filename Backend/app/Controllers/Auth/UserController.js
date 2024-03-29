const JWt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const UserModule = require('../../Models/UserModel');


const GetAllUser = asyncHandler(async (req, res) => {

    try {
        const users = await UserModule.find();
        res.status(201).json(users)

    } catch (err) {
        console.error('Error: ' + err.message)
        res.status(401).json({ status: "fail", message: err.message })
    }
})

const handleErrors = (err) => {
    let errors = { first_name: '', last_name: '', cin: '', phone: '', email: '', password: '' }

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

const RegisterUser = asyncHandler(async (req, res) => {

    const { first_name, last_name, cin, phone, email, password } = req.body

    // check is email
    if (!email.includes('@')) {
        res.status(401).json({ status: "invalid email" })
    }

    // check length of password
    if (password.length < 8) {
        res.status(401).json({ status: "password must be at least 8 characters" })
    }

    //  check if all fields exists
    if (!first_name || !last_name || !cin || !phone || !email || !password) {
        res.status(401)
        throw new Error("please add all fields")
    }

    // check if user exists by email
    const UserExists = await UserModule.findOne({ email })

    if (UserExists) {
        res.status(401).json({ status: "user already exists" })
    }

    // check if user exists by cin
    const UserExistsByCin = await UserModule.findOne({ cin })

    if (UserExistsByCin) {
        res.status(401).json({ status: "user already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const HashPassword = await bcrypt.hash(password, salt)

    // create User
    try {
        const user = await UserModule.create({ first_name, last_name, cin, phone, email, password: HashPassword })
        res.status(201).json(user)
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(401).json({ errors })
    }
})


const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // check is email
    if (!email.includes('@')) {
        res.status(401).json({ status: "invalid email" })
    }

    // check length of password
    if (password.length < 8) {
        res.status(401).json({ status: "invalid password" })
    }

    //  check if all fields exists
    if (!email || !password) {
        res.status(401).status('please add all fields')
    }

    // check if user exists
    const user = await UserModule.findOne({ email })

    if (!user) {
        res.status(401).json({ status: "user does not exists" })
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(401).json({ status: "invalid password" })
    }

    // create token
    const token = JWt.sign({ id:user._id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    })

    res.status(201).json({
        token,
        user: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            cin: user.cin,
            phone: user.phone,
            email: user.email,
        }
    })
})

module.exports = {
    GetAllUser,
    RegisterUser,
    LoginUser,
}





